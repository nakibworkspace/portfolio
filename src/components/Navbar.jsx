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
//   • default (mobile, <md): brand shrinks to text-lg and the tab
//     cluster wraps onto its own second row (and possibly a third)
//     below it, right-aligned via the same `ml-auto`. Tabs drop to
//     text-sm with tighter padding so each row holds as many tabs
//     as will fit rather than breaking one per line.
//   • md+: single row, brand left, cluster right, tabs at full
//     size.
//
// TWO nested wraps are needed, not one: the OUTER row wraps
// (brand above, cluster below) and the CLUSTER itself also wraps
// (tabs spilling onto a second line). Six tabs plus the theme
// toggle need ~680px at full size, which exceeds a 375px phone
// (343px) and even a 640px tablet (608px) — so the cluster can
// never be one atomic row on small screens.
//
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
            container.

            Height: `md:h-16` fixes the nav to a single 64px row
            once there IS one row to fix. Below `md` the height
            is left to the content, because on a phone the
            cluster wraps to two rows and a fixed 64px would
            clip the second one. */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3 md:py-0 md:h-16">

          {/* LEFT: brand → home. Slightly larger than typical
              (text-xl) so it holds its own against the row of
              nav tabs; the accent period stays as the chip.
              Steps down to text-lg on mobile so it leaves room
              for the wrapped tab cluster below it. */}
          <button
            onClick={() => navigate(pathForTab('home'))}
            className="text-lg md:text-2xl font-semibold tracking-tight text-fg hover:text-accent-text transition-colors shrink-0"
          >
            {personalInfo.name.split(' ')[0]}
            <span className="text-accent">.</span>
          </button>

          {/* RIGHT: tab buttons + theme toggle.
              Tabs are bumped to text-base with more horizontal
              padding (px-4) at `md` and above so they read as
              first-class destinations rather than auxiliary
              links. Below `md` they step down to text-sm with
              tighter padding (px-2) so they still fit a phone.

              RESPONSIVE: `flex-wrap` on the CLUSTER (not just on
              the outer row) is what keeps the tabs reachable on a
              phone. The outer row's wrap moves the cluster below
              the brand, but the cluster itself was one atomic
              row — six tabs plus the theme toggle need ~632px at
              desktop sizing, and a 375px phone only has 343px. So
              without an internal wrap, Education, Connect and the
              theme toggle were silently clipped off the right
              edge (`body { overflow-x: hidden }` hid the
              scrollbar, so it looked like they were simply
              missing).

              Tabs also step down a size on mobile (text-sm,
              tighter padding) so the first row of the wrapped
              cluster holds as many as will fit rather than
              breaking one-per-line. The step-up to desktop
              sizing happens at `md` (768px), not `sm` (640px):
              at full size the six tabs plus toggle need ~680px,
              which does not fit a 640px tablet, so bumping at
              `sm` would leave it wrapping on tablets for no
              reason. `ml-auto` keeps the cluster right-aligned
              on both rows. */}
          <div className="flex flex-wrap items-center justify-end gap-x-2 md:gap-x-3 gap-y-1 ml-auto">
            {navTabs.filter((tab) => !tab.hidden).map((tab) => {
              const isActive = isActiveTab(pathname, tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(pathForTab(tab.id))}
                  className={`
                    px-2 md:px-4 py-1.5 md:py-2 text-sm md:text-base font-medium rounded-md transition-all duration-200 whitespace-nowrap
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
            <div className="w-px h-7 bg-divider mx-0.5 md:mx-2" aria-hidden="true" />
            <ThemeToggle />
          </div>

        </div>
      </div>
    </nav>
  );
}
