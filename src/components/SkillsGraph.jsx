// ============================================================
// SkillsGraph.jsx — D3 HIERARCHICAL KNOWLEDGE BASE
//
// 3-level force-directed graph:
//   Root ("Skills") → categories → individual skills
//
// Layout strategy:
//   - Root fixed at center via fx/fy
//   - Categories pulled toward points on an inner ring (r = 28% of
//     min(w,h)) via per-node forceX/forceY targets
//   - Skills pulled toward their parent category's ring position
//     with a smaller offset
//   - Soft collision + weak repulsion keep things readable
//
// Skill labels are ALWAYS visible (not hover-only).
// Click root or any category to drill into the Skills deep-dive.
//
// Built with d3-force + d3-selection + d3-drag.
// ============================================================

import { useEffect, useMemo, useRef } from 'react';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCollide,
} from 'd3-force';
import { select } from 'd3-selection';
import { drag } from 'd3-drag';

import { skillsGraph as graphData } from '../data';
import useElementSize from '../hooks/useElementSize';
import useReducedMotion from '../hooks/useReducedMotion';
import useThemeVariant from '../hooks/useThemeVariant';

// Visual constants — colors come from CSS vars (read at runtime
// so theme toggle just works)
function readVar(name, fallback) {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name);
  return (v && v.trim()) || fallback;
}

// Radii for each level
const ROOT_R = 28;
const CAT_R  = 14;
const SKILL_R = 5;

const LABEL_OFFSET = 14;

// Build nodes/links with initial positions laid out on rings so
// the simulation starts well-distributed.
function buildGraphData(width, height) {
  const W = width  || 1024;
  const H = height || 560;
  const cx = W / 2;
  const cy = H / 2;
  const ring1 = Math.min(W, H) * 0.26; // category ring
  const ring2 = Math.min(W, H) * 0.40; // skill ring (per category)

  const nodes = graphData.nodes.map((n) => ({ ...n }));
  const links = graphData.links.map((l) => ({ ...l }));

  // Seed each node with a small random velocity so the graph
  // is visibly alive from the very first frame. Without this,
  // the simulation starts at rest and only the warm-target force
  // drives motion, which can look static.
  const seedVx = () => (Math.random() - 0.5) * 1.4;
  const seedVy = () => (Math.random() - 0.5) * 1.4;

  // Place root at center, but DON'T pin it — we want it to
  // drift gently along with the rest of the graph so the whole
  // system feels alive. fx/fy is set only on drag (see drag end).
  const root = nodes.find((n) => n.kind === 'root');
  if (root) {
    root.r = ROOT_R;
    root.x = cx; root.y = cy;
    root.vx = seedVx(); root.vy = seedVy();
  }

  // Place categories evenly on ring 1
  const cats = nodes.filter((n) => n.kind === 'category');
  cats.forEach((c, i) => {
    c.r = CAT_R;
    const angle = (i / cats.length) * Math.PI * 2 - Math.PI / 2;
    c._tx = cx + Math.cos(angle) * ring1;
    c._ty = cy + Math.sin(angle) * ring1;
    c.x = c._tx; c.y = c._ty;
    c.vx = seedVx(); c.vy = seedVy();
  });

  // Place skills on a wider arc around their parent category
  const skills = nodes.filter((n) => n.kind === 'skill');
  // Group skills by category
  const byCat = new Map();
  for (const s of skills) {
    if (!byCat.has(s.category)) byCat.set(s.category, []);
    byCat.get(s.category).push(s);
  }
  for (const [category, list] of byCat.entries()) {
    const parent = cats.find((c) => c.label === category);
    if (!parent) continue;
    const parentAngle = Math.atan2(parent._ty - cy, parent._tx - cx);
    list.forEach((s, i) => {
      s.r = SKILL_R;
      // Spread skills along an arc ±50° from the parent's direction
      const spread = ((i - (list.length - 1) / 2) / Math.max(list.length - 1, 1)) * (Math.PI * 0.6);
      const angle = parentAngle + spread;
      s._tx = parent._tx + Math.cos(angle) * ring2 * 0.55;
      s._ty = parent._ty + Math.sin(angle) * ring2 * 0.55;
      s.x = s._tx; s.y = s._ty;
      s.vx = seedVx(); s.vy = seedVy();
    });
  }
  return { nodes, links };
}

// Custom force: pull each non-root node toward its target position
// (set up in buildGraphData). Strength is per-node-type.
// We run this directly from the tick handler so we have explicit
// access to the nodes array (d3 force call signature passes only
// alpha to forces, so `this` is undefined).
function attractToTargetTick(nodes, strengthByKind, alpha) {
  for (const n of nodes) {
    if (n.fx != null && n.fy != null) continue;
    if (n._tx == null || n._ty == null) continue;
    const k = (strengthByKind[n.kind] ?? 0.05) * alpha;
    n.vx += (n._tx - n.x) * k;
    n.vy += (n._ty - n.y) * k;
  }
}

