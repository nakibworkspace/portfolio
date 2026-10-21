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
import PixelScatter from './PixelScatter';
import RevealOnScroll from './RevealOnScroll';

export default function Home() {
  const edu = education[0];

  // Letterfall — each character of the name fades up in sequence.
  // Capped at 10 so a long name doesn't push the total past ~600ms;
  // the whole thing has to feel instant, not choreographed.
  const nameChars = personalInfo.name.split('');
  const NAME_STAGGER = 0.045;

  return (
    <section className="relative flex flex-col items-center text-center pt-8 pb-16 sm:pt-12 sm:pb-20">

      {/* Ambient pixel icons — texture, not decoration. Purely
          decorative, behind all content, aria-hidden. */}
      <PixelScatter />

      {/* Everything below sits above the scatter. */}
      <div className="relative z-10 flex flex-col items-center w-full">

      {/* TAGLINE — sky-light */}
      <p className="text-xs uppercase tracking-[0.25em] text-sky-light font-medium lift-in">
        {personalInfo.tagline}
      </p>

      {/* NAME — pixel font, calm. No glow, no shadow layers.
          Letters arrive one at a time; the rule under them draws
          last, once the name has settled. */}
      <h1
        className="mt-5 font-display text-6xl sm:text-7xl md:text-8xl leading-none text-fg"
        aria-label={personalInfo.name}
      >
        {nameChars.map((char, i) => (
          <span
            key={`${char}-${i}`}
            className="inline-block lift-in"
            style={{ animationDelay: `${0.1 + i * NAME_STAGGER}s` }}
            aria-hidden="true"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>

      {/* ACCENT LINE — full palette gradient */}
      <div
        className="mt-6 mx-auto h-px w-32 accent-line-multi accent-grow"
        style={{ animationDelay: `${0.1 + nameChars.length * NAME_STAGGER + 0.1}s` }}
        aria-hidden="true"
      />

      {/* HEADLINE — now defined in data.js */}
      <p
        className="mt-7 max-w-2xl text-balance text-xl sm:text-2xl text-fg font-medium leading-snug lift-in"
        style={{ animationDelay: `${0.1 + nameChars.length * NAME_STAGGER + 0.25}s` }}
      >
        {personalInfo.headline}
      </p>

      {/* META — one line, plain text, no emoji chips */}
      <div
        className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-base text-fg-dim whitespace-nowrap lift-in"
        style={{ animationDelay: `${0.1 + nameChars.length * NAME_STAGGER + 0.35}s` }}
      >
        <span>{personalInfo.role} <span className="text-accent-text">@ {personalInfo.company}</span></span>
        <span className="text-sky-dark" aria-hidden="true">·</span>
        <span>{edu.degree} <span className="text-accent-text">@ {edu.institution.match(/\(([^)]+)\)/)?.[1] || 'CUET'}</span></span>
        <span className="text-sky-dark" aria-hidden="true">·</span>
        <span>{personalInfo.researchDirection}</span>
        <span className="text-sky-dark" aria-hidden="true">·</span>
        <span>{personalInfo.location}</span>
      </div>

      {/* OVERVIEW — body-font blurb about me (pixel font was unreadable at body size) */}
      <div className="mt-8 max-w-2xl mx-auto text-center space-y-3 font-sans text-base sm:text-lg text-fg-dim leading-relaxed">
        {overview.map((para, i) => (
          <p key={i} className="lift-in" style={{ animationDelay: `${0.55 + i * 0.08}s` }}>
            {para}
          </p>
        ))}
      </div>

      {/* STACK — categorized skills with annotation dots.
          Slides up from the bottom edge of the viewport the
          first time it enters the scene (scroll-triggered,
          once-only). The hero above stays calm on first paint;
          the Stack reveal is the landing page's one moving
          beat. Powered by `RevealOnScroll` + the `.stack-rise`
          keyframe.

          LAYOUT — the header row (STACK label + shipped/
          research/learning legend) spans the FULL viewport so
          the label hugs the left screen edge and the legend
          hugs the right, mirroring the Navbar's brand-left /
          tabs-right arrangement. The skill ROWS below stay in
          a `max-w-6xl mx-auto` reading column — they need a
          bounded measure to stay scannable, and stretching
          them to the gutters would strand the category column
          far from its skills.

          ROW TREATMENT — same 10 categories in the same
          order; only the visual treatment changed. Category
          cells are now ALL-CAPS + tracked (text-sm,
          tracking-[0.2em]) so the label reads as a section
          marker at a glance. Skills text drops from text-lg
          to text-base so the row doesn't feel like a
          billboard. Category column widened from 220px to
          280px; gap from 12 to 16 for more air between
          category and skills; row padding from py-5 back to
          py-4 (tighter rows since caps compensate for the
          lost visual weight).

          Top margin is `mt-28 sm:mt-36` — the overview blurb
          above needs real breathing room before the Stack
          arrives, not just a token gap. */}
      <RevealOnScroll
        as="div"
        revealClass="stack-rise"
        className="mt-28 sm:mt-36 w-full text-left"
      >
        {/* Header row — full-bleed. `ml-auto` on the legend
            (rather than `justify-between`, which would split
            the leftover space and land the legend mid-row) is
            what pins it hard right, same trick as the Navbar. */}
        <div className="flex items-baseline gap-6 px-4 sm:px-6 lg:px-8">
          {/* Section label. Oversized + bold + deliberately
              muted (`text-fg-mute/70`) so it reads as a chapter
              marker rather than UI chrome competing with the
              skill names below. Wrapped in its OWN
              `RevealOnScroll` so the `.stack-label` keyframe
              (`stack-label-grow`, grow-from-0.5) only fires on
              scroll-in, independent of the wrapper's own
              `stack-rise` — letting the two sequence: block
              rises first, label settles second. */}
          <RevealOnScroll
            as="span"
            revealClass="stack-label"
            className="inline-block shrink-0"
          >
            <span className="text-3xl sm:text-4xl font-bold uppercase tracking-[0.12em] text-fg-mute/50">
              Stack
            </span>
          </RevealOnScroll>
          <p className="ml-auto shrink-0 text-xs uppercase tracking-[0.25em] text-fg-mute">
            <span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ backgroundColor: markColor.shipped }} aria-hidden="true" />
            shipped
            <span className="mx-2 text-fg-mute">·</span>
            <span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ backgroundColor: markColor.research }} aria-hidden="true" />
            research
            <span className="mx-2 text-fg-mute">·</span>
            <span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ backgroundColor: markColor.learning }} aria-hidden="true" />
            learning
          </p>
        </div>

        {/* Skill rows — centered reading column. Category column
            280px (widened from 220), gap-x 16, skills text-base,
            rows padded py-4 (back from py-5). */}
        <div className="mt-5 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-divider">
          {Object.entries(skills).map(([category, { mark, items }], ci) => {
            const dotColor = markColor[mark] || markColor.shipped;
            return (
              <div
                key={category}
                className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-y-1 md:gap-x-16 py-4 border-b border-divider lift-in"
                style={{ animationDelay: `${Math.min(ci, 5) * 0.07}s` }}
              >
                {/* Category name — all-caps + wide tracking so it
                    reads as a section marker at a glance. */}
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: dotColor }}
                    aria-label={markLabel[mark]}
                  />
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-fg-dim">
                    {category}
                  </span>
                  <span className="sr-only">({markLabel[mark]})</span>
                </div>

                {/* Skills — inline flowing list, text-base.
                    The dot's color carries the mark; the row
                    text stays calm so the legend across the
                    top is the only color that needs to be loud. */}
                <p className="text-base text-fg leading-relaxed">
                  {items.map((skill, i) => (
                    <span key={i}>
                      <span className="stack-skill">{skill}</span>
                      {i < items.length - 1 && <span className="text-fg-mute/70"> · </span>}
                    </span>
                  ))}
                </p>
              </div>
            );
          })}
          </div>
        </div>
      </RevealOnScroll>

      {/* SOCIAL LINKS — text only, no cards */}
      <div className="mt-16 flex items-center gap-8 text-sm text-fg-mute">
        {personalInfo.github && (
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
             className="hover:text-sky-light transition-colors duration-200">GitHub</a>
        )}
        {personalInfo.linkedin && (
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
             className="hover:text-sky-light transition-colors duration-200">LinkedIn</a>
        )}
        <a href={`mailto:${personalInfo.email}`}
           className="hover:text-accent-text transition-colors duration-200">Email</a>
      </div>
      </div>
    </section>
  );
}
