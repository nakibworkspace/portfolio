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

  return (
    <div className="min-h-screen bg-bg text-fg font-sans">

      <Navbar
        tabs={navTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div key={activeTab} className="animate-fadeIn">
          {(() => {
            const Section = sections[activeTab];
            return Section ? <Section /> : null;
          })()}
        </div>
      </main>

      <Analytics />
    </div>
  );
}
