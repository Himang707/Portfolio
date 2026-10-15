"use client";

import React, { useState, useEffect } from "react";
import { SparkleStar, HandDrawnStar, CurvedArrow, GeometricCross } from "./Doodles";

const ROLES = [
  "Frontend Developer",
  "React & Next.js Engineer",
  "AI & Machine Learning Enthusiast",
  "Computer Vision Builder",
  "Full Stack Developer",
];

const REAL_STATS = [
  { value: "5+", label: "Projects Shipped", note: "Production ready" },
  { value: "2", label: "Hackathons", note: "iQOO & SIH '26" },
  { value: "15+", label: "Technologies", note: "Tools in arsenal" },
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIdx((p) => (p + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative pt-10 pb-16 md:pt-16 md:pb-24 px-4 md:px-8 max-w-7xl mx-auto w-full overflow-hidden">
      {/* Background Scrapbook Floating Decorations */}
      <div className="absolute top-8 left-6 text-black/15 select-none pointer-events-none hidden lg:block">
        <GeometricCross className="w-5 h-5" />
      </div>
      <div className="absolute top-20 right-16 text-black/15 select-none pointer-events-none hidden lg:block">
        <GeometricCross className="w-6 h-6" />
      </div>
      <div className="absolute bottom-10 left-1/3 text-black/15 select-none pointer-events-none hidden lg:block">
        <GeometricCross className="w-4 h-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Himang's Real Headline, Bio & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 md:space-y-7 z-10">
          {/* Top Scrapbook Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFAEC8] border-2 border-black rounded-full shadow-brutal-xs font-space font-bold text-xs uppercase tracking-wider -rotate-1 hover:rotate-0 transition-transform">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
              Open to full-time roles &amp; internships
              <SparkleStar className="w-3.5 h-3.5 text-black" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-black rounded-full shadow-brutal-xs font-space font-bold text-xs rotate-1 text-gray-800">
              <span>📍</span> Ahmedabad, Gujarat · Rai University &apos;29
            </div>
          </div>

          {/* Oversized Headline */}
          <div className="space-y-2">
            <h1 className="font-space font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-black">
              I design ✍️ <br className="hidden sm:inline" />
              top notch{" "}
              <span className="relative inline-block mt-1 sm:mt-0">
                {/* Pastel Yellow Highlight behind "websites" */}
                <span className="relative z-10 px-3 py-0.5 bg-[#FFE57F] border-2 border-black rounded-md shadow-brutal-sm -rotate-1 inline-block">
                  websites
                </span>
              </span>{" "}
              &amp; AI apps.
            </h1>

            {/* Dynamic Rotating Role Badge */}
            <div className="pt-1 flex items-center gap-2">
              <span className="font-space font-bold text-xs uppercase tracking-widest text-gray-500">
                ROLE:
              </span>
              <span className="font-space font-extrabold text-base sm:text-lg text-black bg-[#A5D8FF] px-2.5 py-0.5 border border-black rounded shadow-brutal-xs">
                {ROLES[roleIdx]}
              </span>
            </div>
          </div>

          {/* Himang's Real Bio */}
          <p className="font-space text-base md:text-lg text-gray-700 max-w-xl leading-relaxed">
            Hey, I&apos;m <strong className="text-black font-extrabold underline decoration-[#FFE57F] decoration-4">Himang Panchal</strong> — a developer and designer who loves building thoughtful, responsive web applications and experimenting with machine learning and computer vision. I care about the details — making software that is fast, reliable, and weightless to use.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            {/* Light-Blue 'See Portfolio' Button */}
            <a
              href="#projects"
              className="bg-[#A5D8FF] text-black font-space font-extrabold text-base px-7 py-3.5 rounded-xl border-2 border-black shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all flex items-center gap-2.5 group"
            >
              <span>See Projects</span>
              <span className="text-lg group-hover:translate-x-1 transition-transform">➔</span>
            </a>

            {/* GitHub Profile Button */}
            <a
              href="https://github.com/himang707"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black font-space font-bold text-base px-6 py-3.5 rounded-xl border-2 border-black shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all flex items-center gap-2"
            >
              <span>🐙 GitHub (@himang707)</span>
            </a>

            {/* Contact Button */}
            <a
              href="#contact"
              className="bg-[#FFE57F] text-black font-space font-bold text-base px-6 py-3.5 rounded-xl border-2 border-black shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all"
            >
              Get in Touch 💬
            </a>
          </div>

          {/* Himang's Real Stats Row */}
          <div className="pt-3 grid grid-cols-3 gap-4 sm:gap-6 border-t-2 border-black/10 w-full max-w-lg">
            {REAL_STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="font-space font-black text-2xl sm:text-3xl text-black tracking-tight">
                  {s.value}
                </span>
                <span className="font-space font-bold text-xs text-gray-800 uppercase tracking-wider">
                  {s.label}
                </span>
                <span className="text-[11px] text-gray-500 font-medium">
                  {s.note}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Personality Badges with Emojis to fulfill whitespace */}
          <div className="pt-1 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F0] border border-black rounded-lg text-xs font-space font-extrabold text-black shadow-brutal-xs hover:-translate-y-0.5 transition-transform">
              <span>☕</span> Chai Fueled
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F0] border border-black rounded-lg text-xs font-space font-extrabold text-black shadow-brutal-xs hover:-translate-y-0.5 transition-transform">
              <span>⚡</span> 60 FPS Polish
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F0] border border-black rounded-lg text-xs font-space font-extrabold text-black shadow-brutal-xs hover:-translate-y-0.5 transition-transform">
              <span>🚀</span> Rapid 0-to-1 Shipping
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F0] border border-black rounded-lg text-xs font-space font-extrabold text-black shadow-brutal-xs hover:-translate-y-0.5 transition-transform">
              <span>🤖</span> Applied AI
            </span>
          </div>
        </div>

        {/* Right Column: Playful Gray Browser-Window Illustration with Smiley Face & Stickers */}
        <div className="lg:col-span-5 relative flex justify-center mt-6 lg:mt-0">
          {/* Overlapping Curved Arrow Doodle */}
          <div className="absolute -top-10 -left-6 z-20 hidden md:block">
            <CurvedArrow className="w-16 h-14" color="#111111" />
            <span className="font-space font-bold text-xs bg-white border border-black px-2 py-0.5 rounded shadow-brutal-xs -rotate-6 inline-block">
              Himang&apos;s Lab!
            </span>
          </div>

          {/* Decorative Stickers around the window */}
          {/* Top-Right Lavender '5+ SHIPPED BUILDS' Sticker */}
          <div className="absolute -top-5 -right-3 z-30 bg-[#D8B4FE] text-black border-2 border-black font-space font-black text-xs md:text-sm px-4 py-1.5 rounded-full shadow-brutal-sm rotate-6 hover:rotate-12 transition-transform cursor-pointer">
            ✨ 5+ SHIPPED BUILDS
          </div>

          {/* Bottom-Left Pastel Yellow 'CORE TECH' Sticker */}
          <div className="absolute -bottom-4 -left-4 z-30 bg-[#FFE57F] text-black border-2 border-black font-space font-extrabold text-xs md:text-sm px-3.5 py-1.5 rounded-lg shadow-brutal-sm -rotate-6 hover:-rotate-12 transition-transform">
            ⚡ REACT · NEXT.JS · PYTHON
          </div>

          {/* Bottom-Right Pastel Pink Star Sticker */}
          <div className="absolute -bottom-5 -right-4 z-30 bg-[#FFAEC8] border-2 border-black p-2 rounded-xl shadow-brutal-sm rotate-12">
            <HandDrawnStar className="w-7 h-7 text-white" />
          </div>

          {/* Outer Gray Browser Window */}
          <div className="w-full max-w-md bg-[#EBE7DF] border-2 border-black rounded-2xl p-3 md:p-4 shadow-brutal-lg transition-transform hover:-translate-y-1">
            {/* Browser Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-3">
              {/* Traffic light window controls */}
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#FF6B6B] border-2 border-black inline-block"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#FFD93D] border-2 border-black inline-block"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#6BCB77] border-2 border-black inline-block"></span>
              </div>

              {/* Address bar */}
              <div className="flex-1 max-w-[200px] mx-3 bg-white border-2 border-black rounded-md px-2.5 py-0.5 text-[11px] font-space font-medium text-gray-600 flex items-center justify-between">
                <span className="truncate">himang.dev/active-status</span>
                <span className="text-gray-400 text-[10px]">🔒</span>
              </div>

              {/* Right decorative pill */}
              <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>
            </div>

            {/* Browser Inner Canvas with Layered Borders & Himang's Portrait */}
            <div className="relative bg-white border-2 border-black rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center min-h-[360px] overflow-hidden group">
              {/* Layered Inner Pastel Border Frame */}
              <div className="absolute inset-3 border-2 border-dashed border-[#111111]/30 rounded-lg pointer-events-none z-10"></div>

              {/* Tilted Accent Layer inside */}
              <div className="absolute w-52 h-56 bg-[#A5D8FF]/35 rounded-2xl rotate-6 pointer-events-none"></div>
              <div className="absolute w-52 h-56 bg-[#FFAEC8]/35 rounded-2xl -rotate-6 pointer-events-none"></div>

              {/* Himang's Portrait Photo Frame */}
              <div className="relative z-10 w-52 sm:w-60 h-64 sm:h-72 rounded-xl border-2 border-black overflow-hidden shadow-brutal-sm bg-[#FAF7F0] transform group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/himang-portrait.jpg"
                  alt="Himang Panchal"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Developer Status Badge underneath photo */}
              <div className="relative z-20 -mt-3.5 bg-white border-2 border-black px-4 py-1.5 rounded-full font-space font-bold text-xs shadow-brutal-xs flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6BCB77] border border-black animate-pulse"></span>
                <span>Himang Panchal · @himang707 · Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
