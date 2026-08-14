// ============================================================
// Connect.jsx — EDITORIAL CLOSE
//
// The page reads as a closing paragraph rather than a contact
// form. Five units separated by hairline dividers:
//   1. What I'm open to right now (one paragraph)
//   2. Email — stacked label + URL, full row
//   3. GitHub — same pattern
//   4. LinkedIn — same pattern
//   5. CV — quiet inline text link
// Footer line: location + role, away from the main flow.
//
// No buttons, no scale animations, no shadow pills, no
// "I read every message" reassurance copy. Each row breathes.
// ============================================================

import { personalInfo } from '../data';
import { ArrowDownToLine } from 'lucide-react';

export default function Connect() {
  return (
    <div className="max-w-3xl">

      {/* UNIT 1 — what I'm open to */}
      <section className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
          Connect
        </h2>
        <p className="text-base text-fg-dim leading-relaxed text-balance max-w-2xl">
          I'm currently considering PhD programs in software-engineering
          research (the ML / NLP / LLM-agents-for-SE direction), and
          select MLOps or data-engineering consulting work. If that's
          you, I'd like to hear from you.
        </p>
      </section>

      <Divider />

      {/* UNIT 2 — email */}
      <Channel label="Email" url={personalInfo.email} href={`mailto:${personalInfo.email}`} />

      <Divider />

      {/* UNIT 3 — GitHub */}
      {personalInfo.github && (
        <Channel
          label="GitHub"
          url="github.com/nakibworkspace"
          href={personalInfo.github}
        />
      )}

      <Divider />

      {/* UNIT 4 — LinkedIn */}
      {personalInfo.linkedin && (
        <Channel
          label="LinkedIn"
          url="linkedin.com/in/nakibahmedraj"
          href={personalInfo.linkedin}
        />
      )}

      <Divider />

      {/* UNIT 5 — CV */}
      <section className="py-6">
        <a
          href={personalInfo.cvLink}
          download
          className="group inline-flex items-center gap-2 text-sm text-fg hover:text-accent-text transition-colors"
          aria-label="Download CV as PDF"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] text-sky-light font-semibold w-20 shrink-0">
            CV
          </span>
          <span className="underline underline-offset-4 decoration-divider group-hover:decoration-accent-text">
            Download CV
          </span>
          <span className="text-fg-mute text-xs uppercase tracking-[0.2em]">
            (PDF)
          </span>
          <ArrowDownToLine className="w-3.5 h-3.5 text-fg-mute group-hover:text-accent-text transition-colors" />
        </a>
      </section>

      <Divider />

      {/* FOOTER — location + role, away from the channels */}
      <p className="pt-6 text-xs text-fg-mute">
        {personalInfo.location} · {personalInfo.role}{' '}
        <span className="text-accent-text">@ {personalInfo.company}</span>
      </p>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-divider" aria-hidden="true" />;
}

function Channel({ label, url, href }) {
  return (
    <section className="py-6 flex flex-col sm:flex-row sm:items-baseline sm:gap-x-6 gap-y-2">
      <span className="text-[11px] uppercase tracking-[0.25em] text-sky-light font-semibold shrink-0 sm:w-20">
        {label}
      </span>
      <a
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
        className="text-base text-fg hover:text-accent-text transition-colors break-all"
      >
        {url}
      </a>
    </section>
  );
}
