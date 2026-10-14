"use client";

import React, { useRef, useEffect, useState } from "react";
import { Sparkles, TerminalSquare, Compass, Waves, Mic, MicOff } from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";

export default function SectionCaustics() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [displayText, setDisplayText] = useState("NOT INTERESTED IN BUILDING MORE.");
  const { device, astronomy, audioReactive, playClick } = usePortfolio();

  const astronomyRef = useRef(astronomy.phaseConfig.causticTint);
  useEffect(() => {
    astronomyRef.current = astronomy.phaseConfig.causticTint;
  }, [astronomy.phaseConfig.causticTint]);

  const audioRef = useRef(audioReactive.getValuesRef);
  useEffect(() => {
    audioRef.current = audioReactive.getValuesRef;
  }, [audioReactive.getValuesRef]);

  // Scramble text animation logic
  const originalText = "NOT INTERESTED IN BUILDING MORE.";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789//_#<>";

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) return originalText[index];
            if (letter === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Enhancement 1: Skip WebGL on reduced motion
    if (device.prefersReducedMotion) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // 240x135 Caustic source
    canvas.width = 240;
    canvas.height = 135;

    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Caustic field fragment shader with Audio-Reactive Cymatics & Astronomical Grading
    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float uTime;
      uniform float uScroll;
      uniform vec3 uCausticTint;
      uniform float uAudioAmp;
      uniform float uAudioFreq;

      void main() {
        vec2 p = vUv * 6.0 - vec2(20.0);
        vec2 i = vec2(p);
        float c = 1.0;
        float inten = 0.005;

        // Enhancement 1: Fewer iterations on mobile for performance
        for (int n = 0; n < ${device.useHighPerformance ? 5 : 3}; n++) {
          // Audio frequency subtly shifts wave dispersion rate
          float t = (uTime * (0.8 + uAudioFreq * 0.8) + uScroll * 4.0) * (1.0 - (3.5 / float(n + 1)));
          // Audio amplitude creates cymatics shockwaves
          i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x)) * (1.0 + uAudioAmp * 0.4);
          c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
        }

        c /= 5.0;
        c = 1.17 - pow(c, 1.4);
        vec3 color = vec3(pow(abs(c), 8.0));

        // Real-time astronomical caustic tint dynamically graded by solar hour + audio bloom
        float audioBloom = 1.0 + uAudioAmp * 0.6;
        vec3 finalColor = clamp(color * uCausticTint * 1.5 * audioBloom, 0.0, 1.0);
        
        // Deep edge vignette
        float vignette = smoothstep(0.7, 0.2, distance(vUv, vec2(0.5)));

        gl_FragColor = vec4(finalColor * vignette, vignette * 0.85);
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
    const uScrollLoc = gl.getUniformLocation(program, "uScroll");
    const uCausticTintLoc = gl.getUniformLocation(program, "uCausticTint");
    const uAudioAmpLoc = gl.getUniformLocation(program, "uAudioAmp");
    const uAudioFreqLoc = gl.getUniformLocation(program, "uAudioFreq");

    let animId: number;
    let scrollVal = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    const handleScroll = () => {
      scrollVal = window.scrollY / 1000;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const startTime = performance.now();
    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      const elapsed = (performance.now() - startTime) * 0.001;
      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform1f(uScrollLoc, scrollVal);

      // Ingest live astronomical caustic color from environmental engine
      const [tr, tg, tb] = astronomyRef.current;
      gl.uniform3f(uCausticTintLoc, tr, tg, tb);

      // Ingest live audio-reactive values (0 latency ref read)
      const audioVals = audioRef.current();
      gl.uniform1f(uAudioAmpLoc, audioVals.amplitude);
      gl.uniform1f(uAudioFreqLoc, audioVals.frequency);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      gl.deleteProgram(program);
    };
  }, [device]);

  return (
    <section
      id="caustics"
      className="relative py-28 px-6 sm:px-12 bg-[#050609] border-t border-white/5 overflow-hidden"
      role="region"
      aria-label="Design philosophy and mindset"
    >
      {/* Background WebGL Caustic Field Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40" aria-hidden="true">
        <canvas ref={canvasRef} className="w-full h-full object-cover filter blur-[2px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {/* Header Indicator & Cymatics Audio Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-precision border-b border-white/5 pb-4">
          <div className="flex items-center space-x-3 text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef9a57] animate-pulse" />
            <span>SECTION 09 // WEBGL CAUSTICS FIELD & MINDSET</span>
          </div>

          <button
            onClick={() => {
              playClick();
              audioReactive.toggleMode();
            }}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all ${
              audioReactive.mode === "mic"
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                : audioReactive.mode === "synthetic"
                ? "border-blue-500/50 bg-blue-500/10 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                : "border-white/10 bg-[#0c0e14] text-white/50 hover:border-white/20 hover:text-white"
            }`}
            title="Click to cycle: Microphone input -> Synthetic ambient resonance -> Off"
          >
            <Waves className={`w-3.5 h-3.5 ${audioReactive.mode !== "off" ? "animate-pulse text-[#ef9a57]" : ""}`} />
            <span className="font-bold">
              AUDIO CYMATICS: {audioReactive.mode.toUpperCase()}
            </span>
            {audioReactive.mode !== "off" && (
              <span className="text-[9px] text-white/40 tabular-nums">
                ({(audioReactive.amplitude * 100).toFixed(0)}%)
              </span>
            )}
          </button>
        </div>

        {/* Headline with data-scramble */}
        <div className="space-y-4 max-w-4xl">
          <h2
            ref={headingRef}
            onMouseEnter={scramble}
            data-scramble="true"
            className="text-3xl sm:text-6xl font-black tracking-tight text-[#f2f4f7] uppercase leading-[1.05] cursor-pointer"
            data-cursor="VIEW"
          >
            {displayText}
          </h2>
          <p className="text-xl sm:text-3xl font-light text-[#ef9a57]">
            I’m interested in building better.
          </p>
        </div>

        {/* Architectural Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-xl bg-[#090b10]/90 border border-white/10 backdrop-blur-md space-y-3">
            <span className="font-mono text-xs text-[#ef9a57] font-bold block">
              01 // SIMPLICITY
            </span>
            <h3 className="font-mono text-base font-bold text-[#f2f4f7]">
              Things That Feel Simple
            </h3>
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              I create digital experiences at the intersection of design, technology, and intelligence—stripping away friction until complex technology feels effortless to use.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#090b10]/90 border border-white/10 backdrop-blur-md space-y-3">
            <span className="font-mono text-xs text-[#ef9a57] font-bold block">
              02 // MOTION & DETAILS
            </span>
            <h3 className="font-mono text-base font-bold text-[#f2f4f7]">
              Caring for the Nuance
            </h3>
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              I care about the details—the way an interface moves, the way a product responds, and the tactile micro-interactions that elevate software into a craft.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#090b10]/90 border border-white/10 backdrop-blur-md space-y-3">
            <span className="font-mono text-xs text-[#ef9a57] font-bold block">
              03 // POLISHED EXECUTION
            </span>
            <h3 className="font-mono text-base font-bold text-[#f2f4f7]">
              Ambitious Ideas to Reality
            </h3>
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              Bridging React, modern web technologies, Python, Machine Learning, and Computer Vision with a constant focus on shipping polished, functional experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
