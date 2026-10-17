"use client";

import React, { useEffect, useState } from "react";

interface LeafItem {
  id: number;
  type: "beech" | "ginkgo" | "willow" | "twin" | "oak";
  color: string;
  size: number;
  startX: number; // 0 to 100%
  startY: number; // 0 to 100%
  rot: number;
  duration: number; // seconds
  delay: number; // seconds
  swayDist: number; // px
}

const LEAF_DATA: LeafItem[] = [
  { id: 1, type: "beech", color: "#355E3B", size: 28, startX: 8, startY: 12, rot: -22, duration: 16, delay: 0, swayDist: 18 },
  { id: 2, type: "willow", color: "#A3B18A", size: 24, startX: 88, startY: 18, rot: 34, duration: 18, delay: 1.2, swayDist: 22 },
  { id: 3, type: "ginkgo", color: "#9C7655", size: 26, startX: 20, startY: 78, rot: 15, duration: 20, delay: 2.5, swayDist: 15 },
  { id: 4, type: "twin", color: "#355E3B", size: 22, startX: 82, startY: 72, rot: -18, duration: 15, delay: 0.8, swayDist: 20 },
  { id: 5, type: "oak", color: "#A3B18A", size: 30, startX: 4, startY: 48, rot: 42, duration: 22, delay: 3.1, swayDist: 24 },
  { id: 6, type: "beech", color: "#9C7655", size: 22, startX: 94, startY: 44, rot: -30, duration: 17, delay: 1.9, swayDist: 16 },
  { id: 7, type: "willow", color: "#355E3B", size: 26, startX: 34, startY: 8, rot: 12, duration: 19, delay: 2.2, swayDist: 25 },
  { id: 8, type: "twin", color: "#A3B18A", size: 20, startX: 68, startY: 14, rot: -25, duration: 14, delay: 0.4, swayDist: 18 },
  { id: 9, type: "ginkgo", color: "#355E3B", size: 24, startX: 14, startY: 92, rot: -8, duration: 21, delay: 3.6, swayDist: 14 },
  { id: 10, type: "oak", color: "#9C7655", size: 28, startX: 78, startY: 88, rot: 28, duration: 18, delay: 1.5, swayDist: 22 },
  { id: 11, type: "beech", color: "#A3B18A", size: 20, startX: 48, startY: 94, rot: 5, duration: 16, delay: 2.8, swayDist: 16 },
  { id: 12, type: "willow", color: "#52796F", size: 22, startX: 92, startY: 6, rot: -40, duration: 23, delay: 0.6, swayDist: 20 },
];

