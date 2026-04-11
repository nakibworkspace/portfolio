// ============================================================
// App.jsx — THE MAIN LAYOUT FILE
//
// HOW IT WORKS:
//   1. It keeps track of which tab is active (e.g., "home", "skills")
//   2. It looks up the correct component for that tab
//   3. It renders the Navbar + that component + the CV download button
//
// HOW TO ADD A NEW SECTION:
//   Step 1: Create a new file in src/components/ (e.g., Awards.jsx)
//   Step 2: Import it at the top of this file
//   Step 3: Add it to the `sections` object below
//   Step 4: Add a tab entry in data.js (navTabs array)
// ============================================================

import { useState } from 'react';
import { navTabs } from './data';

// Import all section components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Experience from './components/Experience';
import Research from './components/Research';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import DownloadFab from './components/DownloadFab';

// ─── SECTION MAP ───────────────────────────────────────────
// This object connects tab IDs (from data.js) to React components.
// The key must EXACTLY match the "id" in data.js navTabs.
// To add a new section, add a new line here:
//   "awards": Awards,     ← example
const sections = {
  home: Home,
  experience: Experience,
  research: Research,
  skills: Skills,
  education: Education,
  projects: Projects,
};


export default function App() {
  // ─── STATE ─────────────────────────────────────────────
  // "activeTab" stores which section is currently visible.
  // It starts as "home" and changes when user clicks a tab.
  const [activeTab, setActiveTab] = useState('home');

  // Look up which component to show based on the active tab
  const ActiveSection = sections[activeTab];

  return (
    // The outer wrapper: full screen height, dark background, Inter font
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">

      {/* ─── NAVBAR ────────────────────────────────────── */}
      {/* Fixed at the top of the screen */}
      <Navbar
        tabs={navTabs}           // tab names from data.js
        activeTab={activeTab}    // which tab is highlighted
        onTabChange={setActiveTab} // function to call when a tab is clicked
      />

      {/* ─── MAIN CONTENT ──────────────────────────────── */}
      {/* max-w-6xl = max width ~1152px, centered with mx-auto */}
      {/* pt-24 = padding top to push content below the fixed navbar */}
      {/* pb-20 = padding bottom so content doesn't hide behind the CV button */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* The "key" prop is the magic that makes the fade animation work.
            When activeTab changes, React destroys the old component
            and creates a fresh one, which triggers the CSS fadeIn animation. */}
        <div key={activeTab} className="animate-fadeIn">
          <ActiveSection />
        </div>
      </main>

      {/* ─── FLOATING CV BUTTON ────────────────────────── */}
      <DownloadFab />
    </div>
  );
}