"use client";

import React, { useRef, useEffect, useState } from "react";
import { ZoomIn, Search, Maximize2 } from "lucide-react";

export default function SectionLoupe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const coordRef = useRef<HTMLDivElement>(null);
  const loupePos = useRef({ x: 280, y: 180 });
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    // Draw high-density architectural schematic on an offscreen canvas
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");

    const renderSchematic = () => {
      offscreen.width = width;
      offscreen.height = height;
      if (!offCtx) return;

      offCtx.fillStyle = "#07090e";
      offCtx.fillRect(0, 0, width, height);

      // Technical grid lines
      offCtx.strokeStyle = "rgba(242, 244, 247, 0.06)";
      offCtx.lineWidth = 1;
      for (let x = 0; x < width; x += 32) {
        offCtx.beginPath();
        offCtx.moveTo(x, 0);
        offCtx.lineTo(x, height);
        offCtx.stroke();
      }
      for (let y = 0; y < height; y += 32) {
        offCtx.beginPath();
        offCtx.moveTo(0, y);
        offCtx.lineTo(width, y);
        offCtx.stroke();
      }

      // Schematic Nodes: Relay Vector Pipeline
      offCtx.strokeStyle = "rgba(239, 154, 87, 0.4)";
      offCtx.lineWidth = 1.5;
      offCtx.strokeRect(40, 50, 220, 110);
      offCtx.fillStyle = "rgba(239, 154, 87, 0.05)";
      offCtx.fillRect(40, 50, 220, 110);

      offCtx.fillStyle = "#ef9a57";
      offCtx.font = "bold 11px monospace";
      offCtx.fillText("RELAY // VECTOR_INGEST_PIPELINE", 55, 75);
      offCtx.fillStyle = "#f2f4f7";
      offCtx.font = "10px monospace";
      offCtx.fillText("• Chunker: 512-Token Overlap", 55, 95);
      offCtx.fillText("• Embedding Model: 1536-Dim Float32", 55, 115);
      offCtx.fillText("• Index: HNSW Cosine Similarity (<120ms)", 55, 135);

      // Pipeline arrow
      offCtx.strokeStyle = "rgba(242, 244, 247, 0.3)";
      offCtx.beginPath();
      offCtx.moveTo(260, 105);
      offCtx.lineTo(330, 105);
      offCtx.stroke();

      // Node: Udayaan Spatial WebGL Engine
      offCtx.strokeStyle = "rgba(220, 230, 240, 0.4)";
      offCtx.strokeRect(330, 50, 240, 110);
      offCtx.fillStyle = "rgba(220, 230, 240, 0.05)";
      offCtx.fillRect(330, 50, 240, 110);

      offCtx.fillStyle = "#dce6f0";
      offCtx.font = "bold 11px monospace";
      offCtx.fillText("UDAYAAN // SPATIAL_GLSL_MATRIX", 345, 75);
      offCtx.fillStyle = "#f2f4f7";
      offCtx.font = "10px monospace";
      offCtx.fillText("• Signed Distance Fields (SDF)", 345, 95);
      offCtx.fillText("• Raymarching Step: 64 Iterations", 345, 115);
      offCtx.fillText("• Frame Budget: 16.6ms // 60 FPS", 345, 135);

      // Pipeline arrow down
      offCtx.beginPath();
      offCtx.moveTo(450, 160);
      offCtx.lineTo(450, 210);
      offCtx.stroke();

      // Node: Globetrotter Geospatial Index
      offCtx.strokeStyle = "rgba(239, 154, 87, 0.4)";
      offCtx.strokeRect(260, 210, 310, 110);
      offCtx.fillStyle = "rgba(239, 154, 87, 0.05)";
      offCtx.fillRect(260, 210, 310, 110);

      offCtx.fillStyle = "#ef9a57";
      offCtx.font = "bold 11px monospace";
      offCtx.fillText("GLOBETROTTER // POSTGIS_ROUTING_GRAPH", 275, 235);
      offCtx.fillStyle = "#f2f4f7";
      offCtx.font = "10px monospace";
      offCtx.fillText("• Geospatial Spatial Index: ST_DWithin", 275, 255);
      offCtx.fillText("• Graph Optimization: Multi-point Dijkstra", 275, 275);
      offCtx.fillText("• Sync Engine: Conflict-Free Replicated State", 275, 295);

      // Technical annotations & callouts
      offCtx.fillStyle = "rgba(242, 244, 247, 0.25)";
      offCtx.font = "9px monospace";
      offCtx.fillText("SEC_KEY: 0x9F_HIMANG_ARCH", 45, 280);
      offCtx.fillText("TELEMETRY: VERIFIED_NOMINAL", 45, 295);
      offCtx.fillText("STATUS: PRODUCTION_STABLE", 45, 310);
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = Math.max(380, rect.height);
      canvas.width = width;
      canvas.height = height;
      renderSchematic();
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Render loop with Loupe Magnification + Rim Bend + RGB Chromatic Fringing
    const render = () => {
      if (!isVisibleRef.current) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw base schematic plate
      ctx.drawImage(offscreen, 0, 0);

      // 2. Loupe lens parameters
      const radius = 88;
      const zoom = 1.95;
      const lx = loupePos.current.x;
      const ly = loupePos.current.y;

      // Draw magnified circular loupe
      ctx.save();
      ctx.beginPath();
      ctx.arc(lx, ly, radius, 0, Math.PI * 2);
      ctx.clip();

      // Magnified source sampling
      const sWidth = (radius * 2) / zoom;
      const sHeight = (radius * 2) / zoom;
      const sx = lx - sWidth / 2;
      const sy = ly - sHeight / 2;

      // Background under glass
      ctx.fillStyle = "#0c0f16";
      ctx.fillRect(lx - radius, ly - radius, radius * 2, radius * 2);

      // Chromatic aberration (RGB splitting / fringing)
      // Blue channel offset
      ctx.globalAlpha = 0.85;
      ctx.drawImage(offscreen, sx - 2, sy, sWidth, sHeight, lx - radius, ly - radius, radius * 2, radius * 2);

      // Red/Amber channel offset
      ctx.globalCompositeOperation = "screen";
      ctx.drawImage(offscreen, sx + 2, sy, sWidth, sHeight, lx - radius, ly - radius, radius * 2, radius * 2);

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1.0;

      // Subtle lens glass sheen
      const sheenGrad = ctx.createLinearGradient(lx - radius, ly - radius, lx + radius, ly + radius);
      sheenGrad.addColorStop(0, "rgba(255, 255, 255, 0.12)");
      sheenGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.0)");
      sheenGrad.addColorStop(1, "rgba(239, 154, 87, 0.1)");
      ctx.fillStyle = sheenGrad;
      ctx.fillRect(lx - radius, ly - radius, radius * 2, radius * 2);

      ctx.restore();

      // Loupe Precision Rim Bend & Bevel Ring
      ctx.beginPath();
      ctx.arc(lx, ly, radius, 0, Math.PI * 2);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(220, 230, 240, 0.86)";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(lx, ly, radius + 2, 0, Math.PI * 2);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#ef9a57";
      ctx.stroke();

      // Reticle crosshairs
      ctx.strokeStyle = "rgba(239, 154, 87, 0.45)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(lx - 12, ly);
      ctx.lineTo(lx + 12, ly);
      ctx.moveTo(lx, ly - 12);
      ctx.lineTo(lx, ly + 12);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    // IntersectionObserver to pause when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    isVisibleRef.current = true;
    animId = requestAnimationFrame(render);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = Math.max(90, Math.min(width - 90, e.clientX - rect.left));
      const y = Math.max(90, Math.min(height - 90, e.clientY - rect.top));
      loupePos.current = { x, y };
      if (coordRef.current) {
        coordRef.current.textContent = `COORD: [${Math.round(x)}, ${Math.round(y)}]`;
      }
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="loupe"
      className="relative py-28 px-6 sm:px-12 bg-[#050609] border-t border-white/5"
      role="region"
      aria-label="Interactive magnification tool — Loupe blueprint viewer"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 font-mono text-[10px] tracking-precision text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef9a57]" />
            <span>SECTION 03 // REAL-TIME MAGNIFICATION TOOL: LOUPE</span>
          </div>

          <div className="flex items-center space-x-2 font-mono text-[10px] text-white/40 tracking-wider">
            <ZoomIn className="w-3.5 h-3.5 text-[#ef9a57]" />
            <span>DRAG OVER BLUEPRINT // OPTICAL DISPERSION ACTIVE</span>
          </div>
        </div>

        {/* Loupe Stage Container */}
        <div
          ref={containerRef}
          id="loupeStage"
          className="relative w-full h-[380px] sm:h-[440px] rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-crosshair select-none bg-[#07090e]"
          data-cursor="EXPLORE"
        >
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Floating UI Telemetry Badge */}
          <div className="absolute top-4 left-4 pointer-events-none px-3 py-1.5 rounded-md bg-[#050609]/90 border border-white/10 font-mono text-[9px] text-white/60 tracking-precision flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef9a57] animate-ping" />
            <span>MAGNIFIER: 1.95X // RGB FRINGING // REAL-TIME RESAMPLE</span>
          </div>

          <div
            ref={coordRef}
            className="absolute bottom-4 right-4 pointer-events-none px-3 py-1.5 rounded-md bg-[#050609]/90 border border-white/10 font-mono text-[9px] text-[#ef9a57] tracking-precision tabular-nums"
          >
            COORD: [280, 180]
          </div>
        </div>

        {/* Explanatory Caption */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-white/60 pt-4 border-t border-white/5">
          <div>
            <span className="text-[#ef9a57] block font-bold mb-1">01. VECTOR PIPELINE</span>
            <p className="text-[11px] text-white/40 font-sans leading-relaxed">
              Resampling the multi-tenant document ingestion pipeline with automated chunking, sub-120ms vector indexing, and grounded context graphs.
            </p>
          </div>
          <div>
            <span className="text-[#f2f4f7] block font-bold mb-1">02. GLSL RAYMARCHING</span>
            <p className="text-[11px] text-white/40 font-sans leading-relaxed">
              Spatial computing in the browser. Procedural signed distance fields rendered natively on the GPU within strict 16ms frame budgets.
            </p>
          </div>
          <div>
            <span className="text-[#dce6f0] block font-bold mb-1">03. POSTGIS GEOSPATIAL</span>
            <p className="text-[11px] text-white/40 font-sans leading-relaxed">
              High-concurrency spatial radius queries, multi-point Dijkstra route optimization, and conflict-free client synchronization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
