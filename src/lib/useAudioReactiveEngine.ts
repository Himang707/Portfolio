"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export type AudioReactiveMode = "off" | "mic" | "synthetic";

export interface AudioReactiveState {
  mode: AudioReactiveMode;
  amplitude: number; // 0.0 to 1.0
  frequency: number; // 0.0 to 1.0
  bassEnergy: number; // 0.0 to 1.0
  toggleMode: () => void;
  setMode: (mode: AudioReactiveMode) => Promise<boolean>;
  getValuesRef: () => { amplitude: number; frequency: number; bassEnergy: number };
}

/**
 * Real-Time Audio-Reactive Engine for Optical WebGL Caustics & Cymatics.
 * - Supports opt-in live microphone capture via Web Audio AnalyserNode.
 * - Supports "synthetic ambient resonance" mode (no permissions required).
 * - Exposes both reactive state and zero-latency ref-based values for 60FPS WebGL render loops.
 */
export function useAudioReactiveEngine(): AudioReactiveState {
  const [mode, setModeState] = useState<AudioReactiveMode>("off");
  const [metrics, setMetrics] = useState<{ amplitude: number; frequency: number; bassEnergy: number }>({
    amplitude: 0,
    frequency: 0,
    bassEnergy: 0,
  });

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const synthOscRef = useRef<OscillatorNode | null>(null);
  const synthGainRef = useRef<GainNode | null>(null);

  const valuesRef = useRef<{ amplitude: number; frequency: number; bassEnergy: number }>({
    amplitude: 0,
    frequency: 0,
    bassEnergy: 0,
  });

  const animFrameRef = useRef<number | null>(null);

  // Stop current audio sources cleanly
  const cleanupSources = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (synthOscRef.current) {
      try {
        synthOscRef.current.stop();
        synthOscRef.current.disconnect();
      } catch {
        // Ignore
      }
      synthOscRef.current = null;
    }
    if (synthGainRef.current) {
      try {
        synthGainRef.current.disconnect();
      } catch {
        // Ignore
      }
      synthGainRef.current = null;
    }
  }, []);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const setMode = useCallback(
    async (newMode: AudioReactiveMode): Promise<boolean> => {
      cleanupSources();

      if (newMode === "off") {
        setModeState("off");
        valuesRef.current = { amplitude: 0, frequency: 0, bassEnergy: 0 };
        setMetrics({ amplitude: 0, frequency: 0, bassEnergy: 0 });
        return true;
      }

      const ctx = getAudioContext();

      if (!analyserRef.current) {
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.82;
        analyserRef.current = analyser;
      }

      const analyser = analyserRef.current;

      if (newMode === "mic") {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
          mediaStreamRef.current = stream;
          const source = ctx.createMediaStreamSource(stream);
          source.connect(analyser);
          setModeState("mic");
          return true;
        } catch {
          // If mic denied or unavailable, gracefully fall back to synthetic mode
          return setMode("synthetic");
        }
      }

      if (newMode === "synthetic") {
        try {
          // Ambient low-frequency pulse oscillator (42Hz deep drone)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(42, ctx.currentTime);

          gain.gain.setValueAtTime(0.08, ctx.currentTime);

          osc.connect(gain);
          gain.connect(analyser);

          // Route very quietly to destination for subtle ambient audio feedback
          const masterGain = ctx.createGain();
          masterGain.gain.setValueAtTime(0.02, ctx.currentTime);
          gain.connect(masterGain);
          masterGain.connect(ctx.destination);

          osc.start();
          synthOscRef.current = osc;
          synthGainRef.current = gain;

          setModeState("synthetic");
          return true;
        } catch {
          setModeState("off");
          return false;
        }
      }

      return false;
    },
    [cleanupSources, getAudioContext]
  );

  const toggleMode = useCallback(() => {
    if (mode === "off") {
      setMode("mic");
    } else if (mode === "mic") {
      setMode("synthetic");
    } else {
      setMode("off");
    }
  }, [mode, setMode]);

  // Real-time audio analysis loop
  useEffect(() => {
    if (mode === "off") return;

    const analyser = analyserRef.current;
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let lastStateUpdate = performance.now();

    const analyze = () => {
      analyser.getByteFrequencyData(dataArray);

      let sum = 0;
      let maxVal = 0;
      let maxIdx = 0;
      let bassSum = 0;
      const bassBinCount = Math.floor(dataArray.length * 0.25); // Lower 25% frequencies

      for (let i = 0; i < dataArray.length; i++) {
        const val = dataArray[i];
        sum += val;
        if (i < bassBinCount) bassSum += val;
        if (val > maxVal) {
          maxVal = val;
          maxIdx = i;
        }
      }

      const amp = sum / (dataArray.length * 255);
      const freq = maxIdx / dataArray.length;
      const bass = bassSum / (bassBinCount * 255);

      // Store in ref for zero-latency WebGL shader rendering
      valuesRef.current = {
        amplitude: Number(amp.toFixed(3)),
        frequency: Number(freq.toFixed(3)),
        bassEnergy: Number(bass.toFixed(3)),
      };

      // Throttle React state update to ~20Hz to prevent unnecessary re-rendering
      const now = performance.now();
      if (now - lastStateUpdate > 50) {
        lastStateUpdate = now;
        setMetrics({
          amplitude: valuesRef.current.amplitude,
          frequency: valuesRef.current.frequency,
          bassEnergy: valuesRef.current.bassEnergy,
        });
      }

      animFrameRef.current = requestAnimationFrame(analyze);
    };

    animFrameRef.current = requestAnimationFrame(analyze);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [mode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupSources();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [cleanupSources]);

  const getValuesRef = useCallback(() => valuesRef.current, []);

  return {
    mode,
    amplitude: metrics.amplitude,
    frequency: metrics.frequency,
    bassEnergy: metrics.bassEnergy,
    toggleMode,
    setMode,
    getValuesRef,
  };
}
