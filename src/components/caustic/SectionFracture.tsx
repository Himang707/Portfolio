"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ShieldCheck, Zap, Layers, Binary, Compass } from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionFracture() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPaneRef = useRef<HTMLDivElement>(null);
  const shardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { motion, playClick } = usePortfolio();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 4 glass fragments separate on scroll entry
      gsap.fromTo(
        shardsRef.current,
        {
          x: (i) => (i % 2 === 0 ? -40 : 40),
          y: (i) => (i < 2 ? -30 : 30),
          opacity: 0.3,
          rotate: (i) => (i % 2 === 0 ? -4 : 4),
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 25%",
            scrub: 0.6,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const FRAGMENTS = [
    {
      label: "SPECIMEN A // PHILOSOPHY",
      val: "FEEL SIMPLE",
      sub: "EFFORTLESS INTERACTION",
      detail: "I care about the details — the way an interface moves and responds.",
    },
    {
      label: "SPECIMEN B // WEB TECH",
      val: "REACT & NEXT.JS",
      sub: "TYPESCRIPT // MODERN WEB",
      detail: "Turning ambitious ideas into polished, functional web experiences.",
    },
    {
      label: "SPECIMEN C // INTELLIGENCE",
      val: "PYTHON & AI/ML",
      sub: "COMPUTER VISION // MODELS",
      detail: "Building at the intersection of design, technology, and intelligence.",
    },
    {
      label: "SPECIMEN D // CREED",
      val: "BUILD BETTER",
      sub: "NOT MORE, BUT BETTER",
      detail: "A relentless standard for craft, precision, and architectural clarity.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="fracture"
      className="relative py-28 px-6 sm:px-12 bg-[#050609] border-t border-white/5"
      role="region"
      aria-label="About — Philosophy and technical focus areas"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header Indicator with Motion Parallax Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-12 font-mono text-[10px] tracking-precision border-b border-white/5 pb-4">
          <div className="flex items-center space-x-3 text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef9a57]" />
            <span>SECTION 02 // BOUNDED EXPERIMENT: FRACTURE</span>
          </div>

          <button
            onClick={() => {
              if (motion.isGyroAvailable && !motion.isGyroActive) {
                playClick();
                motion.requestGyroPermission();
              }
            }}
            className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-[#0c0e14] border border-white/10 text-white/60 hover:text-white transition-colors"
            title="3D spatial shard parallax driven by device tilt and pointer inertia"
          >
            <Compass className={`w-3 h-3 ${motion.isGyroActive ? "text-emerald-400" : "text-[#ef9a57]"}`} />
            <span>
              {motion.isGyroActive
                ? "GYROSCOPE 3D TILT ACTIVE"
                : motion.isGyroAvailable
                ? "ENABLE MOBILE GYRO"
                : "POINTER 3D PARALLAX"}
            </span>
            <span className="text-[9px] text-[#ef9a57] tabular-nums font-bold">
              [X: {motion.tiltX.toFixed(2)}, Y: {motion.tiltY.toFixed(2)}]
            </span>
          </button>
        </div>

        {/* 2-Column Split Layout (.split) */}
        <div className="split grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: .fx-pane with 4 Optical Glass Fragments */}
          <div
            ref={leftPaneRef}
            className="fx-pane lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 relative"
          >
            {FRAGMENTS.map((frag, idx) => {
              const rotX = -motion.tiltY * (7 + idx * 2.2);
              const rotY = motion.tiltX * (9 + (3 - idx) * 2);
              const transZ = (idx + 1) * 6;

              return (
                <div
                  key={frag.label}
                  ref={(el) => {
                    shardsRef.current[idx] = el;
                  }}
                  className="relative p-6 rounded-lg bg-[#080a0f] border border-white/10 shadow-[inset_0_1px_0_0_rgba(220,230,240,0.86),0_15px_35px_rgba(0,0,0,0.7)] backdrop-blur-md flex flex-col justify-between min-h-[170px] group hover:border-[#ef9a57]/50 transition-colors"
                  style={{
                    // Subtle linear gradient on edges + real-time 3D parallax tilt
                    background:
                      "linear-gradient(135deg, rgba(14, 18, 26, 0.95) 0%, rgba(8, 10, 15, 0.95) 100%)",
                    transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${transZ}px)`,
                    transition: "transform 0.08s ease-out, border-color 0.2s ease",
                  }}
                >
                  {/* Micro shard edge light */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(220,230,240,0.86)] to-transparent opacity-70 group-hover:via-[#ef9a57] transition-all" />

                  <div className="space-y-1">
                    <span className="font-mono text-[9px] tracking-precision text-white/40 block uppercase">
                      {frag.label}
                    </span>
                    <div className="font-mono text-xl font-bold tracking-tight text-[#f2f4f7] tabular-nums">
                      {frag.val}
                    </div>
                    <div className="font-mono text-[10px] tracking-wider text-[#ef9a57]">
                      {frag.sub}
                    </div>
                  </div>

                  <p className="text-xs text-white/50 leading-relaxed pt-3 border-t border-white/5 font-sans">
                    {frag.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Architectural Text Content */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
            <div className="reveal-mask">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#f2f4f7] uppercase leading-[1.05]">
                I care about the details.
                <span className="block text-white/40 font-light">
                  The way an interface moves.
                </span>
              </h2>
            </div>

            <p className="text-base text-white/70 leading-relaxed font-sans">
              I care about the details — the way an interface moves, the way a product responds, and the way complex technology can feel effortless to use.
            </p>

            <p className="text-sm text-white/50 leading-relaxed font-sans">
              My work spans <strong className="text-[#f2f4f7]">React</strong>, modern web technologies, <strong className="text-[#f2f4f7]">Python</strong>, <strong className="text-[#f2f4f7]">Machine Learning</strong>, and <strong className="text-[#f2f4f7]">Computer Vision</strong>, with a constant focus on turning ambitious ideas into polished, functional experiences.
            </p>

            {/* Operator Profile Statement */}
            <div className="p-4 rounded-xl bg-[#090b10] border-l-2 border-[#ef9a57] border-y border-r border-white/5 space-y-1.5 shadow-lg">
              <span className="font-mono text-[9px] uppercase tracking-precision text-[#ef9a57] block font-bold">
                PROFILE // CORE DIRECTIVE
              </span>
              <p className="text-xs text-white/80 font-sans leading-relaxed italic">
                &ldquo;Curious about the intersection of design, software, and AI, with a focus on learning through building. Interested in creating technology that feels intuitive, useful, and beautifully engineered.&rdquo;
              </p>
            </div>

            {/* Checkpoints */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 font-mono text-[11px] text-white/70 tracking-wider">
              <div className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#ef9a57]" />
                <span>React, HTML, CSS & Tailwind</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#ef9a57]" />
                <span>Python & SQL Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#ef9a57]" />
                <span>Scikit-learn, TF & PyTorch</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#ef9a57]" />
                <span>Computer Vision Apps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
