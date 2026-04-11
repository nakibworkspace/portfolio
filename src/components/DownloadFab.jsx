// ============================================================
// DownloadFab.jsx — FLOATING "DOWNLOAD CV" BUTTON
//
// HOW IT WORKS:
//   - Fixed position at bottom-right corner of the screen
//   - Always visible (z-50 = on top of everything)
//   - Clicking it downloads the file at personalInfo.cvLink
//   - The "download" attribute tells the browser to download
//     instead of navigating to the file
//
// HOW TO MODIFY:
//   - To change the button text: edit "Download CV" below
//   - To change the CV file: edit cvLink in data.js
//   - To change the color: edit "bg-emerald-500" (Tailwind color)
//   - To change position: edit "bottom-6 right-6"
// ============================================================

import { personalInfo } from '../data';
import { Download } from 'lucide-react';

export default function DownloadFab() {
  return (
    <a
      href={personalInfo.cvLink}
      download   // ← This attribute makes it download instead of open
      className="
        fixed bottom-6 right-6 z-50
        flex items-center gap-2
        px-4 py-2.5
        bg-emerald-500 hover:bg-emerald-400
        text-slate-950 font-semibold text-sm
        rounded-full
        shadow-lg shadow-emerald-500/20
        hover:shadow-emerald-400/30
        transition-all duration-200
        hover:scale-105       // slightly bigger on hover
        active:scale-95       // slightly smaller when clicking
      "
      aria-label="Download CV"
    >
      <Download className="w-4 h-4" />
      Download CV
    </a>
  );
}