// ============================================================
// Home.jsx — LANDING SECTION (Vertical Stack Layout)
//
// Changed from bento grid to a clean one-by-one vertical layout.
// Each info block is a simple row: icon on left, text on right.
// ============================================================

import { personalInfo, education, research } from '../data';
import { MapPin, Briefcase, GraduationCap, Microscope } from 'lucide-react';

export default function Home() {
  // Take just the first education entry for the quick summary
  const edu = education[0];
  // Take the first research entry for the quick summary
  const res = research[0];

  return (
    <div className="space-y-10 max-w-2xl">

      {/* ─── NAME + HEADLINE ───────────────────────────── */}
      <div>
        <p className="text-emerald-400 text-sm font-medium tracking-wider uppercase mb-3">
          {personalInfo.tagline}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-50 leading-tight mb-4">
          {personalInfo.name}
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          {personalInfo.headline}
        </p>
      </div>

      {/* Thin divider line */}
      <div className="border-t border-slate-800/60" />

      {/* ─── INFO ROWS (one by one) ────────────────────── */}
      <div className="space-y-5">

        {/* Based In */}
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg bg-slate-800/60 flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Based In</p>
            <p className="text-slate-200 mt-0.5">{personalInfo.location}</p>
          </div>
        </div>

        {/* Current Role */}
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg bg-slate-800/60 flex items-center justify-center shrink-0 mt-0.5">
            <Briefcase className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Current Role</p>
            <p className="text-slate-200 mt-0.5">{personalInfo.role} <span className="text-emerald-400">@ {personalInfo.company}</span></p>
          </div>
        </div>

        {/* Education */}
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg bg-slate-800/60 flex items-center justify-center shrink-0 mt-0.5">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Education</p>
            <p className="text-slate-200 mt-0.5">{edu.degree}</p>
            <p className="text-slate-400 text-sm mt-0.5">{edu.institution} · CGPA {edu.cgpa}</p>
          </div>
        </div>

        {/* Research Interest */}
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg bg-slate-800/60 flex items-center justify-center shrink-0 mt-0.5">
            <Microscope className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Research Interest</p>
            <p className="text-slate-200 mt-0.5">{res.title}</p>
            <p className="text-slate-400 text-sm mt-0.5">{res.description.substring(0, 100)}...</p>
          </div>
        </div>

      </div>

      {/* Thin divider line */}
      <div className="border-t border-slate-800/60" />

      {/* Quick links */}
      <div className="flex gap-4">
        {personalInfo.github && (
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
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
  );
}