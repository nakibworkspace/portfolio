// ============================================================
// Education.jsx — DEGREE(S) + LEADERSHIP SECTION
//
// HOW IT WORKS:
//   - Reads "education" and "leadership" arrays from data.js
//   - Shows degree card(s) first, then a leadership subsection
//   - Each degree card shows: icon, title, institution, CGPA, dates
//
// HOW TO MODIFY:
//   - Add/remove degrees in data.js (education array)
//   - Add/remove leadership roles in data.js (leadership array)
// ============================================================

import { education, leadership } from '../data';
import { GraduationCap, Trophy, Calendar, Star } from 'lucide-react';

export default function Education() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-50">Education & Leadership</h2>
        <p className="text-slate-400 mt-1">Academic background and extracurricular leadership.</p>
      </div>

      {/* ─── EDUCATION CARDS ──────────────────────────────── */}
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-6 hover:border-slate-700/60 transition-colors">
            {/* Top row: icon + degree info on left, CGPA + date on right */}
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-50">{edu.degree}</h3>
                  <p className="text-slate-400 text-sm mt-0.5">{edu.institution}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* CGPA — only shown if the field exists in data.js */}
                {edu.cgpa && (
                  <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-semibold">
                    <Star className="w-4 h-4" />
                    {edu.cgpa}
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                  <Calendar className="w-3.5 h-3.5" />
                  {edu.period}
                </div>
              </div>
            </div>

            {/* Thesis/highlights bullets */}
            {edu.highlights && edu.highlights.length > 0 && (
              <ul className="space-y-1.5 mt-3 pl-1">
                {edu.highlights.map((h, i) => (
                  <li key={i} className="text-slate-300 text-sm flex gap-2">
                    <span className="text-emerald-500">▹</span>
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* ─── LEADERSHIP SECTION ──────────────────────────── */}
      {/* Only rendered if there are leadership entries in data.js */}
      {leadership.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-emerald-400" />
            Leadership
          </h3>
          <div className="space-y-4">
            {leadership.map((item, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-6 hover:border-slate-700/60 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="text-base font-semibold text-slate-100">{item.role}</h4>
                    <p className="text-slate-400 text-sm mt-0.5">{item.institution}</p>
                  </div>
                  <span className="text-slate-500 text-sm">{item.period}</span>
                </div>
                <ul className="space-y-1.5 mt-3">
                  {item.points.map((p, i) => (
                    <li key={i} className="text-slate-300 text-sm flex gap-2">
                      <span className="text-emerald-500">▹</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}