// Time-based wobble — gives every node a unique slow orbit
// around its target position. Two nodes with the same target
// still move on different curves (different phases / freqs).
// Returns a velocity nudge to apply to n.vx/n.vy.
function wobbleTick(nodes, t, amp) {
  for (const n of nodes) {
    if (n.fx != null && n.fy != null) continue;
    if (n._tx == null || n._ty == null) continue;
    // Per-node phase derived from id hash so neighbors differ.
    const h = hashId(n.id);
    const phase = h * Math.PI * 2;
    const freqA = 0.0008 + (h % 7) * 0.00012;
    const freqB = 0.0006 + (h % 11) * 0.00009;
    // Two perpendicular sinusoids → an off-axis orbit
    n.vx += Math.cos(t * freqA + phase) * amp;
    n.vy += Math.sin(t * freqB + phase * 1.3) * amp;
  }
}

// Cheap deterministic hash of a string to [0,1).
function hashId(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h % 1000) / 1000;
}

function makeBoundaryClamp(width, height, padding) {
  return function (nodes) {
    for (const n of nodes) {
      const r = n.r || 6;
      n.x = Math.max(padding + r, Math.min(width  - padding - r, n.x));
      n.y = Math.max(padding + r, Math.min(height - padding - r, n.y));
    }
  };
}

