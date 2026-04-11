// ============================================================
// Research.jsx — RESEARCH & THESIS CARDS
//
// HOW IT WORKS:
//   - Reads "research" array from data.js
//   - Each item becomes a card with a type badge, status pill,
//     description, and tag chips
//
// HOW TO MODIFY:
//   - Add/remove research items in data.js
//   - To change the status pill color: edit the ternary inside
//     the className (look for "item.status === 'Ongoing'")
//   - To add a new type icon: add a new entry to typeIcons below
// ============================================================

import { research } from '../data';
import { FlaskConical, BookOpen, FileText } from 'lucide-react';

// ─── TYPE → ICON MAP ───────────────────────────────────────
// When research.type matches a key here, that icon is shown.
// To add a new type, import the icon above and add a line here.
const typeIcons = {
  "Current Research": FlaskConical,
  "Undergraduate Thesis": BookOpen,
  "Publication": FileText,   // example for future use
};

export default function Research() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-50">Research & Thesis</h2>
        <p className="text-slate-400 mt-1">Exploring the intersection of neural methods, language, and vision.</p>
      </div>

      <div className="space-y-6">
        {research.map((item, index) => {
          // Look up the icon for this research type (fallback: FlaskConical)
          const Icon = typeIcons[item.type] || FlaskConical;

          return (
            <div key={index} className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-6 hover:border-slate-700/60 transition-colors">
              {/* ─── TYPE BADGE + STATUS PILL ──────────── */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-slate-400">{item.type}</span>
                </div>
                {/* Status pill — green for "Ongoing", gray for everything else */}
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                  item.status === 'Ongoing'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {item.status}
                </span>
              </div>

              {/* ─── TITLE ────────────────────────────── */}
              <h3 className="text-lg font-semibold text-slate-50 mb-2">{item.title}</h3>

              {/* ─── DESCRIPTION ──────────────────────── */}
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{item.description}</p>

              {/* ─── TAG CHIPS ────────────────────────── */}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}