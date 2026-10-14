"use client";

import React, { useRef, useState } from "react";
import { skills, skillCategories } from "@/data/skills";
import { usePortfolio } from "@/lib/PortfolioContext";
import { Atom, Globe, Palette, Server, Database, Binary, Cpu, Layers } from "lucide-react";

export default function SectionSpecimens() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { playClick } = usePortfolio();

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="specimens"
      className="relative py-28 px-6 sm:px-12 bg-[#050609] border-t border-white/5"
      role="region"
      aria-label="Technical skills and competencies"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 font-mono text-[10px] tracking-precision text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef9a57]" aria-hidden="true" />
            <span>SECTION 07 // SPECIMENS (THE LIBRARY)</span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-[10px]" role="group" aria-label="Filter skills by category">
            <button
              onClick={() => {
                playClick();
                setActiveCategory("all");
              }}
              className={`px-3 py-1 rounded-full border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57] ${
                activeCategory === "all"
                  ? "border-[#ef9a57] text-[#ef9a57] bg-[#ef9a57]/10 font-bold"
                  : "border-white/10 text-white/40 hover:text-white"
              }`}
              data-cursor="OPEN"
              aria-pressed={activeCategory === "all"}
            >
              ALL [{skills.length}]
            </button>
            {skillCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  playClick();
                  setActiveCategory(c.id);
                }}
                className={`px-3 py-1 rounded-full border transition-all uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57] ${
                  activeCategory === c.id
                    ? "border-[#ef9a57] text-[#ef9a57] bg-[#ef9a57]/10 font-bold"
                    : "border-white/10 text-white/40 hover:text-white"
                }`}
                data-cursor="OPEN"
                aria-pressed={activeCategory === c.id}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#f2f4f7] uppercase leading-[1.05]">
            Floating Optical Specimens.
          </h2>
          <p className="text-sm text-white/60 font-sans">
            Technical competencies modeled as optical refractive elements. Cards compute proximity-based angular deflection towards your cursor.
          </p>
        </div>

        {/* 3D Specimen Card Field (.sp-card) */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Skills grid"
        >
          {filteredSkills.map((skill, idx) => (
            <SpecimenCard key={skill.name} skill={skill} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecimenCard({
  skill,
  index,
}: {
  skill: (typeof skills)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const { playChime } = usePortfolio();
  const chimePlayed = useRef(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    if (rafId.current !== null) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = -y * 0.08;
    const ry = x * 0.08;

    // Enhancement 5: Check if we're at max tilt
    const maxTilt = 12; // degrees
    const currentTilt = Math.sqrt(rx * rx + ry * ry);
    if (currentTilt > maxTilt * 0.85 && !chimePlayed.current) {
      playChime();
      chimePlayed.current = true;
    }

    rafId.current = requestAnimationFrame(() => {
      if (card) {
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03, 1.03, 1)`;
      }
      rafId.current = null;
    });
  };

  const handleMouseEnter = () => {
    chimePlayed.current = false;
    const card = cardRef.current;
    if (card) {
      card.style.transition = "transform 0.1s ease-out";
    }
  };

  const handleMouseLeave = () => {
    chimePlayed.current = false;
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    const card = cardRef.current;
    if (card) {
      card.style.transition = "transform 0.4s ease-out";
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="sp-card group relative p-6 rounded-xl bg-[#090b10] border border-white/10 hover:border-[#ef9a57]/60 shadow-[inset_0_1px_0_0_rgba(220,230,240,0.65),0_15px_35px_rgba(0,0,0,0.7)] backdrop-blur-md flex flex-col justify-between min-h-[200px] select-none transition-transform duration-300"
      data-cursor="VIEW"
      role="listitem"
      tabIndex={0}
      aria-label={`${skill.name} — ${skill.level} — ${skill.description}`}
    >
      {/* Top Edge Specular Sheen */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(220,230,240,0.8)] to-transparent group-hover:via-[#ef9a57] transition-all opacity-80" aria-hidden="true" />

      {/* Card Header Telemetry */}
      <div className="flex items-center justify-between font-mono text-[9px] text-white/40 tracking-precision border-b border-white/5 pb-2.5">
        <span>SPECIMEN // #{String(index + 1).padStart(2, "0")}</span>
        <span className="text-[#ef9a57] font-bold uppercase">{skill.level}</span>
      </div>

      <div className="space-y-2 py-3">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-base font-bold tracking-tight text-[#f2f4f7] group-hover:text-[#ef9a57] transition-colors">
            {skill.name}
          </h3>
          <span className="font-mono text-[9px] tracking-wider text-white/40 px-2 py-0.5 rounded bg-white/5">
            {skill.tag}
          </span>
        </div>

        <p className="text-xs text-white/60 leading-relaxed font-sans">
          {skill.description}
        </p>
      </div>

      {/* Bottom Optical Metric Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5 font-mono text-[9px] text-white/30 tracking-precision">
        <span>REFRACTION: n = {(1.5 + (index % 5) * 0.04).toFixed(3)}</span>
        <span className="text-white/50">ABBE ν: {58 - (index % 4) * 8}</span>
      </div>
    </div>
  );
}
