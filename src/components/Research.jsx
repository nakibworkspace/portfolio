// ============================================================
// Research.jsx — RESEARCH ITEMS ONLY (NO PROJECTS)
//
// Flat list separated by hairline dividers. Each item shows:
//   - Type + status pill
//   - Title
//   - Description
//   - Tag row
//   - Links row (if any links defined in data.js)
//
// For PhD applications: links usually include a thesis PDF and
// any preprint / publication URLs.
// ============================================================

import { research } from '../data';
import {
  FlaskConical, BookOpen, FileText, Telescope,
  ExternalLink, Microscope,
} from 'lucide-react';

const typeIcons = {
  "Current Research":     FlaskConical,
  "Undergraduate Thesis": BookOpen,
  "Publication":          FileText,
  "Side Interest":        Telescope,
};

// Status pill colors — uses multiple palette colors
const statusClass = (status) =>
  status === 'Ongoing'
    ? 'bg-accent-soft text-accent-text border-accent-border'
    : 'bg-sky/20 text-sky-light border-sky/40';

export default function Research() {
  return (
    <div className="space-y-10 max-w-4xl">

      {/* HEADER */}
      <div className="space-y-3">
        <h2 className="text-sm uppercase tracking-[0.25em] text-sky-light font-semibold flex items-center gap-2">
          <Microscope className="w-4 h-4" />
          Research
        </h2>
        <p className="text-fg-dim text-balance max-w-2xl">
          ML, NLP, and LLM agents applied to software engineering — code generation, code review, program repair, and developer tooling.
        </p>
      </div>

      {/* LIST */}
      <ul className="divide-y divide-divider border-t border-divider">
        {research.map((item, index) => {
          const Icon = typeIcons[item.type] || FlaskConical;
          const hasLinks = Array.isArray(item.links) && item.links.length > 0;

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

              {/* Links — only render if defined */}
              {hasLinks && (
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  {item.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.href || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent-text hover:text-fg transition-colors"
                    >
                      <span aria-hidden="true">↗</span>
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
