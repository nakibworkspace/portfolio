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
//   7. RESEARCH STRIP — one compact block: focus line, manuscript
//      status, active investigations, and links out
//   8. Stack — categorized skills list with annotation dots
//      (research / shipped / working) — scannable, no JS
//   9. Social links (GitHub, LinkedIn, Email)
//
// MOTION — blocks 7 and 8 share one arrival treatment so the
// page reads as a single continuous scroll rather than two
// differently-animated sections: the block rises (`stack-rise`),
// the section title grows from 0.5× (`stack-label`), and the
// rows fade up in sequence. The keyframes live in index.css and
// are neutralised under `prefers-reduced-motion`.
//
// DESIGN NOTE — this page is deliberately NOT growing. An earlier
// plan floated a dual-track strip, a bridge preview, and a
// publications strip as three separate blocks; that would have
// turned the landing page into a wall of text. All three
// collapsed into ONE compact research strip below the overview.
// The detail lives on /research and /research/agenda, where
// there is room for it.
//
// All colors are theme tokens — works in both dark and light.
// ============================================================

import { useNavigate } from 'react-router-dom';
import {
  personalInfo, education, overview, skills, markColor, markLabel,
  researchStatement, publications, investigations,
} from '../data';
import PixelScatter from './PixelScatter';
import RevealOnScroll from './RevealOnScroll';

