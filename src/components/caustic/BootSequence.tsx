"use client";

import React, { useEffect, useState } from "react";

export default function BootSequence() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [statusLog, setStatusLog] = useState("INIT // OPTICAL_SYS");

  useEffect(() => {
    const logs = [
      { at: 15, text: "CALIBRATING REFRACTIVE INDEX // N=1.517" },
      { at: 40, text: "COMPILING GLSL CAUSTIC KERNELS" },
      { at: 65, text: "MOUNTING HIMANG VECTOR GRAPH" },
      { at: 85, text: "ASSEMBLING FRACTURED SPECIMENS" },
      { at: 100, text: "TELEMETRY 100% // SYSTEM ARMED" },
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setStatusLog("TELEMETRY 100% // SYSTEM ARMED");
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
        }, 350);
      } else {
        setProgress(current);
        const match = logs.find((l) => current >= l.at);
        if (match) setStatusLog(match.text);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  if (isDone) return null;

  return (
    <div
      id="boot"
      className="fixed inset-0 z-[200] bg-[#050609] flex flex-col justify-between p-6 sm:p-10 pointer-events-none transition-opacity duration-500 font-mono"
      style={{ opacity: progress === 100 ? 0 : 1 }}
    >
      {/* Top Loading Progress Bar */}
      <div className="w-full h-0.5 bg-white/10 relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#ef9a57] to-[#ffffff] transition-all duration-75 ease-out shadow-[0_0_12px_#ef9a57]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Center Precision Telemetry Monogram */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 relative flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 animate-pulse">
            <rect
              x="2.6"
              y="2.6"
              width="18.8"
              height="18.8"
              rx="6"
              stroke="rgba(242,244,247,.7)"
              strokeWidth="2"
            />
            <path
              d="M4 8.2 L11.6 11.2 L20 16.4"
              stroke="#ef9a57"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="text-center space-y-1">
          <span className="text-xs text-white/50 tracking-precision block">
            HIMANG // PRECISION ARCHITECTURE
          </span>
          <span className="text-sm font-bold text-[#f2f4f7] tracking-wider block">
            {statusLog}
          </span>
        </div>
      </div>

      {/* Bottom Counter Bar */}
      <div className="flex items-center justify-between text-[10px] text-white/40 tracking-precision border-t border-white/10 pt-4">
        <span>LOC: DUNGARPUR, RAJASTHAN // UTC+5:30</span>
        <span className="text-[#ef9a57] font-bold tabular-nums">
          BOOT: {String(progress).padStart(3, "0")}%
        </span>
      </div>
    </div>
  );
}
