"use client";

import { useState, useEffect, useCallback } from "react";

export type DisplayMode = "dark" | "terminal" | "presentation";

interface DisplayModeReturn {
  mode: DisplayMode;
  setMode: (mode: DisplayMode) => void;
  cycleMode: () => void;
  label: string;
}

const MODE_LABELS: Record<DisplayMode, string> = {
  dark: "DARK OPS",
  terminal: "TERMINAL",
  presentation: "PRESENTATION",
};

/**
 * Display mode toggle hook.
 * Controls CSS custom property swaps for visual theming:
 * - Dark (default): Current dark technical theme
 * - Terminal: Classic green-on-black CRT aesthetic
 * - Presentation: Higher contrast, optimized for projectors
 * 
 * Persists preference in localStorage.
 */
export function useDisplayMode(): DisplayModeReturn {
  const [mode, setModeState] = useState<DisplayMode>("dark");

  // Restore saved preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem("himang-display-mode") as DisplayMode | null;
      if (saved && ["dark", "terminal", "presentation"].includes(saved)) {
        setModeState(saved);
        applyMode(saved);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const applyMode = (newMode: DisplayMode) => {
    const root = document.documentElement;

    // Remove all mode classes
    root.classList.remove("mode-dark", "mode-terminal", "mode-presentation");
    root.classList.add(`mode-${newMode}`);

    // Set CSS custom properties for each mode
    if (newMode === "terminal") {
      root.style.setProperty("--bg", "#020802");
      root.style.setProperty("--text", "#00ff41");
      root.style.setProperty("--dim", "rgba(0, 255, 65, 0.55)");
      root.style.setProperty("--faint", "rgba(0, 255, 65, 0.25)");
      root.style.setProperty("--amber", "#00ff41");
      root.style.setProperty("--edge-highlight", "rgba(0, 255, 65, 0.6)");
    } else if (newMode === "presentation") {
      root.style.setProperty("--bg", "#0a0c12");
      root.style.setProperty("--text", "#ffffff");
      root.style.setProperty("--dim", "rgba(255, 255, 255, 0.65)");
      root.style.setProperty("--faint", "rgba(255, 255, 255, 0.40)");
      root.style.setProperty("--amber", "#ffa94d");
      root.style.setProperty("--edge-highlight", "rgba(255, 255, 255, 0.9)");
    } else {
      // Reset to defaults
      root.style.setProperty("--bg", "#050609");
      root.style.setProperty("--text", "#f2f4f7");
      root.style.setProperty("--dim", "rgba(242, 244, 247, 0.55)");
      root.style.setProperty("--faint", "rgba(242, 244, 247, 0.34)");
      root.style.setProperty("--amber", "#ef9a57");
      root.style.setProperty("--edge-highlight", "rgba(220, 230, 240, 0.86)");
    }
  };

  const setMode = useCallback((newMode: DisplayMode) => {
    setModeState(newMode);
    applyMode(newMode);
    try {
      localStorage.setItem("himang-display-mode", newMode);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const cycleMode = useCallback(() => {
    setModeState((prev) => {
      const modes: DisplayMode[] = ["dark", "terminal", "presentation"];
      const idx = modes.indexOf(prev);
      const next = modes[(idx + 1) % modes.length];
      applyMode(next);
      try {
        localStorage.setItem("himang-display-mode", next);
      } catch {
        // localStorage unavailable
      }
      return next;
    });
  }, []);

  return {
    mode,
    setMode,
    cycleMode,
    label: MODE_LABELS[mode],
  };
}
