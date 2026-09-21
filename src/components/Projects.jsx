// ============================================================
// Projects.jsx — PROJECTS ONLY (NO RESEARCH)
//
// Flat list separated by hairline dividers. Project cards use
// a grid but each cell is transparent with only a divider on
// hover for visual separation. Projects with an `image` field
// render a 16:9 hero image above the title. Projects with a
// `preview` field render a Preview button that triggers a
// caller-supplied handler.
// ============================================================

import { projects } from '../data';
import {
  Github, ExternalLink, FolderGit2, Lock, Play,
} from 'lucide-react';

export default function Projects({ onPreview }) {
  return (
    <div className="space-y-10 max-w-5xl">

      {/* HEADER */}
      <div className="space-y-3">
        <h2 className="text-sm uppercase tracking-[0.25em] text-sky-light font-semibold flex items-center gap-2">
          <FolderGit2 className="w-4 h-4" />
          Projects
        </h2>
        <p className="text-fg-dim text-balance max-w-2xl">
          Selected work showcasing MLOps, data engineering, and ML systems.
        </p>
      </div>

      {/* LIST */}
      <ul className="divide-y divide-divider border-t border-divider">
        {projects.map((project, index) => (
          <li
            key={index}
            className="group py-6 first:pt-2"
          >
            {/* Small inline thumbnail — for projects that ship a hero */}
            {project.image && (
              <figure className="mb-4 overflow-hidden rounded-md border border-divider bg-bg-elevated max-w-[160px]">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </figure>
            )}

            <div className="flex items-start justify-between gap-3">
              {/* Title + optional scope tag */}
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h3 className="text-base sm:text-lg font-semibold text-fg group-hover:text-accent-text transition-colors">
                  {project.title}
                </h3>
                {project.scope && (
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-sky/40 bg-sky/20 text-sky-light inline-flex items-center gap-1"
                    title={`Scope: ${project.scope}`}
                  >
                    <Lock className="w-2.5 h-2.5" />
                    {project.scope}
                  </span>
                )}
              </div>
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
                {project.preview && onPreview && (
                  <button
                    type="button"
                    onClick={() => onPreview(project.preview)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border border-sky/40 bg-sky/10 text-sky-light hover:bg-sky/20 hover:text-fg transition-colors"
                    aria-label="Open preview gallery"
                  >
                    <Play className="w-3 h-3" />
                    Preview
                  </button>
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
  );
}
