"use client";

import React, { useState } from "react";
import { skills, skillCategories } from "@/data/skills";

const LEVEL_CONFIG: Record<string, { dots: number; color: string; label: string }> = {
  Advanced:   { dots: 3, color: "#94DEC0", label: "Advanced" },
  Proficient: { dots: 2, color: "#E8C97B", label: "Proficient" },
  Exploring:  { dots: 1, color: "#8BC0E8", label: "Exploring" },
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = skills.filter((s) => {
    const catMatch = activeCategory === "all" || s.category === activeCategory;
    const searchMatch = !search || s.name.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <section
      id="skills"
      className="relative py-[15vh] overflow-hidden perspective-container"
      role="region"
      aria-label="Technical Skills"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">

        {/* Section label with luminous sage accent */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[11px] font-mono-code font-bold tracking-[0.2em] text-[#94DEC0] uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#94DEC0] pulse-dot" />
            Technical Arsenal
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(148,222,192,0.35) 0%, transparent 100%)" }} />
        </div>

        {/* Title with airy typography */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <h2 className="text-[clamp(32px,5vw,50px)] font-[800] tracking-[-0.065em] leading-[1.2] text-white">
              Skills &amp; Tools
            </h2>
            <p className="mt-3 text-[15px] text-white/65 max-w-lg leading-[1.85] tracking-tight">
              Technologies I reach for daily — from frontend state machines to deep learning pipelines.
            </p>
          </div>

          {/* Search */}
          <div className="relative shrink-0">
            <input
              type="text"
              placeholder="Search skills..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-52 pl-4 pr-3 py-2.5 rounded-xl text-[13px] text-white/85
                bg-white/[0.04] border border-[rgba(148,222,192,0.12)] backdrop-blur-xl
                focus:outline-none focus:border-[#94DEC0]/50 focus:shadow-[0_0_12px_rgba(148,222,192,0.15)]
                transition-all duration-800 placeholder:text-white/30"
              style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
            />
          </div>
        </div>

        {/* Category filter pills with antigravity hover */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4.5 py-2 rounded-full text-[12px] font-medium antigravity-pill focus:outline-none ${
              activeCategory === "all"
                ? "bg-[#FAF7F2] text-[#080d0a] shadow-md font-semibold"
                : "bg-white/[0.04] border border-white/[0.08] text-white/65 hover:text-white hover:border-[rgba(148,222,192,0.3)]"
            }`}
          >
            All
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4.5 py-2 rounded-full text-[12px] font-medium antigravity-pill focus:outline-none ${
                activeCategory === cat.id
                  ? "bg-[#FAF7F2] text-[#080d0a] shadow-md font-semibold"
                  : "bg-white/[0.04] border border-white/[0.08] text-white/65 hover:text-white hover:border-[rgba(148,222,192,0.3)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category description */}
        {activeCategory !== "all" && (
          <div className="mb-8 px-4 py-3 rounded-xl bg-white/[0.02] border border-[rgba(148,222,192,0.1)] text-[13px] text-white/60 italic">
            {skillCategories.find(c => c.id === activeCategory)?.description}
          </div>
        )}

        {/* Skills grid with Floating Levitation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4.5">
          {filtered.map((skill) => {
            const lvl = LEVEL_CONFIG[skill.level] || LEVEL_CONFIG.Exploring;
            return (
              <div
                key={skill.name}
                className="group relative p-5 sm:p-6 rounded-[22px] border border-[rgba(148,222,192,0.10)]
                  antigravity-card-subtle backdrop-blur-xl overflow-hidden flex flex-col justify-between"
                style={{ background: "rgba(10,16,13,0.76)" }}
              >
                {/* Subtle top glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-800 pointer-events-none rounded-[22px]"
                  style={{
                    background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(148,222,192,0.08) 0%, transparent 80%)",
                    transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
                  }}
                />

                {/* Top row */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3 relative z-10">
                    <div>
                      <h3 className="text-[14px] font-[700] text-white/90 group-hover:text-white tracking-[-0.04em] transition-colors duration-800">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] font-mono-code text-[#94DEC0]/65 mt-0.5 block">
                        {skill.tag}
                      </span>
                    </div>

                    {/* Level dots */}
                    <div className="flex items-center gap-1 mt-0.5 shrink-0">
                      {[1, 2, 3].map((d) => (
                        <span
                          key={d}
                          className="w-1.5 h-1.5 rounded-full transition-all duration-800"
                          style={{
                            background: d <= lvl.dots ? lvl.color : "rgba(255,255,255,0.12)",
                            boxShadow: d <= lvl.dots ? `0 0 6px ${lvl.color}80` : "none",
                            transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[12px] text-white/60 leading-[1.75] relative z-10">
                    {skill.description}
                  </p>
                </div>

                {/* Level badge */}
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between relative z-10">
                  <span
                    className="text-[10px] font-mono-code font-bold tracking-wider"
                    style={{ color: lvl.color }}
                  >
                    {lvl.label}
                  </span>
                  <span className="text-[10px] text-white/30 font-mono-code uppercase tracking-wider">
                    {skill.category.replace("_", " / ")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/35 text-[14px]">
            No skills match your search.{" "}
            <button onClick={() => setSearch("")} className="underline text-emerald-400">
              Clear
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
