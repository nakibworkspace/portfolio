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
//
// Right rail: an ambient GIF (public/gif/new.gif) of a character
// at a desk, parked top-right alongside the channel list. It
// keeps its native landscape (16:9) aspect ratio but is sized big
// enough to read as a meaningful surface, and carries a radial
// vignette mask — opaque at the top-right corner, washing out to
// ~30% alpha toward the bottom-left — so it dissolves into the
// page instead of ending in a hard rectangle. Clicking the GIF
// (or the small "what I code to" chip pinned to its opaque
// corner) opens that playlist in a new tab.
//
// CURRENT STATE: <SpotifyCard /> is commented out at the bottom
// of this file because the gif it depends on (public/gif/new.gif)
// is not yet committed — without it, the card renders a large
// broken-image placeholder. Re-enable when the gif component
// lands.
// ============================================================

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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

// ─── SPOTIFY CARD ──────────────────────────────────────────
// Rendered through a portal to `document.body`. This is NOT
// cosmetic: `<div className="animate-fadeIn">` in App.jsx wraps
// every route and carries a permanent `transform: translateY(0)`
// (from `animation: fadeIn ... both`). Per the CSS spec, any
// non-`none` transform on an ancestor turns it into the
// containing block for `position: fixed` descendants — so a
// `fixed` element rendered inside that wrapper positions itself
// against the centered `<main>` column, not the viewport. A
// portal escapes the wrapper entirely, so `fixed` resolves
// against `document.body` / the viewport as intended.
function SpotifyCard() {
  // `createPortal` needs `document`. Guard with mounted state so
  // this stays safe if the app is ever server-rendered or
  // pre-rendered (Vite SPA today, but cheap insurance).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <a
      href="https://open.spotify.com/playlist/2CakAxmxa1GEjZt7fkWyUR?si=qR3eQOrvQT6bdEPMpuannA"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open the playlist I code to, on Spotify"
      // The Spotify badge now lives inside the card itself (top-
      // left corner of the image, the faded end of the vignette)
      // rather than beneath the GIF as a sibling — so the parent
      // <a> is just a positioning wrapper, no flex children.
      className="hidden lg:block fixed right-6 xl:right-10 top-24 z-40 group no-underline"
    >
      {/* LANDSCAPE CONTAINER — keeps the GIF's native wide aspect
          ratio (looks like a small landscape card), but bigger
          than the original so the vignette reads clearly and the
          top-right "spotlight" corner is a meaningful surface.

          VIGNETTE — radial `mask-image` anchored to the top-right.
          Alpha is 100% at the top-right (fully opaque, the
          "bright" corner), drops to ~85% across most of the card
          so it stays legible, then washes out to ~30% near the
          bottom-left edge. The image therefore dissolves into the
          page background as you move down and left, instead of
          ending in a hard rectangle. WebkitMask* properties are
          the Safari-friendly equivalents of the standard ones. */}
      <div
        className="relative w-[29rem] xl:w-[38rem] aspect-[16/9] overflow-hidden rounded-xl shadow-2xl transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:shadow-accent/20 will-change-transform origin-top-right"
        style={{
          WebkitMaskImage:
            'radial-gradient(ellipse 110% 110% at 100% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.3) 100%)',
          maskImage:
            'radial-gradient(ellipse 110% 110% at 100% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.3) 100%)',
          WebkitMaskMode: 'alpha',
          maskMode: 'alpha',
        }}
      >
        <img
          src="/gif/new.gif"
          alt=""
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />

        {/* SPOTIFY BADGE — absolutely positioned inside the card's
            top-left corner (the *faded* end of the vignette, so it
            never competes with the bright top-right). Etched into
            the artwork like a watermark rather than parked beneath
            it.

            At rest it's ~40% opacity — enough to register as a
            detail worth noticing, quiet enough to not compete.
            On card hover it rises to full opacity, the label slides
            out from behind the glyph, and the border lights up.
            `group-hover:` on the parent <a> drives all of it, so
            hovering anywhere on the card reveals it. */}
        <span className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full border border-sky/30 bg-bg/50 backdrop-blur-md px-2 py-1 opacity-40 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:border-sky/60 group-hover:bg-bg/75">
          {/* Spotify glyph — official 16x16 wordmark */}
          <svg aria-hidden="true" viewBox="0 0 24 24" className="w-[1.1rem] h-[1.1rem] fill-sky-light shrink-0">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34a.748.748 0 0 1-1.03.245c-2.82-1.722-6.37-2.111-10.55-1.156a.75.75 0 0 1-.336-1.46c4.546-1.045 8.483-.6 11.621 1.343a.749.749 0 0 1 .294 1.028zm1.473-3.272a.935.935 0 0 1-1.286.308c-3.228-1.983-8.146-2.557-11.964-1.4a.938.938 0 0 1-1.166-.633a.935.935 0 0 1 .634-1.166c4.358-1.322 9.776-.682 13.48 1.602a.934.934 0 0 1 .302 1.289zm.126-3.408c-3.872-2.298-10.276-2.5-13.992-1.387a1.121 1.121 0 1 1-.65-2.154c4.264-1.286 11.332-1.038 15.78 1.617a1.12 1.12 0 0 1-1.138 1.924z" />
          </svg>

          {/* Label is collapsed to zero width at rest and expands on
              hover — so the resting state reads as just a faint
              Spotify dot, and hovering reveals "what I code to".
              `grid-cols-[0fr_1fr]` + `group-hover:grid-cols-[auto_1fr]`
              gives a width animation without needing JS. */}
          <span className="grid transition-[grid-template-columns] duration-300 ease-out grid-cols-[0fr_1fr] group-hover:grid-cols-[auto_1fr]">
            <span className="overflow-hidden whitespace-nowrap text-[11px] font-medium text-sky-light">
              what I code to
            </span>
          </span>
        </span>
      </div>
    </a>,
    document.body
  );
}

