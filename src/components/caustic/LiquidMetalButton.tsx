"use client";

import React, { useRef, useEffect } from "react";

interface LiquidMetalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  dataCursor?: string;
}

export default function LiquidMetalButton({
  children,
  onClick,
  className = "",
  dataCursor = "OPEN",
}: LiquidMetalButtonProps) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // Vertex shader
    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader: Liquid metal displacement & chromatic dispersion
    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      uniform float uHover;

      void main() {
        vec2 st = gl_FragCoord.xy / uResolution;
        vec2 m = uMouse / uResolution;
        m.y = 1.0 - m.y; // invert Y

        float dist = distance(st, m);
        float pull = smoothstep(0.7, 0.0, dist) * uHover;

        // Fluid displacement
        vec2 uv = vUv + normalize(st - m) * pull * 0.15;
        float wave = sin(uv.x * 12.0 + uTime * 2.5) * cos(uv.y * 12.0 + uTime * 2.0);
        
        // Chromatic dispersion (RGB separation)
        float r = sin((uv.x + 0.02 * pull) * 8.0 + wave) * 0.5 + 0.5;
        float g = sin(uv.x * 8.0 + wave) * 0.5 + 0.5;
        float b = sin((uv.x - 0.02 * pull) * 8.0 + wave) * 0.5 + 0.5;

        // Metallic reflection palette with amber edge
        vec3 baseMetal = vec3(0.08, 0.09, 0.13);
        vec3 sheen = vec3(r * 0.85, g * 0.88, b * 0.95);
        vec3 amberEdge = vec3(0.94, 0.60, 0.34);

        vec3 color = mix(baseMetal, sheen, 0.45 + pull * 0.35);
        color = mix(color, amberEdge, smoothstep(0.4, 0.65, wave * pull));

        // Circular boundary falloff
        float alpha = smoothstep(0.5, 0.15, distance(vUv, vec2(0.5))) * (0.4 + uHover * 0.6);

        gl_FragColor = vec4(color, alpha);
      }
    `;

    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Quad geometry
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uMouseLoc = gl.getUniformLocation(program, "uMouse");
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    const uHoverLoc = gl.getUniformLocation(program, "uHover");

    let animId: number;
    let hoverState = 0;
    let targetHover = 0;
    let mouseX = 100;
    let mouseY = 100;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
    };

    updateSize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    let isRunning = false;

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(render);
      }
    };

    const handleMouseEnter = () => {
      targetHover = 1.0;
      startLoop();
    };

    const handleMouseLeave = () => {
      targetHover = 0.0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    const startTime = performance.now();
    const render = () => {
      const elapsed = (performance.now() - startTime) * 0.001;
      hoverState += (targetHover - hoverState) * 0.12;

      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform1f(uHoverLoc, hoverState);
      gl.uniform2f(uMouseLoc, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (targetHover === 0 && hoverState < 0.01) {
        hoverState = 0;
        gl.uniform1f(uHoverLoc, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        isRunning = false;
        return;
      }

      animId = requestAnimationFrame(render);
    };

    // Initial single frame render
    render();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <button
      ref={containerRef}
      onClick={onClick}
      className={`lm group px-6 py-3.5 font-mono text-xs sm:text-sm font-bold tracking-wider text-[#f2f4f7] focus:outline-none ${className}`}
      data-cursor={dataCursor}
    >
      <canvas ref={canvasRef} className="lm-fx" />
      <span className="relative z-10 flex items-center space-x-2 group-hover:text-white transition-colors">
        {children}
      </span>
    </button>
  );
}
