"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { hackathons } from "@/data/hackathons";
import { Trophy, Zap, Clock, Award, CheckCircle, Flame } from "lucide-react";

export default function Hackathons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="hackathons" ref={containerRef} className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#141009]/90 border border-[#D4AF37]/45 text-[#F5D77F] font-mono text-xs tracking-widest uppercase shadow-md w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5D77F] animate-pulse" />
            <span>04 // RAPID SPRINT LOGS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-mono font-extrabold text-[#ffffff] tracking-tight text-shadow-command">
            BUILT UNDER PRESSURE.
          </h2>

          <p className="text-base sm:text-lg text-[#D4CEBF] max-w-2xl leading-relaxed text-shadow-sm">
            Hackathons taught me how to move from an idea to a working solution quickly.
          </p>
        </div>

        {/* ASCII Branch Header */}
        <div className="bg-[#0D0B08]/95 border border-[#D4AF37]/35 rounded-xl p-4 sm:p-5 font-mono text-xs text-[#C5BCAB] select-none max-w-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <div className="text-[#F5D77F] font-bold">2026 // TIME_SERIES_CHRONOLOGY</div>
          <div className="text-[#8C7E66]">│</div>
          <div className="text-[#FBE7A1]">├── iQOO HACKATHON ─────── [RELAY]</div>
          <div className="text-[#FBE7A1]">├── SMART INDIA HACKATHON ─ [AI / SKILL ALIGNMENT]</div>
          <div className="text-[#FBE7A1]">└── INDEPENDENT BUILDS ──── [MULTIPLE DIGITAL PRODUCTS]</div>
        </div>

        {/* Interactive Timeline Body */}
        <div className="relative pl-6 sm:pl-10 space-y-12 border-l-2 border-[#D4AF37]/40">
          {hackathons.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Glowing Pulse Node on the Line */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-5 h-5 rounded-full bg-[#080705] border-2 border-[#F5D77F] flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_#D4AF37]">
                <div className="w-2 h-2 rounded-full bg-[#E5B842] animate-ping" />
              </div>

              {/* Event Card */}
              <div className="bg-[#0D0B08]/92 border border-[#D4AF37]/35 group-hover:border-[#F5D77F] rounded-2xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] transition-all duration-300 group-hover:-translate-y-1 space-y-5">
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-[#F5D77F] tracking-widest">
                      {entry.year} // SPRINT LOG
                    </span>
                    <h3 className="text-xl sm:text-2xl font-mono font-bold text-[#F5F2EB]">
                      {entry.event}
                    </h3>
                  </div>

                  {entry.award && (
                    <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#1E170A] border border-[#F5D77F]/40 text-[#F5D77F] font-mono text-xs font-semibold shadow-inner">
                      <Trophy className="w-3.5 h-3.5 text-[#E5B842]" />
                      <span>{entry.award}</span>
                    </div>
                  )}
                </div>

                {/* Project Focus & Role */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                  <div className="flex items-center space-x-2 text-[#E6E2D8]">
                    <Zap className="w-4 h-4 text-[#F5D77F]" />
                    <span className="text-[#A89F8B]">PRODUCT:</span>
                    <strong className="text-[#F5D77F]">{entry.projectName}</strong>
                  </div>
                  <span className="text-[#D4AF37]">•</span>
                  <div className="flex items-center space-x-2 text-[#A89F8B]">
                    <span>ROLE:</span>
                    <span className="text-[#D4CEBF]">{entry.role}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#D4CEBF] leading-relaxed font-sans">
                  {entry.description}
                </p>

                {/* Key Accomplishments Checklist */}
                <div className="space-y-2 pt-1">
                  {entry.highlights.map((item, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#D4CEBF]">
                      <CheckCircle className="w-4 h-4 text-[#F5D77F] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Sprint Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#D4AF37]/15">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded text-[10px] font-mono font-medium bg-[#141009] text-[#F5D77F] border border-[#D4AF37]/35"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
