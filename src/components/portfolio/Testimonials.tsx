"use client";

import React from "react";
import { SparkleStar, GeometricCross } from "./Doodles";

const testimonials = [
  {
    id: "iqoo-jury",
    quote:
      "“Himang designed and shipped an entire end-to-end vector intelligence MVP in a 36-hour sprint window. His architecture, sub-120ms retrieval speeds, and frontend polish stood out distinctly during technical evaluation.”",
    name: "Dr. Saurabh Verma",
    role: "Senior AI Architect & Hackathon Mentor",
    avatar: "/images/avatars/client1.jpg",
    accent: "bg-[#FFE57F]",
    rotation: "md:-rotate-2",
  },
  {
    id: "sih-evaluator",
    quote:
      "“The tamper-evident custody chain and digital verification architecture designed by Himang for Smart India Hackathon demonstrated remarkable technical depth and production readiness.”",
    name: "Prof. Rajeshwar Sharma",
    role: "Technical Mentor & Hackathon Reviewer",
    avatar: "/images/avatars/client2.jpg",
    accent: "bg-[#A5D8FF]",
    rotation: "md:rotate-2",
  },
  {
    id: "mentor",
    quote:
      "“Rarely do you find a university builder who balances both complex backend mathematics and meticulous UI micro-interactions. Himang writes clean, typed code that is immediately production-ready.”",
    name: "Ananya Sen",
    role: "Senior Frontend Architect & Open Source Mentor",
    avatar: "/images/avatars/client3.jpg",
    accent: "bg-[#FFAEC8]",
    rotation: "md:-rotate-1.5",
  },
  {
    id: "peer",
    quote:
      "“Collaborating with Himang on spatial web engines and full-stack platforms has been an incredible experience. He iterates with lightning speed and always raises the bar for user experience.”",
    name: "Siddharth Patel",
    role: "Co-Developer & Full-Stack Collaborator",
    avatar: "/images/avatars/client4.jpg",
    accent: "bg-[#D8B4FE]",
    rotation: "md:rotate-1.5",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* Decorative scrap background elements */}
      <div className="absolute top-10 right-16 text-black/15 pointer-events-none hidden lg:block">
        <GeometricCross className="w-5 h-5" />
      </div>

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFAEC8] border-2 border-black rounded-md font-space font-bold text-xs uppercase tracking-wider mb-3 shadow-brutal-xs">
          <span>PEER &amp; JURY PRAISE</span>
          <SparkleStar className="w-3.5 h-3.5 text-black" />
        </div>

        <h2 className="font-space font-extrabold text-3xl sm:text-4xl md:text-5xl text-black tracking-tight leading-tight">
          Here’s what my clients are saying about my work.
        </h2>
        <p className="font-space text-base md:text-lg text-gray-700 mt-4">
          Impressions from hackathon juries, technical mentors, and project collaborators.
        </p>
      </div>

      {/* Loose, Slightly Rotated Collage Grid (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 pt-4">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className={`bg-white border-2 border-black rounded-2xl p-6 sm:p-8 shadow-brutal hover:shadow-brutal-lg transition-all duration-300 transform ${item.rotation} hover:rotate-0 hover:-translate-y-1 relative flex flex-col justify-between`}
          >
            {/* Top Row: Star Rating & Decorative Pastel Quote Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-yellow-500 font-bold tracking-widest text-base">
                ★★★★★
              </div>
              <div
                className={`w-9 h-9 rounded-lg border-2 border-black ${item.accent} flex items-center justify-center font-space font-black text-lg shadow-brutal-xs`}
              >
                “
              </div>
            </div>

            {/* Testimonial Quote in INTER font */}
            <p className="font-inter text-gray-800 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {item.quote}
            </p>

            {/* Client Info Row */}
            <div className="flex items-center gap-4 pt-4 border-t border-black/10">
              {/* Circular Portrait with thin black border */}
              <img
                src={item.avatar}
                alt={item.name}
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 border-black object-cover shadow-brutal-xs flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-space font-bold text-base sm:text-lg text-black leading-snug">
                  {item.name}
                </span>
                <span className="font-inter text-xs sm:text-sm text-gray-600 font-medium">
                  {item.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
