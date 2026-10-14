"use client";

import React, { useRef, useState, useEffect } from "react";
import { hackathons, HackathonEntry } from "@/data/hackathons";
import { Award, Trophy, Rocket, ChevronRight, ChevronLeft } from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";

export default function SectionFieldNotes() {
  const railRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { playClick } = usePortfolio();

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!railRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - railRef.current.offsetLeft);
    setScrollLeft(railRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !railRef.current) return;
    e.preventDefault();
    const x = e.pageX - railRef.current.offsetLeft;
    const walk = (x - startX) * 1.6;
    railRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollBy = (amount: number) => {
    playClick();
    if (railRef.current) {
      railRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  // Enhancement 2: Keyboard navigation for horizontal rail
  const handleRailKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollBy(380);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollBy(-380);
    }
  };

  return (
    <section
      id="field-notes"
      className="relative py-28 px-6 sm:px-12 bg-[#050609] border-t border-white/5 overflow-hidden"
      role="region"
      aria-label="Hackathon field notes and sprint logs"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 font-mono text-[10px] tracking-precision text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef9a57]" />
            <span>SECTION 10 // FIELD NOTES & HACKATHON SPRINTS</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => scrollBy(-380)}
              className="p-2 rounded-full border border-white/10 hover:border-[#ef9a57] text-white/60 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57]"
              data-cursor="OPEN"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollBy(380)}
              className="p-2 rounded-full border border-white/10 hover:border-[#ef9a57] text-white/60 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57]"
              data-cursor="OPEN"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2 max-w-2xl">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#f2f4f7] uppercase leading-[1.05]">
            Field Notes.
            <span className="block text-white/40 font-light text-2xl sm:text-4xl">
              Sprint logs under extreme constraints.
            </span>
          </h2>
          <p className="text-sm text-white/60 font-sans">
            Drag horizontally across the rail. Each card houses fractured glass shard clusters that respond to momentum.
          </p>
        </div>

        {/* Draggable Horizontal Rail (.notes-rail) */}
        <div
          ref={railRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onKeyDown={handleRailKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Hackathon cards — use arrow keys or drag to scroll"
          className={`notes-rail flex space-x-6 overflow-x-auto pb-8 pt-2 select-none cursor-${
            isDragging ? "grabbing" : "grab"
          } no-scrollbar focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57] rounded-xl`}
        >
          {hackathons.map((hack, idx) => (
            <FieldCard key={hack.id} hack={hack} index={idx} />
          ))}

          {/* Additional Specimen Field Log */}
          <div className="min-w-[340px] sm:min-w-[400px] p-8 rounded-2xl bg-[#080a0f] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between flex-shrink-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[9px] text-white/40 tracking-precision border-b border-white/5 pb-2">
                <span>LOG // EXP-04</span>
                <span className="text-[#ef9a57]">OPEN SOURCE</span>
              </div>
              <h3 className="font-mono text-xl font-bold text-[#f2f4f7]">
                MICRO-UX & ERGONOMICS
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                Continuous iteration on tactile web interfaces. Exploring how subtle spring physics, procedural shaders, and zero layout shift transform developer ergonomics.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-white/40">
              STATUS: ONGOING RESEARCH // 2026
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldCard({
  hack,
  index,
}: {
  hack: HackathonEntry;
  index: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mini canvas rendering reactive optical shard cluster (.tshards)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      t += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw 3 optical glass shard polygons reacting to wave
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      for (let i = 0; i < 3; i++) {
        ctx.save();
        const rot = Math.sin(t + i * 1.5) * 0.15 + (i * Math.PI) / 1.5;
        ctx.rotate(rot);

        ctx.fillStyle = "rgba(18, 24, 34, 0.75)";
        ctx.strokeStyle = i === 1 ? "#ef9a57" : "rgba(220, 230, 240, 0.7)";
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        ctx.moveTo(-18, -12);
        ctx.lineTo(22, -6);
        ctx.lineTo(12, 18);
        ctx.lineTo(-14, 16);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      }

      ctx.restore();
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-w-[340px] sm:min-w-[420px] p-8 rounded-2xl bg-[#080a0f] border border-white/10 hover:border-[#ef9a57]/50 shadow-[inset_0_1px_0_0_rgba(220,230,240,0.65),0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between flex-shrink-0 transition-colors group">
      <div>
        {/* Card Header Telemetry */}
        <div className="flex items-center justify-between font-mono text-[9px] text-white/40 tracking-precision border-b border-white/5 pb-3 mb-4">
          <span>EVENT SPRINT // #{String(index + 1).padStart(2, "0")}</span>
          <span className="text-[#ef9a57] font-bold">{hack.year}</span>
        </div>

        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="font-mono text-lg font-bold text-[#f2f4f7] group-hover:text-[#ef9a57] transition-colors">
              {hack.event}
            </h3>
            <span className="font-mono text-xs text-[#ef9a57] font-semibold block pt-0.5">
              {hack.role}
            </span>
          </div>

          {/* 3D Shard Cluster Canvas (.tshards) */}
          <div className="tshards w-16 h-16 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden flex-shrink-0">
            <canvas ref={canvasRef} width={64} height={64} className="w-full h-full" />
          </div>
        </div>

        <p className="text-xs text-white/60 leading-relaxed font-sans mb-4">
          {hack.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-1.5 font-mono text-[10px] text-white/50 border-t border-white/5 pt-3">
          {hack.highlights.map((h, i) => (
            <li key={i} className="flex items-baseline space-x-2">
              <span className="text-[#ef9a57]">›</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Award & Tag Footer */}
      <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px]">
        <span className="text-[#f2f4f7] font-bold flex items-center space-x-1.5">
          <Trophy className="w-3.5 h-3.5 text-[#ef9a57]" />
          <span>{hack.award || "COMPLETED"}</span>
        </span>
        <span className="text-white/40 tracking-wider">
          STATUS: {hack.status}
        </span>
      </div>
    </div>
  );
}
