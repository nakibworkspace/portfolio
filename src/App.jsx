// ============================================================
// App.jsx — THE MAIN LAYOUT FILE
// ============================================================

import { useState } from 'react';
import { navTabs } from './data';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Experience from './components/Experience';
import ResearchProjects from './components/ResearchProjects';
import Skills from './components/Skills';
import Education from './components/Education';
import Connect from './components/Connect';

// ─── SECTION MAP ───────────────────────────────────────────
// `skills` is intentionally NOT here — it's still reachable via
// the home knowledge graph, but it needs an `onBack` callback so
// it lives below the map for conditional rendering.
const sections = {
  home:       Home,
  experience: Experience,
  work:       ResearchProjects,   // merged research + projects
  education:  Education,
  connect:    Connect,
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const handleHomeDrillIn = () => {
    setActiveTab('skills');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeConnect = () => {
    setActiveTab('connect');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-bg text-fg font-sans">

      <Navbar
        tabs={navTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div key={activeTab} className="animate-fadeIn">
          {activeTab === 'skills' ? (
            <Skills
              onBack={() => setActiveTab('home')}
              onCategoryClick={handleHomeDrillIn}
            />
          ) : activeTab === 'home' ? (
            <Home onCategoryClick={handleHomeDrillIn} />
          ) : (
            (() => {
              const Section = sections[activeTab];
              return Section ? <Section /> : null;
            })()
          )}
        </div>
      </main>
    </div>
  );
}