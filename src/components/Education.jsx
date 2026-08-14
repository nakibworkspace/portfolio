// ============================================================
// Education.jsx — DEGREES + LEADERSHIP + CURRENT FOCUS
//
// No cards. CGPA intentionally omitted — top PhD admissions
// weight coursework and research fit over GPA at this level.
// "Currently exploring" is the section a PI scans for in 5
// seconds; that's why it's prominent under the degree.
// ============================================================

import { education, leadership } from '../data';
import { GraduationCap, Trophy, Calendar, Compass } from 'lucide-react';

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
                <span className="flex items-center gap-1 text-xs text-fg-mute">
                  <Calendar className="w-3.5 h-3.5" />
                  {edu.period}
                </span>
              </div>
              <p className="mt-1 text-sky-light text-sm">{edu.institution}</p>

              {/* Currently exploring — the high-signal line for PIs */}
              {edu.currentFocus && (
                <div className="mt-4 max-w-2xl">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-sky-light mb-1.5">
                    Currently exploring
                  </p>
                  <p className="text-sm text-fg-dim leading-relaxed">
                    {edu.currentFocus}
                  </p>
                </div>
              )}

              {/* Relevant coursework */}
              {edu.coursework && edu.coursework.length > 0 && (
                <div className="mt-4 max-w-2xl">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-sky-light mb-1.5">
                    Relevant coursework
                  </p>
                  <p className="text-sm text-fg-dim leading-relaxed">
                    {edu.coursework.join(' · ')}
                  </p>
                </div>
              )}

              {edu.highlights && edu.highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5 max-w-2xl">
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

        {/* Standalone "Currently exploring" callout — redundant
            with the per-degree block above but easier to spot
            when scanning the whole section. */}
        {education[0]?.currentFocus && (
          <div className="flex items-start gap-3 max-w-2xl">
            <Compass className="w-4 h-4 mt-0.5 text-accent-text shrink-0" />
            <p className="text-sm text-fg-dim leading-relaxed">
              <span className="text-fg font-medium">Direction of inquiry:</span>{' '}
              {education[0].currentFocus}
            </p>
          </div>
        )}
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
