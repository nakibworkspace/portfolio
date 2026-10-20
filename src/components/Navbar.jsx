// ============================================================
// Navbar.jsx — THE TOP NAVIGATION BAR
//
// Brand hard-left, tab cluster + theme toggle hard-right. Glassy
// backdrop, hairline bottom border, theme-aware via CSS vars.
//
// SPAN: the nav row spans the FULL VIEWPORT (no max-w-x mx-auto)
// on purpose. The page content below uses `max-w-5xl` or `max-w-6xl`
// for a centered reading column, but the chrome itself should
// align to the actual screen edge so the tabs and brand can hug
// the corners. With `max-w-6xl mx-auto`, on screens wider than
// 1152px the cluster ends ~64–140px in from the right — which
// looks "centered" next to the empty right gutter.
//
// ALIGNMENT
//   `ml-auto` on the tab cluster is what pins it to the right
//   edge. The obvious alternative — `justify-between` on the row —
//   only splits leftover space evenly between the two children,
//   which lands the tabs around the midpoint on wide screens.
//   `ml-auto` absorbs ALL the free space, so the cluster always
//   ends flush against the container's right padding.
//
// RESPONSIVE LAYOUT
//   • default (mobile, <sm): brand shrinks to text-base; the tab
//     cluster WRAPS onto a second row below it (right-aligned via
//     the same `ml-auto`) so nothing is cropped or scrolled.
//   • sm+: single row, brand left, cluster right.
//
// `flex-wrap` on the row is what enables the mobile wrap.
// `shrink-0` on the brand keeps it from being crushed.
// `whitespace-nowrap` on each tab stops labels breaking mid-word.
// ============================================================

import { useLocation, useNavigate } from 'react-router-dom';
import { navTabs, personalInfo } from '../data';
import ThemeToggle from './ThemeToggle';

// Maps a nav tab id to its URL path. "home" → "/" so the
// brand button and Home tab both land on the root.
function pathForTab(id) {
  return id === 'home' ? '/' : `/${id}`;
}

// Inverse: is the current pathname this tab's URL? Handles
// the trailing-slash variant + ignores any /preview/* route
// (those aren't nav destinations).
function isActiveTab(pathname, id) {
  const target = pathForTab(id);
  if (target === '/') return pathname === '/' || pathname === '';
  return pathname === target || pathname === `${target}/`;
}

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-lg border-b border-divider">
      {/* NOTE: no `max-w-* mx-auto` here. The nav spans the full
          viewport so its children can sit flush against the
          actual screen edges. See the file-level comment. */}
      <div className="px-4 sm:px-6 lg:px-8">
        {/* `flex-wrap` is the responsive trick: when the brand +
            right cluster can't share one row at the current
            width, the right cluster wraps onto a second line
            below the brand instead of overflowing or scrolling.

            `ml-auto` on the cluster is what pins the tabs to the
            RIGHT edge. `justify-between` alone would only push
            them to roughly the midpoint (splitting leftover
            space evenly between the two children), which is why
            they were sitting in the middle inside a centered
            container. */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3 sm:py-0 sm:h-16">

          {/* LEFT: brand → home. Slightly larger than typical
              (text-xl) so it holds its own against the row of
              nav tabs; the accent period stays as the chip. */}
          <button
            onClick={() => navigate(pathForTab('home'))}
            className="text-xl sm:text-2xl font-semibold tracking-tight text-fg hover:text-accent-text transition-colors shrink-0"
          >
            {personalInfo.name.split(' ')[0]}
            <span className="text-accent">.</span>
          </button>

          {/* RIGHT: tab buttons + theme toggle.
              Tabs are bumped to text-base with more horizontal
              padding (px-3 sm:px-4) so they read as first-class
              destinations rather than auxiliary links. Gaps
              widened from gap-1.5/gap-2 to gap-2/gap-3. */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {navTabs.filter((tab) => !tab.hidden).map((tab) => {
              const isActive = isActiveTab(pathname, tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(pathForTab(tab.id))}
                  className={`
                    px-3 sm:px-4 py-2 text-base font-medium rounded-md transition-all duration-200 whitespace-nowrap
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
            <div className="w-px h-7 bg-divider mx-1 sm:mx-2" aria-hidden="true" />
            <ThemeToggle />
          </div>

        </div>
      </div>
    </nav>
  );
}
