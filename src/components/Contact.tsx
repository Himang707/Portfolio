"use client";

import React, { useState } from "react";
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle, ArrowUpRight, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Invalid email format";
    }
    if (!formData.message.trim()) {
      errs.message = "Message cannot be empty";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    // Simulated reliable server dispatch
    setTimeout(() => {
      setStatus("success");
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#D4AF37", "#F5D77F", "#E5B842", "#ffffff"],
      });
      setFormData({ name: "", email: "", message: "" });
    }, 900);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#141009]/90 border border-[#D4AF37]/45 text-[#F5D77F] font-mono text-xs tracking-widest uppercase shadow-md w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5D77F] animate-pulse" />
            <span>07 // TRANSMISSION LINE</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl font-mono font-extrabold text-[#ffffff] tracking-tight text-shadow-command">
              HAVE AN IDEA?
            </h2>
            <h3 className="text-3xl sm:text-5xl font-mono font-extrabold text-[#F5D77F] tracking-tight drop-shadow-sm">
              LET&apos;S BUILD IT.
            </h3>
          </div>

          <p className="text-base sm:text-lg text-[#D4CEBF] max-w-2xl leading-relaxed text-shadow-sm">
            Whether it&apos;s a project, collaboration or a crazy idea, I&apos;m always interested in building something meaningful.
          </p>
        </div>

        {/* Split Grid: Direct Command Links (Left) + Dispatch Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Links & Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0D0B08]/92 border border-[#D4AF37]/35 rounded-2xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-6">
              <div className="space-y-2">
                <h4 className="font-mono text-sm font-bold text-[#F5D77F] tracking-wider uppercase">
                  // DIRECT DISPATCH CHANNELS
                </h4>
                <p className="text-sm text-[#D4CEBF] font-sans">
                  Fastest response via email. Available for full-stack engineering, AI exploratory
                  builds, and hackathon collaborations.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 font-mono text-xs">
                <a
                  href="mailto:himangpanchal707@gmail.com"
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-[#141009] border border-[#D4AF37]/35 hover:border-[#F5D77F] hover:bg-[#1E170A] text-[#F5F2EB] transition-all group"
                  data-cursor="OPEN"
                >
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-[#F5D77F]" />
                    <span className="font-bold tracking-wider">EMAIL ME</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#E5B842] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://github.com/himang707"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-[#141009] border border-[#D4AF37]/35 hover:border-[#F5D77F] hover:bg-[#1E170A] text-[#F5F2EB] transition-all group"
                  data-cursor="OPEN"
                >
                  <div className="flex items-center space-x-3">
                    <Github className="w-4 h-4 text-[#F5D77F]" />
                    <span className="font-bold tracking-wider">GITHUB</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#E5B842] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://linkedin.com/in/himangpanchal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-[#141009] border border-[#D4AF37]/35 hover:border-[#F5D77F] hover:bg-[#1E170A] text-[#F5F2EB] transition-all group"
                  data-cursor="OPEN"
                >
                  <div className="flex items-center space-x-3">
                    <Linkedin className="w-4 h-4 text-[#F5D77F]" />
                    <span className="font-bold tracking-wider">LINKEDIN</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#E5B842] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* System Latency Badge */}
              <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between text-[11px] font-mono text-[#A89F8B]">
                <span>RESPONSE TIME:</span>
                <span className="text-[#F5D77F] font-semibold">&lt; 24 HOURS</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0D0B08]/92 border border-[#D4AF37]/35 rounded-2xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-6">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3">
                <span className="font-mono text-xs text-[#F5D77F] font-bold tracking-wider uppercase">
                  TRANSMIT ENCRYPTED MESSAGE
                </span>
                <span className="text-[10px] font-mono text-[#8C7E66]">
                  STATUS: READY
                </span>
              </div>

              {status === "success" ? (
                <div className="p-8 rounded-xl bg-[#1E170A] border border-[#D4AF37] text-center space-y-4 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-12 h-12 text-[#F5D77F] mx-auto animate-bounce" />
                  <div className="space-y-1">
                    <h4 className="font-mono text-lg font-bold text-[#F5F2EB]">
                      TRANSMISSION SUCCESSFUL
                    </h4>
                    <p className="text-sm text-[#D4CEBF] font-sans">
                      Message logged into dispatch queue. I will follow up via your email shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-5 py-2 rounded-lg font-mono text-xs font-semibold bg-[#261E0E] text-[#FFF2CC] border border-[#D4AF37]/45 hover:border-[#F5D77F] transition-colors"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Name Input */}
                  <div className="space-y-1.5 font-mono">
                    <label htmlFor="name" className="block text-xs font-bold tracking-wider text-[#C5BCAB]">
                      NAME *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe or Organisation"
                      className="w-full bg-[#080604] border border-[#D4AF37]/35 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-sm text-[#F5F2EB] placeholder-[#6E6450] outline-none transition-all"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-[#e05252] flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5 font-mono">
                    <label htmlFor="email" className="block text-xs font-bold tracking-wider text-[#C5BCAB]">
                      EMAIL *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-[#080604] border border-[#D4AF37]/35 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-sm text-[#F5F2EB] placeholder-[#6E6450] outline-none transition-all"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-[#e05252] flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5 font-mono">
                    <label htmlFor="message" className="block text-xs font-bold tracking-wider text-[#C5BCAB]">
                      MESSAGE *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe the opportunity, vision, or problem you want to solve..."
                      className="w-full bg-[#080604] border border-[#D4AF37]/35 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-sm text-[#F5F2EB] placeholder-[#6E6450] outline-none transition-all resize-none"
                    />
                    {errors.message && (
                      <p className="text-[11px] text-[#e05252] flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full mt-2 py-3.5 px-6 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider text-[#080705] bg-[#D4AF37] hover:bg-[#E5B842] active:scale-[0.99] disabled:opacity-60 transition-all shadow-[0_0_20px_rgba(212,175,55,0.35)] flex items-center justify-center space-x-2 cursor-pointer focus:outline-none"
                    data-cursor="OPEN"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#080705]" />
                        <span>TRANSMITTING MESSAGE...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
