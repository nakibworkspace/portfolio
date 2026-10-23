// ============================================================
// Research.jsx — PUBLICATIONS + ACTIVE INVESTIGATIONS
//
// The old version was a single flat list of three "research"
// items that mixed a thesis, an experiment, and two side
// interests into one undifferentiated stream. A professor needs
// them separated, because they carry very different weight:
//
//   SECTION 1 — Publications & Manuscripts
//     Work that was written up and submitted. The heaviest
//     signal on the page.
//
//   SECTION 2 — Active Investigations
//     Self-initiated, ongoing work. Each names the question and
//     the approach, and quotes findings ONLY once real numbers
//     exist.
//
// Both sections use the same flat-list convention as the rest of
// the site: generous vertical padding, no hairlines between
// items, no card surfaces.
//
// HONESTY RULES baked into this file:
//   • `findings: null` renders NOTHING. No placeholder, no
//     "results forthcoming" filler. The silence is deliberate.
//   • Status pills are colour-coded by how strong the claim is
//     (see statusClass below).
// ============================================================

import { useNavigate } from 'react-router-dom';
import { publications, investigations } from '../data';
import {
  FlaskConical, BookOpen, FileText, Telescope, Presentation,
  ScrollText, ExternalLink, ArrowRight, Calendar,
} from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const typeIcons = {
  "Manuscript":      FileText,
  "Conference Paper": Presentation,
  "Journal Article": BookOpen,
  "Preprint":        ScrollText,
};

// ─── STATUS PILLS ─────────────────────────────────────────
// `Under Review` is the strongest claim in this set — the
// manuscript has actually been submitted — so it gets the
// accent treatment. `In Progress` gets the sky treatment.
// `Completed` and `Exploring` are muted: they assert less.
//
// `Manuscript in Preparation` sits between the two: the work
// is real and substantial enough to be worth writing up as a
// paper, but it has NOT been submitted. It gets the sky
// treatment rather than the accent one, because the accent is
// reserved for claims that have been through a review process.
// A reader scanning the pills can tell at a glance which items
// have actually been submitted.
const statusClass = (status) => {
  if (status === 'Under Review' || status === 'Published' || status === 'Accepted') {
    return 'bg-accent-soft text-accent-text border-accent-border';
  }
  if (status === 'In Progress' || status === 'Preprint' || status === 'Manuscript in Preparation') {
    return 'bg-sky/20 text-sky-light border-sky/40';
  }
  return 'bg-transparent text-fg-mute border-divider';
};

