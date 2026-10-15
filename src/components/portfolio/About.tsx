"use client";

import React from "react";
import { SparkleStar, GeometricCross } from "./Doodles";

const PILLARS = [
  {
    num: "01",
    title: "Simplicity First",
    sub: "Intuitive Interaction",
    color: "bg-[#FFE57F]",
    body: "Great software steps aside and lets users focus. I prioritize clean visual hierarchy, responsive touchpoints, and zero friction.",
  },
  {
    num: "02",
    title: "Modern Web Architecture",
    sub: "React & Next.js Ecosystem",
    color: "bg-[#A5D8FF]",
    body: "Crafting performant web applications using React, Next.js, TypeScript, and Tailwind with clean, maintainable component architecture.",
  },
  {
    num: "03",
    title: "Machine Learning & AI",
    sub: "Python & Applied Intelligence",
    color: "bg-[#FFAEC8]",
    body: "Building practical computer vision tools, vector embedding retrievers, and ML pipelines with PyTorch, TensorFlow, and Scikit-learn.",
  },
  {
    num: "04",
    title: "Craft & Rapid Sprints",
    sub: "Constant Zero-to-One Shipping",
    color: "bg-[#D8B4FE]",
    body: "I learn by shipping real things. From 36-hour hackathon sprints to open-source prototypes, I love pushing the boundaries of what's possible.",
  },
];

const TOOLKIT = [
  "React, Next.js & TypeScript",
  "Tailwind CSS & Component Systems",
  "Python & Scientific Computing",
  "PyTorch, TensorFlow & Scikit-learn",
  "Computer Vision & OpenCV",
  "FastAPI, PostgreSQL & Vector DBs",
];

