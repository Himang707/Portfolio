"use client";

import { useRef, useCallback, useEffect, useState } from "react";

interface SoundEngineConfig {
  /** Master volume 0-1. Default 0.12 (very subtle) */
  masterVolume: number;
  /** Whether sounds are enabled */
  enabled: boolean;
}

/**
 * Web Audio API-based sound engine using pure sine wave synthesis.
 * No audio files needed — all sounds are procedurally generated.
 * 
 * Sounds are intentionally very subtle and opt-in.
 * Respects prefers-reduced-motion by auto-disabling.
 */
export function useSoundEngine() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [enabled, setEnabled] = useState(false);
  const configRef = useRef<SoundEngineConfig>({
    masterVolume: 0.12,
    enabled: false,
  });

  // Initialize AudioContext lazily on first user interaction
  const getContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Auto-disable if user prefers reduced motion
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) {
      setEnabled(false);
      configRef.current.enabled = false;
    }
  }, []);

  const toggleSound = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      configRef.current.enabled = next;
      // Initialize context on first enable (requires user gesture)
      if (next) getContext();
      return next;
    });
  }, [getContext]);

  /**
   * Subtle click sound — short 800Hz sine wave with fast decay.
   * Used for button presses and interactive element clicks.
   */
  const playClick = useCallback(() => {
    if (!configRef.current.enabled) return;
    try {
      const ctx = getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        400,
        ctx.currentTime + 0.08
      );

      gain.gain.setValueAtTime(
        configRef.current.masterVolume * 0.6,
        ctx.currentTime
      );
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.08
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Silently fail — audio is non-critical
    }
  }, [getContext]);

  /**
   * Soft chime — harmonic blend of two sine waves.
   * Used for skill card max tilt or special interactions.
   */
  const playChime = useCallback(() => {
    if (!configRef.current.enabled) return;
    try {
      const ctx = getContext();
      const vol = configRef.current.masterVolume;

      // Fundamental
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(1200, ctx.currentTime);
      gain1.gain.setValueAtTime(vol * 0.4, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.3
      );
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.35);

      // Overtone (perfect fifth above)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1800, ctx.currentTime);
      gain2.gain.setValueAtTime(vol * 0.2, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.25
      );
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.02);
      osc2.stop(ctx.currentTime + 0.3);
    } catch {
      // Silently fail
    }
  }, [getContext]);

  /**
   * Harmonic resonance — very subtle low drone.
   * Used for lens separation or deep scroll interactions.
   */
  const playResonance = useCallback(() => {
    if (!configRef.current.enabled) return;
    try {
      const ctx = getContext();
      const vol = configRef.current.masterVolume;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(
        260,
        ctx.currentTime + 0.4
      );

      gain.gain.setValueAtTime(vol * 0.15, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(
        vol * 0.25,
        ctx.currentTime + 0.15
      );
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.5
      );

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.55);
    } catch {
      // Silently fail
    }
  }, [getContext]);

  /**
   * Vault unlock sound — dramatic ascending arpeggio.
   * Used for Konami code easter egg activation.
   */
  const playUnlock = useCallback(() => {
    if (!configRef.current.enabled) return;
    try {
      const ctx = getContext();
      const vol = configRef.current.masterVolume;
      const notes = [440, 554, 659, 880]; // A4, C#5, E5, A5

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + i * 0.08;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(vol * 0.5, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch {
      // Silently fail
    }
  }, [getContext]);

  return {
    enabled,
    toggleSound,
    playClick,
    playChime,
    playResonance,
    playUnlock,
  };
}
