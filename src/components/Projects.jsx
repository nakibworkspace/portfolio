// ============================================================
// Projects.jsx — PROJECTS ONLY (NO RESEARCH)
//
// Flat list, items separated by generous vertical padding (no
// hairline dividers — same convention as Research). Each row
// grows a hair on hover (`hover:scale-[1.01]`) so the projects
// feel tappable without becoming a card surface.
//
// Projects with an `image` field render a 16:9 hero image above
// the title. Projects with a `preview` field render a Preview
// button that navigates to /preview/<slug> so the open is
// refresh-safe and counts as a pageview in Vercel Analytics.
// ============================================================

import { useNavigate } from 'react-router-dom';
import { projects, previewKeyToSlug } from '../data';
import {
  Github, ExternalLink, Lock, Play,
} from 'lucide-react';

export default function Projects() {
  const navigate = useNavigate();

  const openPreview = (previewKey) => {
    const slug = previewKeyToSlug[previewKey];
    if (slug) navigate(`/preview/${slug}`);
  };

  return (
    <div className="space-y-10 max-w-5xl">

      {/* LIST — no hairlines; vertical padding separates the rows.
          Each row lifts on hover: `hover:scale-[1.01]` (a hair
          bigger, ~1%) with the same eased transform used by the
          reduced-motion-safe `.stack-skill` micro-interaction.
          `origin-left` so the growth reads as the row leaning
          toward its own left edge rather than zooming from the
          center, and `will-change-transform` so the compositor
          keeps the scale smooth. */}
      <ul>
        {projects.map((project, index) => (
          <li
            key={index}
            className="py-6 first:pt-2 lift-in"
            // Cascade the rows in. The cap keeps a long list from
            // feeling slow — after the first few, rows land together.
            style={{ animationDelay: `${Math.min(index, 6) * 0.06}s` }}
          >
            {/* Inner wrapper carries the hover-scale. We can't put
                `hover:scale-[1.01]` on the <li> directly because
                `.lift-in` is a CSS *animation* with `forwards`-style
                fill (`animation: ... both`) — its final keyframe
                sets `transform: translateY(0)` and always wins over
                a hover declaration. Isolating the hover transform
                on a child div separates the two transform layers
                so the entrance animation and the hover scale can
                both run. */}
            <div className="group origin-left will-change-transform transition-transform duration-200 ease-out hover:scale-[1.01]">
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
                <div className="flex items-center gap-3 shrink-0 pr-2 sm:pr-4">
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
                  {project.preview && previewKeyToSlug[project.preview] && (
                    <button
                      type="button"
                      onClick={() => openPreview(project.preview)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border border-sky/40 bg-sky/10 text-sky-light hover:bg-sky/20 hover:text-fg transition-[background-color,border-color,color] duration-200 ease-out"
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
