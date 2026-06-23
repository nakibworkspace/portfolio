// ============================================================
// CategoryList.jsx — MOBILE FALLBACK FOR SkillsGraph
//
// On screens < sm, the D3 graph is replaced with a flat,
// no-card list of categories. Each category has a colored dot,
// its name, and a row of skill chips. Tapping the category
// name drills into the Skills deep-dive.
// ============================================================

import { skills } from '../data';

const CATEGORY_DOT = {
  'Orchestration':    '#e63946',
  'Data Engineering': '#a8dadc',
  'Infrastructure':   '#457b9d',
  'ML Monitoring':    '#ff6b78',
  'Backend & APIs':   '#f1faee',
};

export default function CategoryList({ onCategoryClick }) {
  return (
    <ul className="divide-y divide-divider border-t border-divider">
      {Object.entries(skills).map(([category, items]) => (
        <li key={category} className="py-5 first:pt-3">
          <button
            type="button"
            onClick={() => onCategoryClick?.(category)}
            className="group flex items-center gap-2 mb-3 text-left"
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: CATEGORY_DOT[category] || '#a8dadc' }}
              aria-hidden="true"
            />
            <h3 className="text-base font-semibold text-fg group-hover:text-sky-light transition-colors">
              {category}
            </h3>
            <span className="text-xs text-fg-mute">({items.length})</span>
          </button>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-sky-light">
            {items.map((skill, i) => (
              <span key={i} className="hover:text-fg transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}