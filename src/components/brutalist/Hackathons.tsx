"use client";

import React from "react";
import { SparkleStar, GeometricCross } from "./Doodles";

const hackathons = [
  {
    id: "iqoo",
    year: "2026",
    event: "iQOO HACKATHON",
    projectName: "RELAY",
    role: "Full-Stack & AI Builder",
    badgeColor: "bg-[#FFE57F]",
    status: "PARTICIPANT",
    award: "⚡ Competed · Round 1 Pitch (Not Selected)",
    desc: "36-hour continuous build sprint competing in the iQOO Hackathon. Engineered RELAY: a sub-150ms vector clustering intelligence engine for technical documentation and pitched in qualifying rounds.",
    highlights: [
      "Shipped working MVP within 36-hour sprint window",
      "Sub-150ms real-time vector embeddings search pipeline",
      "Competed in round 1 qualifying pitch against national teams",
    ],
    tags: ["36-HR SPRINT", "VECTOR EMBEDDINGS", "FASTAPI", "NEXT.JS"],
  },
  {
    id: "sih",
    year: "2026",
    event: "SMART INDIA HACKATHON",
    projectName: "NYAY SURAKSHA (SIH-2026)",
    role: "Full-Stack & Systems Lead",
    badgeColor: "bg-[#A5D8FF]",
    status: "DECISION PENDING",
    award: "⏳ Project Submitted · Decision Pending",
    desc: "Engineered and submitted Nyay Suraksha for Smart India Hackathon 2026 (Ministry of Home Affairs / NCRB) — digital legal document management platform with tamper-evident custody logging. Decision currently pending.",
    highlights: [
      "Submitted official project proposal & full technical architecture",
      "Tamper-evident custody verification & Next.js portal",
      "Currently under evaluation with jury — results pending",
    ],
    tags: ["SIH 2026 SUBMISSION", "MHA / NCRB", "NEXT.JS", "FASTAPI"],
  },
];

export default function Hackathons() {
  return (
    <section id="hackathons" className="relative py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* Background Scrapbook Deco */}
      <div className="absolute top-10 right-14 text-black/15 pointer-events-none hidden sm:block">
        <GeometricCross className="w-5 h-5" />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#D8B4FE] border-2 border-black rounded-md font-space font-bold text-xs uppercase tracking-wider mb-3 shadow-brutal-xs">
            <span>COMPETITIVE RUNS &amp; SPRINT SPRINTS</span>
            <SparkleStar className="w-3.5 h-3.5 text-black" />
          </div>
          <h2 className="font-space font-black text-3xl sm:text-4xl md:text-5xl text-black tracking-tight leading-tight">
            Hackathons &amp; Sprints
          </h2>
          <p className="font-space text-base md:text-lg text-gray-700 mt-2 max-w-xl">
            Rapid zero-to-one building, collaborating under tight deadlines, and pitching live to technical juries.
          </p>
        </div>

        <div className="font-space font-extrabold text-xs uppercase tracking-widest bg-white border-2 border-black px-4 py-2 rounded-xl shadow-brutal-xs">
          2 HACKATHONS INDEXED
        </div>
      </div>

      {/* 2 Hackathon Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {hackathons.map((hack) => (
          <div
            key={hack.id}
            className="bg-white border-2 border-black rounded-2xl p-6 shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Year & Status Pill */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-space font-black text-xs text-gray-500">
                  {hack.year}
                </span>
                <span className={`font-space font-extrabold text-[11px] px-2.5 py-0.5 rounded border border-black ${hack.badgeColor} shadow-brutal-xs`}>
                  {hack.status}
                </span>
              </div>

              {/* Event Name & Role */}
              <h3 className="font-space font-black text-xl text-black mb-1">
                {hack.event}
              </h3>
              <div className="font-space font-bold text-xs text-blue-600 mb-4">
                {hack.role}
              </div>

              {/* Project name callout */}
              <div className="bg-[#FAF7F0] border border-black rounded-lg p-2.5 mb-4 text-xs font-space">
                <span className="text-gray-500 font-medium">Project: </span>
                <strong className="text-black font-extrabold">{hack.projectName}</strong>
              </div>

              <p className="font-space text-xs text-gray-700 leading-relaxed mb-4">
                {hack.desc}
              </p>

              {/* Highlights */}
              <ul className="space-y-1.5 mb-5 text-xs font-space text-gray-700">
                {hack.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#6BCB77] font-black">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Award banner & tags */}
            <div className="pt-4 border-t border-black/10">
              <div className="bg-[#FFE57F] border border-black px-3 py-1.5 rounded-lg text-xs font-space font-extrabold text-black mb-3 shadow-brutal-xs flex items-center gap-1.5">
                <span>{hack.award}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {hack.tags.map((t) => (
                  <span
                    key={t}
                    className="font-space font-bold text-[10px] px-2 py-0.5 bg-[#FAF7F0] border border-black/40 rounded text-gray-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
