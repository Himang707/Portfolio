"use client";

import React, { useState, useEffect, useRef } from "react";
import { playPopSound, playRustleSound } from "@/lib/soundEffects";

const SPEECH_MESSAGES = [
  "Wait... I'm making it look professional. 🌱",
  "My developer is definitely not procrastinating.",
  "Almost ready! I think... 👀",
  "Please admire this leaf while I work.",
  "Okay, this is taking longer than my last coffee break. ☕",
];

const TICKLE_MESSAGES = [
  "Hey! That tickles! 🌿",
  "Working hard, I promise! 🍃",
  "Leaf me alone for a sec! 😄",
  "10/10 developer taste right here. ✨",
];

interface SproutMascotProps {
  progress: number;
  isReady: boolean;
  onMascotClick?: () => void;
}

export default function SproutMascot({ progress, isReady, onMascotClick }: SproutMascotProps) {
  const [speechBubbleText, setSpeechBubbleText] = useState("");
  const [showSpeech, setShowSpeech] = useState(false);
  const [isWaving, setIsWaving] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState(0);
  const [lookAtPlant, setLookAtPlant] = useState(false);
  const [tickleCount, setTickleCount] = useState(0);

  const mascotRef = useRef<HTMLDivElement>(null);

  // Pick 1 or 2 messages randomly per visit so it never feels repetitive
  useEffect(() => {
    // Randomly select one primary speech message
    const randomIndex = Math.floor(Math.random() * SPEECH_MESSAGES.length);
    const primaryMsg = SPEECH_MESSAGES[randomIndex];

    // Show speech bubble after initial friendly wave
    const timer1 = setTimeout(() => {
      setSpeechBubbleText(primaryMsg);
      setShowSpeech(true);
    }, 1800);

    // Stop waving after 3.5s, but stay alert
    const timerWave = setTimeout(() => {
      setIsWaving(false);
    }, 4200);

    // Occasionally glance down at the growing plant every 4-6 seconds
    const glanceInterval = setInterval(() => {
      setLookAtPlant(true);
      setTimeout(() => setLookAtPlant(false), 1600);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timerWave);
      clearInterval(glanceInterval);
    };
  }, []);

  // Natural eye blinking timer (every 3.8s)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3800);

    return () => clearInterval(blinkInterval);
  }, []);

  // Smooth cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mascotRef.current) return;
      const rect = mascotRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance < 10) {
        setPupilOffset({ x: 0, y: 0 });
        setHeadTilt(0);
        return;
      }

      const angle = Math.atan2(dy, dx);
      // Maximum eye offset is 4.5px
      const maxEyeOffset = 4.2;
      const eyeStrength = Math.min(maxEyeOffset, distance / 50);

      const px = Math.cos(angle) * eyeStrength;
      const py = Math.sin(angle) * eyeStrength;

      setPupilOffset({ x: px, y: py });

      // Subtle head tilt toward cursor (-7deg to +7deg)
      const tilt = Math.max(-8, Math.min(8, (dx / window.innerWidth) * 16));
      setHeadTilt(tilt);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Mascot click interaction with soft pop audio
  const handleClick = () => {
    playPopSound();
    const nextTickle = TICKLE_MESSAGES[tickleCount % TICKLE_MESSAGES.length];
    setTickleCount((prev) => prev + 1);
    setSpeechBubbleText(nextTickle);
    setShowSpeech(true);
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 2000);
    if (onMascotClick) onMascotClick();
  };

  // Compute effective eye positions (look down at plant if looking at progress)
  const currentPupilX = lookAtPlant ? 0 : pupilOffset.x;
  const currentPupilY = lookAtPlant ? 3.5 : pupilOffset.y;

  return (
    <div
      ref={mascotRef}
      className="relative flex flex-col items-center justify-center select-none"
      style={{
        transform: `rotate(${headTilt * 0.7}deg)`,
        transition: "transform 0.15s ease-out",
      }}
    >
      {/* ── Mascot Creature ("Sprout") with Speech Bubble Anchored Above ── */}
      <div
        onClick={handleClick}
        onMouseEnter={() => {
          setIsHovered(true);
          playRustleSound();
        }}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 cursor-pointer group flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        title="Sprout the Mascot (Click for a giggle!)"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick();
          }
        }}
      >
        {/* ── Speech Bubble (Strictly Above Sprout's Head - Never Covers Face) ── */}
        {showSpeech && (
          <div
            role="status"
            aria-live="polite"
            className="absolute bottom-full mb-2.5 sm:mb-3.5 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 animate-speech-bubble-float pointer-events-auto"
          >
            <div
              className="relative px-3 sm:px-4 py-1.5 sm:py-2.5 bg-[#F5F1E8] border-2 border-[#252821] rounded-2xl shadow-[3px_3px_0px_#252821] hover:scale-105 active:scale-95 transition-transform w-max max-w-[220px] sm:max-w-xs text-center"
            >
              <p className="font-space font-bold text-[11px] sm:text-[13px] text-[#252821] leading-snug">
                {speechBubbleText}
              </p>
              {/* Speech bubble pointer / tail pointing down to Sprout */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#F5F1E8] border-r-2 border-b-2 border-[#252821] rotate-45" />
            </div>
          </div>
        )}

        {/* Soft natural aura around mascot */}
        <div
          className="absolute inset-1 sm:inset-0 rounded-full blur-xl pointer-events-none transition-opacity duration-300"
          style={{
            background: isReady
              ? "radial-gradient(circle, rgba(163, 177, 138, 0.45) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(233, 196, 106, 0.35) 0%, transparent 70%)",
          }}
        />

        {/* ── Attractive "Click Here" Hint Badge (Safely Outside Character - 0% Overlap) ── */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="absolute left-1/2 -translate-x-1/2 -bottom-8 sm:left-[calc(100%+16px)] sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 z-30 flex items-center gap-1.5 cursor-pointer group/hint select-none whitespace-nowrap"
          title="Click to interact with Sprout!"
        >
          {/* Hand-drawn tiny arrow curving toward Sprout (visible on desktop) */}
          <svg
            viewBox="0 0 32 20"
            className="hidden sm:block w-5 h-4 text-[#355E3B] transition-transform group-hover/hint:-translate-x-1 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 28 5 C 18 15, 10 14, 4 10" />
            <path d="M 4 10 L 10 6" />
            <path d="M 4 10 L 9 15" />
          </svg>

          {/* Cute Tactile Pill Sticker */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFE57F] hover:bg-[#FFAEC8] border-2 border-[#252821] rounded-full shadow-[2px_2px_0px_#252821] text-[10px] sm:text-[11px] font-space font-black text-[#252821] tracking-wider uppercase rotate-1 group-hover/hint:rotate-0 transition-all duration-200 hover:scale-105 active:scale-95 animate-bounce-gentle">
            <span className="text-[12px] leading-none">👆</span>
            <span>Click here</span>
            <span className="text-[#355E3B] text-[10px] leading-none">✨</span>
          </div>
        </div>

        <svg
          viewBox="0 0 120 120"
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 relative z-10 drop-shadow-[0_4px_8px_rgba(37,40,33,0.12)] overflow-visible"
        >
          {/* ── Sprout Crown Leaves (Top of Head) ── */}
          <g className="animate-mascot-sway" style={{ transformOrigin: "60px 40px" }}>
            {/* Tiny stem */}
            <path
              d="M 60 40 Q 60 30 60 25"
              stroke="#355E3B"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Left Crown Leaf */}
            <path
              d="M 60 25 C 50 18, 38 18, 36 24 C 36 30, 48 32, 60 25 Z"
              fill="#A3B18A"
              stroke="#252821"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <path d="M 60 25 Q 46 24 40 23" stroke="#355E3B" strokeWidth="1.2" fill="none" opacity="0.6" />

            {/* Right Crown Leaf */}
            <path
              d="M 60 25 C 70 16, 82 16, 84 22 C 84 28, 72 31, 60 25 Z"
              fill="#355E3B"
              stroke="#252821"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <path d="M 60 25 Q 74 23 80 21" stroke="#A3B18A" strokeWidth="1.2" fill="none" opacity="0.8" />

            {/* Little sprout dew drop sparkle */}
            <circle cx="82" cy="19" r="1.8" fill="#FFFFFF" opacity="0.9" />
          </g>

          {/* ── Left Arm (Friendly Waving Leaf Arm) ── */}
          <g
            className={isWaving ? "animate-mascot-wave" : ""}
            style={{ transformOrigin: "36px 65px" }}
          >
            <path
              d="M 36 68 Q 22 55 18 45 C 16 40, 24 38, 28 44 Q 34 52 38 64"
              fill="#A3B18A"
              stroke="#252821"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Tiny hand wave motion lines */}
            {isWaving && (
              <g stroke="#355E3B" strokeWidth="1.6" strokeLinecap="round" opacity="0.75">
                <path d="M 14 36 Q 16 32 20 32" fill="none" />
                <path d="M 12 43 Q 14 39 17 40" fill="none" />
              </g>
            )}
          </g>

          {/* ── Right Arm (Gentle Relaxed Arm or Joy Lift) ── */}
          <g style={{ transformOrigin: "84px 68px" }}>
            {isReady ? (
              // Both arms up celebrating!
              <path
                d="M 84 68 Q 98 55 102 45 C 104 40, 96 38, 92 44 Q 86 52 82 64"
                fill="#A3B18A"
                stroke="#252821"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              // Resting relaxed arm
              <path
                d="M 84 66 Q 94 72 96 78 C 96 82, 90 84, 86 80 Q 82 76 80 70"
                fill="#A3B18A"
                stroke="#252821"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </g>

          {/* ── Mascot Chubby Pear/Bean Body ── */}
          <path
            d="M 60 38 C 42 38, 32 50, 32 68 C 32 86, 42 98, 60 98 C 78 98, 88 86, 88 68 C 88 50, 78 38, 60 38 Z"
            fill="#F5F1E8"
            stroke="#252821"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />

          {/* Belly Warm Gradient Shading (Soft Sage Tint) */}
          <path
            d="M 40 70 C 40 85, 48 94, 60 94 C 72 94, 80 85, 80 70 C 80 62, 72 58, 60 58 C 48 58, 40 62, 40 70 Z"
            fill="#A3B18A"
            opacity="0.32"
          />

          {/* ── Rosy Peach Blush Cheeks ── */}
          <ellipse
            cx="44"
            cy="70"
            rx={isHovered ? 5.5 : 4.5}
            ry={isHovered ? 4 : 3}
            fill="#E07A5F"
            opacity={isHovered ? 0.75 : 0.5}
            className="transition-all duration-200"
          />
          <ellipse
            cx="76"
            cy="70"
            rx={isHovered ? 5.5 : 4.5}
            ry={isHovered ? 4 : 3}
            fill="#E07A5F"
            opacity={isHovered ? 0.75 : 0.5}
            className="transition-all duration-200"
          />

          {/* ── Eyes (Blinking, Cursor Tracking, or Happy Arcs on Hover) ── */}
          {isBlinking ? (
            // Blinking closed eye slits
            <g stroke="#252821" strokeWidth="2.6" strokeLinecap="round">
              <path d="M 46 62 Q 50 64 54 62" fill="none" />
              <path d="M 66 62 Q 70 64 74 62" fill="none" />
            </g>
          ) : isHovered ? (
            // Happy squinting eye arcs (^_^)
            <g stroke="#252821" strokeWidth="2.8" strokeLinecap="round" fill="none">
              <path d="M 45 64 Q 50 58 55 64" />
              <path d="M 65 64 Q 70 58 75 64" />
            </g>
          ) : (
            // Natural eyes with cursor tracking pupils
            <g>
              {/* Left Eye White */}
              <circle cx="50" cy="62" r="5.5" fill="#FFFFFF" stroke="#252821" strokeWidth="2.2" />
              {/* Left Pupil */}
              <circle
                cx={50 + currentPupilX}
                cy={62 + currentPupilY}
                r="3"
                fill="#252821"
              />
              {/* Left Eye Highlight Sparkle */}
              <circle
                cx={49 + currentPupilX * 0.5}
                cy={60 + currentPupilY * 0.5}
                r="1.2"
                fill="#FFFFFF"
              />

              {/* Right Eye White */}
              <circle cx="70" cy="62" r="5.5" fill="#FFFFFF" stroke="#252821" strokeWidth="2.2" />
              {/* Right Pupil */}
              <circle
                cx={70 + currentPupilX}
                cy={62 + currentPupilY}
                r="3"
                fill="#252821"
              />
              {/* Right Eye Highlight Sparkle */}
              <circle
                cx={69 + currentPupilX * 0.5}
                cy={60 + currentPupilY * 0.5}
                r="1.2"
                fill="#FFFFFF"
              />
            </g>
          )}

          {/* ── Happy Mouth ── */}
          {isHovered || isReady ? (
            // Open smiling mouth with rosy tongue
            <g>
              <path
                d="M 55 70 Q 60 77 65 70 Z"
                fill="#355E3B"
                stroke="#252821"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M 57 73 Q 60 76 63 73" fill="#E07A5F" opacity="0.9" />
            </g>
          ) : (
            // Gentle contented smile
            <path
              d="M 56 70 Q 60 74 64 70"
              fill="none"
              stroke="#252821"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          )}

          {/* ── Cute Feet (Little Roots Resting on Ground) ── */}
          <path
            d="M 48 97 Q 44 102 40 102 C 38 102, 38 98, 44 96"
            fill="#9C7655"
            stroke="#252821"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M 72 97 Q 76 102 80 102 C 82 102, 82 98, 76 96"
            fill="#9C7655"
            stroke="#252821"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>

        {/* Soft grounded shadow beneath mascot */}
        <div className="absolute -bottom-0.5 w-28 sm:w-36 md:w-40 h-3 sm:h-3.5 bg-[#252821]/15 rounded-full blur-[2px] -z-0" />
      </div>
    </div>
  );
}
