"use client";

import React from "react";

interface CanvasSkeletonProps {
  /** Width class (e.g., "w-full", "w-[440px]") */
  className?: string;
  /** Optional label for the loading telemetry badge */
  label?: string;
}

/**
 * Skeleton loader / placeholder for Three.js canvas elements.
 * Shows a subtle animated gradient with a spinning indicator
 * while the WebGL context initializes, eliminating white flash.
 */
export default function CanvasSkeleton({
  className = "w-full h-full",
  label = "INITIALIZING WEBGL CONTEXT",
}: CanvasSkeletonProps) {
  return (
    <div
      className={`${className} relative bg-gradient-to-br from-[#050609]/90 to-[#0c0e14]/90`}
      role="status"
      aria-label="Loading 3D visualization"
    >
      {/* Animated shimmer overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="canvas-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      </div>

      {/* Center spinner & telemetry */}
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
        {/* Precision spinner ring */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-0 rounded-full border border-transparent border-t-[#ef9a57] animate-spin" />
          <div className="absolute inset-1.5 rounded-full border border-transparent border-b-white/20 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
        </div>

        {/* Loading label */}
        <span className="font-mono text-[9px] tracking-[0.26em] text-white/25 uppercase">
          {label}
        </span>
      </div>

      {/* Corner telemetry marks */}
      <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-white/10" />
      <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-white/10" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-white/10" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-white/10" />
    </div>
  );
}
