// ============================================================
// Education.jsx — DEGREES + LEADERSHIP (NO CARDS)
//
// Flat list separated by hairline dividers. The graduation cap /
// trophy icons are inline with the text, not in colored boxes.
// ============================================================

import { education, leadership } from '../data';
import { GraduationCap, Trophy, Calendar, Star } from 'lucide-react';

export default function Education() {
  return (
    <div className="space-y-16 max-w-4xl">

      {/* EDUCATION */}
      <div className="space-y-6">
        <h2 className="text-sm uppercase tracking-[0.25em] text-sky-light font-semibold flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          Education
        </h2>

        <ul className="divide-y divide-divider border-t border-divider">
          {education.map((edu, index) => (
            <li key={index} className="py-6 first:pt-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-lg sm:text-xl font-semibold text-fg">{edu.degree}</h3>
                <div className="flex items-center gap-4 text-xs">
                  {edu.cgpa && (
                    <span className="flex items-center gap-1 text-accent-text font-semibold">
                      <Star className="w-3.5 h-3.5" />
                      {edu.cgpa}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-fg-mute">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.period}
                  </span>
                </div>
              </div>
              <p className="mt-1 text-sky-light text-sm">{edu.institution}</p>

              {edu.highlights && edu.highlights.length > 0 && (
                <ul className="mt-3 space-y-1.5 max-w-2xl">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="text-fg-dim text-sm flex gap-2">
                      <span className="text-accent shrink-0">▹</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* LEADERSHIP */}
      {leadership.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-sm uppercase tracking-[0.25em] text-sky-light font-semibold flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Leadership
          </h2>

          <ul className="divide-y divide-divider border-t border-divider">
            {leadership.map((item, index) => (
              <li key={index} className="py-6 first:pt-2">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-base sm:text-lg font-semibold text-fg">{item.role}</h3>
                  <span className="text-xs text-fg-mute">{item.period}</span>
                </div>
                <p className="mt-1 text-sky-light text-sm">{item.institution}</p>

                <ul className="mt-3 space-y-1.5 max-w-2xl">
                  {item.points.map((p, i) => (
                    <li key={i} className="text-fg-dim text-sm flex gap-2">
                      <span className="text-accent shrink-0">▹</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}