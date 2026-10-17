"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import FloatingLeaves from "./welcome/FloatingLeaves";
import SproutMascot from "./welcome/SproutMascot";
import GrowingPlant from "./welcome/GrowingPlant";
import { ArrowRight, Leaf } from "lucide-react";
import { playEnterSound, getSoundEnabled, setSoundEnabled } from "@/lib/soundEffects";

interface WelcomeStep {
  text: string;
  sub: string;
  targetProgress: number;
}

const WELCOME_MESSAGES: WelcomeStep[] = [
  {
    text: "Hey there! 👋",
    sub: "Initializing your visit",
    targetProgress: 24,
  },
  {
    text: "Welcome to my little corner of the internet.",
    sub: "Loading typography & natural palette",
    targetProgress: 48,
  },
  {
    text: "You're here to see my work... right? 👀",
    sub: "Gathering visual assets & projects",
    targetProgress: 72,
  },
  {
    text: "Great! Pretend you didn't see my unfinished projects. 😂",
    sub: "Fine-tuning layout & micro-interactions",
    targetProgress: 90,
  },
  {
    text: "Just preparing something awesome for you...",
    sub: "Finalizing ready state",
    targetProgress: 100,
  },
];

export default function LoadingScreen() {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAssetsReady, setIsAssetsReady] = useState(false);
  const [isReadyToEnter, setIsReadyToEnter] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const isCancelledRef = useRef(false);

  // Initialize sound preference
  useEffect(() => {
    setSoundOn(getSoundEnabled());
  }, []);

  // Trigger smooth exit transition into the portfolio with warm chime
  const handleEnterWorld = useCallback(() => {
    if (isExiting || isDone) return;
    playEnterSound();
    setIsExiting(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("welcome-entered"));
    }
    setTimeout(() => {
      setIsDone(true);
    }, 750);
  }, [isExiting, isDone]);

  // Measure ACTUAL Asset and Application Readiness
  useEffect(() => {
    let isSubscribed = true;

    const checkRealReadiness = async () => {
      try {
        // 1. Wait for DOM readyState
        if (document.readyState !== "complete") {
          await new Promise<void>((resolve) => {
            const onReady = () => {
              if (document.readyState === "complete") {
                window.removeEventListener("readystatechange", onReady);
                resolve();
              }
            };
            window.addEventListener("readystatechange", onReady);
            setTimeout(resolve, 800); // Safety fallback
          });
        }

        // 2. Preload essential fonts
        if (document.fonts) {
          try {
            await document.fonts.ready;
          } catch {
            // non-blocking
          }
        }

        // 3. Preload essential visual assets without blocking
        const coreImages = [
          "/images/hp-logo.svg",
          "/images/hp-artwork.png",
          "/images/himang-portrait.jpg",
        ];

        const imagePromises = coreImages.map(
          (src) =>
            new Promise<void>((res) => {
              const img = new Image();
              img.src = src;
              img.onload = () => res();
              img.onerror = () => res(); // Never fail or block on asset failure
            })
        );

        await Promise.race([
          Promise.all(imagePromises),
          new Promise((res) => setTimeout(res, 1200)), // 1.2s timeout
        ]);

        if (isSubscribed) {
          setIsAssetsReady(true);
        }
      } catch {
        if (isSubscribed) setIsAssetsReady(true);
      }
    };

    checkRealReadiness();

    return () => {
      isSubscribed = false;
    };
  }, []);

  // Sequential progression through Messages 1 to 5
  useEffect(() => {
    isCancelledRef.current = false;

    // Smooth numerical glide for honest progress updates
    const glideTo = (fromVal: number, toVal: number, durationMs: number): Promise<void> => {
      return new Promise((resolve) => {
        const startTime = performance.now();
        const step = (now: number) => {
          if (isCancelledRef.current) return;
          const elapsed = now - startTime;
          const t = Math.min(1, elapsed / durationMs);
          const eased = t * (2 - t); // Ease-out quad
          const current = Math.round(fromVal + (toVal - fromVal) * eased);
          setProgress(current);

          if (t < 1) {
            requestAnimationFrame(step);
          } else {
            setProgress(toVal);
            resolve();
          }
        };
        requestAnimationFrame(step);
      });
    };

    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const runWelcomeSequence = async () => {
      // Step 1: "Hey there! 👋"
      setCurrentStepIdx(0);
      await glideTo(0, WELCOME_MESSAGES[0].targetProgress, 600);
      if (isCancelledRef.current) return;
      await sleep(1400); // dwell time for message 1

      // Step 2: "Welcome to my little corner of the internet."
      setCurrentStepIdx(1);
      await glideTo(WELCOME_MESSAGES[0].targetProgress, WELCOME_MESSAGES[1].targetProgress, 650);
      if (isCancelledRef.current) return;
      await sleep(1500); // dwell time for message 2

      // Step 3: "You're here to see my work... right? 👀"
      setCurrentStepIdx(2);
      await glideTo(WELCOME_MESSAGES[1].targetProgress, WELCOME_MESSAGES[2].targetProgress, 700);
      if (isCancelledRef.current) return;
      await sleep(1600); // dwell time for message 3

      // Step 4: "Great! Pretend you didn't see my unfinished projects. 😂"
      setCurrentStepIdx(3);
      await glideTo(WELCOME_MESSAGES[2].targetProgress, WELCOME_MESSAGES[3].targetProgress, 750);
      if (isCancelledRef.current) return;
      await sleep(1700); // dwell time for message 4

      // Step 5: "Just preparing something awesome for you..."
      setCurrentStepIdx(4);
      await glideTo(WELCOME_MESSAGES[3].targetProgress, 100, 800);
      if (isCancelledRef.current) return;
      await sleep(1000);

      // Ready state unlocked
      setIsReadyToEnter(true);
    };

    runWelcomeSequence();

    return () => {
      isCancelledRef.current = true;
    };
  }, []);

  // Keyboard accessibility: Enter or Space to enter or advance message
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        if (isReadyToEnter) {
          e.preventDefault();
          handleEnterWorld();
        } else {
          // Advance to next message on space/enter
          setCurrentStepIdx((prev) => Math.min(WELCOME_MESSAGES.length - 1, prev + 1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isReadyToEnter, handleEnterWorld]);

  // Listen to `replay-welcome` event from Footer.tsx
  useEffect(() => {
    const handleReplay = () => {
      setIsDone(false);
      setIsExiting(false);
      setIsReadyToEnter(false);
      setProgress(0);
      setCurrentStepIdx(0);
      isCancelledRef.current = false;
    };

    window.addEventListener("replay-welcome", handleReplay);
    return () => window.removeEventListener("replay-welcome", handleReplay);
  }, []);

  if (isDone) return null;

  const currentMsg = WELCOME_MESSAGES[currentStepIdx] || WELCOME_MESSAGES[0];

  return (
    <div
      id="preloader"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome Loading Screen - Himang Panchal Portfolio"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center p-3 pt-14 pb-8 sm:p-6 select-none overflow-hidden min-h-[100dvh] transition-all duration-750 ease-out ${
        isExiting
          ? "opacity-0 scale-[1.05] blur-[4px] pointer-events-none"
          : "opacity-100 scale-100"
      }`}
      style={{ backgroundColor: "#F5F1E8" }}
    >
      {/* ── Natural Floating Leaves, Sunbeams & Paper Texture ── */}
      <FloatingLeaves />

      {/* ── Top Floating Header Controls ── */}
      <div className="absolute top-2.5 sm:top-6 inset-x-3 sm:inset-x-8 max-w-5xl mx-auto flex items-center justify-between z-20 pointer-events-auto">
        {/* Natural Monogram & Status Badge */}
        <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#FAF6EE]/90 backdrop-blur-md border border-[#252821]/20 rounded-full shadow-[2px_2px_0px_#252821] text-[#252821]">
          {/* Himang's Artistic Bird Monogram Emblem */}
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#355E3B] text-[#F5F1E8] flex items-center justify-center p-0.5 sm:p-1">
            <svg
              viewBox="0 0 593 404"
              fill="currentColor"
              className="w-full h-full"
            >
              <path d="M 292 0 L 257 6 L 236 12 L 154 54 L 143 58 L 84 67 L 122 105 L 117 121 L 116 150 L 121 164 L 127 169 L 131 176 L 132 184 L 130 185 L 127 179 L 123 175 L 121 174 L 121 176 L 134 195 L 139 219 L 146 225 L 158 230 L 169 230 L 179 227 L 197 217 L 214 199 L 242 190 L 255 179 L 260 171 L 269 133 L 278 102 L 282 94 L 291 88 L 310 85 L 341 72 L 363 67 L 402 67 L 448 71 L 494 80 L 532 91 L 546 98 L 574 130 L 578 140 L 578 146 L 574 152 L 563 152 L 544 131 L 532 124 L 521 120 L 519 121 L 544 136 L 561 152 L 577 179 L 577 189 L 573 192 L 563 192 L 559 190 L 536 167 L 511 153 L 530 166 L 551 186 L 563 200 L 565 204 L 565 212 L 556 219 L 545 217 L 506 186 L 493 178 L 490 178 L 490 180 L 537 224 L 539 228 L 539 236 L 534 240 L 528 241 L 511 234 L 451 190 L 419 185 L 405 180 L 377 166 L 360 166 L 349 169 L 318 184 L 251 225 L 231 235 L 172 248 L 169 251 L 166 262 L 157 277 L 136 296 L 114 308 L 104 310 L 70 309 L 43 304 L 25 297 L 11 297 L 3 303 L 0 309 L 1 323 L 5 333 L 10 338 L 15 340 L 49 344 L 85 355 L 152 355 L 170 351 L 193 339 L 213 332 L 228 328 L 240 328 L 274 348 L 285 361 L 308 382 L 313 389 L 320 393 L 339 396 L 359 403 L 387 403 L 398 399 L 411 398 L 424 389 L 437 371 L 437 368 L 435 367 L 410 373 L 387 381 L 349 382 L 336 385 L 327 385 L 315 380 L 305 368 L 290 362 L 285 357 L 277 343 L 266 340 L 245 327 L 247 322 L 262 315 L 274 314 L 274 311 L 253 294 L 235 273 L 224 252 L 224 246 L 228 243 L 242 248 L 257 261 L 291 283 L 304 284 L 320 278 L 328 273 L 325 268 L 285 252 L 277 242 L 277 234 L 283 228 L 291 228 L 303 237 L 315 243 L 330 245 L 342 249 L 357 258 L 379 278 L 392 286 L 404 290 L 429 293 L 439 296 L 463 315 L 471 318 L 481 320 L 497 318 L 520 319 L 538 312 L 547 305 L 558 293 L 576 267 L 586 240 L 592 204 L 592 165 L 581 106 L 576 92 L 558 68 L 543 57 L 521 46 L 518 43 L 517 34 L 514 28 L 499 18 L 490 15 L 461 11 L 418 2 L 370 5 L 341 0 L 291 1 Z" />
            </svg>
          </div>
          <span className="font-space font-bold text-xs sm:text-sm tracking-tight text-[#252821]">
            Himang Panchal
          </span>
          <span className="text-[11px] text-[#355E3B] font-semibold hidden sm:inline">
            · Portfolio Experience
          </span>
        </div>

        {/* Audio Mute/Unmute Toggle */}
        <button
          onClick={() => {
            const next = !soundOn;
            setSoundOn(next);
            setSoundEnabled(next);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF6EE]/90 hover:bg-[#FFE57F] backdrop-blur-md border border-[#252821]/20 rounded-full shadow-[2px_2px_0px_#252821] text-xs font-space font-bold text-[#252821] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title={soundOn ? "Mute interactive audio" : "Enable interactive audio"}
        >
          <span className="text-sm leading-none">{soundOn ? "🔊" : "🔇"}</span>
          <span className="hidden sm:inline text-[11px] font-space font-bold uppercase tracking-wider">
            {soundOn ? "Audio On" : "Muted"}
          </span>
        </button>
      </div>

      {/* ── Central Main Welcoming Card ── */}
      <div
        className="relative z-10 w-[92vw] max-w-xl md:max-w-2xl my-auto pt-9 sm:pt-12 pb-5 sm:pb-7 px-4 sm:px-8 md:px-10 bg-[#FAF6EE] border-2 sm:border-3 border-[#252821] rounded-[1.75rem] sm:rounded-[2.5rem] shadow-[5px_5px_0px_#252821] sm:shadow-[8px_8px_0px_#252821] flex flex-col items-center text-center transition-all duration-500"
      >
        {/* Subtle Decorative Botanical Corners */}
        <div className="absolute top-4 left-4 text-[#A3B18A] opacity-40 pointer-events-none hidden sm:block">
          <Leaf className="w-5 h-5 -rotate-45" />
        </div>
        <div className="absolute top-4 right-4 text-[#A3B18A] opacity-40 pointer-events-none hidden sm:block">
          <Leaf className="w-5 h-5 rotate-45" />
        </div>

        {/* ── 1. Mascot Character ("Sprout") with Interactive Eye Tracking & Quips ── */}
        <div className="mt-8 sm:mt-10 mb-2 sm:mb-3">
          <SproutMascot
            progress={progress}
            isReady={isReadyToEnter}
            onMascotClick={() => {
              // Clicking mascot also gently progresses the experience
              if (!isReadyToEnter) {
                setProgress((p) => Math.min(95, p + 8));
              }
            }}
          />
        </div>

        {/* ── 2. Sequential Welcoming Messages or Final Greeting ── */}
        <div className="min-h-[70px] sm:min-h-[80px] flex flex-col items-center justify-center w-full px-2">
          {isReadyToEnter ? (
            // Final Welcome State
            <div className="space-y-1 animate-slide-up">
              <h2 className="font-space font-black text-2xl sm:text-3xl md:text-4xl text-[#252821] tracking-tight">
                Alright, you&apos;re in! 🌿
              </h2>
              <p className="font-space font-semibold text-sm sm:text-base text-[#9C7655]">
                Welcome to my portfolio. Let&apos;s explore something cool.
              </p>
            </div>
          ) : (
            // Sequential Greeting Steps (Messages 1 to 5)
            <div
              key={currentStepIdx}
              className="space-y-1.5 animate-slide-up cursor-pointer"
              onClick={() => {
                // Clicking message advances naturally
                setCurrentStepIdx((prev) => Math.min(WELCOME_MESSAGES.length - 1, prev + 1));
              }}
              title="Click to advance greeting"
            >
              <h2 className="font-space font-black text-xl sm:text-2xl md:text-3xl text-[#252821] tracking-tight leading-snug">
                {currentMsg.text}
              </h2>
              <p className="font-space font-medium text-xs sm:text-sm text-[#9C7655]">
                {currentMsg.sub}
              </p>
            </div>
          )}
        </div>

        {/* ── 3. Botanical Loading Progress / Plant Growing Indicator ── */}
        <div className="my-2 sm:my-3 w-full flex justify-center">
          <GrowingPlant
            progress={progress}
            isReady={isReadyToEnter}
            stageName={
              isReadyToEnter
                ? "Experience bloomed!"
                : WELCOME_MESSAGES[currentStepIdx]?.sub
            }
          />
        </div>

        {/* ── 4. Final Welcome Interaction (ENTER MY WORLD Button) ── */}
        {isReadyToEnter ? (
          <div className="w-full pt-3 sm:pt-4 flex flex-col items-center animate-slide-up">
            <button
              onClick={handleEnterWorld}
              className="relative group inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 bg-[#355E3B] hover:bg-[#2B4C30] text-[#F5F1E8] font-space font-black text-sm sm:text-base tracking-wider uppercase rounded-full border-2 border-[#252821] shadow-[4px_4px_0px_#252821] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#252821] active:translate-y-0.5 active:shadow-[2px_2px_0px_#252821] transition-all duration-200 cursor-pointer overflow-hidden focus:outline-none focus:ring-4 focus:ring-[#A3B18A]/50"
            >
              {/* Sliding Tiny Leaf Across Button on Hover */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="absolute top-1/2 -translate-y-1/2 text-sm select-none inline-block animate-leaf-glide">
                  🍃
                </span>
              </div>

              {/* Button Text */}
              <span className="relative z-10 flex items-center gap-2">
                <span>ENTER MY WORLD</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </span>
            </button>
          </div>
        ) : (
          /* Subtle Sequential Dots Indicator */
          <div className="flex items-center gap-1.5 pt-2">
            {WELCOME_MESSAGES.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStepIdx
                    ? "w-6 bg-[#355E3B]"
                    : idx < currentStepIdx
                    ? "w-2 bg-[#A3B18A]"
                    : "w-2 bg-[#D8D2C4]"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Footer Subtle Aesthetic Note ── */}
      <div className="absolute bottom-3 sm:bottom-4 inset-x-4 text-center pointer-events-none">
        <p className="font-space font-medium text-[11px] sm:text-xs text-[#252821]/60 tracking-wide">
          Crafted with care, nature-inspired design &amp; clean code ✨
        </p>
      </div>
    </div>
  );
}
