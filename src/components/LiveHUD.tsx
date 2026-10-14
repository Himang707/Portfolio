"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Cpu, Activity, Clock, ShieldCheck } from "lucide-react";

export default function LiveHUD() {
  const [timeStr, setTimeStr] = useState<string>("");
  const [fps, setFps] = useState<number>(60);

  useEffect(() => {
    // Live ticking local clock
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTimeStr(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Frame rate estimation
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureFps = () => {
      frameCount++;
      const current = performance.now();
      if (current - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (current - lastTime))));
        frameCount = 0;
        lastTime = current;
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="w-full border-y border-[#D4AF37]/30 bg-[#080705]/92 backdrop-blur-2xl py-2.5 px-4 md:px-8 text-xs font-mono text-[#C5BCAB] select-none transition-colors shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-6">
        {/* System Status */}
        <div className="flex items-center space-x-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5B842] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5D77F]" />
          </span>
          <span className="text-[#D4CEBF] tracking-wider text-[11px] font-semibold">
            SYSTEM STATUS:
          </span>
          <span className="text-[#F5D77F] font-bold text-[11px] tracking-wide">
            ONLINE
          </span>
        </div>

        {/* Build Status */}
        <div className="hidden sm:flex items-center space-x-2 text-[11px]">
          <Cpu className="w-3.5 h-3.5 text-[#F5D77F]" />
          <span className="text-[#9E9482]">BUILD:</span>
          <span className="text-[#ffffff] font-medium">READY // REV 2026.04</span>
        </div>

        {/* Current Mode */}
        <div className="hidden md:flex items-center space-x-2 text-[11px]">
          <Activity className="w-3.5 h-3.5 text-[#F5D77F]" />
          <span className="text-[#9E9482]">MODE:</span>
          <span className="text-[#FBE7A1] font-medium tracking-wide">CREATIVE / BUILD</span>
        </div>

        {/* Telemetry FPS & Latency */}
        <div className="hidden lg:flex items-center space-x-3 text-[11px] text-[#9E9482]">
          <span>PING: <strong className="text-[#F5D77F]">8ms</strong></span>
          <span>•</span>
          <span>FPS: <strong className="text-[#F5D77F]">{fps}</strong></span>
        </div>

        {/* Local Live Clock */}
        <div className="flex items-center space-x-2 ml-auto sm:ml-0 text-[11px]">
          <Clock className="w-3.5 h-3.5 text-[#F5D77F]" />
          <span className="text-[#9E9482]">LOCAL TIME:</span>
          <span className="text-[#ffffff] font-bold tracking-widest font-mono min-w-[64px]">
            {timeStr || "12:00:00"}
          </span>
        </div>
      </div>
    </div>
  );
}
