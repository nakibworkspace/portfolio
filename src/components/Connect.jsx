// ============================================================
// Connect.jsx — EDITORIAL CLOSE
//
// The page reads as a closing paragraph rather than a contact
// form. Each channel is a row with a pixel icon on the left and
// a label + URL on the right. Order: LinkedIn → GitHub →
// Twitter → CV. Add/remove rows by editing `channels` below.
//
// Each icon is rendered via the same CSS `mask-image` pattern
// we use for the hero's pixel scatter — pure `#000` SVG fills
// painted in `var(--sky-light)`, themed in both light & dark.
// ============================================================

import { personalInfo } from '../data';
import RevealOnScroll from './RevealOnScroll';

// Channel registry. `icon` keys map to PNGs in public/icons/.
// Twitter's row renders even when its URL is empty — the link
// just falls back to a hash until personalInfo.twitter is set.
//
// The `display` field is the only text shown beneath each icon.
// It used to include a label like "LinkedIn"; per design call,
// labels are gone — just the icon and the URL.
const channels = [
  {
    display: 'linkedin.com/in/nakibahmedraj',
    href: personalInfo.linkedin || '#',
    icon: '/icons/Logo-Linkedin--Streamline-Pixel.svg',
  },
  {
    display: 'github.com/nakibworkspace',
    href: personalInfo.github || '#',
    icon: '/icons/Logo-GitHub--Streamline-Pixel.svg',
  },
  {
    display: personalInfo.twitter
      ? 'x.com/nokeepahmed'
      : '(add your handle in data.js)',
    href: personalInfo.twitter || '#',
    icon: '/icons/Logo-Twitter--Streamline-Pixel.svg',
  },
  {
    display: 'Download CV',
    href: personalInfo.cvLink,
    icon: '/icons/Files-File-Csv--Streamline-Pixel.svg',
    download: true,
  },
];

function Divider() {
  return <div className="h-px w-full bg-divider" aria-hidden="true" />;
}

function IconMark({ src }) {
  // CSS mask: paint the SVG's alpha in currentColor, then pick
  // the theme's sky-light tone via inline style. Same pattern
  // as the hero scatter, so the icons look identical wherever
  // they appear. Bumped to w-9 h-9 per the design call.
  return (
    <span
      aria-hidden="true"
      className="block w-9 h-9 shrink-0 transition-transform duration-200 ease-out group-hover:-translate-y-0.5"
      style={{
        backgroundColor: 'var(--sky-light)',
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
}

function Channel({ display, href, icon, download }) {
  const isExternal = !href.startsWith('mailto:') && !href.startsWith('/') && href !== '#';
  return (
    <RevealOnScroll as="section" className="py-5">
      <a
        href={href}
        download={download || undefined}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-label={display}
        // The whole row becomes a single group: hovering anywhere
        // on it lifts the icon and shifts the URL colour.
        className="group flex items-center gap-4 sm:gap-5 text-fg hover:text-accent-text transition-colors duration-200"
      >
        <IconMark src={icon} />
        <span className="text-base sm:text-lg text-fg-dim group-hover:text-accent-text transition-colors break-all">
          {display}
        </span>
      </a>
    </RevealOnScroll>
  );
}

export default function Connect() {
  return (
    <div className="max-w-3xl">

      {/* UNIT 1 — what I'm open to */}
      <RevealOnScroll as="section" className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
          Connect
        </h2>
        <p className="text-base text-fg-dim leading-relaxed text-balance max-w-2xl">
          I'm currently considering PhD programs in software-engineering
          research (the ML / NLP / LLM-agents-for-SE direction), and
          select MLOps or data-engineering consulting work. If that's
          you, I'd like to hear from you.
        </p>
      </RevealOnScroll>

      <Divider />

      {/* UNIT 2-N — channels (icon-led) */}
      {channels.map((ch, i) => (
        <div key={ch.label}>
          <Channel {...ch} />
          {i < channels.length - 1 && <Divider />}
        </div>
      ))}

      <Divider />

      {/* FOOTER — location + role, away from the channels */}
      <RevealOnScroll as="p" delay={channels.length * 0.07 + 0.1} className="pt-6 text-xs text-fg-mute">
        {personalInfo.location} · {personalInfo.role}{' '}
        <span className="text-accent-text">@ {personalInfo.company}</span>
      </RevealOnScroll>
    </div>
  );
}
