"use client";

import React, { useState } from "react";
import { SparkleStar, HPLogoBadge } from "./Doodles";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="bg-white border-2 border-black rounded-xl md:rounded-2xl px-5 py-3 md:py-3.5 shadow-brutal flex items-center justify-between transition-all">
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

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-space font-semibold text-sm">
          <a
            href="#about"
            className="text-black hover:text-gray-600 relative py-1 hover:underline underline-offset-4 decoration-2 decoration-[#FFE57F] transition-all"
          >
            About
          </a>
          <a
            href="#skills"
            className="text-black hover:text-gray-600 relative py-1 hover:underline underline-offset-4 decoration-2 decoration-[#A5D8FF] transition-all"
          >
            Arsenal
          </a>
          <a
            href="#projects"
            className="text-black hover:text-gray-600 relative py-1 hover:underline underline-offset-4 decoration-2 decoration-[#FFAEC8] transition-all"
          >
            Projects
          </a>
          <a
            href="#hackathons"
            className="text-black hover:text-gray-600 relative py-1 hover:underline underline-offset-4 decoration-2 decoration-[#D8B4FE] transition-all"
          >
            Hackathons
          </a>
          <a
            href="#testimonials"
            className="text-black hover:text-gray-600 relative py-1 hover:underline underline-offset-4 decoration-2 decoration-[#A7F3D0] transition-all"
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white border-2 border-black rounded-xl p-4 shadow-brutal flex flex-col gap-3 font-space font-bold text-base">
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
