// ============================================================
// Skills.jsx — CATEGORIZED SKILL GRID
//
// HOW IT WORKS:
//   - Reads the "skills" object from data.js
//   - Object.entries() converts { "Category": ["skill1", ...] }
//     into [ ["Category", ["skill1", ...]], ... ]
//   - Each category becomes a card with an icon header + skill chips
//
// HOW TO MODIFY:
//   - Add/remove categories and skills in data.js
//   - To change a category's icon: edit the categoryIcons map below
//   - To change grid columns: edit the grid-cols classes
//     (e.g., lg:grid-cols-2 for 2 columns instead of 3)
// ============================================================

import { skills } from '../data';

// Import icons — one per category
// ← If you add a new category in data.js, import its icon here
// ← and add it to categoryIcons below
import { Workflow, Database, Cloud, ShieldCheck, Server } from 'lucide-react';

// ─── CATEGORY → ICON MAP ───────────────────────────────────
// The key MUST exactly match the category name in data.js
const categoryIcons = {
  "Orchestration": Workflow,
  "Data Engineering": Database,
  "Infrastructure": Cloud,
  "ML Monitoring": ShieldCheck,
  "Backend & APIs": Server,
  // ← Add new ones here when you add categories in data.js
};

export default function Skills() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-50">Technical Skills</h2>
        <p className="text-slate-400 mt-1">Tools and technologies I work with across the MLOps lifecycle.</p>
      </div>

      {/* ─── SKILLS GRID ─────────────────────────────────── */}
      {/* sm:grid-cols-2 = 2 columns on small screens */}
      {/* lg:grid-cols-3 = 3 columns on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(skills).map(([category, items]) => {
          // Look up the icon for this category (fallback: Server)
          const Icon = categoryIcons[category] || Server;

          return (
            <div key={category} className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-6 hover:border-slate-700/60 transition-colors">
              {/* Category header with icon in a green box */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-200">{category}</h3>
              </div>

              {/* Skill chips — flex-wrap means they flow to next line if needed */}
              <div className="flex flex-wrap gap-2">
                {items.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50 hover:border-emerald-500/30 hover:text-emerald-300 transition-colors"
                  >
                    {skill}
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