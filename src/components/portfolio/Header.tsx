"use client";

import React, { useState } from "react";
import { SparkleStar, HPLogoBadge } from "./Doodles";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="bg-white/80 backdrop-blur-xl border-2 border-black rounded-xl md:rounded-2xl px-5 py-2.5 md:py-3 shadow-brutal flex items-center justify-between transition-all">
        {/* Wordmark with Himang Panchal's identity and custom logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 font-bold text-lg md:text-xl tracking-tight text-black hover:opacity-85 transition-opacity group"
        >
          <HPLogoBadge className="w-9 h-9 sm:w-10 sm:h-10" />
          <div className="flex flex-col leading-tight">
            <span className="font-space font-extrabold text-black">Himang Panchal</span>
            <span className="text-[10px] font-space font-semibold text-gray-500 hidden sm:block">
              Frontend &amp; AI/ML Builder
            </span>
          </div>
          <SparkleStar className="w-4 h-4 text-[#D8B4FE] animate-spin-slow hidden sm:block ml-1" />
        </a>

        {/* Desktop Navigation Links with Frosted Glassmorphism Pill */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-black/[0.04] backdrop-blur-md border border-black/15 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),_0_2px_6px_rgba(0,0,0,0.03)] font-space font-bold text-sm">
          <a
            href="#about"
            className="px-3.5 py-1.5 rounded-full text-black/85 hover:text-black hover:bg-[#FFE57F] hover:border-black hover:shadow-brutal-xs border border-transparent transition-all duration-150"
          >
            About
          </a>
          <a
            href="#skills"
            className="px-3.5 py-1.5 rounded-full text-black/85 hover:text-black hover:bg-[#A5D8FF] hover:border-black hover:shadow-brutal-xs border border-transparent transition-all duration-150"
          >
            Arsenal
          </a>
          <a
            href="#projects"
            className="px-3.5 py-1.5 rounded-full text-black/85 hover:text-black hover:bg-[#FFAEC8] hover:border-black hover:shadow-brutal-xs border border-transparent transition-all duration-150"
          >
            Projects
          </a>
          <a
            href="#hackathons"
            className="px-3.5 py-1.5 rounded-full text-black/85 hover:text-black hover:bg-[#D8B4FE] hover:border-black hover:shadow-brutal-xs border border-transparent transition-all duration-150"
          >
            Hackathons
          </a>
          <a
            href="#testimonials"
            className="px-3.5 py-1.5 rounded-full text-black/85 hover:text-black hover:bg-[#A7F3D0] hover:border-black hover:shadow-brutal-xs border border-transparent transition-all duration-150"
          >
            Reviews
          </a>
        </nav>

        {/* Hire Me / Let's Talk CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="bg-[#FFE57F] text-black font-space font-bold text-sm px-5 py-2 rounded-lg border-2 border-black shadow-brutal-sm hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all"
          >
            Get In Touch ✍️
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 rounded-lg bg-[#FFE57F] border-2 border-black flex flex-col items-center justify-center gap-1 shadow-brutal-xs"
          aria-label="Toggle menu"
        >
          <span className="w-5 h-0.5 bg-black"></span>
          <span className="w-5 h-0.5 bg-black"></span>
          <span className="w-5 h-0.5 bg-black"></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown with Frosted Glassmorphism */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white/85 backdrop-blur-xl border-2 border-black rounded-xl p-4 shadow-brutal flex flex-col gap-3 font-space font-bold text-base">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-[#FAF7F0] rounded"
          >
            About
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-[#FAF7F0] rounded"
          >
            Arsenal &amp; Skills
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-[#FAF7F0] rounded"
          >
            Projects
          </a>
          <a
            href="#hackathons"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-[#FAF7F0] rounded"
          >
            Hackathons &amp; Sprints
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-[#FAF7F0] rounded"
          >
            Reviews
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-[#FFE57F] text-center py-2.5 rounded-lg border-2 border-black shadow-brutal-xs"
          >
            Get In Touch ✍️
          </a>
        </div>
      )}
    </header>
  );
}
