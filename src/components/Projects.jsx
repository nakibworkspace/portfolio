// ============================================================
// Projects.jsx — PROJECTS ONLY (NO RESEARCH)
//
// Flat list, items separated by generous vertical padding (no
// hairline dividers — same convention as Research). Each row
// grows a hair on hover (`hover:scale-[1.01]`) so the projects
// feel tappable without becoming a card surface.
//
// Projects with an `image` field render a 16:9 hero image above
// the title. Projects with a `preview` field render a Preview
// button that navigates to /preview/<slug> so the open is
// refresh-safe and counts as a pageview in Vercel Analytics.
//
// TRACK FILTER — every project declares a `track` in data.js:
//   'industry' → client/industry delivery
//   'research' → self-initiated investigation
//   'both'     → bridges the two
// The filter lets a reader separate "what I shipped for a
// client" from "what I drove myself" without reading every
// description — which is the difference between an industry
// application and a research application to a professor.
// ============================================================

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects, previewKeyToSlug } from '../data';
import {
  Github, ExternalLink, Lock, Play, FlaskConical, Building2, Layers,
} from 'lucide-react';

// Filter definitions — order matters: "All" first so the
// default view is everything.
const FILTERS = [
  { id: 'all',       label: 'All',       icon: Layers },
  { id: 'research',  label: 'Research',  icon: FlaskConical },
  { id: 'industry',  label: 'Industry',  icon: Building2 },
];

// Per-project track marker. 'both' gets its own icon so it
// doesn't read as either one of the other two.
const trackMeta = {
  research: { icon: FlaskConical, label: 'Self-initiated', className: 'border-sky/40 bg-sky/20 text-sky-light' },
  industry: { icon: Building2,    label: 'Industry',      className: 'border-accent-border bg-accent-soft text-accent-text' },
  both:     { icon: Layers,       label: 'Both',          className: 'border-divider bg-transparent text-fg-mute' },
};

export default function Projects() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const openPreview = (previewKey) => {
    const slug = previewKeyToSlug[previewKey];
    if (slug) navigate(`/preview/${slug}`);
  };

  // 'both' counts under both buckets — a project that bridges the
  // tracks is relevant whether you're looking at research or
  // industry work.
  const visible = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((p) => p.track === filter || p.track === 'both');
  }, [filter]);

  return (
    <div className="space-y-10 max-w-5xl">

      {/* TRACK FILTER — three small pills. Styled to match the
          existing `Preview` button so the page has one button
          language rather than two. */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => {
          const Icon = f.icon;
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border transition-[background-color,border-color,color] duration-200 ease-out ${
                active
                  ? 'border-sky/60 bg-sky/20 text-fg'
                  : 'border-sky/30 bg-sky/5 text-sky-light/70 hover:bg-sky/10 hover:text-sky-light'
              }`}
            >
              <Icon className="w-3 h-3" />
              {f.label}
            </button>
          );
        })}
        <span className="ml-auto text-xs text-fg-mute">
          {visible.length} of {projects.length}
        </span>
      </div>

      {/* LIST — no hairlines; vertical padding separates the rows.
          Each row lifts on hover: `hover:scale-[1.01]` (a hair
          bigger, ~1%) with the same eased transform used by the
          reduced-motion-safe `.stack-skill` micro-interaction.
          `origin-left` so the growth reads as the row leaning
          toward its own left edge rather than zooming from the
          center, and `will-change-transform` so the compositor
          keeps the scale smooth. */}
      <ul>
        {visible.map((project, index) => {
          const track = trackMeta[project.track];
          const TrackIcon = track?.icon;
          return (
            <li
              key={project.title}
              className="py-6 first:pt-2 lift-in"
              // Cascade the rows in. The cap keeps a long list from
              // feeling slow — after the first few, rows land together.
              style={{ animationDelay: `${Math.min(index, 6) * 0.06}s` }}
            >
              {/* Inner wrapper carries the hover-scale. We can't put
                  `hover:scale-[1.01]` on the <li> directly because
                  `.lift-in` is a CSS *animation* with `forwards`-style
                  fill (`animation: ... both`) — its final keyframe
                  sets `transform: translateY(0)` and always wins over
                  a hover declaration. Isolating the hover transform
                  on a child div separates the two transform layers
                  so the entrance animation and the hover scale can
                  both run. */}
              <div className="group origin-left will-change-transform transition-transform duration-200 ease-out hover:scale-[1.01]">
                {/* Small inline thumbnail — for projects that ship a hero */}
                {project.image && (
                  <figure className="mb-4 overflow-hidden rounded-md border border-divider bg-bg-elevated max-w-[160px]">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-auto"
                    />
                  </figure>
                )}

                <div className="flex items-start justify-between gap-3">
                  {/* Title + optional track marker + scope tag */}
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="text-base sm:text-lg font-semibold text-fg group-hover:text-accent-text transition-colors">
                      {project.title}
                    </h3>
                    {track && TrackIcon && (
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${track.className}`}
                        title={`Track: ${track.label}`}
                      >
                        <TrackIcon className="w-2.5 h-2.5" />
                        {track.label}
                      </span>
                    )}
                    {project.scope && (
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-sky/40 bg-sky/20 text-sky-light inline-flex items-center gap-1"
                        title={`Scope: ${project.scope}`}
                      >
                        <Lock className="w-2.5 h-2.5" />
                        {project.scope}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0 pr-2 sm:pr-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fg-mute hover:text-accent-text transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fg-mute hover:text-accent-text transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.preview && previewKeyToSlug[project.preview] && (
                      <button
                        type="button"
                        onClick={() => openPreview(project.preview)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border border-sky/40 bg-sky/10 text-sky-light hover:bg-sky/20 hover:text-fg transition-[background-color,border-color,color] duration-200 ease-out"
                        aria-label="Open preview gallery"
                      >
                        <Play className="w-3 h-3" />
                        Preview
                      </button>
                    )}
                  </div>
                </div>

                <p className="mt-2 text-fg-dim text-sm leading-relaxed max-w-2xl">
                  {project.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-sky-light/80">
                  {project.tags.map((tag, i) => (
                    <span key={i}>
                      <span className="text-sky/60">#</span>{tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
