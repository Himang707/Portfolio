"use client";

import React from "react";

interface FlowConnectorProps {
  fromNum?: string;
  toNum?: string;
  fromLabel?: string;
  toLabel?: string;
}

export default function FlowConnector({
  fromNum,
  toNum,
  fromLabel,
  toLabel,
}: FlowConnectorProps) {
  return (
    <div
      className="relative w-full max-w-5xl mx-auto px-6 sm:px-10 py-14 sm:py-16 flex items-center justify-center select-none"
      aria-hidden="true"
    >
      {/* Luminous sage gradient hairline */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(148,222,192,0.14)] to-transparent" />

      {/* Floating weightless microgravity beacon node */}
      <div className="absolute flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#0c1411]/85 border border-[rgba(148,222,192,0.15)] backdrop-blur-xl shadow-[0_0_16px_rgba(110,182,148,0.1)] drift-microgravity-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#94DEC0] pulse-dot shadow-[0_0_8px_rgba(148,222,192,0.6)]" />
        {fromNum && toNum ? (
          <span className="text-[10px] font-mono-code font-semibold tracking-[0.2em] text-[#94DEC0]/85 uppercase">
            {fromNum} · {fromLabel || "NODE"} → {toNum} · {toLabel || "STATION"}
          </span>
        ) : (
          <span className="text-[10px] font-mono-code tracking-[0.2em] text-[#A39E93]/70">
            FLOAT
          </span>
        )}
      </div>
    </div>
  );
}
