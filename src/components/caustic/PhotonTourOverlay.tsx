"use client";

import React, { useEffect, useState, useMemo } from "react";
import { usePortfolio } from "@/lib/PortfolioContext";
import { PHOTON_STOPS } from "@/lib/usePhotonTour";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  Pause,
  Compass,
  Zap,
  Layers,
  ChevronRight,
} from "lucide-react";

export default function PhotonTourOverlay() {
  const { tour, playClick, playChime } = usePortfolio();
  const [photonPos, setPhotonPos] = useState({ x: 50, y: 35 });

  const currentStop = tour.currentStop;

  // Kinetic movement of photon particle when waypoint changes
  useEffect(() => {
    if (!tour.isActive) return;

    // Deterministic organic target coordinates across waypoints
    const positions = [
      { x: 30, y: 38 }, // Stop 1 (Prime Hero)
      { x: 25, y: 45 }, // Stop 2 (Fracture)
      { x: 65, y: 40 }, // Stop 3 (Loupe)
      { x: 50, y: 35 }, // Stop 4 (Dispersion)
      { x: 35, y: 50 }, // Stop 5 (Assembly)
      { x: 40, y: 45 }, // Stop 6 (Workbench)
      { x: 50, y: 55 }, // Stop 7 (Caustics)
      { x: 50, y: 30 }, // Stop 8 (Anneal)
    ];

    const target = positions[tour.currentIndex] || { x: 50, y: 40 };
    setPhotonPos(target);
  }, [tour.isActive, tour.currentIndex]);

  const progressPercent = useMemo(() => {
    return ((tour.currentIndex + 1) / PHOTON_STOPS.length) * 100;
  }, [tour.currentIndex]);

  if (!tour.isActive) return null;

  return (
    <div
      role="dialog"
      aria-label="Photon's Journey Narrative Expedition"
      className="fixed inset-0 z-[150] pointer-events-none select-none transition-all"
    >
      {/* ----------------------------------------------------------- */}
      {/* 1. KINETIC FLOATING PHOTON PARTICLE */}
      {/* ----------------------------------------------------------- */}
      <div
        className="absolute transition-all duration-1000 ease-out pointer-events-none"
        style={{
          left: `${photonPos.x}%`,
          top: `${photonPos.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Outer corona dispersion ring */}
        <div
          className="absolute -inset-10 rounded-full animate-ping opacity-25"
          style={{ backgroundColor: currentStop.colorHex }}
        />
        {/* Medium refractive halo */}
        <div
          className="absolute -inset-5 rounded-full blur-md opacity-75 animate-pulse"
          style={{ backgroundColor: currentStop.colorHex }}
        />
        {/* Core Photon Quantum Bead */}
        <div className="relative w-5 h-5 rounded-full bg-white shadow-[0_0_20px_#ffffff,0_0_35px_var(--amber)] flex items-center justify-center">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: currentStop.colorHex }}
          />
        </div>
        {/* Telemetry Tag Pinned to Photon */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] font-bold tracking-widest px-2 py-0.5 rounded bg-black/80 border border-white/20 text-white shadow-lg backdrop-blur-md">
          PHOTON λ: {currentStop.wavelength} nm
        </div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* 2. TOP EXPEDITION STATUS HUD BAR */}
      {/* ----------------------------------------------------------- */}
      <div className="pointer-events-auto absolute top-20 left-1/2 -translate-x-1/2 max-w-xl w-[92%] sm:w-auto flex items-center justify-between gap-3 px-4 py-2 rounded-full bg-[#080b12]/92 border border-white/15 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] font-mono text-[10px] text-white/80 animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#ef9a57] animate-pulse" />
          <span className="font-bold text-white tracking-widest uppercase">
            PHOTON EXPEDITION
          </span>
          <span className="text-white/30 hidden sm:inline">•</span>
          <span className="text-[#ef9a57] hidden sm:inline">
            WAYPOINT {tour.currentIndex + 1} OF {PHOTON_STOPS.length}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              playClick();
              tour.toggleAutoPlay();
            }}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-full border text-[9px] tracking-wider transition-all ${
              tour.isAutoPlay
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                : "border-white/15 bg-white/5 text-white/60 hover:text-white"
            }`}
            title="Auto-cruise through waypoints with narrative timer"
          >
            {tour.isAutoPlay ? (
              <>
                <Pause className="w-2.5 h-2.5" />
                <span>CRUISING (6s)</span>
              </>
            ) : (
              <>
                <Play className="w-2.5 h-2.5" />
                <span>AUTOPILOT</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              playClick();
              tour.stopTour();
            }}
            className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            title="Exit Expedition (or press Esc)"
            aria-label="Exit Expedition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* 3. BOTTOM CINEMATIC STORY CARD HUD */}
      {/* ----------------------------------------------------------- */}
      <div className="pointer-events-auto absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 max-w-2xl w-[94%] sm:w-full flex flex-col rounded-2xl bg-[#07090e]/95 border border-white/20 shadow-[0_20px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl overflow-hidden font-sans text-white animate-in fade-in slide-in-from-bottom-6 duration-300">
        {/* Dynamic Progress Line */}
        <div className="w-full h-1 bg-white/10">
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: currentStop.colorHex,
              boxShadow: `0 0 10px ${currentStop.colorHex}`,
            }}
          />
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          {/* Milestone Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <span
                className="font-mono text-xs font-black px-2 py-0.5 rounded bg-white/10 text-white"
                style={{ borderLeft: `3px solid ${currentStop.colorHex}` }}
              >
                STOP {currentStop.number} // 08
              </span>
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest truncate">
                {currentStop.phase}
              </span>
            </div>

            <div className="font-mono text-[10px] text-white/40 self-start sm:self-auto">
              {currentStop.opticalLaw}
            </div>
          </div>

          {/* Narrative Content */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight uppercase flex items-center gap-2">
              <span>{currentStop.title}</span>
            </h3>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
              {currentStop.narrative}
            </p>

            <blockquote
              className="text-xs font-mono italic pl-3 border-l-2 py-0.5 text-white/70"
              style={{ borderColor: currentStop.colorHex }}
            >
              &ldquo;{currentStop.quote}&rdquo;
            </blockquote>
          </div>

          {/* Technical Highlight pill */}
          <div className="flex items-center space-x-2 font-mono text-[10px] bg-white/[0.04] p-2 rounded-lg border border-white/10 text-white/60">
            <Zap className="w-3.5 h-3.5 text-[#ef9a57] shrink-0" />
            <span className="truncate">
              <strong className="text-white/80">TECHNICAL ARCHITECTURE:</strong>{" "}
              {currentStop.technicalHighlight}
            </span>
          </div>

          {/* Navigation Controls Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-xs">
            {/* Waypoint dots */}
            <div className="hidden sm:flex items-center space-x-1.5">
              {PHOTON_STOPS.map((stop, idx) => (
                <button
                  key={stop.id}
                  onClick={() => {
                    playClick();
                    tour.goToStop(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === tour.currentIndex
                      ? "scale-125 shadow-[0_0_8px_#ef9a57]"
                      : "opacity-40 hover:opacity-80"
                  }`}
                  style={{
                    backgroundColor:
                      idx === tour.currentIndex ? stop.colorHex : "#ffffff",
                  }}
                  title={`Jump to Stop ${stop.number}: ${stop.title}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
              <button
                onClick={() => {
                  playClick();
                  tour.prevStop();
                }}
                disabled={tour.currentIndex === 0}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/15 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all text-white/80 text-[11px]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>PREV</span>
              </button>

              <div className="sm:hidden font-mono text-[10px] text-white/40">
                {tour.currentIndex + 1} / {PHOTON_STOPS.length}
              </div>

              {tour.currentIndex < PHOTON_STOPS.length - 1 ? (
                <button
                  onClick={() => {
                    playClick();
                    tour.nextStop();
                  }}
                  className="flex items-center space-x-1 px-4 py-1.5 rounded-lg bg-[#ef9a57] hover:bg-[#f3aa70] text-[#050609] font-bold text-[11px] transition-all shadow-[0_0_15px_rgba(239,154,87,0.3)] active:scale-95"
                >
                  <span>NEXT WAYPOINT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    playClick();
                    tour.stopTour();
                  }}
                  className="flex items-center space-x-1 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#050609] font-bold text-[11px] transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-95"
                >
                  <span>COMPLETE TOUR</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