function LeafShape({ type, color }: { type: LeafItem["type"]; color: string }) {
  switch (type) {
    case "ginkgo":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-[0_2px_4px_rgba(37,40,33,0.08)]">
          <path
            d="M 20 38 Q 20 28 20 22 C 14 16, 6 18, 4 10 C 2 4, 12 2, 20 6 C 28 2, 38 4, 36 10 C 34 18, 26 16, 20 22 Z"
            fill={color}
            opacity="0.85"
          />
          <path d="M 20 22 L 20 38" stroke="#252821" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
          <path d="M 20 22 Q 15 14 10 9" stroke="#252821" strokeWidth="0.8" opacity="0.25" fill="none" />
          <path d="M 20 22 Q 25 14 30 9" stroke="#252821" strokeWidth="0.8" opacity="0.25" fill="none" />
        </svg>
      );
    case "willow":
      return (
        <svg viewBox="0 0 30 40" className="w-full h-full drop-shadow-[0_2px_4px_rgba(37,40,33,0.08)]">
          <path
            d="M 15 3 C 25 14, 23 28, 15 37 C 7 28, 5 14, 15 3 Z"
            fill={color}
            opacity="0.85"
          />
          <path d="M 15 3 L 15 37" stroke="#252821" strokeWidth="1" opacity="0.35" strokeLinecap="round" />
          <path d="M 15 15 Q 20 18 22 20" stroke="#252821" strokeWidth="0.7" opacity="0.25" fill="none" />
          <path d="M 15 22 Q 9 25 8 28" stroke="#252821" strokeWidth="0.7" opacity="0.25" fill="none" />
        </svg>
      );
    case "twin":
      return (
        <svg viewBox="0 0 40 30" className="w-full h-full drop-shadow-[0_2px_4px_rgba(37,40,33,0.08)]">
          {/* Stem */}
          <path d="M 20 28 Q 20 20 20 16" stroke="#9C7655" strokeWidth="1.6" strokeLinecap="round" />
          {/* Left Leaf */}
          <path
            d="M 20 16 C 14 14, 6 12, 4 7 C 6 2, 16 6, 20 16 Z"
            fill={color}
            opacity="0.85"
          />
          {/* Right Leaf */}
          <path
            d="M 20 16 C 26 14, 34 12, 36 7 C 34 2, 24 6, 20 16 Z"
            fill={color}
            opacity="0.9"
          />
        </svg>
      );
    case "oak":
      return (
        <svg viewBox="0 0 34 46" className="w-full h-full drop-shadow-[0_2px_4px_rgba(37,40,33,0.08)]">
          <path
            d="M 17 2 C 20 6, 26 6, 25 11 C 24 13, 29 16, 28 22 C 26 24, 30 28, 27 34 C 23 37, 21 38, 17 44 C 13 38, 11 37, 7 34 C 4 28, 8 24, 6 22 C 5 16, 10 13, 9 11 C 8 6, 14 6, 17 2 Z"
            fill={color}
            opacity="0.85"
          />
          <path d="M 17 2 L 17 44" stroke="#252821" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
          <path d="M 17 14 Q 22 17 25 19" stroke="#252821" strokeWidth="0.8" opacity="0.2" fill="none" />
          <path d="M 17 22 Q 12 25 9 27" stroke="#252821" strokeWidth="0.8" opacity="0.2" fill="none" />
          <path d="M 17 30 Q 22 33 24 35" stroke="#252821" strokeWidth="0.8" opacity="0.2" fill="none" />
        </svg>
      );
    case "beech":
    default:
      return (
        <svg viewBox="0 0 32 40" className="w-full h-full drop-shadow-[0_2px_4px_rgba(37,40,33,0.08)]">
          <path
            d="M 16 3 C 26 12, 28 26, 16 37 C 4 26, 6 12, 16 3 Z"
            fill={color}
            opacity="0.85"
          />
          {/* Veins */}
          <path d="M 16 4 L 16 37" stroke="#252821" strokeWidth="1" opacity="0.35" strokeLinecap="round" />
          <path d="M 16 13 Q 22 16 24 19" stroke="#252821" strokeWidth="0.7" opacity="0.2" fill="none" />
          <path d="M 16 18 Q 10 21 8 24" stroke="#252821" strokeWidth="0.7" opacity="0.2" fill="none" />
          <path d="M 16 25 Q 21 28 23 31" stroke="#252821" strokeWidth="0.7" opacity="0.2" fill="none" />
        </svg>
      );
  }
}

export default function FloatingLeaves() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const normY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      setMouseOffset({ x: normX * 12, y: normY * 10 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* ── Soft Sunlight & Dappled Canopy Lighting ── */}
      {/* Upper-left warm morning sun beam */}
      <div
        className="absolute -top-32 -left-32 w-[38rem] h-[38rem] rounded-full blur-[90px] pointer-events-none animate-sunbeam-pulse"
        style={{
          background: "radial-gradient(circle, rgba(233, 196, 106, 0.28) 0%, rgba(245, 241, 232, 0.05) 70%, transparent 100%)",
        }}
      />
      {/* Upper-right soft forest sage ambiance */}
      <div
        className="absolute -top-24 -right-24 w-[34rem] h-[34rem] rounded-full blur-[80px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(163, 177, 138, 0.22) 0%, rgba(245, 241, 232, 0) 70%)",
        }}
      />
      {/* Lower warm soil & earth glow */}
      <div
        className="absolute -bottom-36 left-1/3 w-[42rem] h-[28rem] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(156, 118, 85, 0.16) 0%, transparent 70%)",
        }}
      />

      {/* ── Organic Paper Grain Texture Overlay ── */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.038] mix-blend-multiply pointer-events-none">
        <filter id="natural-paper-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#natural-paper-grain)" />
      </svg>

      {/* ── Floating Leaves System ── */}
      {LEAF_DATA.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute transition-transform duration-700 ease-out animate-leaf-drift"
          style={{
            left: `${leaf.startX}%`,
            top: `${leaf.startY}%`,
            width: `${leaf.size}px`,
            height: `${leaf.size * 1.25}px`,
            transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0) rotate(${leaf.rot}deg)`,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
            willChange: "transform",
          }}
        >
          <LeafShape type={leaf.type} color={leaf.color} />
        </div>
      ))}
    </div>
  );
}
