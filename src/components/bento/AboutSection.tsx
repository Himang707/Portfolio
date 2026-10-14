"use client";

import React from "react";
import { Check } from "lucide-react";

const PILLARS = [
  {
    num: "01",
    title: "Simplicity First",
    sub: "Intuitive Interaction",
    body: "Great software steps aside and lets users focus. I prioritize clean visual hierarchy, responsive touchpoints, and zero friction.",
  },
  {
    num: "02",
    title: "Modern Web",
    sub: "React & Next.js Ecosystem",
    body: "Crafting performant web apps using React, Next.js, TypeScript, and Tailwind with clean, maintainable component architecture.",
  },
  {
    num: "03",
    title: "Machine Learning",
    sub: "Python & Applied AI",
    body: "Building practical computer vision and ML tools with PyTorch, TensorFlow, and Scikit-learn — turning data into working systems.",
  },
  {
    num: "04",
    title: "Craft & Curiosity",
    sub: "Constant Learning",
    body: "I learn by shipping real things. From hackathon sprints to open-source prototypes, I'm always pushing the boundary of my skill set.",
  },
];

const TOOLKIT = [
  "React, Next.js & TypeScript",
  "Tailwind CSS & Component Systems",
  "Python & Scientific Computing",
  "PyTorch, TensorFlow & Scikit-learn",
  "Computer Vision & Image Processing",
  "Git, Docker & Deployment Workflows",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-[15vh] overflow-hidden perspective-container"
      role="region"
      aria-label="About Himang Panchal"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">

        {/* Section label with luminous sage accent */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-[11px] font-mono-code font-bold tracking-[0.2em] text-[#94DEC0] uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#94DEC0] pulse-dot" />
            About Me
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(148,222,192,0.35) 0%, transparent 100%)" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">

          {/* LEFT — 4 Floating Levitation Pillar Cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PILLARS.map((p, i) => (
                <div
                  key={i}
                  className="group relative p-7 rounded-[24px] border border-[rgba(148,222,192,0.11)]
                    antigravity-card backdrop-blur-xl overflow-hidden"
                  style={{ background: "rgba(10,16,13,0.78)" }}
                >
                  {/* Subtle inner luminous sage glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-800 pointer-events-none rounded-[24px]"
                    style={{
                      background: "radial-gradient(ellipse 80% 80% at 50% 0%, rgba(148,222,192,0.11) 0%, transparent 70%)",
                      transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
                    }}
                  />

                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <span className="text-[11px] font-mono-code font-bold text-[#94DEC0]/80 tracking-widest">
                      {p.num}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#94DEC0]/50 group-hover:bg-[#94DEC0] group-hover:shadow-[0_0_8px_rgba(148,222,192,0.6)] transition-all duration-800" />
                  </div>

                  <div className="relative z-10 space-y-1.5">
                    <h3 className="text-[16px] font-bold text-white/90 group-hover:text-white tracking-[-0.05em] transition-colors duration-800">
                      {p.title}
                    </h3>
                    <div className="text-[12px] text-[#94DEC0] font-medium tracking-tight">{p.sub}</div>
                  </div>

                  <p className="mt-3.5 text-[13px] text-white/65 leading-[1.8] relative z-10">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Story with Airy Typography */}
          <div className="lg:col-span-5 space-y-8 lg:pt-2">
            <div className="space-y-5">
              <h2 className="text-[clamp(28px,4vw,40px)] font-[800] tracking-[-0.065em] leading-[1.25] text-white">
                Caring about details,{" "}
                <span className="text-white/45 font-[400]">and building with purpose.</span>
              </h2>

              <div className="space-y-4 text-[15px] text-white/70 leading-[1.85]">
                <p>
                  I care about the details — how an interface responds to touch, how quickly
                  it renders, and how easily someone can navigate without cognitive drag.
                </p>
                <p>
                  My work spans <strong className="text-white/90">React</strong>, modern web
                  architecture, <strong className="text-white/90">Python</strong>,{" "}
                  <strong className="text-white/90">Machine Learning</strong>, and{" "}
                  <strong className="text-white/90">Computer Vision</strong>. I love taking
                  complex ideas and shaping them into functional, weightless digital tools.
                </p>
              </div>
            </div>

            {/* Quote Card with subtle levitation */}
            <div
              className="p-6 rounded-[22px] border border-[rgba(148,222,192,0.12)] antigravity-card-subtle relative overflow-hidden backdrop-blur-xl"
              style={{ background: "rgba(10,16,13,0.72)" }}
            >
              <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-gradient-to-b from-transparent via-[#94DEC0] to-transparent shadow-[0_0_8px_rgba(148,222,192,0.5)]" />
              <p className="pl-4 text-[14px] text-white/85 leading-[1.85] italic font-[400] tracking-tight">
                &ldquo;Curious about the intersection of design, software, and machine intelligence.
                Focused on learning by shipping real software and collaborating with great teams.&rdquo;
              </p>
            </div>

            {/* Toolkit checklist */}
            <div className="space-y-3 pt-2">
              <div className="text-[10px] font-mono-code text-white/40 uppercase tracking-[0.2em]">
                Everyday Toolkit
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {TOOLKIT.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl
                      bg-white/[0.025] border border-white/[0.06] text-[13px] text-white/80
                      antigravity-pill hover:border-[rgba(148,222,192,0.25)] hover:text-white"
                  >
                    <Check className="w-3.5 h-3.5 text-[#94DEC0] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
