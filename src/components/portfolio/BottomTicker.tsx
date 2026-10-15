"use client";

import React from "react";

export default function BottomTicker() {
  const items = [
    "🚀 OPEN TO FULL-TIME ROLES",
    "⚡ POWERED BY CODE & PASSION",
    "💻 REACT · NEXT.JS · PYTHON · AI",
    "⚡ 60 FPS CRAFTSMANSHIP",
    "📍 AHMEDABAD, GUJARAT, INDIA",
    "✌️ LET'S BUILD SOMETHING GREAT",
    "🔥 0-TO-1 RAPID PROTOTYPING",
    "✉️ HIMANGPANCHAL707@GMAIL.COM",
    "🛠️ SYSTEMS & PIXEL OBSESSED",
    "✨ 100% RELIABLE & FAST",
  ];

  return (
    <div className="w-full bg-[#FFE57F] border-y-2 border-black py-3 sm:py-4 overflow-hidden select-none shadow-brutal-sm -rotate-0.5 my-6 sm:my-10 relative z-20">
      <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
        {items.concat(items).map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="font-space font-extrabold text-xs sm:text-sm md:text-base tracking-wider uppercase text-black">
              {item}
            </span>
            <span className="text-black font-black text-sm">✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
