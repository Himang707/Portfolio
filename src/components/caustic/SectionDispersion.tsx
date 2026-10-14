"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sliders, Activity, Sparkles, FlaskConical, RotateCw, Atom } from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionDispersion() {
  const sectionRef = useRef<HTMLElement>(null);
  const rayPathRef = useRef<SVGPathElement>(null);
  const [activeRay, setActiveRay] = useState<"all" | "blue" | "amber" | "red">("all");
  const { openOpticalLab, playClick } = usePortfolio();

  const RAYS = [
    {
      id: "blue",
      spectral: "F-LINE // 486.1 nm",
      title: "AI, MACHINE LEARNING & COMPUTER VISION",
      color: "#60a5fa",
      desc: "Visual inference, Scikit-learn, TensorFlow & PyTorch models turning data into intelligent experiences.",
      specs: ["Computer Vision", "TensorFlow & PyTorch", "Deep Learning & NLP"],
    },
    {
      id: "amber",
      spectral: "d-LINE // 587.6 nm",
      title: "FRONTEND ENGINEERING & RESPONSIVE UI",
      color: "#ef9a57",
      desc: "React, modern JavaScript, Tailwind CSS, and component design systems engineered for effortless usability.",
      specs: ["React Architecture", "Tailwind CSS", "Responsive UI"],
    },
    {
      id: "red",
      spectral: "C-LINE // 656.3 nm",
      title: "DEVELOPER TOOLS & PRACTICAL SYSTEMS",
      color: "#f87171",
      desc: "Docker containerization, Git workflows, Jupyter experimentation, and robust REST API integrations.",
      specs: ["Docker & Containers", "Git & GitHub CI", "Jupyter & APIs"],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="dispersion"
      role="region"
      aria-label="Precision prism ray splitting — Skill dispersion diagram"
      className="relative py-28 px-6 sm:px-12 bg-[#050609] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header Indicator */}
        <div className="flex items-center space-x-3 font-mono text-[10px] tracking-precision text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ef9a57]" />
          <span>SECTION 05 // OPTICAL DISPERSION SCHEMATIC</span>
        </div>

        {/* Headline with "One framework is a lie" */}
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#f2f4f7] uppercase leading-[1.0]">
            One framework is a lie.
          </h2>
          <p className="text-base sm:text-lg text-white/60 font-sans leading-relaxed">
            Real software mastery does not reduce to a single tool. Like white light entering an optical crown glass prism, true capability splits into distinct, harmonious wavelengths across AI, low-level systems, and spatial interfaces.
          </p>
        </div>

        {/* SVG Graphic: #rayFig (640x300 responsive) */}
        <div className="w-full rounded-2xl bg-[#080a0f] border border-white/10 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between font-mono text-[9px] text-white/40 tracking-precision border-b border-white/5 pb-3 mb-6">
            <span>RAY TRACE FIGURE #05 // INCIDENT BEAM λ: 400-700nm</span>
            <span className="text-[#ef9a57] tabular-nums">PRISM CROWN GLASS // n_d = 1.517</span>
          </div>

          <svg
            id="rayFig"
            viewBox="0 0 640 300"
            fill="none"
            className="w-full max-w-[640px] h-auto overflow-visible select-none"
          >
            <defs>
              <linearGradient id="incidentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(242, 244, 247, 0.1)" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
              <linearGradient id="glassFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(242, 244, 247, 0.08)" />
                <stop offset="100%" stopColor="rgba(14, 18, 26, 0.45)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Optical Glass Block / Prism */}
            <polygon
              points="200,60 400,60 440,240 160,240"
              fill="url(#glassFill)"
              stroke="rgba(220, 230, 240, 0.65)"
              strokeWidth="1.5"
            />
            {/* Top edge highlight */}
            <line x1="200" y1="60" x2="400" y2="60" stroke="rgba(220, 230, 240, 0.95)" strokeWidth="2" />

            {/* Normal surface lines */}
            <line x1="150" y1="130" x2="210" y2="170" stroke="rgba(242, 244, 247, 0.15)" strokeDasharray="3 3" />
            <line x1="400" y1="130" x2="460" y2="170" stroke="rgba(242, 244, 247, 0.15)" strokeDasharray="3 3" />

            {/* 1. Incident Single White Ray */}
            <path
              d="M 20 190 L 180 150"
              stroke="url(#incidentGrad)"
              strokeWidth="2.5"
              filter="url(#glow)"
            />
            <text x="30" y="175" fill="#f2f4f7" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">
              INCIDENT RAY (RAW SIGNAL)
            </text>

            {/* 2. Refracted Internal Rays inside Glass */}
            {/* Blue Ray (bends most) */}
            <path d="M 180 150 L 415 130" stroke="#60a5fa" strokeWidth="2" opacity="0.9" />
            {/* Amber Ray (middle) */}
            <path d="M 180 150 L 420 150" stroke="#ef9a57" strokeWidth="2.2" opacity="0.95" />
            {/* Red Ray (bends least) */}
            <path d="M 180 150 L 425 170" stroke="#f87171" strokeWidth="2" opacity="0.9" />

            {/* 3. Dispersed Exiting Spectral Rays */}
            {/* Blue Ray */}
            <path
              d="M 415 130 L 620 90"
              stroke="#60a5fa"
              strokeWidth="2.5"
              filter="url(#glow)"
            />
            <circle cx="415" cy="130" r="3" fill="#60a5fa" />
            <text x="450" y="80" fill="#60a5fa" fontSize="10" fontFamily="monospace" fontWeight="bold">
              F / BLUE [486 nm] → AI & COMPUTER VISION
            </text>

            {/* Amber Ray */}
            <path
              d="M 420 150 L 620 150"
              stroke="#ef9a57"
              strokeWidth="2.5"
              filter="url(#glow)"
            />
            <circle cx="420" cy="150" r="3" fill="#ef9a57" />
            <text x="450" y="142" fill="#ef9a57" fontSize="10" fontFamily="monospace" fontWeight="bold">
              d / AMBER [588 nm] → FRONTEND & REACT
            </text>

            {/* Red Ray */}
            <path
              d="M 425 170 L 620 210"
              stroke="#f87171"
              strokeWidth="2.5"
              filter="url(#glow)"
            />
            <circle cx="425" cy="170" r="3" fill="#f87171" />
            <text x="450" y="228" fill="#f87171" fontSize="10" fontFamily="monospace" fontWeight="bold">
              C / RED [656 nm] → DEV TOOLS & SYSTEMS
            </text>
          </svg>
        </div>

        {/* Spectral Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RAYS.map((ray) => (
            <div
              key={ray.id}
              className="p-6 rounded-xl bg-[#090b10] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.7)] group"
            >
              <div className="space-y-2">
                <span
                  className="font-mono text-[9px] tracking-precision font-bold uppercase block"
                  style={{ color: ray.color }}
                >
                  {ray.spectral}
                </span>
                <h3 className="font-mono text-sm font-bold tracking-tight text-[#f2f4f7]">
                  {ray.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-sans pt-1">
                  {ray.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 space-y-1.5 font-mono text-[10px] text-white/40">
                {ray.specs.map((spec) => (
                  <div key={spec} className="flex items-center space-x-1.5">
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: ray.color }} />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* INTERACTIVE OPTICAL LAB LAUNCHPAD */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0c0f17] via-[#090c14] to-[#0c0f17] border border-[#ef9a57]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ef9a57]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 max-w-xl relative z-10">
            <div className="flex items-center space-x-2 font-mono text-[10px] text-[#ef9a57] tracking-wider uppercase font-bold">
              <FlaskConical className="w-4 h-4 animate-pulse" />
              <span>INTERACTIVE PHYSICS EXPERIMENTS READY</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Test & Measure Optical Media in Real-Time
            </h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans">
              Take control of the collimator and polarizer. Probe dark Fraunhofer absorption bands across core competencies, rotate analyzer filters to reveal photoelastic stress tensors, and simulate dual-slit wave superposition.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 relative z-10 w-full md:w-auto">
            <button
              onClick={() => {
                playClick();
                openOpticalLab("spectrometer");
              }}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-[#ef9a57] hover:bg-[#f3aa70] text-[#050609] font-mono text-xs font-bold tracking-wider transition-all shadow-[0_0_20px_rgba(239,154,87,0.3)] active:scale-95"
            >
              <Atom className="w-3.5 h-3.5" />
              <span>LAUNCH SPECTROMETER</span>
            </button>
            <button
              onClick={() => {
                playClick();
                openOpticalLab("polarizer");
              }}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-mono text-xs font-bold tracking-wider transition-all active:scale-95"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>MALUS POLARIZER</span>
            </button>
          </div>
        </div>

        {/* AREAS OF INTEREST Banner */}
        <div className="p-6 rounded-2xl bg-[#080a0f] border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.7)] space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="font-mono text-[10px] tracking-precision uppercase text-[#ef9a57] font-bold">
              OPERATOR TELEMETRY // AREAS OF INTEREST
            </span>
            <span className="font-mono text-[10px] text-white/40">6 ACTIVE CHANNELS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-[11px]">
            {[
              "Artificial Intelligence",
              "Machine Learning",
              "Computer Vision",
              "Frontend Engineering",
              "Developer Tools",
              "Interactive Experiences",
            ].map((interest, idx) => (
              <div
                key={interest}
                className="p-3 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#ef9a57]/50 text-white/80 hover:text-white transition-colors flex flex-col justify-between space-y-2"
              >
                <span className="text-[9px] text-[#ef9a57] font-bold">0{idx + 1}</span>
                <span className="leading-snug">{interest}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
