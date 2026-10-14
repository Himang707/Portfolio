"use client";

import React from "react";
import { ArrowUp, Github, Mail } from "lucide-react";
import HPLogo from "@/components/HPLogo";

const NAV_LINKS = [
  { id: "hero", label: "Overview" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "hackathons", label: "Hackathons" },
  { id: "contact", label: "Contact" },
];

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 border-t border-[rgba(148,222,192,0.10)] overflow-hidden" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/[0.06]">
          {/* Identity Column */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="flex items-center gap-3">
              <HPLogo size={38} variant="natural" />
              <div>
                <div className="font-bold text-white text-[15px] tracking-tight">Himang Panchal</div>
                <div className="text-[12px] text-white/50">Frontend &amp; AI/ML Developer</div>
              </div>
            </div>

            <p className="text-[13px] text-white/60 leading-[1.8] max-w-sm tracking-tight">
              Building simple, thoughtful web experiences and exploring machine learning. Based in Rajasthan, India.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-[11px] font-mono-code text-[#94DEC0]/80 uppercase tracking-[0.2em]">
              Navigation
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-[13px] text-white/60 hover:text-[#94DEC0] hover:translate-x-1 transition-all duration-800 focus:outline-none"
                  style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[11px] font-mono-code text-[#94DEC0]/80 uppercase tracking-[0.2em]">
              Contact
            </div>
            <div className="space-y-2">
              <a
                href="mailto:himangpanchal707@gmail.com"
                className="flex items-center gap-2 text-[13px] text-white/70 hover:text-white transition-colors duration-800"
                style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
              >
                <Mail className="w-3.5 h-3.5 text-[#94DEC0]" />
                <span>himangpanchal707@gmail.com</span>
              </a>
              <a
                href="https://github.com/himang707"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] text-white/70 hover:text-white transition-colors duration-800"
                style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
              >
                <Github className="w-3.5 h-3.5" />
                <span>github.com/himang707</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/40">
          <div>
            &copy; {new Date().getFullYear()} Himang Panchal. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.07] text-white/65 hover:text-white antigravity-button text-[12px] focus:outline-none"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3 text-[#94DEC0]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
