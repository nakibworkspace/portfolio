// ============================================================
// Navbar.jsx — THE TOP NAVIGATION BAR
//
// Brand left, tabs center-right, theme toggle far-right.
// Glassy backdrop, border-bottom only, theme-aware via CSS vars.
// ============================================================

import { personalInfo } from '../data';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ tabs, activeTab, onTabChange }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-lg border-b border-divider">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">

          {/* LEFT: brand */}
          <button
            onClick={() => onTabChange('home')}
            className="text-lg font-semibold tracking-tight text-fg hover:text-accent-text transition-colors shrink-0"
          >
            {personalInfo.name.split(' ')[0]}
            <span className="text-accent">.</span>
          </button>

          {/* RIGHT: tab buttons + theme toggle */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
            {tabs.filter((tab) => !tab.hidden).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`
                    px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200
                    ${isActive
                      ? 'bg-accent-soft text-accent-text border border-accent-border'
                      : 'text-fg-mute hover:text-fg hover:bg-bg-elevated border border-transparent'
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
            <div className="w-px h-6 bg-divider mx-1 sm:mx-2" aria-hidden="true" />
            <ThemeToggle />
          </div>

        </div>
      </div>
    </nav>
  );
}