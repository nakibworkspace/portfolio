// ============================================================
// App.jsx — THE MAIN LAYOUT FILE
//
// Router-driven. `<Routes>` exposes one URL per section so
// each shows up as a separate pageview in Vercel Analytics.
// The /preview/:slug route opens the gallery modals at their
// own URLs (deep-linkable, refresh-safe, Analytics-trackable).
//
// Structure note: the preview modal is rendered as a sibling
// of <main>, NOT as a child of the matched route. That way:
//   1. /preview/... always has Projects visible behind the
//      modal as a backdrop (so the page is never blank).
//   2. The modal's `fixed inset-0` covers the whole viewport
//      reliably — no matter where React Router mounts it.
//   3. Closing the modal just unmounts it; Projects stays put.
// `<Analytics />` is kept at the bottom of the tree — it
// auto-fires a pageview on every route change.
//
// PAGE HEADERS — Why they're inside <main>
//   Each section has a small uppercase eyebrow + tagline that
//   reads as the page's "title." These are rendered inside the
//   centered `max-w-6xl mx-auto` <main> container so they align
//   perfectly with the content below them. Each component renders
//   only the body; the per-route header is rendered here from the
//   `PAGE_HEADERS` map keyed by pathname.
// ============================================================

import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
// (no icons in page headers — eyebrow labels stand alone)

import Navbar from './components/Navbar';
import Home from './components/Home';
import Experience from './components/Experience';
import Research from './components/Research';
import Projects from './components/Projects';
import Education from './components/Education';
import Connect from './components/Connect';
import RagPocModal from './components/RagPocModal';
import CardApprovalLabsModal from './components/CardApprovalLabsModal';
import FraudDetectionLabsModal from './components/FraudDetectionLabsModal';
import ChatbotObservabilityPocsModal from './components/ChatbotObservabilityPocsModal';
import DatalakeProjectsModal from './components/DatalakeProjectsModal';
import { previewSlugToKey } from './data';

// ─── PAGE HEADERS ──────────────────────────────────────────
// Keyed by the same path the route renders. Each header has
// three optional pieces:
//   - eyebrow: a small uppercase tracked label (e.g. "Research")
//   - tagline: a one-sentence subtitle below the eyebrow
//   - variant: 'eyebrow' (default, used on Experience / Research
//     / Projects / Education) or 'hero' (used on Connect, which
//     renders a large h1 instead of a small uppercase eyebrow).
//
// When a page is mounted at /preview/<slug>, Projects is the
// backdrop; we deliberately DON'T show its header so the modal
// doesn't compete with two titles on the screen.
const PAGE_HEADERS = {
  '/experience': {
    eyebrow: 'Experience',
    tagline: "Where I've applied MLOps and data engineering in practice.",
  },
  '/research': {
    eyebrow: 'Research',
    tagline: 'ML, NLP, and LLM agents applied to software engineering — code generation, code review, program repair, and developer tooling.',
  },
  '/projects': {
    eyebrow: 'Projects',
    tagline: 'Selected work showcasing MLOps, data engineering, and ML systems.',
  },
  '/education': {
    eyebrow: 'Education',
    tagline: 'Degrees, research direction, and the leadership work that shaped how I organise teams and ship things under pressure.',
  },
  '/connect': {
    variant: 'hero',
    title: 'Connect',
    tagline: "I'm currently considering PhD programs in software-engineering research (the ML / NLP / LLM-agents-for-SE direction), and select MLOps or data-engineering consulting work. If that's you, I'd like to hear from you.",
  },
};

// ─── PREVIEW MODAL OVERLAY ─────────────────────────────────
// Driven by the current pathname (not a route). If the URL is
// /preview/<slug>, the matching modal is rendered on top of
// whichever page sits underneath. If the slug is unknown, we
// silently redirect to /projects so the URL never gets stuck.
function PreviewOverlay() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Match /preview/<slug>; otherwise nothing to render.
  const match = pathname.match(/^\/preview\/([^/]+)\/?$/);
  if (!match) return null;

  const slug = match[1];
  const previewKey = previewSlugToKey[slug];
  if (!previewKey) {
    // Unknown slug → redirect. Done in an effect-like pattern
    // via the navigate call (safe because Routes won't
    // re-match the same path).
    navigate('/projects', { replace: true });
    return null;
  }

  const goBack = () => navigate('/projects');

  return (
    <>
      <RagPocModal
        open={previewKey === 'ragPocs'}
        onClose={goBack}
      />
      <CardApprovalLabsModal
        open={previewKey === 'cardApprovalLabs'}
        onClose={goBack}
      />
      <FraudDetectionLabsModal
        open={previewKey === 'fraudDetectionLabs'}
        onClose={goBack}
      />
      <ChatbotObservabilityPocsModal
        open={previewKey === 'chatbotObservabilityPocs'}
        onClose={goBack}
      />
      <DatalakeProjectsModal
        open={previewKey === 'datalakeProjects'}
        onClose={goBack}
      />
    </>
  );
}

// Renders the page-level header for the given pathname, if any.
// Returns null when no header is registered (e.g. on / or on a
// /preview/* backdrop) so the caller can render the body in <main>
// with no preceding header block.
function PageHeader({ pathname }) {
  const header = PAGE_HEADERS[pathname];
  if (!header) return null;

  // Hero variant (Connect): big bold title + paragraph.
  // Wrapped in `max-w-3xl` so it aligns with the page's centered
  // reading column instead of being flush-left. The `mr-auto ml-0`
  // pattern (instead of `mx-auto`) keeps it left-aligned within
  // the centered container, matching the body content below.
  if (header.variant === 'hero') {
    return (
      <div className="pt-8 pb-10 max-w-3xl mr-auto ml-0">
        <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
          {header.title}
        </h1>
        {header.tagline && (
          <p className="mt-4 text-base text-fg-dim leading-relaxed text-balance">
            {header.tagline}
          </p>
        )}
      </div>
    );
  }

  // Default eyebrow variant: small uppercase label + tagline.
  // Sized to match the Experience timeline (the widest reading
  // column on most pages) so the eyebrow sits above the first
  // content row in the same column.
  return (
    <div className="pt-8 pb-10 max-w-6xl">
      <h2 className="text-sm uppercase tracking-[0.25em] text-sky-light font-semibold">
        {header.eyebrow}
      </h2>
      {header.tagline && (
        <p className="text-fg-dim mt-3 text-balance max-w-2xl">
          {header.tagline}
        </p>
      )}
    </div>
  );
}

export default function App() {
  // Keying the fade wrapper on pathname forces React to remount it
  // on every navigation, which replays the entrance fade. Without
  // the key it fires once at full page load and never again — the
  // route change wouldn't feel like anything happened.
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-bg text-fg font-sans">

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <PageHeader pathname={pathname} />
        <div key={pathname} className="animate-fadeIn">
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/research"   element={<Research />} />
            <Route path="/projects"   element={<Projects />} />
            <Route path="/education"  element={<Education />} />
            <Route path="/connect"    element={<Connect />} />
            {/* /preview/:slug is handled by PreviewOverlay
                (sibling of <main>) so Projects stays mounted
                underneath as a backdrop. We still need a route
                entry so React Router knows the path exists
                (otherwise it falls through to "*"). */}
            <Route path="/preview/:slug" element={null} />
            {/* Unknown route → home (no 404 page in this app). */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      {/* Modal overlay — fixed-positioned, lives outside <main>
          so it covers the navbar too if needed, and Projects
          stays mounted as a backdrop. */}
      <PreviewOverlay />

      <Analytics />
    </div>
  );
}
