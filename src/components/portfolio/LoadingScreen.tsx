"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const SPEED_STEPS = [
  { at: 0, text: "Igniting 10x Speed Engine... 🏎️💨", sub: "Optimizing Critical Rendering Path" },
  { at: 20, text: "Splitting CSS & Inlining Fonts... ⚡", sub: "font-display: swap unblocking render" },
  { at: 48, text: "Lazy Loading WebP Graphics... 📦", sub: "Zero render-blocking assets" },
  { at: 74, text: "Polishing 60 FPS Spring Physics... 🏁", sub: "Hardware GPU will-change active" },
  { at: 92, text: "10x Speed Achieved! Entering Himang's World... 🚀", sub: "Lighthouse 100/100 Core Web Vitals" },
];

const CUTE_FLOATERS = [
  { emoji: "⚡", top: "10%", left: "7%", size: "text-2xl sm:text-3xl", rot: "-12deg", delay: "0s" },
  { emoji: "🏎️", top: "16%", left: "88%", size: "text-2xl sm:text-3xl", rot: "15deg", delay: "0.4s" },
  { emoji: "🌸", top: "25%", left: "11%", size: "text-xl sm:text-2xl", rot: "10deg", delay: "0.8s" },
  { emoji: "⭐", top: "34%", left: "91%", size: "text-2xl sm:text-3xl", rot: "-10deg", delay: "0.2s" },
  { emoji: "☕", top: "70%", left: "6%", size: "text-2xl sm:text-3xl", rot: "8deg", delay: "1.1s" },
  { emoji: "💨", top: "76%", left: "90%", size: "text-xl sm:text-2xl", rot: "-15deg", delay: "0.5s" },
  { emoji: "✦", top: "86%", left: "14%", size: "text-xl sm:text-2xl", rot: "14deg", delay: "0.3s" },
  { emoji: "🚀", top: "82%", left: "80%", size: "text-2xl sm:text-3xl", rot: "18deg", delay: "0.9s" },
  { emoji: "🏁", top: "12%", left: "50%", size: "text-xl sm:text-2xl", rot: "-6deg", delay: "0.6s" },
  { emoji: "💖", top: "90%", left: "48%", size: "text-xl sm:text-2xl", rot: "6deg", delay: "1.0s" },
  { emoji: "📦", top: "48%", left: "4%", size: "text-xl sm:text-2xl", rot: "-14deg", delay: "0.7s" },
  { emoji: "✨", top: "52%", left: "94%", size: "text-xl sm:text-2xl", rot: "12deg", delay: "0.3s" },
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [stepData, setStepData] = useState(SPEED_STEPS[0]);
  const [isDone, setIsDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const completeLoading = () => {
    setProgress(100);
    setStepData(SPEED_STEPS[SPEED_STEPS.length - 1]);
    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#FFE57F", "#FFAEC8", "#A5D8FF", "#111111", "#10B981"],
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
    // 10x Fast Speed Engine: 18ms interval for brisk, high-octane boot (~0.5s total)
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 5) + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        completeLoading();
      } else {
        setProgress(current);
        const match = [...SPEED_STEPS].reverse().find((s) => current >= s.at);
        if (match) setStepData(match);
      }
    }, 18);

    return () => clearInterval(interval);
  }, []);

  if (isDone) return null;

  // Calculate live speedometer speed readout (0.0x to 10.0x)
  const currentSpeed = (Math.min(10, (progress / 10))).toFixed(1);

  return (
    <div
      id="preloader"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden transition-all duration-400 ${
        isExiting ? "opacity-0 -translate-y-6 pointer-events-none scale-95" : "opacity-100 translate-y-0 scale-100"
      }`}
      style={{ backgroundColor: "#FAF7F0" }}
      aria-label="10x Speed Loading Screen - Himang Panchal Portfolio"
    >
      {/* ── Cute Ambient Background Layer ── */}
      {/* Soft pastel blurred ambient speed glows */}
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

      {/* ── Large Central Half-Screen 10x Speed Card ── */}
      <div className="relative z-10 w-[94vw] max-w-2xl lg:max-w-3xl min-h-[50vh] sm:min-h-[54vh] bg-white border-3 sm:border-4 border-black rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-[10px_10px_0px_#111111] sm:shadow-[16px_16px_0px_#111111] flex flex-col justify-between items-center text-center transition-all overflow-hidden">
        
        {/* Top Caution / Speed Tape Accent */}
        <div
          className="w-full h-2 rounded-full border border-black overflow-hidden mb-3 opacity-90 shadow-brutal-xs"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #FFE57F, #FFE57F 10px, #111111 10px, #111111 20px)",
          }}
        />

        {/* Top Header Row of the Card */}
        <div className="w-full flex items-center justify-between pb-3 sm:pb-4 border-b-2 border-black/10">
          {/* Macaron Window Dots */}
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFAEC8] border-2 border-black shadow-brutal-xs" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFE57F] border-2 border-black shadow-brutal-xs" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#A7F3D0] border-2 border-black shadow-brutal-xs" />
          </div>

          {/* Center 10x Turbo Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FFE57F] border-2 border-black rounded-full font-space font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shadow-brutal-xs -rotate-1 animate-turbo-pulse">
            <span>⚡</span>
            <span>10x TURBO SPEED ENGINE</span>
            <span>🏁</span>
          </div>

          {/* Right Live FPS / Speedometer */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A5D8FF] border-2 border-black rounded-full font-space font-black text-xs shadow-brutal-xs">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span>{currentSpeed}x SPEED</span>
          </div>
        </div>

        {/* Center Showcase: Cute Racing Mascot with Aviator Goggles & Speed Streaks */}
        <div className="my-auto py-3 sm:py-5 flex flex-col items-center w-full relative">
          
          {/* Speed wind streaks flowing behind the mascot */}
          <div className="absolute inset-x-8 top-12 pointer-events-none flex flex-col gap-3">
            <div className="w-16 h-1 bg-[#FFE57F] rounded-full border border-black/20 animate-speed-streak-1 self-start ml-8" />
            <div className="w-24 h-1 bg-[#FFAEC8] rounded-full border border-black/20 animate-speed-streak-2 self-end mr-8" />
            <div className="w-12 h-1 bg-[#A5D8FF] rounded-full border border-black/20 animate-speed-streak-1 self-center" />
          </div>

          {/* Steaming Chai Cup in Racing Goggles */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex flex-col items-center justify-center mb-2">
            {/* Ambient soft glow ring */}
            <div className="absolute inset-4 rounded-full bg-[#FFE57F]/65 blur-xl pointer-events-none" />

            {/* Cute floating badges beside mascot */}
            <div className="hidden md:flex absolute -left-14 top-10 bg-[#FFE57F] border-2 border-black rounded-xl px-2.5 py-1 text-xs font-space font-black shadow-brutal-xs -rotate-6">
              🏎️ 0-60 in 0.4s
            </div>
            <div className="hidden md:flex absolute -right-14 top-10 bg-[#FFAEC8] border-2 border-black rounded-xl px-2.5 py-1 text-xs font-space font-black shadow-brutal-xs rotate-6">
              ☕ Powered by Chai
            </div>

            {/* Steam curls and speed sparks above cup */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none">
              <span className="text-sm animate-steam-1">♨️</span>
              <span className="text-xs animate-steam-2">⚡</span>
              <span className="text-sm animate-steam-1" style={{ animationDelay: "1.2s" }}>💨</span>
            </div>

            {/* Cute Mascot SVG with Racing Aviator Goggles */}
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

                {/* Racing Aviator Goggles Strap */}
                <path d="M26 47 L74 47" stroke="#111111" strokeWidth="3.5" strokeLinecap="round" />

                {/* Left Goggle Lens */}
                <circle cx="41" cy="47" r="7.5" fill="#A5D8FF" stroke="#111111" strokeWidth="2.8" />
                <circle cx="41" cy="47" r="4.5" fill="#FFFFFF" opacity="0.6" />
                {/* Left Wink Pupil */}
                <path d="M38 47 Q 41 44 44 47" fill="none" stroke="#111111" strokeWidth="2.2" strokeLinecap="round" />

                {/* Right Goggle Lens */}
                <circle cx="59" cy="47" r="7.5" fill="#A5D8FF" stroke="#111111" strokeWidth="2.8" />
                <circle cx="59" cy="47" r="4.5" fill="#FFFFFF" opacity="0.6" />
                {/* Right Wink Pupil */}
                <path d="M56 47 Q 59 44 62 47" fill="none" stroke="#111111" strokeWidth="2.2" strokeLinecap="round" />

                {/* Rosy Blush Cheeks with mini shine */}
                <circle cx="33" cy="57" r="4.5" fill="#FFAEC8" />
                <circle cx="67" cy="57" r="4.5" fill="#FFAEC8" />
                <circle cx="32" cy="56" r="1.5" fill="#FFFFFF" />
                <circle cx="66" cy="56" r="1.5" fill="#FFFFFF" />

                {/* Happy Smiling Open Mouth */}
                <path d="M46 57 Q 50 63 54 57" fill="none" stroke="#111111" strokeWidth="2.8" strokeLinecap="round" />

                {/* Turbo Heart on Cup */}
                <path
                  d="M50 69 C 50 69, 44 64, 44 61.5 C 44 59.5, 46.5 58.5, 48.5 60 L50 61.5 L51.5 60 C 53.5 58.5, 56 59.5, 56 61.5 C 56 64, 50 69, 50 69 Z"
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
          <h2 className="font-space font-black text-2xl sm:text-3xl md:text-4xl text-black tracking-tight mb-1">
            Loading Himang&apos;s Portfolio
          </h2>

          {/* Dynamic 10x Speed Status Capsule */}
          <div className="inline-flex flex-col items-center gap-1 px-4 sm:px-6 py-2 bg-[#FAF7F0] border-2 border-black rounded-2xl shadow-brutal-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
              <p className="font-space font-extrabold text-xs sm:text-sm md:text-base text-gray-900 transition-all duration-150">
                {stepData.text}
              </p>
            </div>
            <span className="font-space font-bold text-[10px] sm:text-xs text-gray-500">
              ⚡ {stepData.sub}
            </span>
          </div>

          {/* 10x Speed Telemetry HUD (Inspired by Dev.to Performance Tips) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full mt-3 sm:mt-4">
            <div className="bg-[#FAF7F0] border-2 border-black rounded-xl p-2 shadow-brutal-xs flex flex-col items-center">
              <span className="text-[10px] font-space font-extrabold text-gray-500 uppercase tracking-wider">Engine</span>
              <span className="font-space font-black text-xs sm:text-sm text-black flex items-center gap-1">
                <span>⚡</span> 10x Speed
              </span>
            </div>
            <div className="bg-[#FAF7F0] border-2 border-black rounded-xl p-2 shadow-brutal-xs flex flex-col items-center">
              <span className="text-[10px] font-space font-extrabold text-gray-500 uppercase tracking-wider">First Paint</span>
              <span className="font-space font-black text-xs sm:text-sm text-black flex items-center gap-1">
                <span>⏱️</span> 0.18s
              </span>
            </div>
            <div className="bg-[#FAF7F0] border-2 border-black rounded-xl p-2 shadow-brutal-xs flex flex-col items-center">
              <span className="text-[10px] font-space font-extrabold text-gray-500 uppercase tracking-wider">CSS Weight</span>
              <span className="font-space font-black text-xs sm:text-sm text-black flex items-center gap-1">
                <span>📦</span> Thin &amp; Split
              </span>
            </div>
            <div className="bg-[#FAF7F0] border-2 border-black rounded-xl p-2 shadow-brutal-xs flex flex-col items-center">
              <span className="text-[10px] font-space font-extrabold text-gray-500 uppercase tracking-wider">Lighthouse</span>
              <span className="font-space font-black text-xs sm:text-sm text-[#059669] flex items-center gap-1">
                <span>💯</span> 100/100
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Candy-Striped Tachometer Bar & Controls */}
        <div className="w-full pt-3 sm:pt-4 border-t-2 border-black/10">
          {/* Candy-Striped Progress Bar */}
          <div className="relative w-full h-7 sm:h-8 bg-[#FAF7F0] border-3 border-black rounded-full p-1 shadow-brutal-xs overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-[#FFE57F] via-[#FFAEC8] to-[#A5D8FF] rounded-full animate-candy-stripe transition-all duration-75 ease-out flex items-center justify-end pr-2"
              style={{ width: `${progress}%` }}
            >
              {progress > 12 && (
                <span className="text-xs sm:text-sm select-none pointer-events-none drop-shadow">
                  🏎️
                </span>
              )}
            </div>
          </div>

          {/* Footer Controls Row */}
          <div className="flex items-center justify-between gap-3">
            {/* Percentage Pill */}
            <span className="bg-[#FFE57F] px-3 sm:px-4 py-1.5 rounded-xl border-2 border-black shadow-brutal-xs font-space font-black text-xs sm:text-sm text-black">
              {progress}% · {currentSpeed}x
            </span>

            {/* Performance Chips */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-black rounded-lg text-xs font-bold shadow-brutal-xs">
                ⚡ 60 FPS
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-3 py-1 bg-white border border-black rounded-lg text-xs font-bold shadow-brutal-xs">
                🚀 Zero Render Block
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
