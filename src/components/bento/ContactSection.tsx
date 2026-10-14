"use client";

import React, { useState } from "react";
import {
  Mail,
  Github,
  MapPin,
  Phone,
  Copy,
  CheckCircle,
  Send,
  ArrowUpRight,
} from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("himangpanchal707@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setIsSent(false), 5000);
    }, 600);
  };

  return (
    <section
      id="contact"
      className="relative py-[15vh] overflow-hidden perspective-container"
      role="region"
      aria-label="Contact Himang Panchal"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Luminous Section Tag */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[11px] font-mono-code font-bold tracking-[0.2em] text-[#94DEC0] uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#94DEC0] pulse-dot" />
            Get in touch
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(148,222,192,0.35) 0%, transparent 100%)" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LEFT: Information & 1-Click Copy */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-[clamp(32px,5vw,50px)] font-[800] tracking-[-0.065em] text-white leading-[1.2]">
                Let&apos;s build something together.
              </h2>

              <p className="text-[15px] text-white/70 leading-[1.85] tracking-tight">
                I&apos;m currently open to frontend engineering opportunities, internships, and
                collaborative projects. Whether you have an open role or just want to explore ideas,
                feel free to reach out.
              </p>
            </div>

            {/* Direct Email Card with subtle floating levitation */}
            <div className="p-7 rounded-[28px] bg-[#0c1411]/80 border border-[rgba(148,222,192,0.12)] antigravity-card-subtle backdrop-blur-2xl space-y-4">
              <div className="text-[11px] font-mono-code uppercase tracking-[0.2em] text-[#94DEC0]/80">
                Direct Email
              </div>

              <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.025] border border-white/[0.06]">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-[#94DEC0]/15 text-[#94DEC0] flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(148,222,192,0.2)]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[14px] font-medium text-white truncate">
                      himangpanchal707@gmail.com
                    </div>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-white text-[#080d0a] text-[12px] flex items-center gap-1.5 transition-all flex-shrink-0 font-semibold antigravity-button focus:outline-none"
                  aria-label="Copy email address"
                >
                  {emailCopied ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#080d0a]/70" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tactile Contact Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="tel:7426053260"
                className="p-4.5 rounded-2xl bg-[#0c1411]/75 border border-white/[0.07] hover:border-[rgba(148,222,192,0.25)] backdrop-blur-xl antigravity-pill flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#94DEC0]/15 text-[#94DEC0] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-white/45 font-mono-code">Phone</div>
                  <div className="text-[13px] font-medium text-white group-hover:text-[#94DEC0] transition-colors">
                    +91 7426053260
                  </div>
                </div>
              </a>

              <div className="p-4.5 rounded-2xl bg-[#0c1411]/75 border border-white/[0.07] backdrop-blur-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-300 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-white/45 font-mono-code">Location</div>
                  <div className="text-[13px] font-medium text-white">Rajasthan, India</div>
                </div>
              </div>

              <a
                href="https://github.com/himang707"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4.5 rounded-2xl bg-[#0c1411]/75 border border-white/[0.07] hover:border-[rgba(148,222,192,0.25)] backdrop-blur-xl antigravity-pill flex items-center gap-3 group sm:col-span-2"
              >
                <div className="w-9 h-9 rounded-xl bg-white/[0.06] text-white flex items-center justify-center flex-shrink-0">
                  <Github className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] text-white/45 font-mono-code">GitHub</div>
                  <div className="text-[13px] font-medium text-white group-hover:text-[#94DEC0] transition-colors">
                    github.com/himang707
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#94DEC0] transition-colors" />
              </a>
            </div>
          </div>

          {/* RIGHT: Floating Levitation Message Form Container */}
          <div className="lg:col-span-7">
            <div className="rounded-[32px] border border-[rgba(148,222,192,0.12)] antigravity-card backdrop-blur-2xl p-7 sm:p-9"
              style={{ background: "rgba(10,16,13,0.82)" }}
            >
              <div className="pb-5 border-b border-white/[0.07] mb-6">
                <h3 className="text-xl font-bold text-white tracking-[-0.04em]">Send a message</h3>
                <p className="text-[13px] text-white/60 mt-1 leading-relaxed">
                  Drop me a line directly and I&apos;ll get back to you promptly.
                </p>
              </div>

              {isSent ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#94DEC0]/15 border border-[#94DEC0]/30 flex items-center justify-center text-[#94DEC0] shadow-[0_0_16px_rgba(148,222,192,0.25)]">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white tracking-tight">Message received!</h4>
                    <p className="text-[13px] text-white/65 mt-1 max-w-xs leading-relaxed">
                      Thanks for reaching out, I&apos;ll reply to your email as soon as possible.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[12px] text-white/70 font-medium">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Rivera"
                        className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] focus:border-[#94DEC0]/50 focus:shadow-[0_0_14px_rgba(148,222,192,0.15)] text-[14px] text-white placeholder-white/35 focus:outline-none transition-all duration-800"
                        style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[12px] text-white/70 font-medium">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] focus:border-[#94DEC0]/50 focus:shadow-[0_0_14px_rgba(148,222,192,0.15)] text-[14px] text-white placeholder-white/35 focus:outline-none transition-all duration-800"
                        style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[12px] text-white/70 font-medium">Message</label>
                      <span className="text-[11px] text-white/40">{message.length}/500</span>
                    </div>
                    <textarea
                      required
                      rows={4}
                      maxLength={500}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Say hello, describe a project, or ask a question..."
                      className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] focus:border-[#94DEC0]/50 focus:shadow-[0_0_14px_rgba(148,222,192,0.15)] text-[14px] text-white placeholder-white/35 focus:outline-none transition-all duration-800 resize-none"
                      style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl font-semibold text-[14px] text-[#080d0a] bg-[#FAF7F2] hover:bg-white antigravity-button shadow-[0_10px_25px_rgba(0,0,0,0.35)] flex items-center justify-center gap-2 disabled:opacity-50 focus:outline-none"
                  >
                    {isSubmitting ? (
                      <span className="inline-block animate-spin mr-1">⟳</span>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {isSubmitting ? "Sending..." : "Send Message"}
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
