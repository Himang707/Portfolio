"use client";

import React, { useState } from "react";
import { projects, Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { FolderGit2 } from "lucide-react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#141009]/90 border border-[#D4AF37]/45 text-[#F5D77F] font-mono text-xs tracking-widest uppercase shadow-md w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5D77F] animate-pulse" />
              <span>03 // FEATURED BUILDS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-mono font-extrabold text-[#ffffff] tracking-tight text-shadow-command">
              SELECTED WORK
            </h2>

            <p className="text-base sm:text-lg text-[#D4CEBF] max-w-2xl leading-relaxed text-shadow-sm">
              Ideas I&apos;ve turned into working experiences.
            </p>
          </div>

          <div className="font-mono text-xs text-[#C5BCAB] bg-[#141009]/90 px-4 py-2.5 rounded-xl border border-[#D4AF37]/40 shadow-md w-fit">
            <span>INDEXED: </span>
            <strong className="text-[#F5D77F]">03 SHIPPED PRODUCTS</strong>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelectProject={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

        {/* Deep Dive Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
