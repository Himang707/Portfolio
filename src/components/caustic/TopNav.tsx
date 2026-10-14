"use client";

import React, { useState, useEffect } from "react";
import { usePortfolio } from "@/lib/PortfolioContext";
import { Volume2, VolumeX, Monitor, FlaskConical, Waves, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { id: "prime", label: "01. PRIME" },
  { id: "fracture", label: "02. FRACTURE" },
  { id: "loupe", label: "03. LOUPE" },
  { id: "index", label: "04. INDEX" },
  { id: "assembly", label: "06. ASSEMBLY" },
  { id: "workbench", label: "08. WORKBENCH" },
  { id: "anneal", label: "11. TRANSMISSION" },
];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    soundEnabled,
    toggleSound,
    playClick,
    cycleDisplayMode,
    displayModeLabel,
    astronomy,
    openOpticalLab,
    audioReactive,
    tour,
  } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="top"
      role="banner"
      className={`fixed top-0 left-0 w-full h-[78px] z-[100] flex items-center justify-between px-4 sm:px-8 border-b transition-all duration-300 ${
        scrolled
          ? "bg-[#050609]/92 backdrop-blur-xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
          : "bg-transparent border-white/5"
      }`}
    >
      {/* Brand Identity & Precision Monogram */}
      <button
        onClick={() => scrollToSection("prime")}
        className="flex items-center space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57] rounded-lg text-left"
        data-cursor="OPEN"
        aria-label="Scroll to top"
      >
        <div className="w-8 h-8 rounded-lg bg-[#0c0e14] border border-white/15 flex items-center justify-center group-hover:border-[#ef9a57]/70 transition-colors shadow-sm">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
            <rect
              x="2.6"
              y="2.6"
              width="18.8"
              height="18.8"
              rx="6"
              stroke="rgba(242,244,247,.7)"
              strokeWidth="2"
            />
            <path
              d="M4 8.2 L11.6 11.2 L20 16.4"
              stroke="#ef9a57"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-xs font-black tracking-widest text-[#f2f4f7] group-hover:text-[#ef9a57] transition-colors">
            HIMANG
          </span>
          <span className="font-mono text-[9px] tracking-precision text-white/40 uppercase">
            FRONTEND DEV & AI/ML
          </span>
        </div>
      </button>

      {/* Desktop Navigation Links */}
      <nav className="hidden lg:flex items-center space-x-6 font-mono text-[11px] tracking-precision" aria-label="Section navigation">
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className="text-white/60 hover:text-[#ef9a57] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57] rounded px-1 py-1 relative"
            data-cursor="VIEW"
            aria-label={`Navigate to ${link.label}`}
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* Right Telemetry & Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Enhancement 7: Display Mode Toggle */}
        <button
          onClick={() => {
            playClick();
            cycleDisplayMode();
          }}
          className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full bg-[#0c0e14] border border-white/10 hover:border-[#ef9a57]/50 font-mono text-[9px] text-white/50 hover:text-white/80 tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57]"
          data-cursor="OPEN"
          aria-label={`Display mode: ${displayModeLabel}. Click to cycle.`}
          title={`Current: ${displayModeLabel}`}
        >
          <Monitor className="w-3 h-3 text-[#ef9a57]" />
          <span>{displayModeLabel}</span>
        </button>

        {/* Enhancement 5: Sound Toggle */}
        <button
          onClick={() => {
            toggleSound();
          }}
          className="p-2 rounded-full bg-[#0c0e14] border border-white/10 hover:border-[#ef9a57]/50 text-white/50 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57]"
          data-cursor="OPEN"
          aria-label={soundEnabled ? "Disable sound effects" : "Enable sound effects"}
          title={soundEnabled ? "Sound: ON" : "Sound: OFF"}
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-[#ef9a57]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Enhancement: Audio-Reactive Cymatics Toggle */}
        <button
          onClick={() => {
            playClick();
            audioReactive.toggleMode();
          }}
          className={`p-2 rounded-full border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57] ${
            audioReactive.mode === "mic"
              ? "bg-emerald-500/20 border-emerald-500/60 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
              : audioReactive.mode === "synthetic"
              ? "bg-blue-500/20 border-blue-500/60 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.3)]"
              : "bg-[#0c0e14] border-white/10 text-white/50 hover:border-[#ef9a57]/50 hover:text-white"
          }`}
          data-cursor="OPEN"
          aria-label={`Audio Reactive: ${audioReactive.mode}. Click to cycle.`}
          title={`Audio Cymatics: ${audioReactive.mode.toUpperCase()} (Mic / Synthetic / Off)`}
        >
          <Waves className={`w-3.5 h-3.5 ${audioReactive.mode !== "off" ? "animate-pulse" : ""}`} />
        </button>

        {/* Photon Guided Expedition Tour Toggle */}
        <button
          onClick={() => {
            playClick();
            tour.startTour(0);
          }}
          className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border font-mono text-[9px] sm:text-[10px] tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57] ${
            tour.isActive
              ? "border-[#ef9a57] bg-[#ef9a57] text-[#050609] font-bold shadow-[0_0_15px_rgba(239,154,87,0.4)]"
              : "border-white/10 bg-[#0c0e14] text-white/70 hover:border-[#ef9a57]/50 hover:text-white"
          }`}
          data-cursor="OPEN"
          aria-label="Start Photon Guided Narrative Tour"
          title="Start Photon's Journey (Guided Narrative Tour)"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ef9a57]" />
          <span className="font-bold hidden md:inline">TOUR</span>
        </button>

        {/* Interactive Optical Laboratory Mode Toggle */}
        <button
          onClick={() => {
            playClick();
            openOpticalLab("spectrometer");
          }}
          className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#0c0e14] border border-[#ef9a57]/40 hover:border-[#ef9a57] text-[#ef9a57] hover:bg-[#ef9a57]/10 font-mono text-[9px] sm:text-[10px] tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57] shadow-[0_0_12px_rgba(239,154,87,0.15)] group"
          data-cursor="OPEN"
          aria-label="Open Optical Laboratory Bench"
          title="Open Optical Bench (Spectrometer, Polarizer, Interferometer)"
        >
          <FlaskConical className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
          <span className="font-bold">LAB BENCH</span>
        </button>

        {/* Astronomical Solar Phase & Caustic Grading */}
        <button
          onClick={() => {
            playClick();
            openOpticalLab("chrono");
          }}
          className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full bg-[#0c0e14] border border-white/10 hover:border-[#ef9a57]/50 font-mono text-[9px] text-white/60 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57]"
          data-cursor="OPEN"
          aria-label={`Astronomical Solar Phase: ${astronomy.phaseConfig.label}. Click to calibrate.`}
          title={`Solar Phase: ${astronomy.phaseConfig.label} (${astronomy.phaseConfig.hourRange})`}
        >
          <span>{astronomy.phaseConfig.icon}</span>
          <span className="font-bold uppercase tracking-wider" style={{ color: astronomy.phaseConfig.ambientHex }}>
            {astronomy.phaseConfig.label}
          </span>
        </button>

        {/* Status Indicator */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0c0e14] border border-white/10 font-mono text-[10px] text-white/60 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ef9a57] animate-pulse" aria-hidden="true" />
          <span>SYS_ONLINE [UTC+5:30]</span>
        </div>

        {/* Liquid Metal / Precision Connect Button */}
        <button
          onClick={() => scrollToSection("anneal")}
          className="relative px-4 py-2 rounded-full font-mono text-[11px] font-bold tracking-wider text-[#050609] bg-[#ef9a57] hover:bg-[#f3aa70] active:scale-95 transition-all shadow-[0_0_15px_rgba(239,154,87,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          data-cursor="OPEN"
        >
          INITIATE CONTACT
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={() => {
            playClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="lg:hidden p-2 text-white/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57] font-mono text-xs border border-white/10 rounded-md"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? "CLOSE" : "MENU"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          className="lg:hidden fixed top-[78px] left-0 w-full bg-[#050609]/98 border-b border-white/10 p-6 flex flex-col space-y-4 font-mono text-xs tracking-precision backdrop-blur-2xl"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-left text-white/70 hover:text-[#ef9a57] py-2 border-b border-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57] rounded"
            >
              {link.label}
            </button>
          ))}

          {/* Mobile-only controls */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                playClick();
                tour.startTour(0);
              }}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-full bg-[#ef9a57]/15 border border-[#ef9a57]/50 text-[#ef9a57] font-mono text-[10px] font-bold tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>PHOTON TOUR</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                playClick();
                openOpticalLab("spectrometer");
              }}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-full bg-[#0c0e14] border border-[#ef9a57]/40 text-[#ef9a57] font-mono text-[10px] tracking-wider"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>LAB BENCH</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                playClick();
                openOpticalLab("chrono");
              }}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-full bg-[#0c0e14] border border-white/10 font-mono text-[10px] text-white/70 tracking-wider"
            >
              <span>{astronomy.phaseConfig.icon}</span>
              <span>{astronomy.phaseConfig.label}</span>
            </button>
            <button
              onClick={() => {
                playClick();
                cycleDisplayMode();
              }}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-full bg-[#0c0e14] border border-white/10 font-mono text-[10px] text-white/50 tracking-wider"
              aria-label={`Display mode: ${displayModeLabel}`}
            >
              <Monitor className="w-3 h-3 text-[#ef9a57]" />
              <span>{displayModeLabel}</span>
            </button>
            <button
              onClick={() => {
                playClick();
                audioReactive.toggleMode();
              }}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-full border font-mono text-[10px] tracking-wider ${
                audioReactive.mode === "mic"
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                  : audioReactive.mode === "synthetic"
                  ? "border-blue-500/50 bg-blue-500/10 text-blue-300"
                  : "border-white/10 bg-[#0c0e14] text-white/50"
              }`}
            >
              <Waves className={`w-3.5 h-3.5 ${audioReactive.mode !== "off" ? "animate-pulse" : ""}`} />
              <span>CYMATICS: {audioReactive.mode.toUpperCase()}</span>
            </button>
            <button
              onClick={toggleSound}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-full bg-[#0c0e14] border border-white/10 font-mono text-[10px] text-white/50 tracking-wider"
              aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
            >
              {soundEnabled ? (
                <Volume2 className="w-3 h-3 text-[#ef9a57]" />
              ) : (
                <VolumeX className="w-3 h-3" />
              )}
              <span>{soundEnabled ? "SOUND ON" : "SOUND OFF"}</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
