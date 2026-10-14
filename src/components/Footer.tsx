"use client";

import React from "react";
import { ArrowUp, Terminal, ShieldCheck } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#D4AF37]/25 bg-[#080604]/95 backdrop-blur-2xl py-12 px-4 sm:px-6 lg:px-8 relative z-10 font-mono shadow-[0_-10px_35px_rgba(0,0,0,0.85)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Monogram, Identity, Motto, Copyright */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <span className="font-extrabold text-base tracking-[0.25em] text-[#ffffff] drop-shadow-sm">
              HIMANG
            </span>
            <span className="text-[#F5D77F]">•</span>
            <span className="text-[11px] text-[#A89F8B] tracking-wider uppercase font-semibold">
              BUILD • CREATE • EXPERIMENT • LEARN
            </span>
          </div>

          <p className="text-xs text-[#7A705E]">
            © 2026 HIMANG. ALL SYSTEMS OPERATIONAL.
          </p>
        </div>

        {/* Center: System Status Beacon */}
        <div className="flex items-center space-x-2 bg-[#141009] border border-[#D4AF37]/40 rounded-full px-3.5 py-1 text-xs shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5B842] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5D77F]" />
          </span>
          <span className="text-[#F5D77F] tracking-wider text-[11px] font-semibold">
            GOLDEN_CORE // ONLINE
          </span>
        </div>

        {/* Right side: Direct Links & Back to Top */}
        <div className="flex items-center space-x-6 text-xs text-[#D4CEBF]">
          <a
            href="https://github.com/himang707"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F5D77F] transition-colors"
            data-cursor="OPEN"
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/himangpanchal"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F5D77F] transition-colors"
            data-cursor="OPEN"
          >
            LINKEDIN
          </a>
          <a
            href="mailto:himangpanchal707@gmail.com"
            className="hover:text-[#F5D77F] transition-colors"
            data-cursor="OPEN"
          >
            EMAIL
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-2 rounded-lg bg-[#141009] border border-[#D4AF37]/35 hover:border-[#F5D77F] hover:bg-[#1E170A] hover:text-[#fff] transition-all ml-2"
            title="Return to Orbit"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#F5D77F]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
