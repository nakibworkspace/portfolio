// ============================================================
// Experience.jsx — WORK TIMELINE
//
// HOW IT WORKS:
//   - Reads the "experience" array from data.js
//   - Renders each job as a card on a vertical timeline
//   - The timeline is a thin vertical line with green dots
//
// HOW TO MODIFY:
//   - Add/remove jobs in data.js — this component auto-adapts
//   - To change the timeline color: edit "bg-emerald-500" on the dot
// ============================================================

import { experience } from '../data';
import { Building2, Calendar } from 'lucide-react';

export default function Experience() {
  return (
    <div className="space-y-8">
      {/* Section heading */}
      <div>
        <h2 className="text-2xl font-bold text-slate-50">Professional Experience</h2>
        <p className="text-slate-400 mt-1">Where I've applied MLOps and data engineering in practice.</p>
      </div>

      {/* ─── TIMELINE ──────────────────────────────────── */}
      <div className="relative">
        {/* This div is the vertical line. "absolute" removes it from
            normal flow, "left-4" positions it 16px from left. */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-800" />

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div key={index} className="relative pl-12">
              {/* ─── TIMELINE DOT ────────────────────── */}
              {/* The green circle on the vertical line */}
              <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />

              {/* ─── JOB CARD ────────────────────────── */}
              <div className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-6 hover:border-slate-700/60 transition-colors">
                {/* Top row: title + company on left, date on right */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-50">{exp.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Building2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 text-sm font-medium">{exp.company}</span>
                      {exp.focus && (
                        <span className="text-slate-600 text-xs">· {exp.focus}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </div>
                </div>

                {/* Bullet points */}
                <ul className="space-y-2 mt-4">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex gap-3 text-slate-300 text-sm leading-relaxed">
                      {/* The green arrow bullet */}
                      <span className="text-emerald-500 mt-1.5 shrink-0">▹</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}