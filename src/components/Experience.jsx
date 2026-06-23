// ============================================================
// Experience.jsx — TIMELINE (NO CARDS)
//
// Each job is a list row separated by dividers, with a left-side
// timeline rail. The card surfaces are gone; rows breathe via
// generous vertical padding and a hairline divider between them.
// ============================================================

import { experience } from '../data';
import { Building2, Calendar } from 'lucide-react';

export default function Experience() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <h2 className="text-sm uppercase tracking-[0.25em] text-sky-light font-semibold">
          Experience
        </h2>
        <p className="text-fg-dim mt-3 text-balance">
          Where I've applied MLOps and data engineering in practice.
        </p>
      </div>

      <div className="relative pl-10">
        {/* Vertical rail */}
        <div className="absolute left-2.5 top-2 bottom-2 w-px bg-divider" aria-hidden="true" />

        <div className="space-y-12">
          {experience.map((exp, index) => (
            <div key={index} className="relative">
              {/* Timeline dot — red with subtle glow */}
              <div
                className="absolute -left-[34px] top-1.5 w-3 h-3 rounded-full bg-accent ring-4 ring-bg"
                style={{ boxShadow: '0 0 12px rgba(230, 57, 70, 0.55)' }}
                aria-hidden="true"
              />

              {/* Row 1: title + period */}
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-lg sm:text-xl font-semibold text-fg">{exp.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-fg-mute">
                  <Calendar className="w-3.5 h-3.5" />
                  {exp.period}
                </div>
              </div>

              {/* Row 2: company + focus */}
              <div className="mt-1 flex items-center gap-2 text-sm">
                <Building2 className="w-3.5 h-3.5 text-sky-light" />
                <span className="text-sky-light font-medium">{exp.company}</span>
                {exp.focus && (
                  <span className="text-fg-mute">· {exp.focus}</span>
                )}
              </div>

              {/* Row 3: bullets (no card — just text) */}
              <ul className="mt-4 space-y-2 max-w-2xl">
                {exp.points.map((point, i) => (
                  <li key={i} className="flex gap-3 text-fg-dim text-sm leading-relaxed">
                    <span className="text-accent mt-1.5 shrink-0">▹</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}