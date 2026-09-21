// ============================================================
// RagPocModal.jsx — gallery of RAG PoCs explored
//
// Triggered by the Preview button on the RAG project card.
// Renders a full-screen modal: hero architecture diagram
// followed by each technique (basic RAG → agentic RAG).
// Closes on ESC, backdrop click, or the × button. Locks
// body scroll while open.
// ============================================================

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { ragPocs } from '../data';

export default function RagPocModal({ open, onClose }) {
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

  // First entry is the hero (architecture overview); the rest
  // are the technique diagrams rendered serially.
  const [hero, ...techniques] = ragPocs;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="RAG PoCs — explored techniques"
      className="fixed inset-0 z-50 flex items-start justify-center bg-bg/85 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      {/* STOP PROPAGATION so clicks inside the panel don't close */}
      <div
        className="relative w-full max-w-5xl mx-4 my-8 sm:my-12 bg-bg-elevated border border-divider rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 sm:px-8 py-4 bg-bg/90 backdrop-blur border-b border-divider rounded-t-xl">
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-sm sm:text-base font-semibold text-fg truncate">
              RAG PoCs — explored techniques
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
            <figure className="mt-4 overflow-hidden rounded-lg border border-divider bg-bg">
              <img
                src={hero.image}
                alt={hero.title}
                className="w-full h-auto"
              />
            </figure>
            <p className="mt-4 text-fg-dim text-sm sm:text-base leading-relaxed max-w-3xl">
              {hero.description}
            </p>
          </section>

          {/* DIVIDER */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-divider" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-mute">
              Techniques explored
            </span>
            <div className="flex-1 h-px bg-divider" />
          </div>

          {/* TECHNIQUES — serial, basic → agentic */}
          <div className="space-y-12">
            {techniques.map((poc) => (
              <section key={poc.image}>
                <h3 className="text-lg sm:text-xl font-semibold text-fg">
                  {poc.title}
                </h3>
                <figure className="mt-4 overflow-hidden rounded-lg border border-divider bg-bg">
                  <img
                    src={poc.image}
                    alt={poc.title}
                    loading="lazy"
                    className="w-full h-auto"
                  />
                </figure>
                <p className="mt-4 text-fg-dim text-sm sm:text-base leading-relaxed max-w-3xl">
                  {poc.description}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
