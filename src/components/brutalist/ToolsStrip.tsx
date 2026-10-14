"use client";

import React from "react";

const tools = [
  { name: "React", desc: "Core Library", icon: "⚛️" },
  { name: "Next.js", desc: "SSR & App Router", icon: "▲" },
  { name: "TypeScript", desc: "Type Safety", icon: "🔷" },
  { name: "Python", desc: "Scripting & ML", icon: "🐍" },
  { name: "PyTorch", desc: "Deep Learning", icon: "🔥" },
  { name: "Computer Vision", desc: "Image Processing", icon: "👁️" },
  { name: "Tailwind CSS", desc: "Design Systems", icon: "🎨" },
  { name: "FastAPI", desc: "High-Perf APIs", icon: "⚡" },
];

export default function ToolsStrip() {
  return (
    <section className="w-full bg-[#111111] text-white border-y-2 border-black py-4 md:py-5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
          <div className="hidden lg:flex items-center gap-2 font-space font-black text-xs uppercase tracking-widest text-[#FFE57F] bg-white/10 px-3 py-1.5 rounded border border-white/20 shrink-0">
            <span>TECH ARSENAL</span>
          </div>

          <div className="flex-1 flex flex-wrap items-center justify-around gap-4 md:gap-6">
            {tools.map((tool, idx) => (
              <div
                key={tool.name}
                className="flex items-center gap-2.5 group cursor-default transition-transform hover:-translate-y-0.5"
              >
                {idx > 0 && (
                  <span className="text-[#FFE57F] text-xs select-none mr-2 hidden md:inline">
                    ✦
                  </span>
                )}
                <span className="text-lg md:text-xl group-hover:scale-125 transition-transform duration-200">
                  {tool.icon}
                </span>
                <span className="font-space font-extrabold text-base md:text-lg tracking-tight text-white group-hover:text-[#FFE57F] transition-colors whitespace-nowrap">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-space text-gray-400 shrink-0">
            <span>● 15+ PRODUCTION TOOLS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
