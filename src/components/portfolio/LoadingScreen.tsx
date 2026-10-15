"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const LOADING_STEPS = [
  { at: 0, text: "Brewing warm chai... ☕" },
  { at: 20, text: "Gathering cute stickers & pixels... 🌸" },
  { at: 50, text: "Waking up AI neural models... 🤖" },
  { at: 75, text: "Polishing 60 FPS spring physics... ⚡" },
  { at: 92, text: "Welcome to Himang's World! 🚀" },
];

const CUTE_FLOATERS = [
  { emoji: "🌸", top: "8%", left: "8%", size: "text-2xl sm:text-3xl", rot: "-12deg", delay: "0s" },
  { emoji: "✨", top: "14%", left: "88%", size: "text-xl sm:text-2xl", rot: "15deg", delay: "0.5s" },
  { emoji: "💖", top: "24%", left: "12%", size: "text-xl sm:text-2xl", rot: "10deg", delay: "0.8s" },
  { emoji: "⭐", top: "32%", left: "92%", size: "text-2xl sm:text-3xl", rot: "-10deg", delay: "0.3s" },
  { emoji: "☕", top: "72%", left: "6%", size: "text-2xl sm:text-3xl", rot: "8deg", delay: "1.1s" },
  { emoji: "🍬", top: "78%", left: "90%", size: "text-xl sm:text-2xl", rot: "-15deg", delay: "0.6s" },
  { emoji: "✦", top: "88%", left: "14%", size: "text-xl sm:text-2xl", rot: "14deg", delay: "0.2s" },
  { emoji: "🚀", top: "82%", left: "82%", size: "text-2xl sm:text-3xl", rot: "18deg", delay: "0.9s" },
  { emoji: "🎀", top: "10%", left: "50%", size: "text-xl sm:text-2xl", rot: "-8deg", delay: "0.4s" },
  { emoji: "🌈", top: "90%", left: "48%", size: "text-xl sm:text-2xl", rot: "6deg", delay: "1.0s" },
  { emoji: "🎨", top: "48%", left: "4%", size: "text-xl sm:text-2xl", rot: "-14deg", delay: "0.7s" },
  { emoji: "⚡", top: "52%", left: "94%", size: "text-xl sm:text-2xl", rot: "12deg", delay: "0.3s" },
  { emoji: "🍩", top: "64%", left: "15%", size: "text-lg sm:text-xl", rot: "-6deg", delay: "1.2s" },
  { emoji: "🍪", top: "66%", left: "84%", size: "text-lg sm:text-xl", rot: "9deg", delay: "0.8s" },
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Brewing warm chai... ☕");
  const [isDone, setIsDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const completeLoading = () => {
    setProgress(100);
    setStatusText("Welcome to Himang's World! 🚀");
    try {
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.55 },
        colors: ["#FFE57F", "#FFAEC8", "#A5D8FF", "#D8B4FE", "#A7F3D0"],
      });
    } catch {
      // safe fallback if canvas is not ready
    }
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsDone(true);
      }, 400);
    }, 220);
  };

  useEffect(() => {
    let current = 0;
    // Snappy timer: advances briskly every 20ms to keep load snappy (~0.5s total run)
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 5) + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        completeLoading();
      } else {
        setProgress(current);
        const match = [...LOADING_STEPS].reverse().find((s) => current >= s.at);
        if (match) setStatusText(match.text);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  if (isDone) return null;

  return (
    <div
      id="preloader"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden transition-all duration-400 ${
        isExiting ? "opacity-0 -translate-y-6 pointer-events-none scale-95" : "opacity-100 translate-y-0 scale-100"
      }`}
      style={{ backgroundColor: "#FAF7F0" }}
      aria-label="Loading Himang Panchal Portfolio"
    >
      {/* ── Cute Ambient Background Layer ── */}
      {/* Soft pastel blurred ambient candy glows */}
      <div className="absolute top-1/6 -left-20 w-96 h-96 rounded-full bg-[#FFE57F]/45 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-[#FFAEC8]/40 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute -bottom-24 left-1/4 w-[30rem] h-[30rem] rounded-full bg-[#A5D8FF]/40 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute -top-20 right-1/4 w-80 h-80 rounded-full bg-[#D8B4FE]/35 blur-3xl pointer-events-none" />

      {/* Tactile grid dots */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#111111 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Floating cute symbols drifting across the background */}
      {CUTE_FLOATERS.map((item, idx) => (
        <span
          key={idx}
          className={`absolute ${item.size} opacity-40 animate-emoji-drift-1 pointer-events-none drop-shadow-sm`}
          style={{
            top: item.top,
            left: item.left,
            animationDelay: item.delay,
            transform: `rotate(${item.rot})`,
          }}
        >
          {item.emoji}
        </span>
      ))}

      {/* ── Large Central Half-Screen Cute Card ── */}
      <div className="relative z-10 w-[94vw] max-w-2xl lg:max-w-3xl min-h-[50vh] sm:min-h-[54vh] bg-white border-3 sm:border-4 border-black rounded-[2.5rem] p-6 sm:p-9 md:p-11 shadow-[10px_10px_0px_#111111] sm:shadow-[16px_16px_0px_#111111] flex flex-col justify-between items-center text-center transition-all">
        
        {/* Top Header Row of the Card */}
        <div className="w-full flex items-center justify-between pb-4 sm:pb-6 border-b-2 border-black/10">
          {/* Macaron Dots */}
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFAEC8] border-2 border-black shadow-brutal-xs" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFE57F] border-2 border-black shadow-brutal-xs" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#A7F3D0] border-2 border-black shadow-brutal-xs" />
          </div>

          {/* Center Cute Lab Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FAF7F0] border-2 border-black rounded-full font-space font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shadow-brutal-xs -rotate-1">
            <span className="text-[#FFAEC8]">✨</span>
            <span>HIMANG&apos;S LAB</span>
            <span className="text-[#FFE57F]">✦</span>
          </div>

          {/* Right Status Badge */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#A5D8FF] border-2 border-black rounded-full font-space font-bold text-xs shadow-brutal-xs">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span>TURBO 60 FPS</span>
          </div>
        </div>

        {/* Center Showcase: Mascot & Greeting */}
        <div className="my-auto py-4 sm:py-6 flex flex-col items-center w-full">
          {/* Adorable Animated Steaming Cup Mascot */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex flex-col items-center justify-center mb-4">
            {/* Ambient soft glow ring */}
            <div className="absolute inset-4 rounded-full bg-[#FFE57F]/60 blur-xl pointer-events-none" />

            {/* Floating cute mini stickers beside mascot */}
            <div className="hidden md:flex absolute -left-12 top-10 bg-[#FFE57F] border-2 border-black rounded-xl px-2.5 py-1 text-xs font-space font-black shadow-brutal-xs -rotate-6">
              ☕ Warm Chai
            </div>
            <div className="hidden md:flex absolute -right-12 top-10 bg-[#FFAEC8] border-2 border-black rounded-xl px-2.5 py-1 text-xs font-space font-black shadow-brutal-xs rotate-6">
              ✨ Pure Code
            </div>

            {/* Steam curls above cup */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none">
              <span className="text-sm animate-steam-1">♨️</span>
              <span className="text-xs animate-steam-2">✨</span>
              <span className="text-sm animate-steam-1" style={{ animationDelay: "1.2s" }}>⭐</span>
            </div>

            {/* Cute SVG Mascot */}
            <div className="animate-cute-bounce flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-28 h-28 sm:w-36 sm:h-36 relative z-10 drop-shadow-md">
                {/* Cup Handle */}
                <path
                  d="M68 40 C 86 40, 86 64, 68 64"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                {/* Cup Body */}
                <path
                  d="M26 32 L74 32 C 72 68, 64 78, 50 78 C 36 78, 28 68, 26 32 Z"
                  fill="#FFE57F"
                  stroke="#111111"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                {/* Cup Rim & Drink */}
                <ellipse cx="50" cy="32" rx="24" ry="6.5" fill="#FFFDF9" stroke="#111111" strokeWidth="3.5" />
                <ellipse cx="50" cy="32" rx="18" ry="4" fill="#FFAEC8" />

                {/* Happy Curved Wink Eyes */}
                <path d="M38 50 Q 42 45 46 50" fill="none" stroke="#111111" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M54 50 Q 58 45 62 50" fill="none" stroke="#111111" strokeWidth="3.2" strokeLinecap="round" />

                {/* Rosy Blush Cheeks with mini shine */}
                <circle cx="34" cy="56" r="4.5" fill="#FFAEC8" />
                <circle cx="66" cy="56" r="4.5" fill="#FFAEC8" />
                <circle cx="33" cy="55" r="1.5" fill="#FFFFFF" />
                <circle cx="65" cy="55" r="1.5" fill="#FFFFFF" />

                {/* Cute Smiling Open Mouth */}
                <path d="M46 56 Q 50 61 54 56" fill="none" stroke="#111111" strokeWidth="2.8" strokeLinecap="round" />

                {/* Cute Heart on the Cup */}
                <path
                  d="M50 68 C 50 68, 44 63, 44 60.5 C 44 58.5, 46.5 57.5, 48.5 59 L50 60.5 L51.5 59 C 53.5 57.5, 56 58.5, 56 60.5 C 56 63, 50 68, 50 68 Z"
                  fill="#FFAEC8"
                  stroke="#111111"
                  strokeWidth="1.2"
                />
              </svg>
            </div>

            {/* Soft cup shadow */}
            <div className="w-24 sm:w-28 h-3 bg-black/15 rounded-full blur-[1.5px] animate-cup-shadow -mt-1" />
          </div>

          {/* Title & Friendly Headline */}
          <h2 className="font-space font-black text-2xl sm:text-3xl md:text-4xl text-black tracking-tight mb-2">
            Loading Himang&apos;s Portfolio
          </h2>

          {/* Status Capsule Box */}
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-6 py-2 bg-[#FAF7F0] border-2 border-black rounded-2xl shadow-brutal-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
            <p className="font-space font-extrabold text-xs sm:text-sm md:text-base text-gray-800 transition-all duration-150">
              {statusText}
            </p>
          </div>
        </div>

        {/* Bottom Section: Chunky Progress Bar & Controls */}
        <div className="w-full pt-4 sm:pt-6 border-t-2 border-black/10">
          {/* Candy-Striped Pastel Progress Bar Container */}
          <div className="relative w-full h-7 sm:h-8 bg-[#FAF7F0] border-3 border-black rounded-full p-1 shadow-brutal-xs overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-[#FFE57F] via-[#FFAEC8] to-[#A5D8FF] rounded-full animate-candy-stripe transition-all duration-75 ease-out flex items-center justify-end pr-2"
              style={{ width: `${progress}%` }}
            >
              {progress > 12 && (
                <span className="text-xs sm:text-sm select-none pointer-events-none drop-shadow">
                  ⭐
                </span>
              )}
            </div>
          </div>

          {/* Footer Controls Row */}
          <div className="flex items-center justify-between gap-3">
            {/* Percentage Pill */}
            <span className="bg-[#FFE57F] px-3 sm:px-4 py-1.5 rounded-xl border-2 border-black shadow-brutal-xs font-space font-black text-xs sm:text-sm text-black">
              {progress}%
            </span>

            {/* Feature Pills (Hidden on very small screens) */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-black rounded-lg text-xs font-bold shadow-brutal-xs">
                🎨 Tactile UI
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-3 py-1 bg-white border border-black rounded-lg text-xs font-bold shadow-brutal-xs">
                🤖 AI Ready
              </span>
              <span className="hidden lg:inline-flex items-center gap-1 px-3 py-1 bg-white border border-black rounded-lg text-xs font-bold shadow-brutal-xs">
                ⚡ 60 FPS
              </span>
            </div>

            {/* Tactile Skip Button */}
            <button
              onClick={completeLoading}
              className="px-4 py-1.5 bg-[#FAF7F0] hover:bg-[#FFAEC8] border-2 border-black rounded-xl text-xs sm:text-sm font-space font-black text-black shadow-brutal-xs hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>Skip</span>
              <span>➔</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
