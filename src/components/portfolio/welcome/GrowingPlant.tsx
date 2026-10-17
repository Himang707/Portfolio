"use client";

import React from "react";

interface GrowingPlantProps {
  progress: number; // 0 to 100
  isReady: boolean;
  stageName?: string;
}

export default function GrowingPlant({ progress, isReady, stageName }: GrowingPlantProps) {
  // Clamped progress between 0 and 100
  const p = Math.max(0, Math.min(100, progress));

  // Stem height grows from 0px to 65px as progress goes from 10% to 90%
  const stemProgress = Math.max(0, Math.min(1, (p - 10) / 75));
  // Stem tip Y coordinate starts at 92 (ground level) and moves up to 26 (peak)
  const stemTipY = 92 - stemProgress * 66;

  // Leaf appearance thresholds
  const showLeaf1 = p >= 22; // Lower Left Cotyledon
  const showLeaf2 = p >= 44; // Lower Right Cotyledon
  const showLeaf3 = p >= 68; // Upper Left Broad Leaf
  const showLeaf4 = p >= 86; // Upper Right Broad Leaf
  const showBloom = p >= 98; // Top Blossom

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm select-none">
      {/* ── Botanical Growth Canvas ── */}
      <div className="relative w-48 h-36 flex items-center justify-center overflow-visible">
        {/* Soft warmth glow beneath plant */}
        <div
          className="absolute inset-x-8 bottom-4 h-16 rounded-full blur-xl pointer-events-none transition-opacity duration-700"
          style={{
            background: isReady
              ? "radial-gradient(ellipse, rgba(163, 177, 138, 0.45) 0%, transparent 70%)"
              : "radial-gradient(ellipse, rgba(233, 196, 106, 0.25) 0%, transparent 70%)",
          }}
        />

        <svg
          viewBox="0 0 160 120"
          className={`w-44 h-32 overflow-visible drop-shadow-[0_2px_4px_rgba(37,40,33,0.08)] ${
            isReady ? "animate-plant-sway" : ""
          }`}
          style={{ transformOrigin: "80px 92px" }}
        >
          {/* ── Ground Soil Mound ── */}
          <path
            d="M 24 96 Q 80 84 136 96 C 144 98, 140 106, 130 106 Q 80 108 30 106 C 20 106, 16 98, 24 96 Z"
            fill="#9C7655"
            stroke="#252821"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Soil organic texture pebbles and moss dots */}
          <circle cx="48" cy="98" r="1.6" fill="#6F4E37" />
          <circle cx="62" cy="101" r="2.2" fill="#252821" opacity="0.4" />
          <circle cx="98" cy="100" r="1.8" fill="#6F4E37" />
          <circle cx="114" cy="98" r="2" fill="#252821" opacity="0.3" />
          <ellipse cx="72" cy="95" rx="3.5" ry="1.2" fill="#355E3B" opacity="0.75" />
          <ellipse cx="88" cy="94" rx="4" ry="1.4" fill="#355E3B" opacity="0.8" />

          {/* ── Seed Stage (0% to 20%) ── */}
          {p < 30 && (
            <g
              className="transition-all duration-300"
              style={{
                opacity: Math.max(0, 1 - p / 30),
                transform: `scale(${Math.max(0.6, 1 - p / 100)})`,
                transformOrigin: "80px 90px",
              }}
            >
              <ellipse
                cx="80"
                cy="90"
                rx="6"
                ry="4.2"
                fill="#9C7655"
                stroke="#252821"
                strokeWidth="2"
                transform="rotate(-10 80 90)"
              />
              <path
                d="M 76 89 Q 80 91 84 89"
                stroke="#252821"
                strokeWidth="1.2"
                fill="none"
              />
              {p >= 10 && (
                <path
                  d="M 80 87 Q 80 83 82 80"
                  stroke="#355E3B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              )}
            </g>
          )}

          {/* ── Growing Stem (10% to 100%) ── */}
          {p >= 10 && (
            <path
              d={`M 80 92 Q ${80 - stemProgress * 4} ${
                92 - stemProgress * 32
              } 80 ${stemTipY}`}
              fill="none"
              stroke="#355E3B"
              strokeWidth="3.4"
              strokeLinecap="round"
              className="transition-all duration-200 ease-out"
            />
          )}

          {/* ── Leaf 1: Lower Left Baby Cotyledon (22%+) ── */}
          {showLeaf1 && (
            <g
              className="animate-leaf-pop"
              style={{
                transformOrigin: "78px 74px",
                opacity: Math.min(1, (p - 20) / 10),
              }}
            >
              <path
                d="M 78 74 C 68 72, 56 68, 54 62 C 58 58, 70 64, 78 74 Z"
                fill="#A3B18A"
                stroke="#252821"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d="M 78 74 Q 66 69 60 65" stroke="#355E3B" strokeWidth="1" fill="none" opacity="0.6" />
            </g>
          )}

          {/* ── Leaf 2: Lower Right Baby Cotyledon (44%+) ── */}
          {showLeaf2 && (
            <g
              className="animate-leaf-pop"
              style={{
                transformOrigin: "82px 70px",
                opacity: Math.min(1, (p - 40) / 10),
              }}
            >
              <path
                d="M 82 70 C 92 68, 104 64, 106 58 C 102 54, 90 60, 82 70 Z"
                fill="#355E3B"
                stroke="#252821"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d="M 82 70 Q 94 65 100 61" stroke="#A3B18A" strokeWidth="1" fill="none" opacity="0.75" />
            </g>
          )}

          {/* ── Leaf 3: Upper Left Broad Foliage Leaf (68%+) ── */}
          {showLeaf3 && (
            <g
              className="animate-leaf-pop"
              style={{
                transformOrigin: "79px 50px",
                opacity: Math.min(1, (p - 65) / 10),
              }}
            >
              <path
                d="M 79 50 C 64 46, 48 38, 44 28 C 50 24, 68 34, 79 50 Z"
                fill="#355E3B"
                stroke="#252821"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <path d="M 79 50 Q 60 38 52 32" stroke="#A3B18A" strokeWidth="1.2" fill="none" />
              <path d="M 68 43 Q 62 46 60 48" stroke="#A3B18A" strokeWidth="0.8" fill="none" opacity="0.7" />
              <path d="M 62 38 Q 66 35 68 33" stroke="#A3B18A" strokeWidth="0.8" fill="none" opacity="0.7" />
            </g>
          )}

          {/* ── Leaf 4: Upper Right Broad Foliage Leaf (86%+) ── */}
          {showLeaf4 && (
            <g
              className="animate-leaf-pop"
              style={{
                transformOrigin: "81px 44px",
                opacity: Math.min(1, (p - 82) / 10),
              }}
            >
              <path
                d="M 81 44 C 96 40, 112 32, 116 22 C 110 18, 92 28, 81 44 Z"
                fill="#A3B18A"
                stroke="#252821"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <path d="M 81 44 Q 100 32 108 26" stroke="#355E3B" strokeWidth="1.2" fill="none" />
              <path d="M 92 37 Q 98 40 100 42" stroke="#355E3B" strokeWidth="0.8" fill="none" opacity="0.7" />
              <path d="M 98 32 Q 94 29 92 27" stroke="#355E3B" strokeWidth="0.8" fill="none" opacity="0.7" />
            </g>
          )}

          {/* ── Golden Crown Blossom (98% to 100%) ── */}
          {showBloom && (
            <g
              className="animate-flower-bloom"
              style={{
                transformOrigin: `80px ${stemTipY}px`,
              }}
            >
              {/* Petal 1 - Top */}
              <circle cx="80" cy={stemTipY - 7} r="4.2" fill="#E9C46A" stroke="#252821" strokeWidth="1.6" />
              {/* Petal 2 - Top Right */}
              <circle cx="86" cy={stemTipY - 3} r="4.2" fill="#E9C46A" stroke="#252821" strokeWidth="1.6" />
              {/* Petal 3 - Bottom Right */}
              <circle cx="84" cy={stemTipY + 3} r="4.2" fill="#E9C46A" stroke="#252821" strokeWidth="1.6" />
              {/* Petal 4 - Bottom Left */}
              <circle cx="76" cy={stemTipY + 3} r="4.2" fill="#E9C46A" stroke="#252821" strokeWidth="1.6" />
              {/* Petal 5 - Top Left */}
              <circle cx="74" cy={stemTipY - 3} r="4.2" fill="#E9C46A" stroke="#252821" strokeWidth="1.6" />
              {/* Flower Heart Center */}
              <circle cx="80" cy={stemTipY} r="3.2" fill="#FAF6EE" stroke="#252821" strokeWidth="1.8" />
              {/* Little Pollen Sparkles */}
              <circle cx="89" cy={stemTipY - 8} r="1" fill="#E9C46A" className="animate-ping" />
              <circle cx="71" cy={stemTipY - 6} r="0.8" fill="#E9C46A" className="animate-pulse" />
            </g>
          )}
        </svg>
      </div>

      {/* ── Honest Progress Bar & Status Pill ── */}
      <div className="w-full flex flex-col items-center mt-2 space-y-2">
        {/* Organic Progress Track */}
        <div className="w-56 sm:w-64 h-3 bg-[#EAE4D7] border-2 border-[#252821] rounded-full p-0.5 overflow-hidden shadow-[2px_2px_0px_#252821]">
          <div
            className="h-full bg-gradient-to-r from-[#A3B18A] via-[#52796F] to-[#355E3B] rounded-full transition-all duration-300 ease-out flex items-center justify-end pr-1"
            style={{ width: `${p}%` }}
          >
            {p > 15 && <span className="w-1.5 h-1.5 rounded-full bg-[#FAF6EE] opacity-80" />}
          </div>
        </div>

        {/* Honest Percentage Indicator */}
        <div className="flex items-center gap-2 font-space text-xs">
          <span className="font-extrabold text-[#355E3B] bg-[#EAE4D7] px-2.5 py-0.5 rounded-full border border-[#252821]/30 shadow-[1px_1px_0px_#252821]">
            {Math.round(p)}%
          </span>
          {stageName && (
            <span className="text-[#9C7655] font-semibold text-[11px] tracking-wide">
              {stageName}
            </span>
          )}
        </div>

        {/* Subtle Required Caption */}
        <p className="font-space font-medium text-xs sm:text-sm text-[#252821]/70 tracking-wide mt-1">
          Growing your experience...
        </p>
      </div>
    </div>
  );
}
