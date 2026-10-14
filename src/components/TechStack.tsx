"use client";

import React, { useState } from "react";
import { skills, skillCategories, SkillItem } from "@/data/skills";
import {
  Atom,
  Globe,
  FileCode,
  Palette,
  Code2,
  Server,
  Cpu,
  Database,
  Binary,
  FileJson,
  Layers,
  GitBranch,
  Github,
  TerminalSquare,
  Figma,
  Info,
} from "lucide-react";

// Icon mapping helper
const ICON_MAP: Record<string, React.ElementType> = {
  Atom,
  Globe,
  FileCode,
  Palette,
  Code2,
  Server,
  Cpu,
  Database,
  Binary,
  FileJson,
  Layers,
  GitBranch,
  Github,
  TerminalSquare,
  Figma,
};

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#141009]/90 border border-[#D4AF37]/45 text-[#F5D77F] font-mono text-xs tracking-widest uppercase shadow-md w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5D77F] animate-pulse" />
              <span>05 // ARSENAL & TOOLING</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-mono font-extrabold text-[#ffffff] tracking-tight text-shadow-command">
              TECH STACK
            </h2>

            <p className="text-base sm:text-lg text-[#D4CEBF] max-w-2xl leading-relaxed text-shadow-sm">
              Curated languages, runtimes, and engineering frameworks utilized to architect reliable digital products.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all shadow-sm ${
                activeCategory === "all"
                  ? "bg-[#D4AF37] text-[#080705] font-bold shadow-[0_0_14px_rgba(212,175,55,0.4)]"
                  : "bg-[#141009]/90 text-[#D4CEBF] border border-[#D4AF37]/35 hover:border-[#F5D77F] hover:text-[#ffffff]"
              }`}
            >
              ALL
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all shadow-sm ${
                  activeCategory === cat.id
                    ? "bg-[#D4AF37] text-[#080705] font-bold shadow-[0_0_14px_rgba(212,175,55,0.4)]"
                    : "bg-[#141009]/90 text-[#D4CEBF] border border-[#D4AF37]/35 hover:border-[#F5D77F] hover:text-[#ffffff]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredSkills.map((skill) => {
            const IconComponent = ICON_MAP[skill.iconName] || Code2;
            const isHovered = hoveredSkill?.name === skill.name;

            return (
              <div
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="group relative bg-[#0D0B08]/92 border border-[#D4AF37]/35 hover:border-[#F5D77F] rounded-xl sm:rounded-2xl p-4 sm:p-5 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-command-glow flex flex-col justify-between cursor-pointer"
                data-cursor="VIEW"
              >
                <div className="space-y-3">
                  {/* Top Bar: Icon & Category Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#16120A] border border-[#D4AF37]/35 flex items-center justify-center text-[#F5D77F] group-hover:bg-[#221A0C] group-hover:text-[#FFF2CC] group-hover:border-[#F5D77F] transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <span className="text-[9px] font-mono text-[#A89F8B] uppercase tracking-wider font-semibold">
                      {skill.tag}
                    </span>
                  </div>

                  {/* Name */}
                  <div>
                    <h3 className="font-mono text-sm sm:text-base font-bold text-[#ffffff] group-hover:text-[#F5D77F] transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-[11px] text-[#D4CEBF] font-sans line-clamp-2 mt-1">
                      {skill.description}
                    </p>
                  </div>
                </div>

                {/* Level Badge Footer */}
                <div className="mt-4 pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#8C7E66]">STATUS</span>
                  <span className="text-[#F5D77F] font-semibold">{skill.level}</span>
                </div>

                {/* Interactive Tooltip Card on Hover */}
                {isHovered && (
                  <div className="absolute left-1/2 -bottom-2 translate-y-full -translate-x-1/2 z-30 w-64 bg-[#0D0B08] border border-[#D4AF37] rounded-xl p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.3)] pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-bold text-[#F5D77F]">{skill.name}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#1E170A] text-[#F5D77F]">
                        {skill.category.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-[#D4CEBF] font-sans leading-relaxed">
                      {skill.description}
                    </p>
                    <div className="mt-2 pt-2 border-t border-[#D4AF37]/25 text-[10px] font-mono text-[#A89F8B] flex justify-between">
                      <span>PROFICIENCY:</span>
                      <span className="text-[#ffffff] font-bold">{skill.level}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
