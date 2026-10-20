// ============================================================
// PixelScatter.jsx — ambient pixel icons across the WHOLE hero band.
//
// Twelve Streamline-Pixel SVGs (32×32, pure #000 fills) drawn as
// CSS `mask-image`s. The scatter container breaks out of the
// `<main>` wrapper to the full viewport width (`w-screen` +
// `left-1/2 -translate-x-1/2`) so percentages are measured against
// the actual screen, not the `max-w-6xl` content column. This is
// what fills the empty side bands visible in the reference
// screenshot — those bands are the hero's "hero band," not chrome.
//
// COVERAGE (per design call): the scatter covers the full
// viewport across the entire hero's vertical span. Icons appear
// even between name characters and around the body text. The text
// sits on top via `z-10`; the icons stay at low opacity so they
// don't compete with the read.
//
// OPACITY MIX (per design call): under 20% on the texture layer
// (they read as soft static noise), ~25–35% on the middle ring
// (clearly visible but secondary), and the three large anchors
// at ~30%. No icon goes above 35% — they remain texture, not
// foreground.
//
// SIZING: roughly 20% of instances are large anchors; a middle ring
// at w-8–10; a fine texture layer at w-4–6.
//
// MOTION: each icon drifts on its own phase via `.pixel-drift`
// (6.5–9s, distinct delays), reduced-motion-safe.
//
// Social brand logos (LinkedIn / Twitter / Spotify / GitHub) are
// excluded — they belong in Connect, not behind the name.
// ============================================================

const src = {
  desktop:    '/icons/Computers-Devices-Electronics-Desktop--Streamline-Pixel.svg',
  keyboard:   '/icons/Computers-Devices-Electronics-Keyboard-Wireless--Streamline-Pixel.svg',
  mouse:      '/icons/Computers-Devices-Electronics-Mouse--Streamline-Pixel.svg',
  mac:        '/icons/Computers-Devices-Electronics-Vintage-Mac--Streamline-Pixel.svg',
  cap:        '/icons/School-Science-Graduation-Cap--Streamline-Pixel.svg',
  robot:      '/icons/Technology-Robot-Ai--Streamline-Pixel.svg',
  headphones: '/icons/Music-Headphones-Human--Streamline-Pixel.svg',
  cd:         '/icons/Music-Album-Cd-Disk-Playlist--Streamline-Pixel.svg',
  mailbox:    '/icons/Email-Mailbox-Open--Streamline-Pixel.svg',
  clipboard:  '/icons/Interface-Essential-Clip-2--Streamline-Pixel.svg',
  pin:        '/icons/Map-Navigation-Pin-Location-2--Streamline-Pixel.svg',
  handshake:  '/icons/Business-Products-Deal-Handshake--Streamline-Pixel.svg',
};

