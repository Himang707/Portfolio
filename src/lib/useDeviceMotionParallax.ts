"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface MotionParallaxState {
  tiltX: number; // -1 (left) to +1 (right)
  tiltY: number; // -1 (top) to +1 (bottom)
  isGyroActive: boolean;
  isGyroAvailable: boolean;
  requestGyroPermission: () => Promise<boolean>;
}

/**
 * Universal Motion & Device Orientation Parallax Hook.
 * - On mobile/tablets: Uses DeviceOrientationEvent (beta, gamma) with silky exponential damping.
 * - On desktop: Gracefully falls back to window-wide pointer coordinates with inertia.
 * - Supports iOS 13+ permission request flow.
 */
export function useDeviceMotionParallax(): MotionParallaxState {
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isGyroActive, setIsGyroActive] = useState<boolean>(false);
  const [isGyroAvailable, setIsGyroAvailable] = useState<boolean>(false);

  const targetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  // Check if DeviceOrientation is available
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("DeviceOrientationEvent" in window) {
      setIsGyroAvailable(true);
    }
  }, []);

  // Smooth lerp animation loop
  useEffect(() => {
    const loop = () => {
      // Exponential smoothing factor: 0.08
      const damping = 0.08;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * damping;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * damping;

      // Only dispatch state update if difference is noticeable to save React re-renders
      setTilt((prev) => {
        const dx = Math.abs(prev.x - currentRef.current.x);
        const dy = Math.abs(prev.y - currentRef.current.y);
        if (dx > 0.002 || dy > 0.002) {
          return {
            x: Number(currentRef.current.x.toFixed(4)),
            y: Number(currentRef.current.y.toFixed(4)),
          };
        }
        return prev;
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Desktop Pointer Fallback Listener
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePointerMove = (e: PointerEvent) => {
      // If mobile gyroscope is currently feeding data, let gyro take precedence
      if (isGyroActive) return;

      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      const nx = (e.clientX - halfW) / halfW;
      const ny = (e.clientY - halfH) / halfH;

      targetRef.current.x = Math.max(-1, Math.min(1, nx));
      targetRef.current.y = Math.max(-1, Math.min(1, ny));
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [isGyroActive]);

  // Orientation Event Handler
  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
    if (e.beta === null || e.gamma === null) return;
    setIsGyroActive(true);

    // gamma: left-to-right tilt in [-90, 90]
    // beta: front-to-back tilt in [-180, 180], typical holding angle is ~35-50 deg
    const gamma = Math.max(-45, Math.min(45, e.gamma));
    const beta = Math.max(-15, Math.min(75, e.beta - 40)); // center around 40deg hand position

    targetRef.current.x = gamma / 45; // -1 to +1
    targetRef.current.y = beta / 45;  // -1 to +1
  }, []);

  // Auto-listen to deviceorientation on non-iOS or permissions-already-granted
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasPermissionApi =
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: unknown })
        ?.requestPermission === "function";

    if (!hasPermissionApi) {
      window.addEventListener("deviceorientation", handleOrientation, { passive: true });
      return () => window.removeEventListener("deviceorientation", handleOrientation);
    }
  }, [handleOrientation]);

  // Request Permission (for iOS Safari)
  const requestGyroPermission = useCallback(async (): Promise<boolean> => {
    if (typeof window === "undefined") return false;

    type DeviceOrientationEventWithPermission = typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };

    const DevOrientation = DeviceOrientationEvent as DeviceOrientationEventWithPermission;

    if (typeof DevOrientation.requestPermission === "function") {
      try {
        const permissionState = await DevOrientation.requestPermission();
        if (permissionState === "granted") {
          window.addEventListener("deviceorientation", handleOrientation, { passive: true });
          setIsGyroActive(true);
          return true;
        }
        return false;
      } catch {
        return false;
      }
    } else {
      window.addEventListener("deviceorientation", handleOrientation, { passive: true });
      setIsGyroActive(true);
      return true;
    }
  }, [handleOrientation]);

  return {
    tiltX: tilt.x,
    tiltY: tilt.y,
    isGyroActive,
    isGyroAvailable,
    requestGyroPermission,
  };
}
