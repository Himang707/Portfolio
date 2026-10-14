"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Compass, Hammer, RefreshCw, ArrowUpRight } from "lucide-react";

const MINDSET_STEPS = [
  {
    number: "01",
    phase: "DISCOVER",
    title: "Understand the actual problem.",
    description:
      "Before writing a line of code, I interrogate user intent, system bottlenecks, and core constraints. Clear problem definition saves weeks of wasted engineering.",
    icon: Search,
    metrics: "ROOT CAUSE / SCOPE ANALYSIS",
  },
  {
    number: "02",
    phase: "DESIGN",
    title: "Create a clear and meaningful experience.",
    description:
      "Architecture, data models, and interaction flows are mapped together. I prioritize cognitive clarity, snappy feedback loops, and intuitive tactile interfaces.",
    icon: Compass,
    metrics: "DATA SCHEMAS / WIREFRAME PROTO",
  },
  {
    number: "03",
    phase: "BUILD",
    title: "Turn the idea into a working product.",
    description:
      "Translating architectural blueprints into resilient, performant full-stack implementations with strict type safety, modular services, and high testability.",
    icon: Hammer,
    metrics: "MODULAR STACK / 60FPS DEV",
  },
  {
    number: "04",
    phase: "ITERATE",
    title: "Test, improve and refine.",
    description:
      "Shipping is just the kickoff. Profiling query latencies, gathering telemetry, stress-testing edge cases, and ruthlessly polishing interactions until they feel effortless.",
    icon: RefreshCw,
    metrics: "TELEMETRY / BENCHMARK AUDIT",
  },
];

export default function Mindset() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#141009]/90 border border-[#D4AF37]/45 text-[#F5D77F] font-mono text-xs tracking-widest uppercase shadow-md w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5D77F] animate-pulse" />
            <span>02 // PHILOSOPHY & MINDSET</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl font-mono font-extrabold text-[#ffffff] tracking-tight text-shadow-command">
              I DON&apos;T JUST WRITE CODE.
            </h2>
            <h3 className="text-3xl sm:text-5xl font-mono font-extrabold text-[#F5D77F] tracking-tight drop-shadow-sm">
              I SOLVE PROBLEMS.
            </h3>
          </div>

          <p className="text-base sm:text-lg text-[#D4CEBF] max-w-2xl leading-relaxed text-shadow-sm">
            A disciplined, product-focused methodology engineered to transform raw ambiguity into
            robust, delightful digital software.
          </p>
        </div>

        {/* 4 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MINDSET_STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative bg-[#0D0B08]/90 border border-[#D4AF37]/35 hover:border-[#F5D77F] hover:bg-[#18130B] rounded-2xl p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_-10px_rgba(212,175,55,0.35)] flex flex-col justify-between overflow-hidden"
              >
                {/* Ambient Hover Golden Glow */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl group-hover:bg-[#F5D77F]/25 group-hover:scale-150 transition-all duration-500 pointer-events-none" />

                <div className="space-y-5 relative z-10">
                  {/* Top Row: Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-[#8C7E66] group-hover:text-[#F5D77F] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#1A150D] border border-[#D4AF37]/35 flex items-center justify-center text-[#F5D77F] group-hover:bg-[#261E10] group-hover:text-[#FFF2CC] group-hover:border-[#F5D77F] transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Phase Label & Title */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-xs font-bold tracking-widest text-[#F5D77F] uppercase">
                      — {step.phase}
                    </span>
                    <h4 className="font-mono text-base font-bold text-[#F5F2EB] leading-snug">
                      {step.title}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#D4CEBF] leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                {/* Footer Metric pill */}
                <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 relative z-10">
                  <span className="text-[10px] font-mono text-[#A89F8B] tracking-wider block">
                    [{step.metrics}]
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