// Horizontal positions intentionally cover the FULL width,
// including between the name characters (the name's reading column
// is roughly 25–75% of the viewport at `text-8xl`). Icons there are
// always in the small/under-20% tier so they read as noise through
// the letters.
//
// Vertical positions are stepped down the full hero height
// (~34rem) in roughly 1rem increments, distributed evenly.
const ICONS = [
  // ── Large anchors (the ~20%) ──
  { src: src.robot,    className: 'top-12 left-[2%]  w-12 h-12 md:w-16 md:h-16',          phase: 'pixel-drift-a', opacity: 'opacity-30', hoverOpacity: 'hover:opacity-35', hideMobile: false },
  { src: src.mac,      className: 'top-44 right-[2%] w-12 h-12 md:w-14 md:h-14',          phase: 'pixel-drift-d', opacity: 'opacity-30', hoverOpacity: 'hover:opacity-35', hideMobile: false },
  { src: src.cap,      className: 'top-[26rem] left-[36%] w-10 h-10 md:w-12 md:h-12',     phase: 'pixel-drift-c', opacity: 'opacity-25', hoverOpacity: 'hover:opacity-30', hideMobile: false },

  // ── Middle ring (8 instances, 25–35%) ──
  { src: src.keyboard,  className: 'top-8 right-[8%] w-7 h-7 md:w-10 md:h-10',           phase: 'pixel-drift-b', opacity: 'opacity-30', hoverOpacity: 'hover:opacity-35', hideMobile: true },
  { src: src.mouse,     className: 'top-32 left-[14%] w-7 h-7 md:w-9 md:h-9',            phase: 'pixel-drift-c', opacity: 'opacity-30', hoverOpacity: 'hover:opacity-35', hideMobile: true },
  { src: src.headphones,className: 'top-24 right-[28%] w-7 h-7 md:w-9 md:h-9',          phase: 'pixel-drift-a', opacity: 'opacity-30', hoverOpacity: 'hover:opacity-35', hideMobile: true },
  { src: src.desktop,   className: 'top-[20rem] right-[14%] w-7 h-7 md:w-9 md:h-9',      phase: 'pixel-drift-d', opacity: 'opacity-30', hoverOpacity: 'hover:opacity-35', hideMobile: true },
  { src: src.cd,        className: 'top-[23rem] left-[12%] w-7 h-7 md:w-9 md:h-9',       phase: 'pixel-drift-b', opacity: 'opacity-25', hoverOpacity: 'hover:opacity-30', hideMobile: true },
  { src: src.handshake, className: 'top-[6rem] right-[38%] w-7 h-7 md:w-9 md:h-9',       phase: 'pixel-drift-c', opacity: 'opacity-25', hoverOpacity: 'hover:opacity-30', hideMobile: true },
  { src: src.pin,       className: 'top-[12rem] left-[6%] w-7 h-7 md:w-9 md:h-9',        phase: 'pixel-drift-a', opacity: 'opacity-30', hoverOpacity: 'hover:opacity-35', hideMobile: true },
  { src: src.mailbox,   className: 'top-[16rem] right-[24%] w-7 h-7 md:w-9 md:h-9',      phase: 'pixel-drift-d', opacity: 'opacity-25', hoverOpacity: 'hover:opacity-30', hideMobile: true },

  // ── Texture layer (15 instances, all 15% — hover lifts to 20%) ──
  { src: src.clipboard, className: 'top-20 left-[38%] w-4 h-4 md:w-5 md:h-5',           phase: 'pixel-drift-c', opacity: 'opacity-15', hoverOpacity: 'hover:opacity-20', hideMobile: true },
  { src: src.robot,     className: 'top-28 right-[46%] w-4 h-4 md:w-5 md:h-5',          phase: 'pixel-drift-a', opacity: 'opacity-15', hoverOpacity: 'hover:opacity-20', hideMobile: true },
  { src: src.keyboard,  className: 'top-44 left-[44%] w-4 h-4 md:w-5 md:h-5',           phase: 'pixel-drift-b', opacity: 'opacity-15', hoverOpacity: 'hover:opacity-20', hideMobile: true },
  { src: src.mouse,     className: 'top-56 right-[18%] w-4 h-4 md:w-5 md:h-5',          phase: 'pixel-drift-d', opacity: 'opacity-15', hoverOpacity: 'hover:opacity-20', hideMobile: true },
  { src: src.cap,       className: 'top-[10rem] right-[12%] w-4 h-4 md:w-5 md:h-5',      phase: 'pixel-drift-c', opacity: 'opacity-15', hoverOpacity: 'hover:opacity-20', hideMobile: true },
  { src: src.cd,        className: 'top-[12rem] right-[38%] w-4 h-4 md:w-5 md:h-5',      phase: 'pixel-drift-a', opacity: 'opacity-15', hoverOpacity: 'hover:opacity-20', hideMobile: true },
  { src: src.mac,       className: 'top-[15rem] left-[26%] w-4 h-4 md:w-5 md:h-5',       phase: 'pixel-drift-b', opacity: 'opacity-15', hoverOpacity: 'hover:opacity-20', hideMobile: true },
  { src: src.handshake, className: 'top-[18rem] right-[42%] w-4 h-4 md:w-5 md:h-5',     phase: 'pixel-drift-c', opacity: 'opacity-15', hoverOpacity: 'hover:opacity-20', hideMobile: true },
  { src: src.pin,       className: 'top-[21rem] left-[44%] w-4 h-4 md:w-5 md:h-5',       phase: 'pixel-drift-d', opacity: 'opacity-15', hoverOpacity: 'hover:opacity-20', hideMobile: true },
  { src: src.desktop,   className: 'top-[24rem] right-[6%] w-4 h-4 md:w-5 md:h-5',       phase: 'pixel-drift-a', opacity: 'opacity-15', hoverOpacity: 'hover:opacity-20', hideMobile: true },
  { src: src.clipboard, className: 'top-[28rem] right-[30%] w-4 h-4 md:w-5 md:h-5',     phase: 'pixel-drift-b', opacity: 'opacity-15', hoverOpacity: 'hover:opacity-20', hideMobile: true },
  { src: src.mailbox,   className: 'top-[28rem] left-[18%] w-4 h-4 md:w-5 md:h-5',       phase: 'pixel-drift-c', opacity: 'opacity-15', hoverOpacity: 'hover:opacity-20', hideMobile: true },
  { src: src.headphones,className: 'top-[30rem] right-[18%] w-4 h-4 md:w-5 md:h-5',      phase: 'pixel-drift-d', opacity: 'opacity-15', hoverOpacity: 'hover:opacity-20', hideMobile: true },
  { src: src.keyboard,  className: 'top-[31rem] left-[6%] w-4 h-4 md:w-5 md:h-5',        phase: 'pixel-drift-a', opacity: 'opacity-15', hoverOpacity: 'hover:opacity-20', hideMobile: true },
  { src: src.robot,     className: 'top-[32rem] right-[10%] w-4 h-4 md:w-5 md:h-5',      phase: 'pixel-drift-b', opacity: 'opacity-15', hoverOpacity: 'hover:opacity-20', hideMobile: true },
];

export default function PixelScatter() {
  return (
    // Purely decorative — hidden from AT.
    //
    // BREAKOUT: `w-screen left-1/2 -translate-x-1/2` widens the
    // container to the full viewport, so positions are measured
    // against the actual screen, not the max-w-6xl content column.
    //
    // `h-[34rem]` caps the scatter to the hero's vertical span so
    // nothing bleeds into the Stack section below.
    //
    // POINTER EVENTS: the container itself is `pointer-events-none`
    // so it never swallows clicks meant for the hero text beneath it.
    // Each icon re-enables pointer events on itself via
    // `pointer-events-auto` so it can still receive :hover.
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[34rem] overflow-hidden select-none"
    >
      {ICONS.map((icon, i) => (
        <span
          key={`${icon.src}-${i}`}
          className={[
            'absolute block pointer-events-auto',
            icon.className,
            icon.opacity,
            // Hover lifts each icon exactly one 5% tier above its
            // base (15→20, 25→30, 30→35). The mapping is explicit
            // per icon rather than derived, so it stays predictable.
            icon.hoverOpacity,
            icon.phase,
            'pixel-drift',
            'transition-opacity duration-200 ease-out',
            icon.hideMobile ? 'hidden sm:block' : '',
          ].join(' ')}
          // Paint the mask in the theme's sky-light tone; the mask
          // itself is the black-filled SVG alpha channel.
          style={{
            backgroundColor: 'var(--sky-light)',
            WebkitMaskImage: `url(${icon.src})`,
            maskImage: `url(${icon.src})`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
          }}
        />
      ))}
    </div>
  );
}
