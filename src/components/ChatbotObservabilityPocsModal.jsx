// ============================================================
// ChatbotObservabilityPocsModal.jsx — features walkthrough for
// the Chatbot Observability project.
//
// Triggered by the Preview button on the Chatbot Observability
// project card. Renders a full-screen modal: hero (with
// project overview + first screenshot) followed by each
// numbered section (1 → 3) as text + inline screenshots.
//
// Differs from the diagram-only modals in two ways:
//   • Each section can carry an `images` array — multiple
//     screenshots render in a vertical stack with captions.
//   • The hero also has `bullets` (a flat list of section
//     titles so the reader gets the table of contents at a
//     glance before scrolling).
//
// Closes on ESC, backdrop click, or the × button. Locks body
// scroll while open. Mirrors RagPocModal.jsx structure.
// ============================================================

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { chatbotObservabilityPocs } from '../data';

export default function ChatbotObservabilityPocsModal({ open, onClose }) {
  // ESC to close + body scroll lock while open
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  // First entry is the overview hero; the rest are the
  // numbered feature sections.
  const [hero, ...sections] = chatbotObservabilityPocs;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Chatbot Observability — features walkthrough"
      className="fixed inset-0 z-50 flex items-start justify-center bg-bg/85 backdrop-blur-sm overflow-y-auto backdrop-in"
      onClick={onClose}
    >
      {/* STOP PROPAGATION so clicks inside the panel don't close */}
      <div
        className="relative w-full max-w-5xl mx-4 my-8 sm:my-12 bg-bg-elevated border border-divider rounded-xl shadow-2xl panel-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 sm:px-8 py-4 bg-bg/90 backdrop-blur border-b border-divider rounded-t-xl">
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-sm sm:text-base font-semibold text-fg truncate">
              Chatbot Observability — features walkthrough
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="shrink-0 p-1.5 rounded-md text-fg-dim hover:text-fg hover:bg-bg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div
          className="px-5 sm:px-8 py-8 space-y-12"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, var(--accent-soft) 0%, var(--bg) 55%), var(--bg)',
            backgroundColor: 'var(--bg)',
          }}
        >
          {/* HERO */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-fg">
              {hero.title}
            </h3>
            {hero.image && (
              <figure className="mt-4 overflow-hidden rounded-lg border border-divider bg-bg">
                <img
                  src={hero.image}
                  alt={hero.title}
                  className="w-full h-auto"
                />
              </figure>
            )}
            <p className="mt-4 text-fg-dim text-sm sm:text-base leading-relaxed max-w-3xl">
              {hero.description}
            </p>
            {hero.bullets && hero.bullets.length > 0 && (
              <ul className="mt-4 space-y-1.5 text-fg-dim text-sm leading-relaxed max-w-3xl">
                {hero.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-sky/70 select-none">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {hero.images && hero.images.length > 0 && (
              <div className="mt-6 space-y-6">
                {hero.images.map((img, i) => (
                  <figure
                    key={i}
                    className="overflow-hidden rounded-lg border border-divider bg-bg"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-auto"
                    />
                    {img.caption && (
                      <figcaption className="px-3 py-2 text-xs text-fg-dim bg-bg-elevated border-t border-divider">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </section>

          {/* DIVIDER */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-divider" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-mute">
              What's integrated
            </span>
            <div className="flex-1 h-px bg-divider" />
          </div>

          {/* SECTIONS — serial, text + optional images */}
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h3 className="text-lg sm:text-xl font-semibold text-fg">
                  {section.title}
                </h3>
                <p className="mt-4 text-fg-dim text-sm sm:text-base leading-relaxed max-w-3xl">
                  {section.description}
                </p>
                {section.images && section.images.length > 0 && (
                  <div className="mt-6 space-y-6">
                    {section.images.map((img, i) => (
                      <figure
                        key={i}
                        className="overflow-hidden rounded-lg border border-divider bg-bg"
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          className="w-full h-auto"
                        />
                        {img.caption && (
                          <figcaption className="px-3 py-2 text-xs text-fg-dim bg-bg-elevated border-t border-divider">
                            {img.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
