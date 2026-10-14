"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { hiddenProjects } from "@/data/hiddenProjects";
import { X, Lock, Unlock, Github, ArrowUpRight, Skull } from "lucide-react";

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

/**
 * Konami Code easter egg vault.
 * Listens for the classic ↑↑↓↓←→←→BA sequence.
 * On activation, reveals a hidden overlay with experimental projects.
 * Features CRT-style glitch animation on unlock.
 */
export default function KonamiVault({
  onUnlock,
}: {
  onUnlock?: () => void;
}) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const bufferRef = useRef<string[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const unlock = useCallback(() => {
    setGlitching(true);
    onUnlock?.();

    // Glitch effect for 800ms, then reveal vault
    setTimeout(() => {
      setGlitching(false);
      setIsUnlocked(true);
      setIsVisible(true);
    }, 800);
  }, [onUnlock]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add key to buffer
      bufferRef.current.push(e.code);

      // Keep only the last N keys (length of Konami code)
      if (bufferRef.current.length > KONAMI_CODE.length) {
        bufferRef.current.shift();
      }

      // Reset buffer after 2s of inactivity
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        bufferRef.current = [];
      }, 2000);

      // Check for match
      if (
        bufferRef.current.length === KONAMI_CODE.length &&
        bufferRef.current.every((key, i) => key === KONAMI_CODE[i])
      ) {
        bufferRef.current = [];
        if (!isUnlocked) unlock();
        else setIsVisible(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isUnlocked, unlock]);

  if (!isVisible && !glitching) return null;

  return (
    <>
      {/* Full-screen glitch effect on unlock */}
      {glitching && (
        <div className="fixed inset-0 z-[300] pointer-events-none vault-glitch">
          <div className="absolute inset-0 bg-[#050609] animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-mono text-2xl sm:text-4xl font-black text-[#ef9a57] tracking-widest vault-glitch-text">
              VAULT UNLOCKED
            </div>
          </div>
          {/* CRT scanlines */}
          <div className="absolute inset-0 vault-scanlines opacity-30 pointer-events-none" />
        </div>
      )}

      {/* Vault Overlay */}
      {isVisible && (
        <div
          className="fixed inset-0 z-[250] bg-[#020304]/95 backdrop-blur-2xl overflow-y-auto"
          role="dialog"
          aria-label="Hidden Projects Vault"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="fixed top-6 right-6 z-[260] p-3 rounded-full bg-[#0c0e14] border border-white/15 hover:border-[#ef9a57] text-white/70 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57]"
            aria-label="Close vault"
            data-cursor="OPEN"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-5xl mx-auto px-6 sm:px-12 py-20 space-y-12">
            {/* Vault Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 font-mono text-[10px] tracking-[0.26em] text-[#ef9a57]">
                <Unlock className="w-3.5 h-3.5" />
                <span>CLASSIFIED // EXPERIMENTAL SPECIMENS</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#f2f4f7] uppercase leading-[1.0]">
                THE VAULT.
                <span className="block text-white/30 font-light text-2xl sm:text-4xl mt-1">
                  Prototypes, experiments, and the learning journey.
                </span>
              </h2>

              <p className="text-sm text-white/50 font-sans max-w-2xl">
                You found the hidden layer. These are experimental builds, rapid prototypes, and technical explorations that didn&apos;t make the main showcase — but represent the curiosity and depth behind the polished work above.
              </p>

              <div className="flex items-center space-x-2 font-mono text-[10px] text-white/30 tracking-[0.26em]">
                <Skull className="w-3 h-3" />
                <span>KONAMI CODE: ↑↑↓↓←→←→BA</span>
              </div>
            </div>

            {/* Hidden Project Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {hiddenProjects.map((project, idx) => (
                <div
                  key={project.id}
                  className="group relative p-6 rounded-xl bg-[#080a0f] border border-white/10 hover:border-[#ef9a57]/50 shadow-[inset_0_1px_0_0_rgba(220,230,240,0.4),0_20px_50px_rgba(0,0,0,0.85)] transition-colors flex flex-col justify-between"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Top edge sheen */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ef9a57]/40 to-transparent opacity-60" />

                  {/* Header */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-mono text-[9px] text-white/40 tracking-[0.26em] border-b border-white/5 pb-2">
                      <span>PROTOTYPE // #{String(idx + 1).padStart(2, "0")}</span>
                      <span className="text-[#ef9a57] font-bold">{project.status}</span>
                    </div>

                    <div>
                      <h3 className="font-mono text-lg font-bold text-[#f2f4f7] group-hover:text-[#ef9a57] transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-mono text-[10px] tracking-wider text-white/40 mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-white/55 leading-relaxed font-sans">
                      {project.longDescription}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 font-mono text-[9px] border-y border-white/5 py-3">
                      {project.stats.map((st) => (
                        <div key={st.label}>
                          <span className="text-white/25 block tracking-[0.2em] uppercase">{st.label}</span>
                          <span className="text-[#ef9a57] font-bold block mt-0.5">{st.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/8 font-mono text-[9px] text-white/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center space-x-3 pt-4 mt-4 border-t border-white/5">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] font-bold tracking-wider text-white/60 bg-white/5 border border-white/10 hover:border-[#ef9a57] hover:text-white transition-all"
                      data-cursor="OPEN"
                    >
                      <Github className="w-3 h-3" />
                      <span>SOURCE</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Vault footer */}
            <div className="pt-8 border-t border-white/5 font-mono text-[10px] text-white/25 tracking-[0.26em] text-center">
              <span>END OF CLASSIFIED SPECIMENS // RETURN TO MAIN PORTFOLIO VIA [ESC] OR [X]</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
