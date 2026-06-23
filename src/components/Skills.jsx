// ============================================================
// Skills.jsx — DEEP-DIVE SKILLS PAGE
//
// Reached by clicking the root or any category node on the home
// knowledge graph. The main attraction is a slow, infinite
// marquee of skill chips scrolling right → left. Hover to pause;
// click a chip to drill back into the home graph focused on that
// category.
//
// The category breakdown below the marquee is an inline list
// (no cards) — dividers + colored dots + a flowing list of skills.
// ============================================================

import { skills } from '../data';
import { ArrowLeft } from 'lucide-react';
import SkillsMarquee from './SkillsMarquee';

const CATEGORY_DOT = {
  'Orchestration':    '#e63946',
  'Data Engineering': '#a8dadc',
  'Infrastructure':   '#457b9d',
  'ML Monitoring':    '#ff6b78',
  'Backend & APIs':   '#f1faee',
};

export default function Skills({ onBack, onCategoryClick }) {
  return (
    <div className="space-y-12 max-w-4xl">

      {/* Back link */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-fg-mute hover:text-accent-text transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to overview
      </button>

      {/* Header */}
      <div>
        <h2 className="text-sm uppercase tracking-[0.25em] text-sky-light font-semibold">
          Technical Skills
        </h2>
        <p className="text-fg-dim mt-3 text-balance max-w-2xl">
          Tools and technologies I work with across the MLOps lifecycle —
          drifting slowly below. Hover to pause, click a chip to return
          to the overview focused on that category.
        </p>
      </div>

      {/* MARQUEE — the centerpiece */}
      <div className="space-y-3">
        <p className="text-[11px] uppercase tracking-[0.25em] text-sky-light">
          Live marquee · slow drift
        </p>
        <SkillsMarquee onCategoryClick={onCategoryClick} />
        <p className="text-[11px] uppercase tracking-[0.25em] text-sky-light">
          Live marquee · slow drift
        </p>
      </div>

      {/* Breakdown — labeled sections (no cards) */}
      <ul className="divide-y divide-sky-dark/30 border-t border-sky-dark/30 mt-8">
        {Object.entries(skills).map(([category, items]) => (
          <li key={category} className="py-6 first:pt-2">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: CATEGORY_DOT[category] || '#a8dadc' }}
                aria-hidden="true"
              />
              <h3 className="text-lg font-semibold text-fg">{category}</h3>
              <span className="text-xs text-fg-mute">({items.length})</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-sky-light">
              {items.map((skill, i) => (
                <span key={i} className="hover:text-fg transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}