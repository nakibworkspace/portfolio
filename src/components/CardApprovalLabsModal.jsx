// ============================================================
// CardApprovalLabsModal.jsx — what's integrated across the
// Credit Card Approval Prediction project.
//
// Triggered by the Preview button on the Credit Card project
// card. Renders a full-screen modal: architecture overview hero
// (diagram shown once, at the top) followed by each numbered
// step (1 → 5) as text-only sections. Closes on ESC, backdrop
// click, or the × button. Locks body scroll while open.
//
// Mirrors RagPocModal.jsx — kept structurally identical so the
// two galleries behave the same way. Diagram is intentionally
// only at the top to avoid repetition; step sections are
// text-only. Hero section additionally supports an optional
// `bullets` list (extra context the Rag hero doesn't need).
// ============================================================

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cardApprovalLabs } from '../data';

export default function CardApprovalLabsModal({ open, onClose }) {
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

  // First entry is the architecture overview hero (with the
  // diagram); the rest are the numbered steps rendered
  // text-only, serially.
  const [hero, ...steps] = cardApprovalLabs;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Credit Card Approval Prediction — what's integrated"
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
              Credit Card Approval Prediction — what's integrated
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
          {/* HERO — diagram shown once, at the top */}
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
          </section>

          {/* DIVIDER */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-divider" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-mute">
              What's integrated
            </span>
            <div className="flex-1 h-px bg-divider" />
          </div>

          {/* STEPS — serial, text-only, no per-step diagram */}
          <div className="space-y-10">
            {steps.map((step) => (
              <section key={step.title}>
                <h3 className="text-lg sm:text-xl font-semibold text-fg">
                  {step.title}
                </h3>
                <p className="mt-4 text-fg-dim text-sm sm:text-base leading-relaxed max-w-3xl">
                  {step.description}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
