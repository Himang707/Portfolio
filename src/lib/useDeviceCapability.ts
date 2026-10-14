"use client";

import { useState, useEffect } from "react";

export interface DeviceCapability {
  /** true if viewport < 768px */
  isMobile: boolean;
  /** true if navigator.deviceMemory < 4 or hardwareConcurrency < 4 */
  isLowEnd: boolean;
  /** true if user prefers reduced motion */
  prefersReducedMotion: boolean;
  /** true if device can handle full WebGL effects */
  useHighPerformance: boolean;
  /** Recommended pixel ratio cap (1.0 for low-end, 1.5 for standard, 2.0 for high-end) */
  maxPixelRatio: number;
  /** Recommended Three.js geometry segment multiplier (0.5 for low-end, 1.0 for standard) */
  geometryDetail: number;
  /** Recommended WebGL shader iteration count multiplier */
  shaderComplexity: number;
}

/**
 * Device-aware capability detection hook.
 * Returns performance tier information used to scale WebGL effects,
 * animation complexity, and rendering quality across all sections.
 */
export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    isMobile: false,
    isLowEnd: false,
    prefersReducedMotion: false,
    useHighPerformance: true,
    maxPixelRatio: 1.5,
    geometryDetail: 1.0,
    shaderComplexity: 1.0,
  });

  useEffect(() => {
    const detect = () => {
      const isMobile = window.innerWidth < 768;
      const nav = navigator as Navigator & {
        deviceMemory?: number;
      };
      const isLowEnd =
        (nav.deviceMemory !== undefined && nav.deviceMemory < 4) ||
        (navigator.hardwareConcurrency !== undefined &&
          navigator.hardwareConcurrency < 4);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const useHighPerformance =
        !isMobile && !isLowEnd && !prefersReducedMotion;

      let maxPixelRatio = 1.5;
      let geometryDetail = 1.0;
      let shaderComplexity = 1.0;

      if (prefersReducedMotion) {
        maxPixelRatio = 1.0;
        geometryDetail = 0.3;
        shaderComplexity = 0.0; // No animated shaders
      } else if (isLowEnd || isMobile) {
        maxPixelRatio = 1.0;
        geometryDetail = 0.5;
        shaderComplexity = 0.5;
      }

      setCapability({
        isMobile,
        isLowEnd,
        prefersReducedMotion,
        useHighPerformance,
        maxPixelRatio,
        geometryDetail,
        shaderComplexity,
      });
    };

    detect();

    // Re-detect on resize (e.g. tablet rotation)
    const handleResize = () => detect();
    window.addEventListener("resize", handleResize, { passive: true });

    // Listen for reduced motion changes
    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const handleMotionChange = () => detect();
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return capability;
}
