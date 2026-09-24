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
// ============================================================

import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

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

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-fg font-sans">

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="animate-fadeIn">
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
