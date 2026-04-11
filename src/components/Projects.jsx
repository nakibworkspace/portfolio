// ============================================================
// Projects.jsx — GITHUB PROJECT CARDS
//
// HOW IT WORKS:
//   - Reads "projects" array from data.js
//   - Renders each project as a card with: title, description,
//     GitHub link icon, optional demo link icon, and tag chips
//   - Cards are in a 2-column grid on medium+ screens
//
// HOW TO MODIFY:
//   - Add/remove projects in data.js
//   - Set demo: "https://..." to show a live demo link
//   - Set demo: null to hide the demo icon
// ============================================================

import { projects } from '../data';
import { Github, ExternalLink } from 'lucide-react';

export default function Projects() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-50">Projects</h2>
        <p className="text-slate-400 mt-1">Selected work showcasing MLOps, data engineering, and ML systems.</p>
      </div>

      {/* ─── PROJECT GRID ────────────────────────────────── */}
      {/* md:grid-cols-2 = 2 columns on medium screens and up */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-6 hover:border-slate-700/60 transition-all group"
          >
            {/* ─── TITLE + LINK ICONS ──────────────────── */}
            <div className="flex items-start justify-between gap-3 mb-3">
              {/* Title turns green on hover (group-hover) */}
              <h3 className="text-base font-semibold text-slate-50 group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 shrink-0">
                {/* GitHub icon — only shown if github URL exists */}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-emerald-400 transition-colors"
                    aria-label="View on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {/* Demo icon — only shown if demo URL exists */}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-emerald-400 transition-colors"
                    aria-label="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* ─── DESCRIPTION ─────────────────────────── */}
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

            {/* ─── TAG CHIPS ───────────────────────────── */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, i) => (
                <span key={i} className="text-xs px-2 py-0.5 rounded bg-slate-800/80 text-slate-500 border border-slate-700/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}