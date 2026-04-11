// ============================================================
// Home.jsx — THE LANDING SECTION (Bento Grid)
//
// HOW IT WORKS:
//   - Uses a CSS Grid to create a "bento box" layout
//   - The main card spans 2 columns and 2 rows (large)
//   - Smaller cards fill the remaining spaces
//   - Each card has a staggered entrance animation
//
// HOW TO MODIFY:
//   - To change what a card says: edit the personalInfo references
//   - To add a new card: copy one card block, change content and
//     the animate-stagger-N class (add new ones in index.css)
//   - To change the grid layout: adjust md:col-span and md:row-span
// ============================================================

import { personalInfo } from '../data';
// Import icons from lucide-react (each is just an SVG component)
import { Briefcase, GraduationCap, Microscope, MapPin, Mail } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* ─── BENTO GRID ────────────────────────────────── */}
      {/* grid-cols-1 = 1 column on mobile */}
      {/* md:grid-cols-3 = 3 columns on medium screens and up */}
      {/* gap-4 = 16px gap between cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* ─── CARD 1: Main Hero (large) ──────────────── */}
        {/* md:col-span-2 = takes 2 of 3 columns */}
        {/* md:row-span-2 = takes 2 rows tall */}
        <div className="md:col-span-2 md:row-span-2 bg-slate-900/50 border border-slate-800/60 rounded-2xl p-8 flex flex-col justify-center animate-stagger-1">
          {/* Small green label above name */}
          <p className="text-emerald-400 text-sm font-medium tracking-wider uppercase mb-3">
            {personalInfo.tagline}
          </p>
          {/* Your full name — very large */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-50 leading-tight mb-4">
            {personalInfo.name}
          </h1>
          {/* The headline sentence */}
          <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
            {personalInfo.headline}
          </p>

          {/* Quick links row */}
          <div className="flex gap-4 mt-6">
            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"        // opens in new tab
                rel="noopener noreferrer" // security best practice for target="_blank"
                className="text-sm text-slate-500 hover:text-emerald-400 transition-colors"
              >
                GitHub →
              </a>
            )}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 hover:text-emerald-400 transition-colors"
              >
                LinkedIn →
              </a>
            )}
          </div>
        </div>

        {/* ─── CARD 2: Current Role ───────────────────── */}
        <div className="bg-slate-900/50 border border-slate-800/60 rounded-2xl p-6 flex flex-col justify-center animate-stagger-2 hover:border-slate-700/60 transition-colors">
          <Briefcase className="w-5 h-5 text-emerald-400 mb-3" />
          <p className="text-sm text-slate-500 font-medium">Current Role</p>
          <p className="text-slate-200 font-semibold mt-1">{personalInfo.role}</p>
          <p className="text-emerald-400 text-sm mt-0.5">{personalInfo.company}</p>
        </div>

        {/* ─── CARD 3: Education ──────────────────────── */}
        <div className="bg-slate-900/50 border border-slate-800/60 rounded-2xl p-6 flex flex-col justify-center animate-stagger-3 hover:border-slate-700/60 transition-colors">
          <GraduationCap className="w-5 h-5 text-emerald-400 mb-3" />
          <p className="text-sm text-slate-500 font-medium">Education</p>
          <p className="text-slate-200 font-semibold mt-1">BSc MEIE</p>
          <p className="text-slate-400 text-sm mt-0.5">CUET · CGPA 3.29</p>
        </div>

        {/* ─── CARD 4: Research Focus ─────────────────── */}
        <div className="bg-slate-900/50 border border-slate-800/60 rounded-2xl p-6 flex flex-col justify-center animate-stagger-4 hover:border-slate-700/60 transition-colors">
          <Microscope className="w-5 h-5 text-emerald-400 mb-3" />
          <p className="text-sm text-slate-500 font-medium">Research Focus</p>
          <p className="text-slate-200 font-semibold mt-1 text-sm">Neural NLP · VLMs</p>
          <p className="text-slate-400 text-sm mt-0.5">Robot Navigation</p>
        </div>

        {/* ─── CARD 5: Location ───────────────────────── */}
        <div className="bg-slate-900/50 border border-slate-800/60 rounded-2xl p-6 flex flex-col justify-center animate-stagger-5 hover:border-slate-700/60 transition-colors">
          <MapPin className="w-5 h-5 text-emerald-400 mb-3" />
          <p className="text-sm text-slate-500 font-medium">Based In</p>
          <p className="text-slate-200 font-semibold mt-1">{personalInfo.location}</p>
        </div>

        {/* ─── CARD 6: Email ──────────────────────────── */}
        <div className="bg-slate-900/50 border border-slate-800/60 rounded-2xl p-6 flex flex-col justify-center animate-stagger-6 hover:border-slate-700/60 transition-colors">
          <Mail className="w-5 h-5 text-emerald-400 mb-3" />
          <p className="text-sm text-slate-500 font-medium">Contact</p>
          {/* mailto: link opens the user's email app */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-slate-200 font-semibold mt-1 text-sm hover:text-emerald-400 transition-colors"
          >
            {personalInfo.email}
          </a>
        </div>

      </div>
    </div>
  );
}