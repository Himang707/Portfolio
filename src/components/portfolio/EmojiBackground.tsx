"use client";

import React from "react";

interface AmbientEmoji {
  emoji: string;
  top: string;
  left: string;
  size: string;
  rot: string;
  anim: "1" | "2" | "3" | "4";
  delay: string;
  opacity: string;
  hideOnMobile?: boolean;
}

const AMBIENT_EMOJIS: AmbientEmoji[] = [
  // ── Band 1: Top / Header & Hero Backdrop (2% - 15%) ──────────
  { emoji: "🚀", top: "3%", left: "2%", size: "text-2xl sm:text-3xl", rot: "-12deg", anim: "1", delay: "0s", opacity: "opacity-35" },
  { emoji: "✨", top: "4%", left: "22%", size: "text-lg sm:text-xl", rot: "8deg", anim: "3", delay: "0.6s", opacity: "opacity-30", hideOnMobile: true },
  { emoji: "💡", top: "2%", left: "45%", size: "text-xl sm:text-2xl", rot: "-6deg", anim: "4", delay: "1.1s", opacity: "opacity-25", hideOnMobile: true },
  { emoji: "⚡", top: "5%", left: "75%", size: "text-xl sm:text-2xl", rot: "14deg", anim: "2", delay: "0.4s", opacity: "opacity-35", hideOnMobile: true },
  { emoji: "💻", top: "4%", left: "94%", size: "text-2xl sm:text-3xl", rot: "-10deg", anim: "1", delay: "0.9s", opacity: "opacity-30" },

  { emoji: "☕", top: "11%", left: "7%", size: "text-2xl sm:text-3xl", rot: "10deg", anim: "3", delay: "0.2s", opacity: "opacity-35" },
  { emoji: "🎯", top: "13%", left: "28%", size: "text-lg sm:text-xl", rot: "-14deg", anim: "2", delay: "0.8s", opacity: "opacity-30", hideOnMobile: true },
  { emoji: "✦", top: "10%", left: "62%", size: "text-xl sm:text-2xl", rot: "12deg", anim: "4", delay: "0.5s", opacity: "opacity-40", hideOnMobile: true },
  { emoji: "🔥", top: "12%", left: "88%", size: "text-2xl sm:text-3xl", rot: "15deg", anim: "1", delay: "1.3s", opacity: "opacity-35" },

  // ── Band 2: Hero Bottom & Tools Strip Backdrop (16% - 28%) ──
  { emoji: "✍️", top: "20%", left: "4%", size: "text-2xl sm:text-3xl", rot: "12deg", anim: "2", delay: "0.7s", opacity: "opacity-30" },
  { emoji: "🌟", top: "18%", left: "19%", size: "text-lg sm:text-xl", rot: "-8deg", anim: "1", delay: "0.3s", opacity: "opacity-35", hideOnMobile: true },
  { emoji: "✌️", top: "22%", left: "40%", size: "text-xl sm:text-2xl", rot: "6deg", anim: "4", delay: "1.2s", opacity: "opacity-30", hideOnMobile: true },
  { emoji: "🎨", top: "19%", left: "68%", size: "text-xl sm:text-2xl", rot: "-12deg", anim: "3", delay: "0.9s", opacity: "opacity-30", hideOnMobile: true },
  { emoji: "🐙", top: "21%", left: "93%", size: "text-2xl sm:text-3xl", rot: "-15deg", anim: "2", delay: "0.15s", opacity: "opacity-35" },

  { emoji: "🤖", top: "27%", left: "11%", size: "text-2xl sm:text-3xl", rot: "14deg", anim: "4", delay: "1.0s", opacity: "opacity-30" },
  { emoji: "🛠️", top: "28%", left: "33%", size: "text-xl sm:text-2xl", rot: "-6deg", anim: "1", delay: "0.5s", opacity: "opacity-25", hideOnMobile: true },
  { emoji: "✨", top: "26%", left: "55%", size: "text-lg sm:text-xl", rot: "10deg", anim: "3", delay: "1.4s", opacity: "opacity-35", hideOnMobile: true },
  { emoji: "📍", top: "27%", left: "82%", size: "text-xl sm:text-2xl", rot: "-10deg", anim: "2", delay: "0.6s", opacity: "opacity-30", hideOnMobile: true },

  // ── Band 3: About Section Backdrop (29% - 42%) ───────────────
  { emoji: "💻", top: "33%", left: "3%", size: "text-3xl sm:text-4xl", rot: "-10deg", anim: "1", delay: "1.1s", opacity: "opacity-30" },
  { emoji: "💎", top: "35%", left: "18%", size: "text-lg sm:text-xl", rot: "15deg", anim: "3", delay: "0.4s", opacity: "opacity-30", hideOnMobile: true },
  { emoji: "☕", top: "34%", left: "50%", size: "text-xl sm:text-2xl", rot: "8deg", anim: "2", delay: "0.8s", opacity: "opacity-25", hideOnMobile: true },
  { emoji: "⚡", top: "33%", left: "74%", size: "text-2xl sm:text-3xl", rot: "-14deg", anim: "4", delay: "1.3s", opacity: "opacity-35", hideOnMobile: true },
  { emoji: "🚀", top: "35%", left: "95%", size: "text-2xl sm:text-3xl", rot: "18deg", anim: "1", delay: "0.25s", opacity: "opacity-35" },

  { emoji: "🔥", top: "40%", left: "9%", size: "text-2xl sm:text-3xl", rot: "12deg", anim: "2", delay: "0.75s", opacity: "opacity-35" },
  { emoji: "✦", top: "41%", left: "36%", size: "text-xl sm:text-2xl", rot: "-5deg", anim: "3", delay: "0.2s", opacity: "opacity-40", hideOnMobile: true },
  { emoji: "💡", top: "39%", left: "63%", size: "text-lg sm:text-xl", rot: "8deg", anim: "1", delay: "1.0s", opacity: "opacity-30", hideOnMobile: true },
  { emoji: "✍️", top: "41%", left: "89%", size: "text-2xl sm:text-3xl", rot: "-14deg", anim: "4", delay: "0.65s", opacity: "opacity-30" },

  // ── Band 4: Skills & Arsenal Backdrop (43% - 56%) ───────────
  { emoji: "🐙", top: "46%", left: "2%", size: "text-2xl sm:text-3xl", rot: "-15deg", anim: "3", delay: "1.0s", opacity: "opacity-30" },
  { emoji: "🧩", top: "48%", left: "24%", size: "text-xl sm:text-2xl", rot: "12deg", anim: "1", delay: "0.5s", opacity: "opacity-25", hideOnMobile: true },
  { emoji: "🌟", top: "47%", left: "47%", size: "text-lg sm:text-xl", rot: "-8deg", anim: "2", delay: "1.4s", opacity: "opacity-35", hideOnMobile: true },
  { emoji: "🤖", top: "46%", left: "78%", size: "text-2xl sm:text-3xl", rot: "15deg", anim: "4", delay: "0.35s", opacity: "opacity-35", hideOnMobile: true },
  { emoji: "✌️", top: "48%", left: "93%", size: "text-2xl sm:text-3xl", rot: "10deg", anim: "1", delay: "0.15s", opacity: "opacity-35" },

  { emoji: "🛠️", top: "54%", left: "6%", size: "text-2xl sm:text-3xl", rot: "-8deg", anim: "4", delay: "0.6s", opacity: "opacity-30" },
  { emoji: "⚡", top: "53%", left: "30%", size: "text-xl sm:text-2xl", rot: "14deg", anim: "3", delay: "0.9s", opacity: "opacity-30", hideOnMobile: true },
  { emoji: "🔥", top: "55%", left: "53%", size: "text-xl sm:text-2xl", rot: "-8deg", anim: "2", delay: "0.9s", opacity: "opacity-25", hideOnMobile: true },
  { emoji: "☕", top: "53%", left: "85%", size: "text-2xl sm:text-3xl", rot: "6deg", anim: "1", delay: "0.45s", opacity: "opacity-30", hideOnMobile: true },

  // ── Band 5: Services & Capabilities Backdrop (57% - 70%) ────
  { emoji: "🚀", top: "60%", left: "4%", size: "text-2xl sm:text-3xl", rot: "-12deg", anim: "2", delay: "0.8s", opacity: "opacity-35" },
  { emoji: "🎨", top: "62%", left: "20%", size: "text-lg sm:text-xl", rot: "10deg", anim: "1", delay: "0.3s", opacity: "opacity-30", hideOnMobile: true },
  { emoji: "💻", top: "59%", left: "42%", size: "text-xl sm:text-2xl", rot: "12deg", anim: "4", delay: "1.2s", opacity: "opacity-25", hideOnMobile: true },
  { emoji: "✨", top: "61%", left: "69%", size: "text-xl sm:text-2xl", rot: "-6deg", anim: "3", delay: "0.7s", opacity: "opacity-40", hideOnMobile: true },
  { emoji: "🤖", top: "60%", left: "94%", size: "text-3xl sm:text-4xl", rot: "15deg", anim: "2", delay: "1.3s", opacity: "opacity-35" },

  { emoji: "📍", top: "67%", left: "8%", size: "text-2xl sm:text-3xl", rot: "-10deg", anim: "3", delay: "0.55s", opacity: "opacity-30" },
  { emoji: "✦", top: "68%", left: "34%", size: "text-xl sm:text-2xl", rot: "-5deg", anim: "1", delay: "0.25s", opacity: "opacity-40", hideOnMobile: true },
  { emoji: "💡", top: "66%", left: "60%", size: "text-lg sm:text-xl", rot: "14deg", anim: "4", delay: "1.1s", opacity: "opacity-30", hideOnMobile: true },
  { emoji: "🎯", top: "68%", left: "89%", size: "text-xl sm:text-2xl", rot: "-14deg", anim: "2", delay: "0.85s", opacity: "opacity-35" },

  // ── Band 6: Projects & Hackathons Backdrop (71% - 84%) ───────
  { emoji: "✍️", top: "74%", left: "3%", size: "text-2xl sm:text-3xl", rot: "12deg", anim: "1", delay: "0.9s", opacity: "opacity-30" },
  { emoji: "☕", top: "76%", left: "22%", size: "text-xl sm:text-2xl", rot: "8deg", anim: "3", delay: "0.4s", opacity: "opacity-30", hideOnMobile: true },
  { emoji: "💎", top: "73%", left: "49%", size: "text-lg sm:text-xl", rot: "-10deg", anim: "2", delay: "1.0s", opacity: "opacity-30", hideOnMobile: true },
  { emoji: "🐙", top: "75%", left: "75%", size: "text-2xl sm:text-3xl", rot: "-15deg", anim: "4", delay: "0.6s", opacity: "opacity-30", hideOnMobile: true },
  { emoji: "⚡", top: "73%", left: "95%", size: "text-2xl sm:text-3xl", rot: "14deg", anim: "1", delay: "0.15s", opacity: "opacity-35" },

  { emoji: "🔥", top: "81%", left: "9%", size: "text-2xl sm:text-3xl", rot: "12deg", anim: "2", delay: "0.7s", opacity: "opacity-35" },
  { emoji: "🛠️", top: "82%", left: "36%", size: "text-xl sm:text-2xl", rot: "-8deg", anim: "4", delay: "1.3s", opacity: "opacity-25", hideOnMobile: true },
  { emoji: "🌟", top: "80%", left: "62%", size: "text-lg sm:text-xl", rot: "10deg", anim: "1", delay: "0.45s", opacity: "opacity-35", hideOnMobile: true },
  { emoji: "🚀", top: "82%", left: "91%", size: "text-3xl sm:text-4xl", rot: "18deg", anim: "3", delay: "1.1s", opacity: "opacity-35" },

  // ── Band 7: Testimonials, Contact & Footer (85% - 98%) ───────
  { emoji: "📍", top: "87%", left: "3%", size: "text-2xl sm:text-3xl", rot: "-10deg", anim: "2", delay: "0.45s", opacity: "opacity-30" },
  { emoji: "✌️", top: "89%", left: "26%", size: "text-xl sm:text-2xl", rot: "10deg", anim: "1", delay: "0.9s", opacity: "opacity-30", hideOnMobile: true },
  { emoji: "💻", top: "86%", left: "52%", size: "text-xl sm:text-2xl", rot: "-12deg", anim: "3", delay: "0.3s", opacity: "opacity-25", hideOnMobile: true },
  { emoji: "✨", top: "88%", left: "78%", size: "text-lg sm:text-xl", rot: "8deg", anim: "4", delay: "1.2s", opacity: "opacity-40", hideOnMobile: true },
  { emoji: "☕", top: "89%", left: "96%", size: "text-2xl sm:text-3xl", rot: "6deg", anim: "2", delay: "0.6s", opacity: "opacity-30" },

  { emoji: "✦", top: "95%", left: "12%", size: "text-xl sm:text-2xl", rot: "-5deg", anim: "1", delay: "0.2s", opacity: "opacity-40" },
  { emoji: "💡", top: "96%", left: "38%", size: "text-lg sm:text-xl", rot: "12deg", anim: "3", delay: "1.0s", opacity: "opacity-30", hideOnMobile: true },
  { emoji: "⚡", top: "94%", left: "67%", size: "text-2xl sm:text-3xl", rot: "-14deg", anim: "2", delay: "0.7s", opacity: "opacity-35", hideOnMobile: true },
  { emoji: "🔥", top: "95%", left: "87%", size: "text-2xl sm:text-3xl", rot: "15deg", anim: "4", delay: "0.35s", opacity: "opacity-35" },
];

export default function EmojiBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {AMBIENT_EMOJIS.map((item, idx) => (
        <span
          key={idx}
          className={`absolute ${item.size} ${item.opacity} ${
            item.hideOnMobile ? "hidden md:inline-block" : "inline-block"
          } animate-emoji-drift-${item.anim} transition-opacity duration-300 drop-shadow-sm`}
          style={{
            top: item.top,
            left: item.left,
            animationDelay: item.delay,
            ["--rot" as string]: item.rot,
            transform: `rotate(${item.rot})`,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}
