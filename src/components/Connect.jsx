// ============================================================
// Connect.jsx — CONTACT (BANNER LAYOUT, NO CARDS)
//
// A single-page layout that uses a full-width email banner,
// inline social links, a horizontal metadata strip, and a
// primary CV download CTA. No card surfaces anywhere.
// ============================================================

import { useState } from 'react';
import { personalInfo } from '../data';
import {
  Mail, Github, Linkedin, MapPin, Copy, Check,
  Briefcase, ArrowUpRight, Download,
} from 'lucide-react';

function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="
        group w-full text-left
        py-5
        flex items-center gap-4
        transition-colors
      "
      aria-label={`Copy email address ${email}`}
    >
      <Mail className="w-5 h-5 text-accent-text shrink-0" />
      <span className="flex-1 min-w-0 text-lg sm:text-xl text-fg font-medium truncate">
        {email}
      </span>
      <span className="shrink-0 flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-fg-mute group-hover:text-accent-text transition-colors">
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            Copied
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            Copy
          </>
        )}
      </span>
    </button>
  );
}

function SocialLink({ href, icon: Icon, label, handle }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group inline-flex items-center gap-3
        py-3
        transition-colors
      "
    >
      <Icon className="w-4 h-4 text-sky-light group-hover:text-accent-text transition-colors" />
      <span className="text-fg-dim group-hover:text-fg text-sm font-medium transition-colors">
        {label}
      </span>
      <span className="text-fg-mute text-sm truncate">— {handle}</span>
      <ArrowUpRight className="w-3.5 h-3.5 text-fg-mute group-hover:text-accent-text group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-auto" />
    </a>
  );
}

export default function Connect() {
  return (
    <div className="max-w-3xl">

      {/* HEADER */}
      <div>
        <h2 className="text-sm uppercase tracking-[0.25em] text-sky-light font-semibold">
          Connect
        </h2>

        <h3 className="mt-6 text-3xl sm:text-4xl font-bold text-fg tracking-tight">
          Let's build something.
        </h3>
        <div className="mt-4 h-px w-24 accent-line-multi" aria-hidden="true" />

        <p className="mt-6 text-fg-dim leading-relaxed">
          Open to research collaborations, PhD conversations, and interesting
          MLOps / data engineering roles. The fastest way to reach me is
          email — I usually reply within a day.
        </p>
      </div>

      {/* EMAIL BANNER — full-width, no card */}
      <div className="mt-10">
        <p className="text-[11px] uppercase tracking-[0.25em] text-sky-light mb-3">
          Email
        </p>
        <CopyEmail email={personalInfo.email} />
      </div>

      {/* SOCIALS — inline rows, no cards */}
      <div className="mt-10 space-y-1">
        <p className="text-[11px] uppercase tracking-[0.25em] text-sky-light mb-3">
          Find me on
        </p>
        <div className="flex flex-col">
          {personalInfo.github && (
            <SocialLink
              href={personalInfo.github}
              icon={Github}
              label="GitHub"
              handle={personalInfo.github.replace('https://', '')}
            />
          )}
          {personalInfo.linkedin && (
            <SocialLink
              href={personalInfo.linkedin}
              icon={Linkedin}
              label="LinkedIn"
              handle={personalInfo.linkedin.replace('https://', '')}
            />
          )}
        </div>
      </div>

      {/* METADATA STRIP — inline, no cards */}
      <div className="mt-12">
        <div className="flex flex-col sm:flex-row sm:items-center gap-y-3 gap-x-8 text-sm">
          <span className="flex items-center gap-2 text-fg-dim">
            <MapPin className="w-4 h-4 text-sky-light" />
            {personalInfo.location}
          </span>
          <span className="hidden sm:inline text-sky-dark" aria-hidden="true">·</span>
          <span className="flex items-center gap-2 text-fg-dim">
            <Briefcase className="w-4 h-4 text-sky-light" />
            {personalInfo.role} <span className="text-accent-text">@ {personalInfo.company}</span>
          </span>
        </div>
      </div>

      {/* CV DOWNLOAD — primary CTA, only place to grab the resume */}
      <div className="mt-10">
        <a
          href={personalInfo.cvLink}
          download
          className="
            group inline-flex items-center gap-2
            px-6 py-3
            bg-accent hover:bg-accent/90
            text-white font-semibold text-sm uppercase tracking-[0.15em]
            rounded-full
            shadow-lg shadow-accent/20
            hover:shadow-accent/40
            transition-all duration-200
            hover:scale-[1.02]
            active:scale-95
          "
          aria-label="Download CV"
        >
          <Download className="w-4 h-4" />
          Download CV
        </a>
        <p className="mt-3 text-xs text-fg-mute max-w-lg">
          A single PDF — education, experience, selected projects. Updated as
          of the current semester.
        </p>
      </div>

      <p className="mt-10 text-xs text-fg-mute max-w-lg">
        Prefer a quick intro? Drop a line with what you're working on and
        what you'd like to chat about — I read every message.
      </p>
    </div>
  );
}