"use client";

import React, { useState } from "react";
import { projects, Project } from "@/data/projects";
import { ExternalLink, Github, X, CheckCircle, ArrowUpRight } from "lucide-react";

const PROJECT_COLORS = [
  { from: "rgba(148,222,192,0.18)", to: "rgba(110,182,148,0.04)", accent: "#94DEC0" },
  { from: "rgba(212,168,83,0.16)", to: "rgba(212,168,83,0.03)", accent: "#D4A853" },
  { from: "rgba(127,231,184,0.16)", to: "rgba(98,186,146,0.03)", accent: "#7FE7B8" },
];

export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative py-[15vh] overflow-hidden perspective-container"
      role="region"
      aria-label="Selected Projects"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">

        {/* Section label with luminous sage accent */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[11px] font-mono-code font-bold tracking-[0.2em] text-[#94DEC0] uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#94DEC0] pulse-dot" />
            Selected Work
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(148,222,192,0.35) 0%, transparent 100%)" }} />
        </div>

        {/* Title with airy typography */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <h2 className="text-[clamp(32px,5vw,52px)] font-[800] tracking-[-0.065em] leading-[1.2] text-white">
              Featured Projects
            </h2>
            <p className="mt-3 text-[15px] text-white/65 max-w-lg leading-[1.85] tracking-tight">
              A curated selection of applications, AI systems, and interactive tools built
              with precision, fluidity, and weightless polish.
            </p>
          </div>
          <div className="text-[13px] text-[#94DEC0]/80 font-mono-code shrink-0 tracking-wider">
            {projects.length} PROJECTS ONLINE
          </div>
        </div>

        {/* Project Cards Grid with Floating Antigravity Levitation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project, idx) => {
            const colors = PROJECT_COLORS[idx % PROJECT_COLORS.length];
            return (
              <article
                key={project.id}
                className="group relative rounded-[26px] border border-[rgba(148,222,192,0.11)]
                  antigravity-card backdrop-blur-xl flex flex-col overflow-hidden"
                style={{ background: "rgba(10,16,13,0.82)" }}
              >
                {/* Color header strip */}
                <div
                  className="h-[145px] relative overflow-hidden flex items-center justify-center"
                  style={{
                    background: `linear-gradient(160deg, ${colors.from} 0%, ${colors.to} 100%)`,
                  }}
                >
                  {/* Monogram */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center
                      text-2xl font-[900] font-mono-code shadow-xl
                      group-hover:scale-105 transition-transform duration-800"
                    style={{
                      background: "#FAF7F2",
                      color: "#080d0a",
                      transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
                    }}
                  >
                    {project.title.slice(0, 2)}
                  </div>

                  {/* Status pill with microgravity pulse */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                      text-[10px] font-medium bg-black/60 backdrop-blur-md border border-[rgba(148,222,192,0.2)]
                      text-[#94DEC0] shadow-[0_0_10px_rgba(148,222,192,0.12)]">
                      <span className="w-1 h-1 rounded-full bg-[#94DEC0] pulse-dot" />
                      {project.status === "PRODUCTION" ? "Live" : project.status}
                    </span>
                  </div>

                  {/* Category */}
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[10px] font-mono-code text-white/60 bg-black/50 backdrop-blur px-2.5 py-1 rounded-full border border-white/[0.06]">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 gap-4">
                  <div>
                    <h3 className="text-[18px] font-[700] text-white tracking-[-0.04em] group-hover:text-[#94DEC0] transition-colors duration-800">
                      {project.title}
                    </h3>
                    <p className="text-[12px] text-white/50 mt-0.5 font-mono-code">{project.subtitle}</p>
                  </div>

                  <p className="text-[13px] text-white/70 leading-[1.8] flex-1">
                    {project.longDescription}
                  </p>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {project.stats.map((s, i) => (
                      <div key={i} className="text-center p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="text-[13px] font-[700] font-mono-code text-[#FAF7F2] leading-none">
                          {s.value}
                        </div>
                        <div className="text-[10px] text-white/45 mt-1 leading-tight">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-mono-code
                        bg-white/[0.03] border border-white/[0.06] text-white/60 antigravity-pill hover:border-[rgba(148,222,192,0.25)] hover:text-white">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action bar with antigravity buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
                    <button
                      onClick={() => setSelected(project)}
                      className="px-4 py-2.5 rounded-xl text-[12px] font-medium
                        bg-white/[0.04] border border-white/[0.08] text-white/75
                        hover:text-white hover:bg-white/[0.08] antigravity-button focus:outline-none"
                    >
                      Details
                    </button>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                        text-[13px] font-semibold text-[#080d0a] bg-[#FAF7F2] hover:bg-white
                        antigravity-button focus:outline-none"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]
                        text-white/65 hover:text-white antigravity-button focus:outline-none"
                      aria-label={`Source code for ${project.title}`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(5,9,7,0.88)", backdropFilter: "blur(20px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-md w-full rounded-[24px] border border-white/[0.1] p-7 space-y-5"
            style={{ background: "rgba(10,17,13,0.96)" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[20px] font-[800] text-white tracking-tight">{selected.title}</h3>
                <p className="text-[12px] text-white/45 font-mono-code mt-0.5">{selected.subtitle}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-2 rounded-xl bg-white/[0.05] text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[14px] text-white/70 leading-relaxed">{selected.longDescription}</p>

            <div className="space-y-2">
              <div className="text-[10px] font-mono-code text-white/35 uppercase tracking-widest">
                Core Features
              </div>
              {selected.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[13px] text-white/75">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2.5 pt-2 border-t border-white/[0.07]">
              <a
                href={selected.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
                  text-[13px] font-semibold text-[#0a0d0b] bg-[#FAF7F2] hover:bg-white transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Open Live
              </a>
              <a
                href={selected.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-[13px] font-medium
                  text-white/75 bg-white/[0.05] border border-white/[0.09] hover:bg-white/[0.09] transition-all"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
