"use client";

import { useState, useEffect, useCallback } from "react";

export type SolarPhase = "dawn" | "noon" | "golden" | "midnight";

export interface SolarPhaseConfig {
  phase: SolarPhase;
  label: string;
  icon: string;
  hourRange: string;
  description: string;
  causticTint: [number, number, number]; // RGB 0-1 for WebGL shader
  ambientHex: string;
  glowHex: string;
  borderHex: string;
  rayleighIndex: number;
}

export const SOLAR_PHASES: Record<SolarPhase, SolarPhaseConfig> = {
  dawn: {
    phase: "dawn",
    label: "DAWN PRISM",
    icon: "🌅",
    hourRange: "05:00 - 08:59",
    description: "Cool crisp Rayleigh scattering; high blue transmission.",
    causticTint: [0.38, 0.74, 0.98], // Cyan-blue
    ambientHex: "#38bdf8",
    glowHex: "rgba(56, 189, 248, 0.35)",
    borderHex: "rgba(56, 189, 248, 0.4)",
    rayleighIndex: 1.34,
  },
  noon: {
    phase: "noon",
    label: "SOLAR NOON",
    icon: "☀️",
    hourRange: "09:00 - 16:59",
    description: "Peak optical luminance; high-contrast caustic convergence.",
    causticTint: [0.92, 0.96, 1.0], // Neutral white/ice
    ambientHex: "#f2f4f7",
    glowHex: "rgba(242, 244, 247, 0.3)",
    borderHex: "rgba(255, 255, 255, 0.4)",
    rayleighIndex: 1.0,
  },
  golden: {
    phase: "golden",
    label: "GOLDEN HOUR",
    icon: "🌇",
    hourRange: "17:00 - 19:59",
    description: "Long-wavelength amber refraction; rich chromatic dispersion.",
    causticTint: [0.94, 0.60, 0.34], // Warm signature amber #ef9a57
    ambientHex: "#ef9a57",
    glowHex: "rgba(239, 154, 87, 0.4)",
    borderHex: "rgba(239, 154, 87, 0.5)",
    rayleighIndex: 1.82,
  },
  midnight: {
    phase: "midnight",
    label: "MIDNIGHT OPS",
    icon: "🌙",
    hourRange: "20:00 - 04:59",
    description: "Deep obsidian absorption with phosphorescent bioluminescence.",
    causticTint: [0.52, 0.58, 0.98], // Phosphor indigo
    ambientHex: "#818cf8",
    glowHex: "rgba(129, 140, 248, 0.35)",
    borderHex: "rgba(129, 140, 248, 0.4)",
    rayleighIndex: 2.15,
  },
};

/**
 * Determine solar phase based on hour (0 - 23).
 */
export function getPhaseFromHour(hour: number): SolarPhase {
  if (hour >= 5 && hour < 9) return "dawn";
  if (hour >= 9 && hour < 17) return "noon";
  if (hour >= 17 && hour < 20) return "golden";
  return "midnight";
}

export interface AstronomicalThemeReturn {
  currentHour: number;
  solarPhase: SolarPhase;
  phaseConfig: SolarPhaseConfig;
  isAutoSync: boolean;
  setHour: (hour: number) => void;
  setAutoSync: (sync: boolean) => void;
  cyclePhase: () => void;
}

/**
 * Hook for Real-Time Astronomical & Environmental Optical Responsiveness.
 * Dynamically grades the portfolio's caustic shaders, CSS glow variables,
 * and ambient chromatic atmosphere to match real-world solar phases.
 */
export function useAstronomicalTheme(): AstronomicalThemeReturn {
  const [currentHour, setCurrentHour] = useState<number>(() => {
    return typeof window !== "undefined" ? new Date().getHours() : 18;
  });
  const [isAutoSync, setIsAutoSync] = useState<boolean>(true);

  // Sync to system clock when autoSync is enabled
  useEffect(() => {
    if (!isAutoSync) return;

    const updateHour = () => {
      const now = new Date();
      setCurrentHour(now.getHours() + now.getMinutes() / 60);
    };

    updateHour();
    const interval = setInterval(updateHour, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [isAutoSync]);

  const solarPhase = getPhaseFromHour(Math.floor(currentHour));
  const phaseConfig = SOLAR_PHASES[solarPhase];

  // Apply subtle CSS variable accents based on active solar phase
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty("--solar-ambient", phaseConfig.ambientHex);
    root.style.setProperty("--solar-glow", phaseConfig.glowHex);
    root.style.setProperty("--solar-border", phaseConfig.borderHex);
    root.setAttribute("data-solar-phase", solarPhase);
  }, [phaseConfig, solarPhase]);

  const setHour = useCallback((hour: number) => {
    setIsAutoSync(false);
    setCurrentHour(Math.max(0, Math.min(23.99, hour)));
  }, []);

  const setAutoSync = useCallback((sync: boolean) => {
    setIsAutoSync(sync);
    if (sync) {
      const now = new Date();
      setCurrentHour(now.getHours() + now.getMinutes() / 60);
    }
  }, []);

  const cyclePhase = useCallback(() => {
    setIsAutoSync(false);
    const phases: SolarPhase[] = ["dawn", "noon", "golden", "midnight"];
    const currentIdx = phases.indexOf(solarPhase);
    const nextPhase = phases[(currentIdx + 1) % phases.length];
    
    // Map to midpoint hours
    const hourMap: Record<SolarPhase, number> = {
      dawn: 7,
      noon: 13,
      golden: 18.5,
      midnight: 23,
    };
    setCurrentHour(hourMap[nextPhase]);
  }, [solarPhase]);

  return {
    currentHour,
    solarPhase,
    phaseConfig,
    isAutoSync,
    setHour,
    setAutoSync,
    cyclePhase,
  };
}
