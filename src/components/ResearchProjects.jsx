// ============================================================
// ResearchProjects.jsx — RESEARCH + PROJECTS (NO CARDS)
//
// Both sections are flat lists separated by hairline dividers.
// Project cards use a grid but each cell is transparent with only
// a divider on hover for visual separation. Projects with an
// `image` field render a 16:9 hero image above the title.
// ============================================================

import { research, projects } from '../data';
import {
  FlaskConical, BookOpen, FileText,
  Github, ExternalLink, Microscope, FolderGit2,
} from 'lucide-react';

const typeIcons = {
  "Current Research":     FlaskConical,
  "Undergraduate Thesis": BookOpen,
  "Publication":          FileText,
};

// Status pill colors — uses multiple palette colors
const statusClass = (status) =>
  status === 'Ongoing'
    ? 'bg-accent-soft text-accent-text border-accent-border'
    : 'bg-sky/20 text-sky-light border-sky/40';

export default function ResearchProjects() {
  return (
    <div className="space-y-16 max-w-5xl">

      {/* ─── RESEARCH ──────────────────────────────────────── */}
      <div className="space-y-6">
        <h2 className="text-sm uppercase tracking-[0.25em] text-sky-light font-semibold flex items-center gap-2">
          <Microscope className="w-4 h-4" />
          Research
        </h2>
        <p className="text-fg-dim text-balance max-w-2xl">
          Academic work at the intersection of neural methods, language, and vision.
        </p>

        <ul className="divide-y divide-divider border-t border-divider">
          {research.map((item, index) => {
            const Icon = typeIcons[item.type] || FlaskConical;
            return (
              <li key={index} className="py-6 first:pt-2">
                {/* Header row: type · status */}
                <div className="flex flex-wrap items-center gap-3">
                  <Icon className="w-4 h-4 text-sky-light" />
                  <span className="text-sm font-medium text-fg-dim">{item.type}</span>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusClass(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-2 text-lg sm:text-xl font-semibold text-fg">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-fg-dim text-sm leading-relaxed max-w-2xl">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-sky-light/80">
                  {item.tags.map((tag, i) => (
                    <span key={i}>
                      <span className="text-sky/60">#</span>{tag}
                    </span>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ─── PROJECTS ──────────────────────────────────────── */}
      <div className="space-y-6">
        <h2 className="text-sm uppercase tracking-[0.25em] text-sky-light font-semibold flex items-center gap-2">
          <FolderGit2 className="w-4 h-4" />
          Projects
        </h2>
        <p className="text-fg-dim text-balance max-w-2xl">
          Selected work showcasing MLOps, data engineering, and ML systems.
        </p>

        <ul className="divide-y divide-divider border-t border-divider">
          {projects.map((project, index) => (
            <li
              key={index}
              className="group py-6 first:pt-2"
            >
              {/* Optional hero image */}
              {project.image && (
                <figure className="mb-4 overflow-hidden rounded-lg border border-divider bg-bg-elevated">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full max-h-[280px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </figure>
              )}

              <div className="flex items-start justify-between gap-3">
                {/* Title turns accent on hover */}
                <h3 className="text-base sm:text-lg font-semibold text-fg group-hover:text-accent-text transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3 shrink-0">
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}