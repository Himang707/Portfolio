"use client";

import React from "react";
import { SparkleStar, CurvedArrow } from "./Doodles";

const services = [
  {
    title: "Frontend Engineering",
    tag: "REACT & NEXT.JS",
    bg: "bg-[#A5D8FF]",
    icon: (
      <svg className="w-7 h-7 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    ),
    desc: "Crafting scalable component hierarchies, reactive state machines, responsive viewport layouts, and fluid micro-interactions with Next.js & Tailwind CSS.",
    linkText: "Explore projects ➔",
  },
  {
    title: "Spatial 3D & WebGL",
    tag: "THREE.JS & SHADERS",
    bg: "bg-[#FFE57F]",
    icon: (
      <svg className="w-7 h-7 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
    desc: "Bringing web interfaces into spatial 3D with hardware-accelerated GLSL raymarching, audio-reactive particles, and zero-layout-shift 60 FPS transitions.",
    linkText: "Explore projects ➔",
  },
  {
    title: "Applied AI & Vector DBs",
    tag: "INTELLIGENCE",
    bg: "bg-[#FFAEC8]",
    icon: (
      <svg className="w-7 h-7 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    ),
    desc: "Engineering sub-120ms vector retrieval, embeddings pipelines, knowledge topology graphs, and LLM orchestration with Python, FastAPI & Vector DBs.",
    linkText: "Explore projects ➔",
  },
  {
    title: "Computer Vision Systems",
    tag: "VISION & CV",
    bg: "bg-[#D8B4FE]",
    icon: (
      <svg className="w-7 h-7 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
    desc: "Developing image processing algorithms, object detection, visual embeddings, camera tracking, and edge model inferencing with PyTorch & OpenCV.",
    linkText: "Explore projects ➔",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="mb-12 md:mb-16 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D8B4FE] border-2 border-black rounded-md font-space font-bold text-xs uppercase tracking-wider mb-4 shadow-brutal-xs">
          <span>CAPABILITIES &amp; EXPERTISE</span>
          <SparkleStar className="w-3.5 h-3.5 text-black" />
        </div>
        <h2 className="font-space font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-black leading-tight">
          Services we’re providing that derive 99% result.
        </h2>
      </div>

      {/* Main Grid: Left Metrics & Right 2x2 Service Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Metrics & Scrapbook Notes */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <p className="font-space text-base md:text-lg text-gray-700 leading-relaxed">
            Every product starts with understanding the problem and building real, tangible solutions. I combine rigorous full-stack engineering with playful design to ship results that matter.
          </p>

          {/* Metric Card 1: 5+ Projects */}
          <div className="bg-[#FFE57F] border-2 border-black rounded-2xl p-6 shadow-brutal hover:shadow-brutal-lg transition-transform hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute top-3 right-4 opacity-15 font-black text-6xl select-none group-hover:scale-110 transition-transform">
              ✦
            </div>
            <div className="font-space font-black text-4xl sm:text-5xl text-black tracking-tight mb-1">
              5+ Projects
            </div>
            <div className="font-space font-bold text-sm text-black uppercase tracking-wider">
              Successfully Shipped to Production
            </div>
            <p className="text-xs text-gray-800 mt-2">
              Across Vector AI, 3D WebGL, and Geospatial Travel platforms.
            </p>
          </div>

          {/* Metric Card 2: 2 Hackathons */}
          <div className="bg-[#FFAEC8] border-2 border-black rounded-2xl p-6 shadow-brutal hover:shadow-brutal-lg transition-transform hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute top-3 right-4 opacity-15 font-black text-6xl select-none group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <div className="font-space font-black text-4xl sm:text-5xl text-black tracking-tight mb-1">
              2 Hackathons
            </div>
            <div className="font-space font-bold text-sm text-black uppercase tracking-wider">
              Competitive Sprints &amp; Submissions
            </div>
            <p className="text-xs text-gray-800 mt-2">
              iQOO Hackathon (Competitor) &amp; Smart India Hackathon 2026 (Submitted · Decision Pending).
            </p>
          </div>

          {/* Scrapbook Arrow & Sticky Note */}
          <div className="relative pt-2 pl-4 flex items-center gap-3">
            <CurvedArrow className="w-14 h-10 text-black rotate-12" />
            <div className="bg-white border-2 border-black px-3.5 py-1.5 rounded-lg shadow-brutal-xs font-space font-bold text-xs -rotate-2">
              ⚡ Rapid zero-to-one delivery
            </div>
          </div>
        </div>

        {/* Right Column: 2-by-2 Service Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white border-2 border-black rounded-2xl p-6 shadow-brutal hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Pastel Icon & Discipline Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-14 h-14 rounded-xl border-2 border-black ${service.bg} flex items-center justify-center shadow-brutal-xs group-hover:rotate-6 transition-transform`}
                  >
                    {service.icon}
                  </div>
                  <span className="font-space font-bold text-[11px] uppercase tracking-wider px-2 py-0.5 border border-black rounded bg-[#FAF7F0]">
                    {service.tag}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-space font-extrabold text-2xl text-black mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>

                {/* Service Short Description */}
                <p className="font-space text-sm text-gray-600 leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>

              {/* Learn More Link */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 font-space font-bold text-sm text-black group-hover:translate-x-1 transition-transform border-b-2 border-black pb-0.5 w-fit"
              >
                <span>{service.linkText}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
