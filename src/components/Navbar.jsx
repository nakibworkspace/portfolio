// ============================================================
// Navbar.jsx — THE TOP NAVIGATION BAR
//
// HOW IT WORKS:
//   - Shows your first name on the left (clicking it goes to Home)
//   - Shows tab buttons on the right
//   - The active tab gets a green highlight
//   - On small screens, tabs become horizontally scrollable
//
// HOW TO MODIFY:
//   - To change what's shown on the left: edit the personalInfo references
//   - Tab labels come from data.js (navTabs), not from here
// ============================================================

import { personalInfo } from '../data';

export default function Navbar({ tabs, activeTab, onTabChange }) {
  return (
    // fixed = stays at top when scrolling
    // backdrop-blur-lg = frosted glass effect
    // border-b = thin line at the bottom
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* flex = horizontal layout, items-center = vertically centered */}
        <div className="flex items-center justify-between h-16">

          {/* ─── LEFT: Your name ─────────────────────── */}
          {/* This is a button, not a link, so it triggers tab change */}
          <button
            onClick={() => onTabChange('home')}
            className="text-lg font-semibold tracking-tight text-slate-50 hover:text-emerald-400 transition-colors"
          >
            {/* .split(' ')[0] takes just your first name: "Nakib Ahmed Raj" → "Nakib" */}
            {personalInfo.name.split(' ')[0]}
            {/* The green dot after your name */}
            <span className="text-emerald-400">.</span>
          </button>

          {/* ─── RIGHT: Tab buttons ──────────────────── */}
          {/* overflow-x-auto + scrollbar-hide = horizontally scrollable on mobile */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              // Check if this tab is currently active
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  // The className uses a template literal to apply
                  // different styles based on whether the tab is active.
                  // This is a common pattern in React + Tailwind.
                  className={`
                    px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200
                    ${isActive
                      // Active style: green background tint, green text, green border
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      // Inactive style: gray text, subtle hover effect
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </nav>
  );
}