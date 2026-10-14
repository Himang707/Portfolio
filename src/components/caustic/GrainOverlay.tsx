"use client";

import React, { useEffect, useRef } from "react";

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Generate a lightweight 128x128 tile of film grain ONCE
    const tileSize = 128;
    const offscreen = document.createElement("canvas");
    offscreen.width = tileSize;
    offscreen.height = tileSize;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    const imgData = offCtx.createImageData(tileSize, tileSize);
    const buffer = new Uint32Array(imgData.data.buffer);
    for (let i = 0; i < buffer.length; i++) {
      if (Math.random() < 0.15) {
        const val = Math.floor(Math.random() * 255);
        buffer[i] = (30 << 24) | (val << 16) | (val << 8) | val;
      }
    }
    offCtx.putImageData(imgData, 0, 0);

    const pattern = ctx.createPattern(offscreen, "repeat");
    if (!pattern) return;

    let animId: number;
    let lastTime = 0;
    const fpsInterval = 1000 / 12; // 12 FPS cinematic jitter instead of 60-120 FPS CPU burn

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Low-overhead cinematic film grain jitter (only pattern translation at 12 FPS)
    const jitter = (time: number) => {
      animId = requestAnimationFrame(jitter);
      if (time - lastTime < fpsInterval) return;
      lastTime = time;

      ctx.save();
      ctx.translate((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6);
      ctx.fillStyle = pattern;
      ctx.fillRect(-6, -6, canvas.width + 12, canvas.height + 12);
      ctx.restore();
    };

    animId = requestAnimationFrame(jitter);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="grain" aria-hidden="true" />;
}
