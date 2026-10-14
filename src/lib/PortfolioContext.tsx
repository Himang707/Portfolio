"use client";

import React, { createContext, useContext, ReactNode, useState, useCallback } from "react";
import {
  useDeviceCapability,
  DeviceCapability,
} from "@/lib/useDeviceCapability";
import { useSoundEngine } from "@/lib/useSoundEngine";
import { useDisplayMode, DisplayMode } from "@/lib/useDisplayMode";
import { useDeepLinking } from "@/lib/useDeepLinking";
import {
  useAstronomicalTheme,
  AstronomicalThemeReturn,
} from "@/lib/useAstronomicalTheme";
import {
  useDeviceMotionParallax,
  MotionParallaxState,
} from "@/lib/useDeviceMotionParallax";
import {
  useAudioReactiveEngine,
  AudioReactiveState,
} from "@/lib/useAudioReactiveEngine";
import {
  usePhotonTour,
  PhotonTourState,
} from "@/lib/usePhotonTour";

export type LabTab = "spectrometer" | "polarizer" | "interferometer" | "chrono";

interface PortfolioContextValue {
  // Device capability
  device: DeviceCapability;

  // Sound engine
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playChime: () => void;
  playResonance: () => void;
  playUnlock: () => void;

  // Display mode
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
  cycleDisplayMode: () => void;
  displayModeLabel: string;

  // Real-Time Astronomical & Environmental Theme
  astronomy: AstronomicalThemeReturn;

  // Motion & Device Orientation Parallax (Gyroscope + Cursor Inertia)
  motion: MotionParallaxState;

  // Real-Time Audio-Reactive Engine (Microphone + Synthetic Resonance)
  audioReactive: AudioReactiveState;

  // Photon's Journey: Guided Narrative Tour
  tour: PhotonTourState;

  // Interactive Optical Laboratory Mode State
  opticalLabOpen: boolean;
  labInitialTab: LabTab;
  openOpticalLab: (tab?: LabTab) => void;
  closeOpticalLab: () => void;
  toggleOpticalLab: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

/**
 * Central provider that initializes all enhancement hooks once
 * and makes them available via context to all child components.
 */
export function PortfolioProvider({ children }: { children: ReactNode }) {
  const device = useDeviceCapability();
  const sound = useSoundEngine();
  const display = useDisplayMode();
  const astronomy = useAstronomicalTheme();
  const motion = useDeviceMotionParallax();
  const audioReactive = useAudioReactiveEngine();

  // Initialize Photon Tour with subtle audio chime on waypoint arrival
  const tour = usePhotonTour(() => {
    sound.playChime();
  });

  // Optical Lab modal state
  const [opticalLabOpen, setOpticalLabOpen] = useState(false);
  const [labInitialTab, setLabInitialTab] = useState<LabTab>("spectrometer");

  const openOpticalLab = useCallback((tab: LabTab = "spectrometer") => {
    setLabInitialTab(tab);
    setOpticalLabOpen(true);
    sound.playResonance();
  }, [sound]);

  const closeOpticalLab = useCallback(() => {
    setOpticalLabOpen(false);
    sound.playClick();
  }, [sound]);

  const toggleOpticalLab = useCallback(() => {
    setOpticalLabOpen((prev) => {
      const next = !prev;
      if (next) sound.playResonance();
      else sound.playClick();
      return next;
    });
  }, [sound]);

  // Initialize deep linking (hash-based navigation)
  useDeepLinking();

  const value: PortfolioContextValue = {
    device,
    soundEnabled: sound.enabled,
    toggleSound: sound.toggleSound,
    playClick: sound.playClick,
    playChime: sound.playChime,
    playResonance: sound.playResonance,
    playUnlock: sound.playUnlock,
    displayMode: display.mode,
    setDisplayMode: display.setMode,
    cycleDisplayMode: display.cycleMode,
    displayModeLabel: display.label,
    astronomy,
    motion,
    audioReactive,
    tour,
    opticalLabOpen,
    labInitialTab,
    openOpticalLab,
    closeOpticalLab,
    toggleOpticalLab,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

/**
 * Hook to access portfolio enhancement context.
 * Must be used within a PortfolioProvider.
 */
export function usePortfolio(): PortfolioContextValue {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
