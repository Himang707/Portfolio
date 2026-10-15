"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const LOADING_STEPS = [
  { at: 0, text: "Brewing warm chai... ☕" },
  { at: 22, text: "Gathering cute stickers & pixels... 🌸" },
  { at: 48, text: "Waking up AI neural models... 🤖" },
  { at: 74, text: "Polishing 60 FPS spring physics... ⚡" },
  { at: 92, text: "Welcome to Himang's World! 🚀" },
];

const CUTE_FLOATERS = [
  { emoji: "🌸", top: "12%", left: "10%", size: "text-2xl sm:text-3xl", rot: "-12deg", delay: "0s" },
  { emoji: "✨", top: "18%", left: "85%", size: "text-xl sm:text-2xl", rot: "15deg", delay: "0.5s" },
  { emoji: "💖", top: "28%", left: "15%", size: "text-xl sm:text-2xl", rot: "10deg", delay: "0.8s" },
  { emoji: "⭐", top: "35%", left: "90%", size: "text-2xl sm:text-3xl", rot: "-10deg", delay: "0.3s" },
  { emoji: "☕", top: "72%", left: "8%", size: "text-2xl sm:text-3xl", rot: "8deg", delay: "1.1s" },
  { emoji: "🍬", top: "80%", left: "88%", size: "text-xl sm:text-2xl", rot: "-15deg", delay: "0.6s" },
  { emoji: "✦", top: "88%", left: "18%", size: "text-xl sm:text-2xl", rot: "14deg", delay: "0.2s" },
  { emoji: "🚀", top: "78%", left: "78%", size: "text-2xl sm:text-3xl", rot: "18deg", delay: "0.9s" },
  { emoji: "🎀", top: "15%", left: "48%", size: "text-lg sm:text-xl", rot: "-8deg", delay: "0.4s" },
  { emoji: "🌈", top: "85%", left: "45%", size: "text-xl sm:text-2xl", rot: "6deg", delay: "1.0s" },
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
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#FFE57F", "#FFAEC8", "#A5D8FF", "#D8B4FE", "#A7F3D0"],
      });
    } catch {
      // safe fallback if canvas is not ready
    }
    setIsExiting(true);
    setTimeout(() => {
      setIsDone(true);
    }, 550);
  };

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 6) + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        completeLoading();
      } else {
        setProgress(current);
        const match = [...LOADING_STEPS].reverse().find((s) => current >= s.at);
        if (match) setStatusText(match.text);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  if (isDone) return null;

  return (
    <div
      id="preloader"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 select-none overflow-hidden transition-all duration-500 ${
        isExiting ? "opacity-0 -translate-y-4 pointer-events-none scale-98" : "opacity-100 translate-y-0"
      }`}
      style={{ backgroundColor: "#FAF7F0" }}
      aria-label="Loading portfolio"
    >
      {/* ── Cute Ambient Background Layer ── */}
      {/* Soft pastel blurred ambient candy glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#FFE57F]/45 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#FFAEC8]/40 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-[#A5D8FF]/40 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute -top-20 right-1/4 w-72 h-72 rounded-full bg-[#D8B4FE]/35 blur-3xl pointer-events-none" />

      {/* Tactile grid dots */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#111111 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
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

      {/* ── Central Cute Loading Card ── */}
      <div className="relative z-10 w-full max-w-sm bg-white border-2 border-black rounded-3xl p-6 sm:p-8 shadow-brutal-lg text-center transition-transform transform">
        {/* Top Cute Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFAEC8] border-2 border-black rounded-full font-space font-extrabold text-[11px] uppercase tracking-wider shadow-brutal-xs -rotate-2 mb-4">
          <span>✨</span>
          <span>HIMANG&apos;S LAB</span>
          <span>✦</span>
        </div>

        {/* Adorable Animated Steaming Cup Mascot */}
        <div className="relative w-28 h-28 mx-auto mb-3 animate-cute-bounce flex items-center justify-center">
          {/* Ambient soft glow ring */}
          <div className="absolute inset-2 rounded-full bg-[#FFE57F]/60 blur-md" />

          {/* Steam curls above cup */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
            <span className="text-xs animate-steam-1 text-gray-500">♨️</span>
            <span className="text-xs animate-steam-2 text-gray-500">✨</span>
          </div>

          {/* Cute SVG Mascot */}
          <svg viewBox="0 0 100 100" className="w-24 h-24 relative z-10 drop-shadow-sm">
            {/* Cup Handle */}
            <path
              d="M68 40 C 85 40, 85 64, 68 64"
              fill="none"
              stroke="#111111"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Cup Body */}
            <path
              d="M26 32 L74 32 C 72 68, 64 77, 50 77 C 36 77, 28 68, 26 32 Z"
              fill="#FFE57F"
              stroke="#111111"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Cup Rim & Drink */}
            <ellipse cx="50" cy="32" rx="24" ry="6.5" fill="#FFFDF9" stroke="#111111" strokeWidth="3.5" />
            <ellipse cx="50" cy="32" rx="18" ry="4" fill="#FFAEC8" />

            {/* Happy Curved Eyes */}
            <path d="M39 50 Q 43 45 47 50" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" />
            <path d="M53 50 Q 57 45 61 50" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" />

            {/* Rosy Blush Cheeks */}
            <circle cx="35" cy="55" r="4" fill="#FFAEC8" />
            <circle cx="65" cy="55" r="4" fill="#FFAEC8" />

            {/* Cute Smiling Mouth */}
            <path d="M47 55 Q 50 59 53 55" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" />

            {/* Cute Heart on the Cup */}
            <path
              d="M50 68 C 50 68, 45 63, 45 61 C 45 59, 47 58, 48.5 59.5 L50 61 L51.5 59.5 C 53 58, 55 59, 55 61 C 55 63, 50 68, 50 68 Z"
              fill="#FFAEC8"
              stroke="#111111"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        {/* Title & Friendly Greeting */}
        <h3 className="font-space font-black text-2xl text-black tracking-tight mb-1">
          Loading Portfolio...
        </h3>

        {/* Dynamic Cute Status Message */}
        <div className="h-6 flex items-center justify-center mb-4">
          <p className="font-space font-bold text-xs sm:text-sm text-gray-700 transition-all duration-200">
            {statusText}
          </p>
        </div>

        {/* Candy-Striped Pastel Progress Bar Container */}
        <div className="relative w-full h-6 bg-[#FAF7F0] border-2 border-black rounded-full p-0.5 shadow-brutal-xs overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#FFE57F] via-[#FFAEC8] to-[#A5D8FF] rounded-full animate-candy-stripe transition-all duration-100 ease-out flex items-center justify-end pr-1.5"
            style={{ width: `${progress}%` }}
          >
            {progress > 15 && (
              <span className="text-[10px] select-none pointer-events-none">✨</span>
            )}
          </div>
        </div>

        {/* Percentage Row */}
        <div className="flex items-center justify-between text-xs font-space font-extrabold text-black">
          <span className="flex items-center gap-1 text-gray-500">
            <span>⚡</span>
            <span>60 FPS</span>
          </span>
          <span className="bg-[#FFE57F] px-2 py-0.5 rounded border border-black shadow-brutal-xs text-xs">
            {progress}%
          </span>
        </div>

        {/* Skip button for instant access */}
        <div className="pt-4 mt-4 border-t border-black/10 flex justify-center">
          <button
            onClick={completeLoading}
            className="text-xs font-space font-bold text-gray-500 hover:text-black hover:underline underline-offset-4 flex items-center gap-1 transition-colors"
          >
            <span>Skip into portfolio</span>
            <span>➔</span>
          </button>
        </div>
      </div>
    </div>
  );
}