export default function About() {
  return (
    <section id="about" className="relative py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* Background Decorative Crosses */}
      <div className="absolute top-6 right-8 text-black/15 pointer-events-none hidden sm:block">
        <GeometricCross className="w-5 h-5" />
      </div>

      <div className="bg-white border-2 border-black rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-12 shadow-brutal-lg">
        {/* Top Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFE57F] border-2 border-black rounded-md font-space font-bold text-xs uppercase tracking-wider mb-6 shadow-brutal-xs">
          <span>ABOUT HIMANG PANCHAL</span>
          <SparkleStar className="w-3.5 h-3.5 text-black" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Personal Story & Toolkit */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-space font-extrabold text-3xl sm:text-4xl md:text-5xl text-black tracking-tight leading-tight">
              Caring about the details, <br />
              <span className="text-gray-500 font-bold">and building with purpose.</span>
            </h2>

            <div className="space-y-4 font-space text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                I&apos;m <strong className="text-black font-extrabold underline decoration-[#FFE57F] decoration-4">Himang Panchal</strong>, currently pursuing my degree at <strong className="text-black font-bold">Rai University &apos;29</strong>, based in <strong className="text-black font-bold">Ahmedabad, Gujarat, India</strong>.
              </p>
              <p>
                My work bridges the gap between frontend engineering, tactile interactions, and applied machine learning.
                Whether it is building <strong>UDYRA</strong> (Authentication &amp; Identity Engine in Go) and systems with the engineering team at <strong>UDAYAAN TECH</strong>, engineering sub-120ms vector retrieval in <strong>RELAY</strong>, or architecting <strong>NYAY SURAKSHA</strong> for <strong>Smart India Hackathon 2026</strong>, I focus on building software that feels genuinely simple, lightning-fast, and joyful to use.
              </p>
            </div>

            {/* Checklist of Everyday Toolkit */}
            <div className="pt-2">
              <div className="font-space font-black text-xs uppercase tracking-widest text-black mb-3">
                ✦ EVERYDAY TOOLKIT
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TOOLKIT.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 px-3 py-2 bg-[#FAF7F0] border border-black rounded-lg text-xs font-space font-bold text-gray-800 shadow-brutal-xs"
                  >
                    <span className="text-[#6BCB77] font-black">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Card */}
            <div className="p-5 bg-[#FAF7F0] border-2 border-black rounded-xl shadow-brutal-xs relative">
              <div className="text-2xl text-black mb-1 font-serif">“</div>
              <p className="font-space italic text-sm text-gray-800 font-medium leading-relaxed pl-2">
                &ldquo;Curious about the intersection of design, software, and machine intelligence. Focused on learning by shipping real software and collaborating with great teams.&rdquo;
              </p>
            </div>

            {/* Playful Personality Badges & Emojis to eliminate blank space */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFE57F] border border-black rounded-lg text-xs font-space font-extrabold text-black shadow-brutal-xs hover:-translate-y-0.5 transition-transform">
                <span>☕</span> 4+ Cups Chai / Sprint
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#A5D8FF] border border-black rounded-lg text-xs font-space font-extrabold text-black shadow-brutal-xs hover:-translate-y-0.5 transition-transform">
                <span>⚡</span> 60 FPS Tactile Polish
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFAEC8] border border-black rounded-lg text-xs font-space font-extrabold text-black shadow-brutal-xs hover:-translate-y-0.5 transition-transform">
                <span>🤖</span> Autonomous Agents &amp; AI
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D8B4FE] border border-black rounded-lg text-xs font-space font-extrabold text-black shadow-brutal-xs hover:-translate-y-0.5 transition-transform">
                <span>🎧</span> Lo-Fi &amp; Synthwave Beats
              </span>
            </div>
          </div>

          {/* Right Column: 4 Four Pillars Cards + Live Radar Card to eliminate blank space */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PILLARS.map((p) => (
                <div
                  key={p.num}
                  className="bg-white border-2 border-black rounded-xl p-5 shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`w-8 h-8 rounded-lg border-2 border-black ${p.color} flex items-center justify-center font-space font-black text-xs shadow-brutal-xs`}>
                        {p.num}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-black group-hover:bg-blue-600 transition-colors"></span>
                    </div>

                    <h3 className="font-space font-extrabold text-lg text-black mb-1">
                      {p.title}
                    </h3>
                    <div className="font-space font-bold text-xs text-blue-600 mb-2">
                      {p.sub}
                    </div>

                    <p className="font-space text-xs text-gray-600 leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Live Engineering Radar & Metrics Card (Fills the white space opposite Toolkit & Quote) ── */}
            <div className="bg-[#FAF7F0] border-2 border-black rounded-xl p-5 sm:p-6 shadow-brutal flex flex-col justify-between relative overflow-hidden group hover:shadow-brutal-lg transition-all">
              {/* Window Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-black/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FFAEC8] border border-black shadow-brutal-xs"></span>
                  <span className="w-3 h-3 rounded-full bg-[#FFE57F] border border-black shadow-brutal-xs"></span>
                  <span className="w-3 h-3 rounded-full bg-[#A7F3D0] border border-black shadow-brutal-xs"></span>
                  <span className="ml-2 font-space font-black text-xs uppercase tracking-wider text-black">
                    ⚡ LIVE RADAR &amp; CURRENT SPRINT
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#A7F3D0] border border-black font-space font-black text-[10px] text-[#065F46] shadow-brutal-xs">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
                  <span>ACTIVE</span>
                </div>
              </div>

              {/* 3 Live Sprint Bulletins */}
              <div className="space-y-2.5 mb-4 font-space text-xs">
                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-black shadow-brutal-xs hover:-translate-x-0.5 transition-transform">
                  <span className="text-base select-none shrink-0">🚀</span>
                  <div>
                    <span className="font-black text-black">Udayaan Tech &amp; Udyra Auth:</span>
                    <span className="text-gray-700 ml-1">Engineering high-throughput Go identity services &amp; modern client frontends.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-black shadow-brutal-xs hover:-translate-x-0.5 transition-transform">
                  <span className="text-base select-none shrink-0">🏆</span>
                  <div>
                    <span className="font-black text-black">SIH 2026 Legal AI:</span>
                    <span className="text-gray-700 ml-1">Architecting multi-agent legal citation engines &amp; smart justice assistants.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-black shadow-brutal-xs hover:-translate-x-0.5 transition-transform">
                  <span className="text-base select-none shrink-0">📍</span>
                  <div>
                    <span className="font-black text-black">Ahmedabad &amp; Rai University &apos;29:</span>
                    <span className="text-gray-700 ml-1">Deep-diving into distributed systems, ML pipelines &amp; tactile WebGL interactions.</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Metric Pills Row */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/10">
                <div className="bg-white border border-black rounded-lg p-2 text-center shadow-brutal-xs">
                  <div className="font-space font-black text-sm sm:text-base text-black">100%</div>
                  <div className="font-space font-bold text-[10px] text-gray-500 uppercase">Core Vitals</div>
                </div>
                <div className="bg-[#FFE57F] border border-black rounded-lg p-2 text-center shadow-brutal-xs">
                  <div className="font-space font-black text-sm sm:text-base text-black">&lt;120ms</div>
                  <div className="font-space font-bold text-[10px] text-gray-800 uppercase">Vector Search</div>
                </div>
                <div className="bg-[#A5D8FF] border border-black rounded-lg p-2 text-center shadow-brutal-xs">
                  <div className="font-space font-black text-sm sm:text-base text-black">36h+</div>
                  <div className="font-space font-bold text-[10px] text-gray-800 uppercase">Sprint Stamina</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