export default function SkillsGraph({ onCategoryClick, height = 560 }) {
  const [containerRef, { width }] = useElementSize();
  const svgRef = useRef(null);
  const reduced = useReducedMotion();
  const themeVariant = useThemeVariant();

  const { nodes, links } = useMemo(
    () => buildGraphData(width, height),
    [width, height]
  );

  useEffect(() => {
    if (!svgRef.current || width === 0) return;

    const svg = select(svgRef.current);
    const W = width;
    const H = height;

    // Pull theme colors at render time. We re-read on every
    // (re)mount of this effect, which is triggered whenever
    // `themeVariant` flips — so light/dark always shows the
    // right palette.
    const ACCENT       = readVar('--accent',       '#e63946');
    const SKY          = readVar('--sky',          '#457b9d');
    const SKY_LIGHT    = readVar('--sky-light',    '#a8dadc');
    const BG           = readVar('--bg',           '#0d1b2a');
    const FG           = readVar('--fg',           '#0d1b2a');
    const FG_DIM       = readVar('--fg-dim',       '#1b2a3a');
    const FG_MUTE      = readVar('--fg-mute',      '#457b9d');
    const LINK_STROKE  = readVar('--sky-dark',     '#345a78');

    svg.selectAll('*').remove();

    // ── Links layer ─────────────────────────────────────────
    const linkSel = svg
      .append('g')
      .attr('class', 'links')
      .attr('stroke', LINK_STROKE)
      .attr('stroke-opacity', 0.45)
      .attr('stroke-width', 1)
      .selectAll('line')
      .data(links)
      .join('line');

    // ── Nodes layer ─────────────────────────────────────────
    const nodeG = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('g.node')
      .data(nodes, (d) => d.id)
      .join('g')
      .attr('class', 'node')
      .attr('tabindex', 0)
      .attr('role', (d) => (d.kind === 'skill' ? 'img' : 'button'))
      .attr('aria-label', (d) => {
        if (d.kind === 'root')   return `${d.label} root. Click to explore all skills.`;
        if (d.kind === 'category') return `${d.label} category. Click to explore skills.`;
        return `${d.label} — ${d.category}`;
      });

    // Circles
    nodeG.append('circle')
      .attr('r', (d) => d.r)
      .attr('fill', (d) => {
        if (d.kind === 'root')     return ACCENT;
        if (d.kind === 'category') return SKY;
        return SKY_LIGHT;
      })
      .attr('stroke', BG)
      .attr('stroke-width', (d) => (d.kind === 'root' ? 3 : 1.5));

    // Labels (always visible, position varies by level)
    nodeG.append('text')
      .attr('class', 'label')
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => d.r + LABEL_OFFSET)
      .attr('fill', (d) => (d.kind === 'root' ? FG : FG_DIM))
      .attr('font-size', (d) =>
        d.kind === 'root' ? 16 : d.kind === 'category' ? 12 : 10
      )
      .attr('font-weight', (d) =>
        d.kind === 'root' ? 700 : d.kind === 'category' ? 600 : 400
      )
      .attr('pointer-events', 'none')
      .text((d) => d.label);

    // Skill labels are tiny — the user said "keep that" so we
    // render all of them, no hover gating.

    // ── Drag (root + categories) ────────────────────────────
    const dragBehavior = drag()
      .on('start', (event, d) => {
        if (!event.active) sim.alphaTarget(0.3).restart();
        d.fx = d.x; d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x; d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) sim.alphaTarget(0.05); // restore ambient
        // Release back to ring target. Root keeps drifting,
        // categories too — both will be pulled back by their
        // attract forces.
        d.fx = null; d.fy = null;
      });

    nodeG.filter((d) => d.kind !== 'skill').call(dragBehavior);

    // ── Click → drill in (root and categories) ──────────────
    nodeG.on('click', (event, d) => {
      if (d.kind === 'skill') return;
      event.stopPropagation();
      onCategoryClick?.(d.kind === 'root' ? null : d.label);
    });
    nodeG.on('keydown', (event, d) => {
      if (d.kind === 'skill') return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onCategoryClick?.(d.kind === 'root' ? null : d.label);
      }
    });

    // ── Hover highlight ─────────────────────────────────────
    // Build a set of related ids (the node + neighbors + ancestors
    // via category for skills).
    nodeG
      .on('mouseenter', function (event, d) {
        const related = new Set([d.id]);
        for (const l of links) {
          const sid = (typeof l.source === 'object' ? l.source.id : l.source);
          const tid = (typeof l.target === 'object' ? l.target.id : l.target);
          if (sid === d.id) related.add(tid);
          if (tid === d.id) related.add(sid);
        }
        // For a skill, also include the root
        if (d.kind === 'skill') {
          related.add('root:Skills');
          related.add(`cat:${d.category}`);
        }
        nodeG.transition().duration(150).attr('opacity', (n) =>
          related.has(n.id) ? 1 : 0.22
        );
        linkSel.transition().duration(150).attr('stroke-opacity', (l) => {
          const sid = (typeof l.source === 'object' ? l.source.id : l.source);
          const tid = (typeof l.target === 'object' ? l.target.id : l.target);
          return related.has(sid) && related.has(tid) ? 0.7 : 0.05;
        });
      })
      .on('mouseleave', function () {
        nodeG.transition().duration(200).attr('opacity', 1);
        linkSel.transition().duration(200).attr('stroke-opacity', 0.45);
      });

    // ── Simulation ──────────────────────────────────────────
    // We want ongoing, visible motion. Strategy:
    //   • d3 forces cool the simulation to a stable layout on
    //     first paint (clean ring arrangement).
    //   • The custom `wobbleTick` adds a small per-node sinusoidal
    //     velocity nudge on every frame, giving each node a
    //     unique slow orbit around its target. This is what the
    //     user actually sees as "the nodes are moving".
    //   • When reduced-motion is set, wobble is disabled and the
    //     simulation cools to a clean static layout.
    const sim = forceSimulation(nodes)
      .force('link', forceLink(links).id((d) => d.id).distance(80).strength(0.2))
      .force('charge', forceManyBody().strength(-40))
      .force('collide', forceCollide().radius((d) => d.r + 6))
      .alphaDecay(reduced ? 0.3 : 0.0225)
      .alphaMin(reduced ? 1 : 0.001)
      .alphaTarget(reduced ? 0 : 0.05);

    const clamp = makeBoundaryClamp(W, H, 40);
    // Strong attract (when sim is warm) keeps nodes near ring
    // positions even while wobble pushes them around.
    const ATTRACT_STRENGTH = { root: 0.12, category: 0.18, skill: 0.14 };
    const WOBBLE_AMP = reduced ? 0 : 0.22;
    const startTime = performance.now();

    sim.on('tick', () => {
      // d3 force functions can't easily use `this`; we call our
      // custom attract force directly from the tick handler.
      attractToTargetTick(nodes, ATTRACT_STRENGTH, sim.alpha());
      const t = performance.now() - startTime;
      wobbleTick(nodes, t, WOBBLE_AMP);
      clamp(nodes);
      linkSel
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);
      nodeG.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    return () => sim.stop();
  }, [width, height, reduced, nodes, links, onCategoryClick, themeVariant]);

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{ height }}
      role="presentation"
    >
      <svg
        ref={svgRef}
        width="100%"
        height={height}
        viewBox={`0 0 ${Math.max(width, 1)} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Skills knowledge graph"
        className="block"
      />

      {/* SR-only fallback list — same data, keyboard accessible */}
      <ul className="sr-only">
        <li>
          <button type="button" onClick={() => onCategoryClick?.(null)}>Skills (all)</button>
        </li>
        {Object.entries(
          graphData.nodes
            .filter((n) => n.kind === 'category')
            .reduce((acc, n) => { acc[n.label] = []; return acc; }, {})
        ).map(([category, items]) => (
          <li key={category}>
            <button type="button" onClick={() => onCategoryClick?.(category)}>{category}</button>
            <ul>
              {items.map((s) => <li key={s.id}>{s.label}</li>)}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}