export default function Home() {
  const edu = education[0];
  const navigate = useNavigate();

  // Letterfall — each character of the name fades up in sequence.
  // Capped at 10 so a long name doesn't push the total past ~600ms;
  // the whole thing has to feel instant, not choreographed.
  const nameChars = personalInfo.name.split('');
  const NAME_STAGGER = 0.045;

  // The manuscript line reads from the data, never from a
  // hardcoded string — so flipping `publications[0].status` in
  // data.js also updates the homepage. A hardcoded "under review"
  // here would be a claim that could silently drift out of sync
  // with the truth.
  const pub = publications[0];
  const activeCount = investigations.filter(
    (i) => !i.hidden && i.status === 'In Progress'
  ).length;

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

      {/* META — one line on desktop, wraps to two or three on a
          phone. Plain text, no emoji chips.

          The `whitespace-nowrap` that used to sit here was
          actively harmful: on a flex container it makes every
          child inline-level and forms one unbreakable line box,
          which made the adjacent `flex-wrap` inert. The line is
          ~168 characters (~1430px), so it overflowed the viewport
          at EVERY width — 375px, 768px, and even on a 1440px
          desktop where the reading column is only 1152px. The
          body hides the resulting scrollbar, so the overflow was
          invisible: the tail of the line was simply clipped away.

          Without the nowrap, `flex-wrap` does what it says and
          the segments stack cleanly at narrow widths. Each
          segment stays unbroken on its own (they are short).

          The `·` separators are bound to the segment that FOLLOWS
          them rather than sitting as standalone flex items.
          As standalone items a separator could land at the start
          of a wrapped line, reading as a stray bullet; bound to
          the following segment, it always leads its segment and
          the two always wrap together. */}
      <div
        className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-base text-fg-dim lift-in"
        style={{ animationDelay: `${0.1 + nameChars.length * NAME_STAGGER + 0.35}s` }}
      >
        <span>{personalInfo.role} <span className="text-accent-text">@ {personalInfo.company}</span></span>
        <span className="flex items-center gap-3">
          <span className="text-sky-dark" aria-hidden="true">·</span>
          <span>{edu.degree} <span className="text-accent-text">@ {edu.institution.match(/\(([^)]+)\)/)?.[1] || 'CUET'}</span></span>
        </span>
        <span className="flex items-center gap-3">
          <span className="text-sky-dark" aria-hidden="true">·</span>
          <span>{personalInfo.researchDirection}</span>
        </span>
        <span className="flex items-center gap-3">
          <span className="text-sky-dark" aria-hidden="true">·</span>
          <span>{personalInfo.location}</span>
        </span>
      </div>

      {/* OVERVIEW — body-font blurb about me (pixel font was unreadable at body size) */}
      <div className="mt-8 max-w-2xl mx-auto text-center space-y-3 font-sans text-base sm:text-lg text-fg-dim leading-relaxed">
        {overview.map((para, i) => (
          <p key={i} className="lift-in" style={{ animationDelay: `${0.55 + i * 0.08}s` }}>
            {para}
          </p>
        ))}
      </div>

      {/* RESEARCH STRIP — the ONE new block on the homepage.
          It answers "does this person do research?" in a single
          glance without turning the landing page into a wall.

          Three short lines, no cards, no tables, no third
          paragraph — the whole point is that it stays compact:
            1. the research focus (from researchStatement.summary)
            2. the manuscript status (from publications[0])
            3. what the active investigations are

          Plus two links out: the agenda page where the
          industry→research bridge lives, and the full research
          index.

          The strip reuses the Stack block's treatment (uppercase
          tracked label, hairline dividers, `max-w-6xl` column) so
          it reads as a sibling section rather than a new visual
          language bolted onto the page.

          MOTION — deliberately matched to the Stack's, so the two
          blocks arrive the same way and the page reads as one
          continuous scroll rather than two differently-animated
          sections. Three layers:
            1. wrapper `stack-rise` — the block lifts 80px
            2. label `stack-label` — grows from 0.5× scale
            3. the three lines — staggered `lift-in`
          Because the label is wrapped in its OWN `RevealOnScroll`,
          the grow keyframe fires independently of the wrapper's
          rise, so the two sequence: block rises first, title
          settles second. */}
      <RevealOnScroll
        as="div"
        revealClass="stack-rise"
        className="mt-16 sm:mt-20 w-full text-left"
      >
        {/* Header row — full-bleed, label left / links right.
            Same `ml-auto` pinning trick as the Stack header and
            the Navbar. */}
        <div className="flex items-baseline gap-6 px-4 sm:px-6 lg:px-8">
          {/* Section label — its own RevealOnScroll so the
              `stack-label` grow fires on its own beat, exactly
              as the Stack's does. */}
          <RevealOnScroll
            as="span"
            revealClass="stack-label"
            className="inline-block shrink-0"
          >
            <span className="text-3xl sm:text-4xl font-bold uppercase tracking-[0.12em] text-fg-mute/50">
              Research
            </span>
          </RevealOnScroll>
          <div className="ml-auto flex items-baseline gap-5 text-xs uppercase tracking-[0.25em]">
            <button
              type="button"
              onClick={() => navigate('/research/agenda')}
              className="text-fg-mute hover:text-fg transition-colors duration-200"
            >
              Agenda
            </button>
            <button
              type="button"
              onClick={() => navigate('/research')}
              className="text-sky-light hover:text-fg transition-colors duration-200"
            >
              See all →
            </button>
          </div>
        </div>

        <div className="mt-5 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-divider">
            {/* The three lines. Each is its OWN `RevealOnScroll`
                rather than a bare `lift-in` class, and that
                distinction matters: a bare `lift-in` animates on
                MOUNT, so it would play out behind the hidden
                wrapper and never be seen. Wrapping each line
                means it reveals when it actually scrolls into
                view, staggered by the `delay` prop so the three
                arrive in order rather than all at once.

                The Stack's rows use the bare-class approach, which
                is why its per-row stagger is not perceptible —
                the block's `stack-rise` is the motion you actually
                see there. Here the lines are the content, so they
                are given the real thing. */}
            <RevealOnScroll as="div" revealClass="lift-in" delay={0.1}>
              <p className="py-4 text-base text-fg leading-relaxed max-w-3xl">
                {researchStatement.summary}
              </p>
            </RevealOnScroll>

            {/* Line 2 — the manuscript status. The claim is read
                off the data so it can never drift from the truth
                recorded in publications[0]. */}
            <RevealOnScroll as="div" revealClass="lift-in" delay={0.17}>
              <p className="py-4 text-sm text-fg-dim leading-relaxed max-w-3xl border-t border-divider">
                <span className="text-fg font-medium">{pub.status}</span>: {pub.title} ({pub.authors}).
              </p>
            </RevealOnScroll>

            {/* Line 3 — what the active investigations are. */}
            <RevealOnScroll as="div" revealClass="lift-in" delay={0.24}>
              <p className="py-4 text-sm text-fg-dim leading-relaxed max-w-3xl border-t border-divider">
                <span className="text-fg font-medium">{activeCount} active investigations</span>{' '}
                in preference optimization (LoRA/QLoRA, DPO), inference efficiency (prefill/decode, KV cache), and evaluation &amp; safety for code-executing LLM agents.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </RevealOnScroll>

      {/* STACK — categorized skills with annotation dots.
          Slides up from the bottom edge of the viewport the
          first time it enters the scene (scroll-triggered,
          once-only). The hero above stays calm on first paint.
          Powered by `RevealOnScroll` + the `.stack-rise`
          keyframe, shared with the Research strip above so both
          blocks arrive the same way.

          LAYOUT — the header row (STACK label + the
          research/shipped/working legend) spans the FULL viewport
          so the label hugs the left screen edge and the legend
          hugs the right, mirroring the Navbar's brand-left /
          tabs-right arrangement. The skill ROWS below stay in
          a `max-w-6xl mx-auto` reading column — they need a
          bounded measure to stay scannable, and stretching
          them to the gutters would strand the category column
          far from its skills.

          ORDER — research categories come first (the data file
          controls the order). A professor scanning this table
          lands on the top rows, so the top rows should be the
          research ones. The table stays ONE block — it is not
          split into two, because two stacked tables would double
          the length of the page for no gain.

          ROW TREATMENT — category cells are ALL-CAPS + tracked
          (text-sm, tracking-[0.2em]) so the label reads as a
          section marker at a glance. Skills text is text-base so
          the row doesn't feel like a billboard. Category column
          is 280px; gap 16; rows padded py-4.

          Top margin is `mt-20 sm:mt-24` — the research strip
          above needs breathing room before the Stack arrives,
          not just a token gap. */}
      <RevealOnScroll
        as="div"
        revealClass="stack-rise"
        className="mt-20 sm:mt-24 w-full text-left"
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
            <span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ backgroundColor: markColor.research }} aria-hidden="true" />
            research
            <span className="mx-2 text-fg-mute">·</span>
            <span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ backgroundColor: markColor.shipped }} aria-hidden="true" />
            shipped
            <span className="mx-2 text-fg-mute">·</span>
            <span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ backgroundColor: markColor.working }} aria-hidden="true" />
            working
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
