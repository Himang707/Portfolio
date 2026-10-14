"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink, Github, CheckCircle2, Cpu, Layers, Sparkles } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0B0906] border border-[#D4AF37]/40 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.22)] text-[#F5F2EB] p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-4">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5D77F] animate-pulse" />
            <span className="font-mono text-xs text-[#F5D77F] tracking-widest uppercase font-semibold">
              SPEC // {project.id.toUpperCase()}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A150D] text-[#F5D77F] border border-[#D4AF37]/45">
              {project.status}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl text-[#C5BCAB] hover:text-[#fff] hover:bg-[#1A150D] border border-[#D4AF37]/35 transition-all focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <h2 id="modal-title" className="text-3xl sm:text-4xl font-mono font-black tracking-tight text-[#ffffff]">
            {project.title}
          </h2>
          <p className="text-base sm:text-lg text-[#F5D77F] font-mono font-medium">
            {project.subtitle}
          </p>
        </div>

        {/* Preview Visual */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-[#D4AF37]/35 bg-[#080705]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain p-2"
          />
        </div>

        {/* Long Narrative Description */}
        <div className="space-y-3">
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#F5D77F]">
            // ARCHITECTURE & PROBLEM DOMAIN
          </h3>
          <p className="text-[#D4CEBF] leading-relaxed text-sm sm:text-base font-sans">
            {project.longDescription}
          </p>
        </div>

        {/* Performance Metrics & Telemetry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {project.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#120E08] border border-[#D4AF37]/35 rounded-xl p-3.5 text-center font-mono"
            >
              <div className="text-xl sm:text-2xl font-black text-[#F5D77F]">
                {stat.value}
              </div>
              <div className="text-[10px] tracking-wider text-[#A89F8B] uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Key Features List */}
        <div className="space-y-3">
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#F5D77F]">
            // KEY CAPABILITIES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.features.map((feat, i) => (
              <div
                key={i}
                className="flex items-start space-x-2 text-xs sm:text-sm text-[#D4CEBF] bg-[#120E08] p-3 rounded-lg border border-[#D4AF37]/25"
              >
                <CheckCircle2 className="w-4 h-4 text-[#F5D77F] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="space-y-3">
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#F5D77F]">
            // TECHNOLOGY STACK
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-[#1A150D] text-[#F5D77F] border border-[#D4AF37]/35"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#D4AF37]/25">
          <div className="flex items-center space-x-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-[#080705] bg-[#D4AF37] hover:bg-[#E5B842] transition-all shadow-[0_0_18px_rgba(212,175,55,0.35)]"
              data-cursor="OPEN"
            >
              <span>LIVE DEMO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-[#E6E2D8] bg-[#141009] border border-[#D4AF37]/40 hover:border-[#F5D77F] hover:bg-[#1C160B] transition-all"
              data-cursor="OPEN"
            >
              <Github className="w-3.5 h-3.5" />
              <span>SOURCE CODE</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-[#A89F8B] hover:text-[#ffffff] transition-colors"
          >
            [CLOSE ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