// ─── PUBLICATION ROW ──────────────────────────────────────
function PublicationRow({ pub, index }) {
  const Icon = typeIcons[pub.type] || FileText;
  const hasLinks = Array.isArray(pub.links) && pub.links.length > 0;

  return (
    <RevealOnScroll
      as="li"
      id={pub.id}
      className="py-6 first:pt-2"
      delay={Math.min(index, 5) * 0.07}
    >
      {/* Header row: type · status */}
      <div className="flex flex-wrap items-center gap-3">
        <Icon className="w-4 h-4 text-sky-light" />
        <span className="text-sm font-medium text-fg-dim">{pub.type}</span>
        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusClass(pub.status)}`}>
          {pub.status}
        </span>
        <span className="flex items-center gap-1 text-xs text-fg-mute">
          <Calendar className="w-3.5 h-3.5" />
          {pub.year}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-2 text-lg sm:text-xl font-semibold text-fg">
        {pub.title}
      </h3>

      {/* Authors + venue */}
      <p className="mt-1 text-sm text-sky-light">{pub.authors}</p>
      <p className="mt-1 text-sm text-fg-mute">{pub.venue}</p>

      {/* Abstract */}
      <p className="mt-3 text-fg-dim text-sm leading-relaxed max-w-2xl">
        {pub.abstract}
      </p>

      {/* Note — the honest framing of what this item is today */}
      {pub.note && (
        <p className="mt-2 text-fg-mute text-sm italic leading-relaxed max-w-2xl">
          {pub.note}
        </p>
      )}

      {/* Links — only render if defined */}
      {hasLinks && (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {pub.links.map((link, i) => (
            <a
              key={i}
              href={link.href || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent-text hover:text-fg transition-colors"
            >
              <span aria-hidden="true">↗</span>
              <span>{link.label}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      )}
    </RevealOnScroll>
  );
}

// ─── INVESTIGATION ROW ────────────────────────────────────
function InvestigationRow({ inv, index }) {
  const hasLinks = Array.isArray(inv.links) && inv.links.length > 0;

  // `findings` may be a string or an array of strings. `null`
  // means no results yet — and renders nothing at all.
  const findings = inv.findings
    ? (Array.isArray(inv.findings) ? inv.findings : [inv.findings])
    : null;

  return (
    <RevealOnScroll
      as="li"
      id={inv.id}
      className="py-6 first:pt-2"
      delay={Math.min(index, 5) * 0.07}
    >
      {/* Header row: status · period */}
      <div className="flex flex-wrap items-center gap-3">
        <FlaskConical className="w-4 h-4 text-sky-light" />
        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusClass(inv.status)}`}>
          {inv.status}
        </span>
        <span className="flex items-center gap-1 text-xs text-fg-mute">
          <Calendar className="w-3.5 h-3.5" />
          {inv.period}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-2 text-lg sm:text-xl font-semibold text-fg">
        {inv.title}
      </h3>

      {/* Question — the heart of an investigation. */}
      <div className="mt-3 max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.25em] text-sky-light mb-1.5">
          Question
        </p>
        <p className="text-fg text-sm leading-relaxed italic">
          {inv.question}
        </p>
      </div>

      {/* Approach */}
      <div className="mt-4 max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.25em] text-sky-light mb-1.5">
          Approach
        </p>
        <p className="text-fg-dim text-sm leading-relaxed">
          {inv.approach}
        </p>
      </div>

      {/* Findings — ONLY rendered when real results exist. */}
      {findings && (
        <div className="mt-4 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-accent-text mb-1.5">
            Findings
          </p>
          <ul className="space-y-1.5">
            {findings.map((f, i) => (
              <li key={i} className="text-fg-dim text-sm flex gap-2">
                <span className="text-accent shrink-0">▹</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-sky-light/80">
        {inv.tags.map((tag, i) => (
          <span key={i}>
            <span className="text-sky/60">#</span>{tag}
          </span>
        ))}
      </div>

      {/* Links */}
      {hasLinks && (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {inv.links.map((link, i) => (
            <a
              key={i}
              href={link.href || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent-text hover:text-fg transition-colors"
            >
              <span aria-hidden="true">↗</span>
              <span>{link.label}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      )}
    </RevealOnScroll>
  );
}

export default function Research() {
  const navigate = useNavigate();

  // `hidden` entries are reserved slots (e.g. the GPU-kernel
  // study) that ship only once there is a real artifact behind
  // them. They never render.
  const visibleInvestigations = investigations.filter((i) => !i.hidden);

  return (
    <div className="space-y-16 max-w-4xl">

      {/* SECTION 1 — PUBLICATIONS & MANUSCRIPTS */}
      {publications.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-[0.25em] text-sky-light font-semibold">
            Publications &amp; Manuscripts
          </h2>
          <ul>
            {publications.map((pub, index) => (
              <PublicationRow key={pub.id || pub.title} pub={pub} index={index} />
            ))}
          </ul>
        </div>
      )}

      {/* SECTION 2 — INVESTIGATIONS
          Grouped by status rather than dumped under one heading.

          The single flat "Active Investigations" list was a lie of
          omission: it contained a `Completed` project (MiniTorch)
          and a `Manuscript in Preparation` paper, neither of which
          is an active investigation. A reader scanning the heading
          then hitting "Completed" has to work out what that means.

          Four groups, in the order a reviewer wants them:
            1. In Progress   — the live research programme
            2. Manuscript in Preparation — work being written up
            3. Completed     — finished, with results
            4. Exploring     — read and prototyped, no commitment

          Each group renders only if it has members, so adding or
          removing an investigation never leaves an empty heading.
          The order is fixed by this list, not by the order of the
          data file, because the data file's order is editorial
          (newest first) and would scramble the reading order. */}
      {(() => {
        const GROUPS = [
          { status: 'In Progress', heading: 'In Progress', sub: 'The live research programme' },
          { status: 'Manuscript in Preparation', heading: 'Manuscripts in Preparation', sub: 'Completed work being written up as papers' },
          { status: 'Completed', heading: 'Completed', sub: 'Finished, with results' },
          { status: 'Exploring', heading: 'Exploring', sub: 'Read and prototyped, no commitment' },
        ];

        // The reveal delay runs continuously across the groups
        // rather than restarting at each one, so the whole page
        // cascades in as a single sequence instead of four
        // separate bursts.
        let rowIndex = 0;

        return GROUPS.map((group) => {
          const rows = visibleInvestigations.filter((i) => i.status === group.status);
          if (rows.length === 0) return null;
          return (
            <div key={group.status} className="space-y-4">
              <div>
                <h2 className="text-sm uppercase tracking-[0.25em] text-sky-light font-semibold">
                  {group.heading}
                </h2>
                <p className="mt-1 text-xs text-fg-mute">{group.sub}</p>
              </div>
              <ul>
                {rows.map((inv) => (
                  <InvestigationRow key={inv.id} inv={inv} index={rowIndex++} />
                ))}
              </ul>
            </div>
          );
        });
      })()}

      {/* SECTION 3 — POINTER TO THE AGENDA
          This is where the industry→research bridge lives. The
          link is here rather than in a nav tab so the tab bar
          doesn't grow (it already wraps on mobile). */}
      <RevealOnScroll
        as="div"
        className="pt-2 border-t border-divider"
        delay={0.1}
      >
        <button
          type="button"
          onClick={() => navigate('/research/agenda')}
          className="group inline-flex items-center gap-2 text-sm text-sky-light hover:text-fg transition-colors duration-200"
        >
          <span>Where my industry work feeds these questions</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </RevealOnScroll>
    </div>
  );
}
