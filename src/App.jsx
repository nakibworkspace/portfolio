// ============================================================
// App.jsx — THE MAIN LAYOUT FILE
// ============================================================

import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { navTabs } from './data';

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

// ─── SECTION MAP ───────────────────────────────────────────
// All sections live behind the navbar tabs. Home is rendered
// with its own dedicated call site (no props needed anymore —
// the old onCategoryClick / drill-in flow is gone).
const sections = {
  home:       Home,
  experience: Experience,
  research:   Research,
  projects:   Projects,
  education:  Education,
  connect:    Connect,
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  // `previewKey` is the string from a project's `preview` field
  // (e.g. "ragPocs"). Non-null means a preview modal is open.
  const [previewKey, setPreviewKey] = useState(null);

  const closePreview = () => setPreviewKey(null);

  return (
    <div className="min-h-screen bg-bg text-fg font-sans">

      <Navbar
        tabs={navTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="animate-fadeIn">
          {(() => {
            const Section = sections[activeTab];
            if (!Section) return null;
            // Projects needs the preview handler; others ignore it.
            return activeTab === 'projects'
              ? <Section onPreview={setPreviewKey} />
              : <Section />;
          })()}
        </div>
      </main>

      {/* Preview modals — keyed by `preview` string so adding more
          is just a new branch here. */}
      <RagPocModal
        open={previewKey === 'ragPocs'}
        onClose={closePreview}
      />

      <CardApprovalLabsModal
        open={previewKey === 'cardApprovalLabs'}
        onClose={closePreview}
      />

      <FraudDetectionLabsModal
        open={previewKey === 'fraudDetectionLabs'}
        onClose={closePreview}
      />

      <Analytics />
    </div>
  );
}
