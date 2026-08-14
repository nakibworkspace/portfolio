// ============================================================
// Home.jsx — EDITORIAL LANDING
//
// Layout (top → bottom):
//   1. Tagline  (small, uppercase, sky-light)
//   2. Name     (large, jersey-10 pixel font — NO fire glow)
//   3. Multi-color accent line
//   4. Headline (real, now defined in data.js)
//   5. One-line plain-text meta (no emoji chips)
//   6. Overview blurb (jersey-10)
//   7. Stack — categorized skills list with annotation dots
//      (shipped / research / learning) — scannable, no JS
//   8. Social links (GitHub, LinkedIn, Email)
//
// All colors are theme tokens — works in both dark and light.
// ============================================================

import { personalInfo, education, overview, skills, markColor, markLabel } from '../data';

export default function Home() {
  const edu = education[0];

  return (
    <section className="flex flex-col items-center text-center pt-8 pb-16 sm:pt-12 sm:pb-20">

      {/* TAGLINE — sky-light */}
      <p className="text-xs uppercase tracking-[0.25em] text-sky-light font-medium">
        {personalInfo.tagline}
      </p>

      {/* NAME — pixel font, calm. No glow, no shadow layers. */}
      <h1 className="mt-5 font-display text-6xl sm:text-7xl md:text-8xl leading-none text-fg">
        {personalInfo.name}
      </h1>

      {/* ACCENT LINE — full palette gradient */}
      <div className="mt-6 mx-auto h-px w-32 accent-line-multi" aria-hidden="true" />

      {/* HEADLINE — now defined in data.js */}
      <p className="mt-7 max-w-xl text-balance text-lg sm:text-xl text-fg-dim leading-relaxed">
        {personalInfo.headline}
      </p>

      {/* META — one line, plain text, no emoji chips */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-fg-mute whitespace-nowrap">
        <span>{personalInfo.role} <span className="text-accent-text">@ {personalInfo.company}</span></span>
        <span className="text-sky-dark" aria-hidden="true">·</span>
        <span>{edu.degree}</span>
        <span className="text-sky-dark" aria-hidden="true">·</span>
        <span>{personalInfo.researchDirection}</span>
        <span className="text-sky-dark" aria-hidden="true">·</span>
        <span>{personalInfo.location}</span>
      </div>

      {/* OVERVIEW — pixel-font blurb about me */}
      <div className="mt-8 max-w-2xl mx-auto text-center space-y-2 font-display text-sm sm:text-base text-fg-dim leading-snug">
        {overview.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* STACK — categorized skills with annotation dots */}
      <div className="mt-16 sm:mt-20 w-full max-w-5xl mx-auto text-left">
        <div className="flex items-baseline justify-between">
          <p className="text-[11px] uppercase tracking-[0.25em] text-sky-light">
            Stack
          </p>
          <p className="text-[11px] uppercase tracking-[0.25em] text-fg-mute">
            <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle" style={{ backgroundColor: markColor.shipped }} aria-hidden="true" />
            shipped
            <span className="mx-2 text-fg-mute">·</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle" style={{ backgroundColor: markColor.research }} aria-hidden="true" />
            research
            <span className="mx-2 text-fg-mute">·</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle" style={{ backgroundColor: markColor.learning }} aria-hidden="true" />
            learning
          </p>
        </div>

        <div className="mt-4 border-t border-divider">
          {Object.entries(skills).map(([category, { mark, items }]) => {
            const dotColor = markColor[mark] || markColor.shipped;
            return (
              <div
                key={category}
                className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-y-1 md:gap-x-8 py-4 border-b border-divider"
              >
                {/* Category name */}
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: dotColor }}
                    aria-label={markLabel[mark]}
                  />
                  <span className="text-sm font-semibold text-fg">
                    {category}
                  </span>
                  <span className="sr-only">({markLabel[mark]})</span>
                </div>

                {/* Skills — inline flowing list */}
                <p className="text-sm text-fg-dim leading-relaxed">
                  {items.map((skill, i) => (
                    <span key={i}>
                      <span className="text-fg-mute">{skill}</span>
                      {i < items.length - 1 && <span className="text-fg-mute/60"> · </span>}
                    </span>
                  ))}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* SOCIAL LINKS — text only, no cards */}
      <div className="mt-16 flex items-center gap-8 text-sm text-fg-mute">
        {personalInfo.github && (
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
             className="hover:text-sky-light transition-colors">GitHub</a>
        )}
        {personalInfo.linkedin && (
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
             className="hover:text-sky-light transition-colors">LinkedIn</a>
        )}
        <a href={`mailto:${personalInfo.email}`}
           className="hover:text-accent-text transition-colors">Email</a>
      </div>
    </section>
  );
}
