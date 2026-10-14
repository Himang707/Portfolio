"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TermIcon, Play, RefreshCw, Copy, Check } from "lucide-react";

interface TerminalLine {
  id: string;
  type: "command" | "output" | "system";
  text: string | string[];
}

const INITIAL_HISTORY: TerminalLine[] = [
  { id: "1", type: "system", text: "HIMANG COMMAND CONSOLE v2026.04 // TYPE 'help' FOR COMMANDS" },
  { id: "2", type: "command", text: "$ whoami" },
  {
    id: "3",
    type: "output",
    text: ["> Developer", "> AI Explorer", "> Problem Solver"],
  },
  { id: "4", type: "command", text: "$ currently_learning" },
  {
    id: "5",
    type: "output",
    text: [
      "→ Artificial Intelligence",
      "→ Full Stack Development",
      "→ System Design",
      "→ Product Design",
    ],
  },
  { id: "6", type: "command", text: "$ status" },
  {
    id: "7",
    type: "output",
    text: ["> BUILDING..."],
  },
];

export default function Terminal() {
  const [history, setHistory] = useState<TerminalLine[]>(INITIAL_HISTORY);
  const [inputVal, setInputVal] = useState("");
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const cmdEntry: TerminalLine = {
      id: Date.now().toString(),
      type: "command",
      text: `$ ${inputVal}`,
    };

    let outputEntry: TerminalLine | null = null;

    switch (cmd) {
      case "help":
        outputEntry = {
          id: (Date.now() + 1).toString(),
          type: "output",
          text: [
            "AVAILABLE COMMANDS:",
            "  whoami             - Display developer identity",
            "  currently_learning - Active engineering research tracks",
            "  status             - Current system development state",
            "  projects           - List featured production builds",
            "  skills             - Display core tech stack",
            "  contact            - View direct communication channels",
            "  clear              - Wipe terminal screen history",
          ],
        };
        break;

      case "whoami":
        outputEntry = {
          id: (Date.now() + 1).toString(),
          type: "output",
          text: [
            "> HIMANG PANCHAL // Frontend Developer & AI/ML Enthusiast",
            "  Location: Dungarpur, Rajasthan, India",
            "  Education: Rai University — B.Tech Computer Science (Expected 2029)",
            "  Summary: Focused on building modern, interactive, and practical digital experiences.",
            "  Creed: 'Not interested in building more. Interested in building better.'",
          ],
        };
        break;

      case "currently_learning":
      case "learning":
      case "interests":
        outputEntry = {
          id: (Date.now() + 1).toString(),
          type: "output",
          text: [
            "AREAS OF INTEREST & ACTIVE FOCUS:",
            "→ Artificial Intelligence & Machine Learning",
            "→ Computer Vision & Image Processing",
            "→ Frontend Engineering & Responsive UX",
            "→ Developer Tools & Interactive Experiences",
          ],
        };
        break;

      case "status":
        outputEntry = {
          id: (Date.now() + 1).toString(),
          type: "output",
          text: ["> STATUS: NOMINAL // ALL SYSTEMS GO", "  Building at the intersection of design, software, and AI."],
        };
        break;

      case "projects":
        outputEntry = {
          id: (Date.now() + 1).toString(),
          type: "output",
          text: [
            "FEATURED ARCHITECTURES:",
            "  1. RELAY       - AI Document & Context Intelligence Platform",
            "  2. UDAYAAN     - Immersive 3D Spatial Web Experience",
            "  3. GLOBETROTTER- Smart Travel Intelligence & Geospatial Routing",
          ],
        };
        break;

      case "skills":
        outputEntry = {
          id: (Date.now() + 1).toString(),
          type: "output",
          text: [
            "TECHNICAL ARSENAL:",
            "  Languages: Python, SQL, JavaScript",
            "  Frontend : React, HTML, CSS, Tailwind CSS, Responsive UI",
            "  AI/ML    : Scikit-learn, TensorFlow, PyTorch, Deep Learning, NLP, Computer Vision",
            "  Tools    : Git, GitHub, Docker, Jupyter, API Integration",
          ],
        };
        break;

      case "contact":
        outputEntry = {
          id: (Date.now() + 1).toString(),
          type: "output",
          text: [
            "DIRECT DISPATCH CHANNELS:",
            "  Email   : himangpanchal707@gmail.com",
            "  Phone   : +91 7426053260",
            "  GitHub  : https://github.com/himang707",
            "  LinkedIn: https://linkedin.com/in/himangpanchal",
            "  Location: Dungarpur, Rajasthan, India",
          ],
        };
        break;

      case "clear":
        setHistory([
          { id: Date.now().toString(), type: "system", text: "CONSOLE CLEARED // TYPE 'help'" },
        ]);
        setInputVal("");
        return;

      default:
        outputEntry = {
          id: (Date.now() + 1).toString(),
          type: "output",
          text: `Command not found: "${cmd}". Type 'help' for available commands.`,
        };
        break;
    }

    setHistory((prev) => [...prev, cmdEntry, ...(outputEntry ? [outputEntry] : [])]);
    setInputVal("");
  };

  const handleCopy = () => {
    const rawText = history
      .map((h) => (Array.isArray(h.text) ? h.text.join("\n") : h.text))
      .join("\n");
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setHistory(INITIAL_HISTORY);
    setInputVal("");
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#141009]/90 border border-[#D4AF37]/45 text-[#F5D77F] font-mono text-xs tracking-widest uppercase shadow-md w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5D77F] animate-pulse" />
            <span>06 // INTERACTIVE TERMINAL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-mono font-extrabold text-[#ffffff] tracking-tight text-shadow-command">
            CURRENTLY EXPLORING
          </h2>

          <p className="text-base sm:text-lg text-[#D4CEBF] max-w-2xl leading-relaxed text-shadow-sm">
            Live developer console. Run commands or inspect active research tracks directly.
          </p>
        </div>

        {/* Terminal Window Box */}
        <div className="rounded-2xl border border-[#D4AF37]/45 bg-[#080705]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.2)] overflow-hidden font-mono text-xs sm:text-sm">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#120E08] border-b border-[#D4AF37]/25 select-none">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#e05252]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#e5b83b]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#D4AF37]/90 inline-block" />
              <span className="ml-2 text-xs text-[#A89F8B] font-semibold">
                bash // himang@golden-console:~
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                aria-label="Copy terminal text"
                className="p-1.5 text-[#A89F8B] hover:text-[#ffffff] hover:bg-[#1E170A] rounded transition-colors"
                title="Copy Terminal Text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#F5D77F]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleReset}
                aria-label="Reset terminal history"
                className="p-1.5 text-[#A89F8B] hover:text-[#ffffff] hover:bg-[#1E170A] rounded transition-colors"
                title="Reset Terminal"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Content Body */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="p-5 sm:p-6 space-y-4 max-h-[440px] overflow-y-auto cursor-text bg-[#080604]"
          >
            {history.map((entry) => {
              if (entry.type === "system") {
                return (
                  <div key={entry.id} className="text-[#8C7E66] text-xs">
                    {entry.text}
                  </div>
                );
              }

              if (entry.type === "command") {
                return (
                  <div key={entry.id} className="flex items-center space-x-2 text-[#F5D77F] font-bold">
                    <span>{entry.text}</span>
                  </div>
                );
              }

              return (
                <div key={entry.id} className="space-y-1 pl-2 text-[#D4CEBF]">
                  {Array.isArray(entry.text) ? (
                    entry.text.map((line, i) => (
                      <div
                        key={i}
                        className={
                          line.startsWith(">")
                            ? "text-[#F5D77F] font-semibold"
                            : line.startsWith("→")
                            ? "text-[#E5B842]"
                            : "text-[#D4CEBF]"
                        }
                      >
                        {line}
                      </div>
                    ))
                  ) : (
                    <div>{entry.text}</div>
                  )}
                </div>
              );
            })}

            {/* Active Input Line */}
            <form onSubmit={handleCommand} className="flex items-center space-x-2 pt-2">
              <span className="text-[#F5D77F] font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type command (e.g. 'help', 'status', 'clear')..."
                className="flex-1 bg-transparent border-none outline-none text-[#F5F2EB] placeholder-[#6E6450] font-mono text-xs sm:text-sm"
              />
              <span className="w-2 h-4 bg-[#F5D77F] animate-pulse inline-block" />
            </form>

            <div ref={terminalEndRef} />
          </div>

          {/* Quick command buttons pill bar */}
          <div className="px-4 py-2.5 bg-[#100D07] border-t border-[#D4AF37]/20 flex flex-wrap items-center gap-2 text-[11px] text-[#A89F8B]">
            <span className="font-semibold text-[#D4CEBF]">QUICK EXEC:</span>
            {["whoami", "currently_learning", "status", "projects", "skills", "help", "clear"].map(
              (cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    setInputVal(cmd);
                    setTimeout(() => {
                      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                      handleCommand(fakeEvent);
                    }, 50);
                  }}
                  className="px-2 py-0.5 rounded bg-[#18130A] hover:bg-[#261E0E] text-[#F5D77F] border border-[#D4AF37]/35 transition-colors"
                >
                  {cmd}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
