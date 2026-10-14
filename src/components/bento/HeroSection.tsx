"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Github,
  Mail,
  MapPin,
  GraduationCap,
  Download,
  ExternalLink,
} from "lucide-react";
import HPLogo from "@/components/HPLogo";

const ROLES = [
  "Frontend Developer",
  "React & Next.js Engineer",
  "AI & Machine Learning Enthusiast",
  "Computer Vision Builder",
  "Full Stack Developer",
];

const STATS = [
  { label: "Projects Shipped", value: "5+", note: "Production ready" },
  { label: "Hackathons", value: "3", note: "Finalist & winner" },
  { label: "Technologies", value: "15+", note: "Tools in arsenal" },
];

export default function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIdx((p) => (p + 1) % ROLES.length);
        setRoleVisible(true);
      }, 380);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center py-[14vh] overflow-hidden perspective-container"
      role="region"
      aria-label="Hero — Himang Panchal"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full relative z-10">

        {/* ── Top Meta Row with microgravity drift ── */}
        <div
          className={`flex flex-wrap items-center gap-2.5 mb-12 transition-all duration-900 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
            bg-[#94DEC0]/[0.08] border border-[#94DEC0]/[0.22] text-[#94DEC0] text-[12px] font-medium drift-microgravity-1 shadow-[0_0_12px_rgba(148,222,192,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#94DEC0] pulse-dot" />
            Open to full-time roles & internships
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
            bg-white/[0.035] border border-white/[0.08] text-white/70 text-[12px] drift-microgravity-2">
            <MapPin className="w-3 h-3 text-[#94DEC0]/80" />
            Rajasthan, India
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
            bg-white/[0.035] border border-white/[0.08] text-white/70 text-[12px] drift-microgravity-slow">
            <GraduationCap className="w-3 h-3 text-[#94DEC0]/80" />
            Rai University &apos;29
          </span>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT — Headlines & CTA */}
          <div className={`lg:col-span-7 space-y-8 transition-all duration-900 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}>

            {/* Name tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl
              bg-[#0c1412]/85 border border-[rgba(148,222,192,0.12)] backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
              <HPLogo size={22} variant="natural" />
              <span className="text-[13px] font-medium text-white/80">
                Hey, I&apos;m <strong className="text-white">Himang Panchal</strong>
              </span>
            </div>

            {/* Big headline with airy typography (-0.065em letter-spacing & airy leading) */}
            <div className="space-y-3">
              <h1 className="text-[clamp(42px,6.8vw,78px)] font-[800] tracking-[-0.065em] leading-[1.12] text-white">
                I build things<br />
                <span
                  className="bg-gradient-to-r from-[#FAF7F2] via-[#C5E8D8] to-[#94DEC0]
                  bg-clip-text text-transparent"
                >
                  that feel simple.
                </span>
              </h1>

              {/* Animated role */}
              <div className="h-10 flex items-center">
                <span
                  className="text-[clamp(16px,2.5vw,22px)] font-semibold text-[#94DEC0]/90 tracking-[-0.04em]
                  transition-all duration-800"
                  style={{
                    opacity: roleVisible ? 1 : 0,
                    transform: roleVisible ? "translateY(0)" : "translateY(8px)",
                    transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
                  }}
                >
                  {ROLES[roleIdx]}
                </span>
              </div>
            </div>

            {/* Bio with airy line height */}
            <p className="text-[16px] sm:text-[17px] text-white/70 max-w-[540px] leading-[1.85] tracking-tight">
              I&apos;m a developer who loves building thoughtful, responsive applications
              and experimenting with machine learning and computer vision. I care about
              the details — making software that&apos;s fast, reliable, and genuinely
              weightless to use.
            </p>

            {/* CTAs with antigravity hover elements */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => scrollTo("projects")}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                  font-semibold text-[14px] text-[#080d0a] bg-[#FAF7F2] hover:bg-white
                  antigravity-button shadow-[0_8px_30px_rgba(0,0,0,0.35)] focus:outline-none"
              >
                View my projects
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href="https://github.com/himang707"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full
                  font-medium text-[14px] text-white/85 bg-white/[0.04] border border-white/[0.09]
                  hover:bg-white/[0.08] hover:text-white backdrop-blur-md
                  antigravity-button focus:outline-none"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>

              <a
                href="mailto:himangpanchal707@gmail.com"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-3.5
                  text-[13px] text-white/60 hover:text-[#94DEC0] transition-colors duration-800"
                style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
              >
                <Mail className="w-4 h-4 text-[#94DEC0]" />
                himangpanchal707@gmail.com
              </a>
            </div>

            {/* Stat row */}
            <div className="flex flex-wrap gap-6 pt-3">
              {STATS.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[28px] font-[900] font-mono-code text-[#FAF7F2] tracking-tight leading-none">
                    {s.value}
                  </span>
                  <span className="text-[12px] text-white/50 mt-1">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Floating Levitation Developer card */}
          <div className={`lg:col-span-5 transition-all duration-900 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
            <div
              className="relative rounded-[28px] border border-[rgba(148,222,192,0.12)] backdrop-blur-2xl
              antigravity-card overflow-hidden"
              style={{ background: "rgba(10,16,13,0.84)" }}
            >
              {/* Subtle inner luminous sage glow */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(148,222,192,0.11) 0%, transparent 70%)"
                }}
              />

              {/* Card header */}
              <div className="px-7 pt-7 pb-5 border-b border-white/[0.06] flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3.5">
                  <HPLogo size={48} variant="natural" />
                  <div>
                    <div className="text-[16px] font-bold text-white tracking-tight">
                      Himang Panchal
                    </div>
                    <div className="text-[12px] text-[#A39E93] font-mono-code mt-0.5">
                      @himang707 · Frontend & AI/ML
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                  bg-[#94DEC0]/[0.08] border border-[#94DEC0]/[0.22] text-[#94DEC0] text-[11px] font-medium shadow-[0_0_10px_rgba(148,222,192,0.1)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#94DEC0] pulse-dot" />
                  Active
                </span>
              </div>

              {/* Tech stack */}
              <div className="px-7 py-5 border-b border-white/[0.06] relative z-10">
                <div className="text-[10px] font-mono-code text-white/40 uppercase tracking-widest mb-3">
                  Core Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["React", "Next.js", "TypeScript", "Python", "PyTorch", "Computer Vision", "Tailwind CSS", "FastAPI"].map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-medium
                      bg-white/[0.04] border border-white/[0.07] text-white/75
                      hover:border-[rgba(148,222,192,0.3)] hover:text-[#FAF7F2] antigravity-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div className="px-7 py-5 relative z-10 space-y-2.5">
                <a
                  href="https://github.com/himang707"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl
                    bg-white/[0.025] border border-white/[0.06] hover:border-[rgba(148,222,192,0.25)]
                    hover:bg-white/[0.045] transition-all duration-800 group"
                  style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-white/60 group-hover:text-[#94DEC0] transition-colors" />
                    <span className="text-[13px] text-white/80 group-hover:text-white transition-colors">
                      github.com/himang707
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-[#94DEC0]" />
                </a>
                <a
                  href="mailto:himangpanchal707@gmail.com"
                  className="flex items-center justify-between p-3 rounded-xl
                    bg-white/[0.025] border border-white/[0.06] hover:border-[rgba(148,222,192,0.25)]
                    hover:bg-white/[0.045] transition-all duration-800 group"
                  style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#94DEC0]/80" />
                    <span className="text-[13px] text-white/80 group-hover:text-white transition-colors">
                      himangpanchal707@gmail.com
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-[#94DEC0]" />
                </a>
              </div>

              {/* CTA inside card */}
              <div className="px-7 pb-7 relative z-10">
                <button
                  onClick={() => scrollTo("contact")}
                  className="w-full py-3 rounded-2xl text-[13px] font-semibold
                    text-[#080d0a] bg-[#FAF7F2] hover:bg-white antigravity-button
                    shadow-md hover:shadow-lg focus:outline-none"
                >
                  Get in touch →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className={`mt-16 flex items-center gap-3 transition-all duration-700 delay-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex flex-col gap-1">
            <div className="w-[1px] h-5 bg-gradient-to-b from-white/20 to-transparent mx-auto" />
            <div className="w-[5px] h-[5px] rounded-full bg-white/30 mx-auto" />
          </div>
          <span className="text-[11px] font-mono-code text-white/30 uppercase tracking-widest">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}
