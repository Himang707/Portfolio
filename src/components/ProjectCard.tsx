"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Github, ArrowRight, Layers, Eye } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelectProject: (p: Project) => void;
}

export default function ProjectCard({ project, index, onSelectProject }: ProjectCardProps) {
  const indexStr = String(index + 1).padStart(2, "0");

  return (
    <div
      className="group relative bg-[#0D0B08]/92 border border-[#D4AF37]/35 hover:border-[#F5D77F] rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(212,175,55,0.25)] flex flex-col justify-between overflow-hidden"
      data-cursor="VIEW"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl group-hover:bg-[#F5D77F]/20 transition-all duration-500 pointer-events-none" />

      <div className="space-y-6 relative z-10">
        {/* Card Header: Project Index & Category */}
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-4">
          <div className="flex items-center space-x-2 font-mono text-xs text-[#F5D77F] font-bold tracking-widest uppercase">
            <span>PROJECT {indexStr} —</span>
            <span className="text-[#FFF2CC]">{project.title}</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#F5D77F] animate-pulse" />
            <span className="text-[10px] font-mono text-[#C5BCAB] tracking-wider uppercase font-semibold">
              {project.category}
            </span>
          </div>
        </div>

        {/* Visual Preview Container with Image Hover Zoom */}
        <div
          onClick={() => onSelectProject(project)}
          className="project-preview-wrap relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden border border-[#D4AF37]/35 bg-[#080705] cursor-pointer group/img"
          data-cursor="EXPLORE"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
          />

          {/* Overlay Pill on Image Hover */}
          <div className="absolute inset-0 bg-black/55 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#0D0B08]/95 border border-[#F5D77F] text-[#FFF2CC] font-mono text-xs font-bold shadow-xl">
              <Eye className="w-3.5 h-3.5 text-[#F5D77F]" />
              <span>INSPECT ARCHITECTURE</span>
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h3
              onClick={() => onSelectProject(project)}
              className="text-2xl sm:text-3xl font-mono font-black text-[#ffffff] tracking-tight hover:text-[#F5D77F] transition-colors cursor-pointer drop-shadow-sm"
            >
              {project.title}
            </h3>
            <span className="text-xs font-mono text-[#A89F8B]">[{project.date}]</span>
          </div>

          <p className="text-sm sm:text-base text-[#D4CEBF] leading-relaxed font-sans line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Technology Tag Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider bg-[#141009] text-[#F5D77F] border border-[#D4AF37]/40 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Actions: Live Demo, View Code, and View Details */}
      <div className="mt-8 pt-5 border-t border-[#D4AF37]/25 flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex items-center space-x-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg font-mono text-xs font-bold text-[#080705] bg-[#D4AF37] hover:bg-[#E5B842] transition-all shadow-[0_0_18px_rgba(212,175,55,0.35)]"
            data-cursor="OPEN"
          >
            <span>LIVE DEMO</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg font-mono text-xs font-semibold text-[#E6E2D8] bg-[#141009] border border-[#D4AF37]/45 hover:border-[#F5D77F] hover:bg-[#1C160B] hover:text-[#ffffff] transition-all"
            data-cursor="OPEN"
          >
            <Github className="w-3.5 h-3.5" />
            <span>VIEW CODE</span>
          </a>
        </div>

        <button
          onClick={() => onSelectProject(project)}
          className="text-xs font-mono font-semibold text-[#C5BCAB] hover:text-[#ffffff] transition-colors inline-flex items-center space-x-1"
          data-cursor="VIEW"
        >
          <span>DETAILS</span>
          <span className="text-[#F5D77F]">→</span>
        </button>
      </div>
    </div>
  );
}
