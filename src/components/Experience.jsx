// ============================================================
// Experience.jsx — TIMELINE (NO CARDS)
//
// Each job is a list row separated by dividers, with a left-side
// timeline rail. The card surfaces are gone; rows breathe via
// generous vertical padding and a hairline divider between them.
// ============================================================

import { experience } from '../data';
import { Building2, Calendar } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function Experience() {
  // Header ("EXPERIENCE" + tagline) is rendered by App.jsx as a
  // sibling of <main> so it can sit flush with the navbar brand
  // on the left edge of the viewport — outside the centered
  // max-w-6xl column. This component renders only the timeline
  // body, which lives inside that centered column as normal.
  return (
    <div className="space-y-10 max-w-6xl">
        <div className="relative pl-10">
          {/* Vertical rail */}
          <div className="absolute left-2.5 top-2 bottom-2 w-px bg-divider" aria-hidden="true" />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <RevealOnScroll key={index} className="relative" delay={Math.min(index, 4) * 0.08}>
                {/* Timeline dot — red with subtle glow */}
                <div
                  className="absolute -left-[34px] top-1.5 w-3 h-3 rounded-full bg-accent ring-4 ring-bg timeline-dot"
                  style={{ boxShadow: '0 0 12px rgba(230, 57, 70, 0.55)' }}
                  aria-hidden="true"
                />

                {/* Row 1: title (+ optional scope pill) + period */}
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-xl sm:text-2xl font-semibold text-fg">{exp.title}</h3>
                    {exp.scope && (
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-sky/40 bg-sky/20 text-sky-light"
                        title={`Scope: ${exp.scope}`}
                      >
                        {exp.scope}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-fg-mute">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </div>
                </div>

                {/* Row 2: company + focus */}
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Building2 className="w-3.5 h-3.5 text-sky-light" />
                  <span className="text-sky-light font-medium">{exp.company}</span>
                  {exp.focus && (
                    <span className="text-fg-mute">· {exp.focus}</span>
                  )}
                </div>

                {/* Row 2.5: one-line problem framing (optional) */}
                {exp.problem && (
                  <p className="mt-4 max-w-3xl text-sm italic text-fg-dim leading-relaxed">
                    {exp.problem}
                  </p>
                )}

                {/* Row 3: bullets (no card — just text).
                    Each point can be a plain string OR an object
                    { text, clientPoc? } — if clientPoc is set, a
                    small sub-label renders above the bullet. */}
                <ul className="mt-6 space-y-5 max-w-5xl">
                  {exp.points.map((point, i) => {
                    // Normalize both shapes
                    const isObj = typeof point === 'object' && point !== null;
                    const text = isObj ? point.text : point;
                    const clientPoc = isObj ? point.clientPoc : null;
                    return (
                      <li key={i} className="text-fg-dim text-base leading-relaxed">
                        {clientPoc && (
                          <p className="text-sm uppercase tracking-[0.15em] text-sky-light font-medium mb-2.5 flex items-center gap-2">
                            <span
                              className="inline-block w-2 h-2 rounded-full bg-accent shrink-0"
                              aria-hidden="true"
                            />
                            {clientPoc}
                          </p>
                        )}
                        <div className="flex gap-2">
                          <span className="text-accent mt-1 shrink-0 text-sm">▹</span>
                          <span>{text}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
  );
}