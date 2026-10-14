"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTextHover, setIsTextHover] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const rippleCount = useRef(0);

  // Direct 1:1 motion values for zero-latency tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const isVisibleRef = useRef(false);
  const lastHoverRef = useRef(false);
  const lastTextHoverRef = useRef(false);
  const lastCursorTextRef = useRef("");

  useEffect(() => {
    // Completely disable on touch screens or coarse pointer devices
    if (typeof window === "undefined") return;
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    if (isTouch) return;

    setMounted(true);
    document.documentElement.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const newRipple: ClickRipple = {
        id: ++rippleCount.current,
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 500);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if hovering over editable text or terminal
      const isInput = Boolean(
        target.closest("input, textarea, [contenteditable='true'], .cursor-text")
      );
      if (lastTextHoverRef.current !== isInput) {
        lastTextHoverRef.current = isInput;
        setIsTextHover(isInput);
      }

      let newHover = false;
      let newText = "";

      // Check explicit data-cursor hints
      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorAttr) {
        newHover = true;
        if (cursorAttr === "VIEW") {
          newText = "VIEW";
        } else if (cursorAttr === "OPEN") {
          newText = "OPEN";
        } else if (cursorAttr === "EXPLORE") {
          newText = "EXPLORE";
        } else if (cursorAttr === "COPY") {
          newText = "COPY";
        } else {
          newText = cursorAttr;
        }
      } else if (target.closest("button") || target.closest("[role='button']")) {
        newHover = true;
        newText = "";
      } else if (target.closest("a")) {
        newHover = true;
        newText = "OPEN";
      } else if (target.closest("img") || target.closest(".project-preview-wrap")) {
        newHover = true;
        newText = "EXPLORE";
      } else if (target.closest(".cursor-pointer")) {
        newHover = true;
        newText = "";
      }

      if (lastHoverRef.current !== newHover) {
        lastHoverRef.current = newHover;
        setIsHovering(newHover);
      }
      if (lastCursorTextRef.current !== newText) {
        lastCursorTextRef.current = newText;
        setCursorText(newText);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleElementHover, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!mounted || !isVisible || isTextHover) return null;

  return (
    <>
      {/* Click ripples at fingertip */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ opacity: 0.9, scale: 0.2 }}
          animate={{ opacity: 0, scale: 2.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
          className="fixed pointer-events-none z-[99998] w-7 h-7 rounded-full border border-[#D4AF37] shadow-[0_0_12px_#D4AF37]"
        />
      ))}

      {/* Main Cursor Hand Container */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] select-none will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      >
        {/* Hand Image with Hotspot Anchored at Index Fingertip (10.77%, 0.75%) */}
        <motion.div
          animate={{
            scale: isClicking ? 0.88 : isHovering ? 1.12 : 1,
            rotate: isClicking ? -7 : isHovering ? 3 : 0,
            y: isClicking ? 2 : 0,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 400,
            mass: 0.3,
          }}
          style={{
            transformOrigin: "10.77% 0.75%",
            // Shift so fingertip (x: 28px, y: 2px of 260x268) is exactly at mouse coordinate (0, 0)
            transform: "translate(-10.77%, -0.75%)",
          }}
          className="relative"
        >
          {/* Animated subtle golden glow under hand when hovering interactive elements */}
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.7, scale: 1.15 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-1 -left-1 w-9 h-9 rounded-full bg-[#D4AF37]/35 blur-md -z-10"
            />
          )}

          {/* Cartoon Hand Image from Pinterest */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cursors/hand-cursor.png"
            alt="Cartoon Hand Cursor"
            width={38}
            height={39}
            className={`w-[38px] h-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] ${
              isHovering ? "drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" : ""
            }`}
            draggable={false}
          />

          {/* Floating Luxury Action Pill Badge ("OPEN", "VIEW", "EXPLORE", "COPY") */}
          <AnimatePresence>
            {cursorText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6, x: 26, y: 6 }}
                animate={{ opacity: 1, scale: 1, x: 38, y: 8 }}
                exit={{ opacity: 0, scale: 0.6, x: 26, y: 6 }}
                transition={{ type: "spring", damping: 22, stiffness: 380 }}
                className="absolute top-0 left-0 px-2.5 py-1 rounded-full bg-[#0E0C09]/95 border border-[#D4AF37]/70 text-[#F5D77F] shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(212,175,55,0.35)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                  {cursorText}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
