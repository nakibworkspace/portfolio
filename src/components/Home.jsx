// ============================================================
// Home.jsx — EDITORIAL LANDING
//
// Layout (top → bottom):
//   1. Tagline  (small, uppercase, sky-light)
//   2. Name     (huge, fg)
//   3. Multi-color accent line
//   4. Headline
//   5. Inline meta chips (location · role · education · research)
//   6. Knowledge base — D3 force-directed graph on sm+,
//      CategoryList fallback on mobile. Click any node to drill in.
//   7. Social links (GitHub, LinkedIn, Email)
//
// All colors are theme tokens — works in both dark and light.
// ============================================================

import { lazy, Suspense } from 'react';
import { personalInfo, education, research } from '../data';
import Reveal from './Reveal';
import CategoryList from './CategoryList';

const SkillsGraph = lazy(() => import('./SkillsGraph'));

export default function Home({ onCategoryClick }) {
  const edu = education[0];
  const res = research[0];

  return (
    <section className="flex flex-col items-center text-center pt-8 pb-16 sm:pt-12 sm:pb-20">

      {/* TAGLINE — sky-light */}
      <Reveal>
        <p className="text-xs uppercase tracking-[0.25em] text-sky-light font-medium">
          {personalInfo.tagline}
        </p>
      </Reveal>

      {/* NAME */}
      <Reveal delay={80}>
        <h1 className="mt-5 text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-fg leading-[1.05]">
          {personalInfo.name}
        </h1>
      </Reveal>

      {/* ACCENT LINE — full palette gradient */}
      <Reveal delay={160}>
        <div className="mt-6 mx-auto h-px w-32 accent-line-multi" aria-hidden="true" />
      </Reveal>

      {/* HEADLINE */}
      <Reveal delay={240}>
        <p className="mt-7 max-w-xl text-balance text-lg sm:text-xl text-fg-dim leading-relaxed">
          {personalInfo.headline}
        </p>
      </Reveal>

      {/* INLINE META CHIPS */}
      <Reveal delay={320}>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-fg-mute">
          <span>📍 {personalInfo.location}</span>
          <span className="text-sky-dark" aria-hidden="true">·</span>
          <span>💼 {personalInfo.role} <span className="text-accent-text">@ {personalInfo.company}</span></span>
          <span className="text-sky-dark" aria-hidden="true">·</span>
          <span>🎓 {edu.degree.split(' ').slice(0, 3).join(' ')}</span>
          <span className="text-sky-dark" aria-hidden="true">·</span>
          <span>🔬 {res.title.split(':')[0]}</span>
        </div>
      </Reveal>

      {/* KNOWLEDGE BASE — graph on sm+, list on mobile */}
      <Reveal delay={400} className="w-full">
        <div className="mt-16 sm:mt-20 w-full max-w-5xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-sky-light mb-3">
            Knowledge Base · click any node to explore
          </p>

          {/* D3 graph — hidden on mobile, shown sm+ */}
          <div className="hidden sm:block">
            <Suspense fallback={<div style={{ height: 560 }} aria-hidden="true" />}>
              <SkillsGraph onCategoryClick={onCategoryClick} height={560} />
            </Suspense>
          </div>

          {/* Mobile fallback — flat category list */}
          <div className="sm:hidden text-left">
            <CategoryList onCategoryClick={onCategoryClick} />
          </div>
        </div>
      </Reveal>

      {/* SOCIAL LINKS — text only, no cards */}
      <Reveal delay={560}>
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
      </Reveal>
    </section>
  );
}