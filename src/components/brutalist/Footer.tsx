"use client";

import React from "react";
import { SparkleStar, HPLogoBadge } from "./Doodles";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#FAF7F0] border-t-2 border-black py-10 md:py-14 px-4 md:px-8 mt-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b-2 border-black/10">
          {/* Identity Column */}
          <div className="flex items-center gap-3">
            <HPLogoBadge className="w-10 h-10" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-space font-extrabold text-lg sm:text-xl tracking-tight text-black">
                  Himang Panchal
                </span>
                <SparkleStar className="w-3.5 h-3.5 text-[#FFAEC8]" />
              </div>
              <p className="font-space text-xs text-gray-600">
                Frontend Developer &amp; AI/ML Enthusiast · Ahmedabad, Gujarat, India
              </p>
            </div>
          </div>

          {/* Quick Nav Anchor Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-space font-bold text-xs text-black">
            <a href="#hero" className="hover:underline underline-offset-4 decoration-2 decoration-[#FFE57F]">
              Overview
            </a>
            <a href="#about" className="hover:underline underline-offset-4 decoration-2 decoration-[#A5D8FF]">
              About
            </a>
            <a href="#skills" className="hover:underline underline-offset-4 decoration-2 decoration-[#FFAEC8]">
              Arsenal
            </a>
            <a href="#projects" className="hover:underline underline-offset-4 decoration-2 decoration-[#D8B4FE]">
              Projects
            </a>
            <a href="#hackathons" className="hover:underline underline-offset-4 decoration-2 decoration-[#FFE57F]">
              Hackathons
            </a>
            <a href="#contact" className="hover:underline underline-offset-4 decoration-2 decoration-[#A5D8FF]">
              Contact
            </a>
          </div>

          {/* Real Social & Contact Links */}
          <div className="flex items-center gap-2.5">
            {/* GitHub */}
            <a
              href="https://github.com/himang707"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-lg bg-white border-2 border-black flex items-center justify-center font-space font-bold text-base shadow-brutal-xs hover:bg-[#FFE57F] hover:-translate-y-0.5 transition-all"
            >
              🐙
            </a>

            {/* Email */}
            <a
              href="mailto:himangpanchal707@gmail.com"
              aria-label="Email Himang"
              className="w-10 h-10 rounded-lg bg-white border-2 border-black flex items-center justify-center font-space font-bold text-base shadow-brutal-xs hover:bg-[#A5D8FF] hover:-translate-y-0.5 transition-all"
            >
              ✉️
            </a>

            {/* Phone */}
            <a
              href="tel:+917426053260"
              aria-label="Call Himang"
              className="w-10 h-10 rounded-lg bg-white border-2 border-black flex items-center justify-center font-space font-bold text-base shadow-brutal-xs hover:bg-[#FFAEC8] hover:-translate-y-0.5 transition-all"
            >
              📞
            </a>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-10 h-10 rounded-lg bg-[#FAF7F0] border-2 border-black flex items-center justify-center font-space font-extrabold text-sm shadow-brutal-xs hover:bg-[#D8B4FE] hover:-translate-y-0.5 transition-all ml-2"
            >
              ↑
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-space text-xs text-gray-600">
          <div>
            &copy; {new Date().getFullYear()} Himang Panchal. Crafted with passion, code &amp; lots of tea ☕
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span>Rai University &apos;29</span>
            <span>•</span>
            <span>Built with React, Next.js &amp; Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
