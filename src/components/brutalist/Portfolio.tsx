"use client";

import React from "react";
import { BlueSquiggle, SparkleStar, GeometricCross } from "./Doodles";

const realProjects = [
  {
    id: "udayaan-tech",
    number: "01",
    badge: "WORK / ORG",
    badgeColor: "bg-[#A5D8FF]",
    title: "UDAYAAN TECH — Engineering Organization",
    subtitle: "Technology organization & engineering team where I work — building AI operating systems, high-performance systems software, and nationwide hackathon architectures.",
    tags: ["Engineering Org", "Core Team", "AI Systems", "Systems Architecture", "Open Source"],
    btnColor: "bg-[#A5D8FF]",
    liveUrl: "https://github.com/udayaan-tech",
    githubUrl: "https://github.com/udayaan-tech",
    stats: "Current Org · Active Contributor",
    githubLabel: "🏢 GitHub Org",
    liveLabel: "Org Profile ↗",
  },
  {
    id: "sih-2026",
    number: "02",
    badge: "SIH 2026",
    badgeColor: "bg-[#FFE57F]",
    title: "NYAY SURAKSHA (SIH-2026) — Legal Document System",
    subtitle: "Secure digital document management platform submitted for Smart India Hackathon 2026 (Ministry of Home Affairs / NCRB) featuring tamper-evident custody logging & Next.js portal — evaluation pending.",
    tags: ["SIH 2026 Submission", "Udayaan Tech", "MHA / NCRB", "Next.js", "FastAPI"],
    btnColor: "bg-[#FFE57F]",
    liveUrl: "https://github.com/udayaan-tech/SIH-2026",
    githubUrl: "https://github.com/udayaan-tech/SIH-2026",
    stats: "Submitted · Decision Pending",
    githubLabel: "🐙 SIH Source Code",
    liveLabel: "Architecture ↗",
  },
  {
    id: "udyra",
    number: "03",
    badge: "AI OPERATING SYSTEM",
    badgeColor: "bg-[#FFAEC8]",
    title: "UDYRA — AI Operating System",
    subtitle: "India-first AI Operating System featuring persistent context memory, autonomous background agents (Nexus), AI tool discovery, and unified workflow automation.",
    tags: ["AI OS", "Udayaan Tech", "Autonomous Agents", "Persistent Memory", "Full Stack"],
    btnColor: "bg-[#FFAEC8]",
    liveUrl: "https://udyra.in",
    githubUrl: "https://github.com/udayaan-tech/udyra",
    stats: "AI Operating System · India First",
    githubLabel: "🐙 GitHub Repo",
    liveLabel: "Live Product ↗",
  },
  {
    id: "relay",
    number: "04",
    badge: "AI INTELLIGENCE",
    badgeColor: "bg-[#D8B4FE]",
    title: "RELAY — Context Intelligence Platform",
    subtitle: "AI document context platform with sub-120ms vector retrieval, knowledge topology graph, and hallucination-free citation indexing.",
    tags: ["AI & ML", "Next.js", "Python", "FastAPI", "Vector DB"],
    btnColor: "bg-[#D8B4FE]",
    liveUrl: "https://relay-intelligence.demo.app",
    githubUrl: "https://github.com/himangpanchal/relay-context-platform",
    stats: "<120ms Latency · 98.4% Precision",
    githubLabel: "🐙 Source Code",
    liveLabel: "Live Demo ↗",
  },
];

export default function Portfolio() {
  return (
    <section id="projects" className="relative py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* Decorative scrap background elements */}
      <div className="absolute top-12 left-10 text-black/15 pointer-events-none hidden sm:block">
        <GeometricCross className="w-5 h-5" />
      </div>
      <div className="absolute top-24 right-12 text-black/15 pointer-events-none hidden sm:block">
        <GeometricCross className="w-6 h-6" />
      </div>

      {/* Centered Heading with Decorative Blue Doodle */}
      <div className="flex flex-col items-center text-center mb-16 relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#A5D8FF] border-2 border-black rounded-md font-space font-bold text-xs uppercase tracking-wider mb-3 shadow-brutal-xs">
          <span>HIMANG&apos;S SHIPPED WORK</span>
          <SparkleStar className="w-3.5 h-3.5 text-black" />
        </div>

        <div className="relative inline-block">
          <h2 className="font-space font-black text-4xl sm:text-5xl md:text-6xl text-black tracking-tight">
            My Projects
          </h2>
          {/* Decorative Blue Doodle Squiggle */}
          <div className="mt-1 flex justify-center">
            <BlueSquiggle className="w-48 sm:w-60 h-5" color="#3B82F6" />
          </div>
        </div>

        <p className="font-space text-base md:text-lg text-gray-700 max-w-xl mt-4">
          A curated selection of real applications, our technology organization, and software built with speed, precision, and weightless polish.
        </p>
      </div>

      {/* Two-Column Grid: 4 Outlined White Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {realProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white border-2 border-black rounded-2xl p-6 sm:p-7 shadow-brutal hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              {/* Card Header: Number Badge, Badge & Status Pill */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <div className="bg-[#FAF7F0] border-2 border-black px-3 py-1 rounded-md font-space font-black text-xs sm:text-sm text-black shadow-brutal-xs">
                    {project.number}
                  </div>
                  {project.badge && (
                    <span className={`${project.badgeColor} border border-black px-2 py-0.5 rounded font-space font-black text-[10px] uppercase tracking-wider text-black shadow-brutal-xs`}>
                      {project.badge}
                    </span>
                  )}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white border border-black rounded-full font-space font-bold text-[11px] sm:text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{project.stats}</span>
                </div>
              </div>

              {/* Discipline Labels & Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-space font-bold text-xs px-2.5 py-1 bg-[#FAF7F0] border border-black rounded-md text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Project Title & Short Subtitle */}
              <h3 className="font-space font-extrabold text-2xl sm:text-3xl text-black group-hover:text-blue-600 transition-colors leading-tight mb-2">
                {project.title}
              </h3>
              <p className="font-space text-sm sm:text-base text-gray-600 leading-relaxed">
                {project.subtitle}
              </p>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between pt-5 mt-4 border-t border-black/10">
              <div className="flex items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-space font-bold text-xs sm:text-sm text-black hover:underline underline-offset-2 flex items-center gap-1"
                >
                  <span>{project.githubLabel}</span>
                </a>
                <span className="text-gray-300">•</span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-space font-bold text-xs sm:text-sm text-blue-600 hover:underline underline-offset-2 flex items-center gap-1"
                >
                  <span>{project.liveLabel}</span>
                </a>
              </div>

              {/* Small Arrow Button */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title}`}
                className={`flex-shrink-0 w-11 h-11 rounded-full border-2 border-black ${project.btnColor} flex items-center justify-center font-bold text-lg text-black shadow-brutal-xs group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-brutal transition-all`}
              >
                ➔
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
