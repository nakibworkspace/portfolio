// ============================================================
// ResearchAgenda.jsx — THE BRIDGE
//
// This page exists to answer one question a professor will
// have after reading /research: "OK, but how does your industry
// work feed into your research?" The answer is laid out as an
// explicit three-column mapping:
//
//     industry experience  →  the question it raised  →  the
//                             research work answering it
//
// The middle column is the pivot — it's what makes the two
// halves of the candidate legible as one person rather than
// two, so it's set in italic to mark it visually.
//
// Layout follows the rest of the site: flat lists, hairline
// dividers, generous vertical padding, no card surfaces, theme
// tokens only, `RevealOnScroll` for entrances.
// ============================================================

import { researchStatement, bridge, investigations } from '../data';
import { Compass, ArrowRight, Building2, FlaskConical, HelpCircle } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

// Map an investigation id → its title, so the bridge's
// "research" column can link to the right row on /research.
const investigationTitles = Object.fromEntries(
  investigations.filter((i) => !i.hidden).map((i) => [i.id, i.title])
);

export default function ResearchAgenda() {
  return (
    <div className="space-y-16 max-w-5xl">

      {/* ── 1. THE RESEARCH STATEMENT ────────────────────── */}
      <RevealOnScroll as="section" className="space-y-4">
        <div className="flex items-start gap-3">
          <Compass className="w-5 h-5 mt-0.5 text-sky-light shrink-0" />
          <h2 className="text-xl sm:text-2xl font-semibold text-fg leading-snug">
            {researchStatement.area}
          </h2>
        </div>
        <p className="text-base text-fg-dim leading-relaxed max-w-3xl ml-8">
          {researchStatement.summary}
        </p>
      </RevealOnScroll>

      {/* ── 2. THE THREE THREADS ─────────────────────────── */}
      <RevealOnScroll as="section" className="space-y-4">
        <h3 className="text-sm uppercase tracking-[0.25em] text-sky-light font-semibold">
          What I work on
        </h3>

        <ul className="border-t border-divider">
          {researchStatement.threads.map((thread, i) => (
            <li
              key={thread.title}
              className="py-6 border-b border-divider"
            >
              <h4 className="text-base sm:text-lg font-semibold text-fg">
                {thread.title}
              </h4>
              <p className="mt-2 text-sm text-fg-dim leading-relaxed max-w-3xl">
                {thread.body}
              </p>

              {/* Evidence — links to the specific investigations
                  that back this thread. Renders only if at least
                  one of the referenced investigations exists, so
                  a stale reference shows up as a missing link
                  rather than a dangling claim. */}
              {thread.evidence?.some((id) => investigationTitles[id]) && (
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  {thread.evidence
                    .filter((id) => investigationTitles[id])
                    .map((id) => (
                      <a
                        key={id}
                        href={`/research#${id}`}
                        className="inline-flex items-center gap-1 text-sky-light hover:text-fg transition-colors"
                      >
                        <span aria-hidden="true">↗</span>
                        <span>{investigationTitles[id]}</span>
                      </a>
                    ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </RevealOnScroll>

      {/* ── 3. THE BRIDGE TABLE ──────────────────────────── */}
      <RevealOnScroll as="section" className="space-y-4">
        <h3 className="text-sm uppercase tracking-[0.25em] text-sky-light font-semibold">
          Where the industry work became a research question
        </h3>

        {/* Column headers — desktop only. On mobile each row
            stacks and carries its own inline label instead. */}
        <div className="hidden md:grid grid-cols-[1fr_1fr_1fr] gap-x-10 border-t border-divider pt-4 pb-2">
          <span className="text-[11px] uppercase tracking-[0.2em] text-fg-mute">
            Industry experience
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-fg-mute">
            The question it raised
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-fg-mute">
            The research it became
          </span>
        </div>

        <ul className="border-t border-divider">
          {bridge.map((row, i) => (
            <li
              key={row.industry}
              className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-x-10 gap-y-4 py-6 border-b border-divider"
            >
              {/* Column 1 — the industry experience */}
              <div className="flex gap-2.5">
                <Building2 className="w-4 h-4 mt-0.5 text-fg-mute shrink-0" />
                <p className="text-sm text-fg-dim leading-relaxed">
                  {row.industry}
                </p>
              </div>

              {/* Column 2 — the question. Italic, because this
                  is the pivot of the whole page: it is where a
                  ticket becomes a research problem. */}
              <div className="flex gap-2.5">
                <HelpCircle className="w-4 h-4 mt-0.5 text-accent-text shrink-0" />
                <p className="text-sm text-fg italic leading-relaxed">
                  {row.question}
                </p>
              </div>

              {/* Column 3 — the research work */}
              <div className="flex gap-2.5">
                <FlaskConical className="w-4 h-4 mt-0.5 text-sky-light shrink-0" />
                <p className="text-sm text-fg-dim leading-relaxed">
                  {row.research}
                  {row.link && (
                    <a
                      href={row.link}
                      className="ml-2 inline-flex items-center gap-1 text-xs text-sky-light hover:text-fg transition-colors whitespace-nowrap"
                    >
                      <span aria-hidden="true">↗</span>
                      <span>investigation</span>
                    </a>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </RevealOnScroll>

      {/* ── 4. WHAT A REVIEWER CAN INSPECT ───────────────── */}
      <RevealOnScroll as="section" className="space-y-4">
        <h3 className="text-sm uppercase tracking-[0.25em] text-sky-light font-semibold">
          What you can look at
        </h3>
        <ul className="space-y-2 max-w-3xl">
          {[
            'The manuscript and the underlying thesis work: status and links on the Research page.',
            'The investigation repositories: each active investigation links to the code and notes behind it.',
            'The production systems: the industry half of this profile is real, running code you can read on GitHub.',
          ].map((item, i) => (
            <li key={i} className="text-fg-dim text-sm leading-relaxed flex gap-2">
              <span className="text-accent shrink-0">▹</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="pt-4 flex items-center gap-3">
          <a
            href="/research"
            className="group inline-flex items-center gap-2 text-sm text-sky-light hover:text-fg transition-colors duration-200"
          >
            <span>Back to Research</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </RevealOnScroll>
    </div>
  );
}
