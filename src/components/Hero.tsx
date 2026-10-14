"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Sparkles, Send } from "lucide-react";
import HeroVisual from "./HeroVisual";

const TECH_TAGS = ["AI", "FULL STACK", "UI/UX", "PROBLEM SOLVING"];

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Command & Identity Text with High-Contrast Frosted Enclosure */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 z-10 bg-[#080705]/88 backdrop-blur-2xl border border-[#D4AF37]/35 rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(212,175,55,0.2)]"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#141009] border border-[#D4AF37]/45 text-[#F5D77F] w-fit shadow-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5B842] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5D77F]" />
            </span>
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase font-bold">
              DIGITAL BUILDER / DEVELOPER
            </span>
          </motion.div>

          {/* Headings with razor-sharp contrast */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-mono font-black tracking-tight text-[#ffffff] drop-shadow-md"
            >
              HI, I&apos;M <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#F5D77F] to-[#D4AF37]">HIMANG.</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-mono font-extrabold uppercase tracking-tight text-[#F5F2EB] leading-[1.2] drop-shadow-sm"
            >
              I BUILD DIGITAL EXPERIENCES THAT TURN IDEAS INTO REALITY.
            </motion.h2>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-[#D4CEBF] max-w-2xl leading-relaxed font-sans"
          >
            Developer, AI explorer and hackathon builder focused on creating
            useful, intelligent and beautifully designed digital products.
          </motion.p>

          {/* Technical Tag Pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap gap-2.5 pt-1"
          >
            {TECH_TAGS.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-lg text-[11px] font-mono font-bold tracking-wider bg-[#141009] text-[#F5D77F] border border-[#D4AF37]/35 hover:border-[#F5D77F] hover:bg-[#1C160B] transition-colors select-none shadow-sm"
              >
                [{tag}]
              </span>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button
              onClick={() => scrollTo("work")}
              className="group relative inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider text-[#080705] bg-[#D4AF37] hover:bg-[#E5B842] transition-all shadow-[0_0_24px_rgba(212,175,55,0.4)] hover:shadow-[0_0_32px_rgba(212,175,55,0.6)] active:scale-[0.98] focus:outline-none"
              data-cursor="VIEW"
            >
              <span>VIEW PROJECTS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="group inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#ffffff] bg-[#141009] border border-[#D4AF37]/45 hover:border-[#F5D77F] hover:bg-[#1C160B] transition-all shadow-command-card active:scale-[0.98] focus:outline-none"
              data-cursor="OPEN"
            >
              <span>LET&apos;S CONNECT</span>
              <Send className="w-3.5 h-3.5 opacity-85 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#F5D77F]" />
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: Digital Command Center 3D Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex items-center justify-center relative mt-4 lg:mt-0"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