export default function Connect() {
  // Page-level hero ("CONNECT" title + intro paragraph) is
  // rendered by App.jsx as a sibling of <main> so it lines up
  // flush with the navbar brand on the left edge of the viewport.
  // This component renders only the channel list + footer.
  //
  // Ambient GIF: positioned mid-right alongside the channel list
  // (not bottom-right anymore — per layout call). Links to a
  // Spotify playlist the user curated as "what I code to."
  //
  // Temporarily disabled — see header comment. Uncomment
  // <SpotifyCard /> below to re-enable once the gif component is
  // committed.
  return (
    <>
      {/* <SpotifyCard /> */}

      {/* Channel block sits at the natural left edge of <main>'s
          content area, which already matches the navbar's left
          padding (`px-4 sm:px-6 lg:px-8` on <main>). That means
          the first channel's text lines up vertically with the
          "Nakib." brand's left edge — same column. No extra
          padding needed. `mr-auto ml-0` keeps the block left-
          aligned instead of letting `mx-auto` (inherited if any
          wrapper were added later) re-center it. */}
      <div className="max-w-3xl mr-auto ml-0">

        {/* UNIT 2-N — channels (icon-led). No dividers above,
            below, or between — the channels sit as one clean
            block separated only by their per-row vertical padding
            (same convention as Research / Projects). */}
        <div className="divide-y-0">
          {channels.map((ch) => (
            <Channel key={ch.display} {...ch} />
          ))}
        </div>

        {/* FOOTER — location + role, away from the channels */}
        <RevealOnScroll as="p" delay={channels.length * 0.07 + 0.1} className="pt-6 text-xs text-fg-mute">
          {personalInfo.location} · {personalInfo.role}{' '}
          <span className="text-accent-text">@ {personalInfo.company}</span>
        </RevealOnScroll>
      </div>
    </>
  );
}
