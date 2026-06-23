// ============================================================
// SkillsMarquee.jsx — INFINITE-SCROLLING SKILLS BANNER
//
// A horizontal marquee that scrolls the user's skills right→left
// indefinitely. Reference style: bold, uppercase, letterspaced
// text with bullet separators (no pill backgrounds).
//
// SVG support:
//   Each item tries to load `/skills/{slug}.svg`. If the file is
//   missing, an `onError` handler hides the <img> and falls back
//   to text. Drop a logo file into public/skills/ and the chip
//   will pick it up automatically on next reload.
//
// Click a chip → drills into the Skills deep-dive via the parent
// `onCategoryClick` callback. Hover pauses the animation.
// ============================================================

import { useMemo } from 'react';
import { skills } from '../data';

// Each category gets a distinct color from the palette so the
// marquee has visual variety, not just red dots everywhere.
const CATEGORY_DOT = {
  'Orchestration':    '#e63946',
  'Data Engineering': '#a8dadc',
  'Infrastructure':   '#457b9d',
  'ML Monitoring':    '#ff6b78',
  'Backend & APIs':   '#f1faee',
};

// Slugify a skill name to a filename (e.g. "Apache Airflow" -> "apache-airflow")
function slugify(s) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Build a long flat list of [category, skill, slug] tuples by
// repeating the source enough times to fill a wide banner.
function buildMarqueeItems() {
  const baseItems = [];
  for (const [category, items] of Object.entries(skills)) {
    for (const skill of items) {
      baseItems.push({
        category,
        skill,
        slug: slugify(skill),
      });
    }
  }
  return Array(4).fill(baseItems).flat();
}

export default function SkillsMarquee({ onCategoryClick }) {
  const items = useMemo(buildMarqueeItems, []);

  // Slow drift — ~140s per copy. Override via the
  // --marquee-duration CSS variable if you want faster/slower.
  const duration = '140s';

  return (
    <div
      className="relative w-full overflow-hidden marquee-mask"
      role="region"
      aria-label="Skills banner — click a skill to explore"
    >
      <div
        className="flex w-max whitespace-nowrap marquee-track hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-scroll var(--marquee-duration, ${duration}) linear infinite`,
        }}
      >
        {items.map((item, i) => (
          <SkillChip
            key={`a-${i}`}
            category={item.category}
            skill={item.skill}
            slug={item.slug}
            onClick={() => onCategoryClick?.(item.category)}
          />
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((item, i) => (
          <SkillChip
            key={`b-${i}`}
            category={item.category}
            skill={item.skill}
            slug={item.slug}
            onClick={() => onCategoryClick?.(item.category)}
          />
        ))}
      </div>
    </div>
  );
}

function SkillChip({ category, skill, slug, onClick }) {
  const dotColor = CATEGORY_DOT[category] || '#a8dadc';
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group inline-flex items-center
        mx-3 sm:mx-5
        transition-opacity
      "
      aria-label={`${skill} — ${category}. Click to explore.`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0 mr-3"
        style={{ backgroundColor: dotColor }}
        aria-hidden="true"
      />
      {/* Logo or text fallback. Hidden on error. */}
      <img
        src={`/skills/${slug}.svg`}
        alt=""
        loading="lazy"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
        className="h-5 w-auto mr-2 hidden-img"
      />
      <span className="marquee-text group-hover:text-accent-text transition-colors">
        {skill}
      </span>
      <span className="marquee-bullet mx-4 sm:mx-6 text-fg-mute select-none" aria-hidden="true">•</span>
    </button>
  );
}