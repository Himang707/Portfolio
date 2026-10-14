"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Flame, Sparkles, Binary, CheckCircle2 } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  isInfinity?: boolean;
}

function StatCounter({ value, suffix = "+", isInfinity = false }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayVal, setDisplayVal] = useState(0);

  useEffect(() => {
    if (!isInView || isInfinity) return;

    let start = 0;
    const end = value;
    const duration = 1400; // ms
    const incrementTime = 40;
    const steps = duration / incrementTime;
    const stepValue = end / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setDisplayVal(end);
        clearInterval(timer);
      } else {
        setDisplayVal(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, isInfinity]);

  if (isInfinity) {
    return (
      <span ref={ref} className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black text-[#F5D77F]">
        ∞
      </span>
    );
  }

  const padded = String(displayVal).padStart(2, "0");

  return (
    <span ref={ref} className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black text-[#F5F2EB]">
      {padded}
      <span className="text-[#F5D77F] font-extrabold">{suffix}</span>
    </span>
  );
}

const STATS_DATA = [
  { value: 3, label: "PROJECTS", desc: "Production-ready architectures deployed", suffix: "+" },
  { value: 5, label: "HACKATHON BUILDS", desc: "Shipped prototypes under extreme sprints", suffix: "+" },
  { value: 10, label: "TECHNOLOGIES", desc: "Languages, engines & data systems mastered", suffix: "+" },
  { value: 0, label: "IDEAS", desc: "Continuous innovation pipeline", isInfinity: true },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={containerRef} className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#141009]/90 border border-[#D4AF37]/45 text-[#F5D77F] font-mono text-xs tracking-widest uppercase shadow-md w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5D77F] animate-pulse" />
            <span>01 // WHO I AM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-mono font-extrabold text-[#ffffff] tracking-tight text-shadow-command">
            MORE THAN CODE.
          </h2>

          <p className="text-base sm:text-xl text-[#D4CEBF] max-w-3xl leading-relaxed text-shadow-sm">
            I enjoy turning complex problems into simple, useful and engaging digital experiences.
          </p>
        </div>

        {/* Split Layout: Left Bio & Mindset, Right Interactive Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Personal Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-[#0D0B08]/90 border border-[#D4AF37]/35 rounded-2xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3">
                <span className="font-mono text-xs text-[#F5D77F] font-bold tracking-wider">
                  OPERATOR: HIMANG
                </span>
                <span className="text-[10px] font-mono text-[#A89F8B] uppercase">
                  LOC: INDIA // UTC+5:30
                </span>
              </div>

              <p className="text-[#E6E2D8] leading-relaxed text-sm sm:text-base">
                I am a full-stack engineer and AI explorer captivated by the intersection of
                rigorous software architecture and tactile visual craft. Whether designing real-time
                vector indexing pipelines or composing fluid 3D spatial user interfaces, I obsess
                over building digital products that feel fast, intuitive, and enduring.
              </p>

              <p className="text-[#A89F8B] leading-relaxed text-sm sm:text-base">
                Hackathons have forged my instinct for rapid execution—taking vague problem spaces,
                dissecting constraints under intense time pressure, and deploying rock-solid,
                battle-tested solutions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#D4AF37]/20 font-mono text-xs">
              <div className="flex items-center space-x-2 text-[#C5BCAB]">
                <CheckCircle2 className="w-4 h-4 text-[#F5D77F]" />
                <span>Modern React / Next</span>
              </div>
              <div className="flex items-center space-x-2 text-[#C5BCAB]">
                <CheckCircle2 className="w-4 h-4 text-[#F5D77F]" />
                <span>AI & Vector Engines</span>
              </div>
              <div className="flex items-center space-x-2 text-[#C5BCAB]">
                <CheckCircle2 className="w-4 h-4 text-[#F5D77F]" />
                <span>High-Speed APIs</span>
              </div>
              <div className="flex items-center space-x-2 text-[#C5BCAB]">
                <CheckCircle2 className="w-4 h-4 text-[#F5D77F]" />
                <span>Tactile Micro-UX</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Statistics Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STATS_DATA.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-[#0D0B08]/90 border border-[#D4AF37]/35 rounded-2xl p-6 backdrop-blur-2xl hover:border-[#F5D77F] hover:bg-[#18130B] transition-all duration-300 flex flex-col justify-between shadow-[0_12px_35px_rgba(0,0,0,0.85)]"
              >
                {/* Glow pill behind on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-2xl group-hover:bg-[#F5D77F]/20 transition-all pointer-events-none" />

                <div className="space-y-1">
                  <StatCounter value={stat.value} suffix={stat.suffix} isInfinity={stat.isInfinity} />
                  <h3 className="font-mono text-xs font-bold tracking-widest text-[#F5D77F] uppercase pt-2">
                    {stat.label}
                  </h3>
                </div>

                <p className="text-xs text-[#9E9482] font-sans pt-3 border-t border-[#D4AF37]/15 mt-4">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
