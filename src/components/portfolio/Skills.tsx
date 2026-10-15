"use client";

import React, { useState } from "react";
import { skills, skillCategories } from "@/data/skills";
import { SparkleStar, GeometricCross } from "./Doodles";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = skills.filter((s) => {
    const catMatch = activeCategory === "all" || s.category === activeCategory;
    const searchMatch = !search || s.name.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <section id="skills" className="relative py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* Background Scrapbook Cross */}
      <div className="absolute top-10 left-10 text-black/15 pointer-events-none hidden sm:block">
        <GeometricCross className="w-5 h-5" />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#A7F3D0] border-2 border-black rounded-md font-space font-bold text-xs uppercase tracking-wider mb-3 shadow-brutal-xs">
            <span>TECHNICAL ARSENAL</span>
            <SparkleStar className="w-3.5 h-3.5 text-black" />
          </div>
          <h2 className="font-space font-black text-3xl sm:text-4xl md:text-5xl text-black tracking-tight leading-tight">
            Skills &amp; Technologies
          </h2>
          <p className="font-space text-base md:text-lg text-gray-700 mt-2 max-w-lg">
            Tools I reach for daily — from modern React component architectures to deep learning inference pipelines.
          </p>
        </div>

        {/* Search input with tactile border & shadow */}
        <div className="relative shrink-0">
          <input
            type="text"
            placeholder="Search arsenal..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 px-4 py-2.5 rounded-xl text-sm font-space font-semibold text-black bg-white border-2 border-black shadow-brutal-xs focus:outline-none focus:shadow-brutal placeholder:text-gray-400 transition-all"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2.5 mb-10">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-xl text-xs font-space font-extrabold border-2 border-black transition-all flex items-center gap-1.5 ${
            activeCategory === "all"
              ? "bg-[#FFE57F] text-black shadow-brutal translate-x-[-1px] translate-y-[-1px]"
              : "bg-white text-black shadow-brutal-xs hover:bg-[#FAF7F0]"
          }`}
        >
          <span>⚡</span>
          <span>ALL ({skills.length})</span>
        </button>
        {skillCategories.map((cat) => {
          const emoji = cat.id === "frontend" ? "⚛️" : cat.id === "ai_ml" ? "🤖" : cat.id === "languages" ? "💻" : "🛠️";
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-space font-extrabold border-2 border-black transition-all flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? "bg-[#A5D8FF] text-black shadow-brutal translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-black shadow-brutal-xs hover:bg-[#FAF7F0]"
              }`}
            >
              <span>{emoji}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((skill) => (
          <div
            key={skill.name}
            className="bg-white border-2 border-black rounded-xl p-5 shadow-brutal hover:shadow-brutal-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-space font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#FAF7F0] border border-black rounded text-gray-700">
                  {skill.tag}
                </span>
                <span className="font-space font-black text-[11px] px-2 py-0.5 rounded bg-[#FFE57F] border border-black shadow-brutal-xs">
                  {skill.level}
                </span>
              </div>

              <h3 className="font-space font-extrabold text-lg text-black group-hover:text-blue-600 transition-colors mb-1.5">
                {skill.name}
              </h3>

              <p className="font-space text-xs text-gray-600 leading-relaxed">
                {skill.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
