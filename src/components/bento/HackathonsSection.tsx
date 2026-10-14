"use client";

import React from "react";
import { hackathons } from "@/data/hackathons";
import { Trophy, CheckCircle2 } from "lucide-react";

export default function HackathonsSection() {
  return (
    <section
      id="hackathons"
      className="relative py-[15vh] overflow-hidden perspective-container"
      role="region"
      aria-label="Hackathons and Sprints"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Luminous Section Tag */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[11px] font-mono-code font-bold tracking-[0.2em] text-[#94DEC0] uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#94DEC0] pulse-dot" />
            Sprint History
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(148,222,192,0.35) 0%, transparent 100%)" }} />
        </div>

        {/* Section Headline with airy typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-[clamp(32px,5vw,50px)] font-[800] tracking-[-0.065em] text-white leading-[1.2]">
              Hackathons &amp; Sprints
            </h2>
            <p className="text-[15px] text-white/65 mt-3 max-w-xl leading-[1.85] tracking-tight">
              Rapid zero-to-one building, collaborating under tight deadlines, and pitching live to technical juries.
            </p>
          </div>

          <div className="text-[13px] text-[#94DEC0]/80 font-mono-code font-medium tracking-wider">
            {hackathons.length} COMPETITIVE RUNS
          </div>
        </div>

        {/* Floating Antigravity Sprint Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {hackathons.map((hack) => {
            return (
              <div
                key={hack.id}
                className="group relative rounded-[28px] border border-[rgba(148,222,192,0.11)] antigravity-card backdrop-blur-2xl p-7 sm:p-8 flex flex-col justify-between overflow-hidden"
                style={{ background: "rgba(10,16,13,0.78)" }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[12px] font-mono-code font-semibold text-[#A39E93]">
                      {hack.year}
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#94DEC0]/[0.08] border border-[#94DEC0]/[0.22] text-[#94DEC0] shadow-[0_0_10px_rgba(148,222,192,0.1)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#94DEC0] pulse-dot" />
                      {hack.status === "COMPLETED" ? "Finished" : hack.status === "FINALIST" ? "Finalist" : "Active"}
                    </span>
                  </div>

                  <h3 className="text-[20px] font-bold text-white group-hover:text-[#94DEC0] tracking-[-0.04em] transition-colors duration-800">
                    {hack.event}
                  </h3>
                  <div className="text-[13px] text-[#94DEC0] font-medium mt-1">
                    {hack.role}
                  </div>

                  {/* Project Cell */}
                  <div className="my-5 p-4 rounded-2xl bg-white/[0.025] border border-white/[0.06] text-[13px] flex items-center justify-between">
                    <div>
                      <span className="text-white/45">Project: </span>
                      <strong className="text-white font-semibold">{hack.projectName}</strong>
                    </div>
                  </div>

                  <p className="text-[13px] text-white/70 leading-[1.8] mb-5">
                    {hack.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2.5 mb-6">
                    {hack.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-[12px] text-white/75">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#94DEC0] mt-0.5 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Award & Tags */}
                <div className="pt-4 border-t border-white/[0.06] space-y-3.5">
                  {hack.award && (
                    <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-500/[0.08] border border-amber-500/20 text-amber-200 text-[12px] font-medium shadow-[0_0_12px_rgba(245,158,11,0.1)]">
                      <Trophy className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>{hack.award}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {hack.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono-code bg-white/[0.035] border border-white/[0.06] text-white/60 antigravity-pill hover:border-[rgba(148,222,192,0.25)] hover:text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
