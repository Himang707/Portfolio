"use client";

import React, { useState } from "react";
import { HandDrawnStar, SparkleStar } from "./Doodles";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("himangpanchal707@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* Large Outlined White Callout Container */}
      <div className="relative max-w-4xl mx-auto bg-white border-2 border-black rounded-2xl md:rounded-3xl p-8 sm:p-12 md:p-16 shadow-brutal-lg text-center">
        {/* Pink Star Overlapping the Upper Edge */}
        <div className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 sm:left-14 sm:translate-x-0 z-20">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FFAEC8] border-2 border-black rounded-2xl flex items-center justify-center shadow-brutal-sm rotate-12 hover:rotate-45 transition-transform duration-300 cursor-pointer">
            <HandDrawnStar className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Floating Top-Right Speech Bubble Sticker */}
        <div className="absolute -top-6 right-6 sm:right-12 z-20 hidden sm:block">
          <div className="bg-[#A5D8FF] border-2 border-black px-4 py-2 rounded-xl shadow-brutal-xs font-space font-black text-xs sm:text-sm text-black -rotate-6 hover:rotate-0 transition-transform cursor-pointer flex items-center gap-1.5">
            <span>💬 LET&apos;S TALK!</span>
            <span>👋</span>
          </div>
        </div>

        {/* Floating Bottom Stickers */}
        <div className="absolute -bottom-5 left-6 sm:left-10 z-20 hidden md:block">
          <div className="bg-[#FFE57F] border-2 border-black px-3.5 py-1.5 rounded-lg shadow-brutal-xs font-space font-extrabold text-xs text-black -rotate-3 hover:rotate-0 transition-transform flex items-center gap-1.5">
            <span>☕ Powered by Chai &amp; Curiosity</span>
          </div>
        </div>

        <div className="absolute -bottom-5 right-6 sm:right-10 z-20 hidden md:block">
          <div className="bg-[#D8B4FE] border-2 border-black px-3.5 py-1.5 rounded-lg shadow-brutal-xs font-space font-extrabold text-xs text-black rotate-3 hover:rotate-0 transition-transform flex items-center gap-1.5">
            <span>🚀 Ready to Ship Fast</span>
            <span>✨</span>
          </div>
        </div>

        {/* Top Mini Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFE57F] border-2 border-black rounded-md font-space font-bold text-xs uppercase tracking-wider mb-4 shadow-brutal-xs">
          <span>LET’S CONNECT</span>
          <SparkleStar className="w-3.5 h-3.5 text-black" />
        </div>

        {/* Centered Heading */}
        <h2 className="font-space font-black text-3xl sm:text-4xl md:text-5xl text-black tracking-tight leading-tight mb-4">
          Let’s start designing your project
        </h2>

        {/* Supporting Copy */}
        <p className="font-space text-base sm:text-lg text-gray-700 max-w-xl mx-auto leading-relaxed mb-6">
          I&apos;m currently open to full-time frontend engineering roles, internships, and collaborative zero-to-one builds.
          Whether you have an opening or want to discuss an idea, feel free to reach out!
        </p>

        {/* Quick Emoji Status Badges Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F0] border border-black rounded-full text-xs font-space font-bold text-black shadow-brutal-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            🟢 Open for Full-Time Roles
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F0] border border-black rounded-full text-xs font-space font-bold text-black shadow-brutal-xs">
            ⚡ Response within 24 Hours
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F0] border border-black rounded-full text-xs font-space font-bold text-black shadow-brutal-xs">
            📍 Ahmedabad, Gujarat, India 🇮🇳
          </span>
        </div>

        {/* Direct Email 1-Click Copy Bar */}
        <div className="mb-8 max-w-lg mx-auto bg-[#FAF7F0] border-2 border-black rounded-xl p-3 sm:p-4 shadow-brutal-xs flex items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="text-xl">✉️</span>
            <div className="truncate">
              <span className="text-[11px] font-space font-bold uppercase tracking-wider text-gray-500 block">
                DIRECT INBOX
              </span>
              <span className="font-space font-extrabold text-sm sm:text-base text-black truncate block">
                himangpanchal707@gmail.com
              </span>
            </div>
          </div>

          <button
            onClick={copyEmail}
            className="shrink-0 bg-white border border-black font-space font-bold text-xs px-3.5 py-2 rounded-lg shadow-brutal-xs hover:bg-[#FFE57F] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            {copied ? "Copied! ✓" : "Copy"}
          </button>
        </div>

        {/* Interactive Form or Confirmation */}
        {submitted ? (
          <div className="bg-[#A7F3D0] border-2 border-black rounded-xl p-6 shadow-brutal max-w-md mx-auto">
            <div className="text-3xl mb-2">🎉</div>
            <h4 className="font-space font-extrabold text-xl text-black">
              Message received!
            </h4>
            <p className="font-space text-sm text-gray-800 mt-1">
              Thanks for reaching out! I&apos;ll get back to you promptly at {formData.email || "your email"}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-space font-bold text-xs uppercase tracking-wider text-black mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FAF7F0] border-2 border-black rounded-xl px-4 py-3 font-space text-sm text-black placeholder:text-gray-400 focus:outline-none focus:bg-white shadow-brutal-xs"
                />
              </div>

              <div>
                <label className="block font-space font-bold text-xs uppercase tracking-wider text-black mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF7F0] border-2 border-black rounded-xl px-4 py-3 font-space text-sm text-black placeholder:text-gray-400 focus:outline-none focus:bg-white shadow-brutal-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-space font-bold text-xs uppercase tracking-wider text-black mb-1">
                Project / Role Details
              </label>
              <textarea
                rows={3}
                required
                placeholder="Tell me about the role, product goals, or collaboration idea..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#FAF7F0] border-2 border-black rounded-xl px-4 py-3 font-space text-sm text-black placeholder:text-gray-400 focus:outline-none focus:bg-white shadow-brutal-xs resize-none"
              ></textarea>
            </div>

            {/* Blue 'Send us message' Button */}
            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#A5D8FF] text-black font-space font-extrabold text-base sm:text-lg px-10 py-4 rounded-xl border-2 border-black shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Send us message</span>
                <span className="text-xl">➔</span>
              </button>
            </div>
          </form>
        )}

        {/* Quick Contact & Availability Badges */}
        <div className="mt-10 pt-8 border-t-2 border-black/10 flex flex-wrap items-center justify-center gap-3.5 text-xs font-space font-bold text-gray-700">
          <a
            href="tel:+917426053260"
            className="flex items-center gap-1.5 bg-[#FAF7F0] px-3 py-1.5 border border-black rounded-md hover:bg-[#FFE57F] transition-colors"
          >
            <span>📞</span> +91 7426053260
          </a>
          <a
            href="https://github.com/himang707"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#FAF7F0] px-3 py-1.5 border border-black rounded-md hover:bg-[#FFE57F] transition-colors"
          >
            <span>🐙</span> github.com/himang707
          </a>
          <span className="flex items-center gap-1.5 bg-[#FAF7F0] px-3 py-1.5 border border-black rounded-md">
            <span>📍</span> Ahmedabad, Gujarat, India
          </span>
          <span className="flex items-center gap-1.5 bg-[#FAF7F0] px-3 py-1.5 border border-black rounded-md">
            <span>⚡</span> Response: &lt; 24h
          </span>
        </div>
      </div>
    </section>
  );
}
