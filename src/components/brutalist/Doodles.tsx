"use client";

import React from "react";

/**
 * Hand-drawn SVG doodle assets for neo-brutalist scrapbook styling.
 * Crisp black strokes, playful curves, and flat pastel fills.
 */

// 4-pointed sparkle star with crisp black outline
export function SparkleStar({
  className = "w-6 h-6",
  color = "#FFE57F",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M24 2C24 14.15 14.15 24 2 24C14.15 24 24 33.85 24 46C24 33.85 33.85 24 46 24C33.85 24 24 14.15 24 2Z"
        fill={color}
        stroke="#111111"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 5-pointed or 8-pointed hand-drawn star badge (like the pink star overlapping the contact box)
export function HandDrawnStar({
  className = "w-12 h-12",
  color = "#FFAEC8",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M30 4L36.5 19.5L53.5 20L40.5 31.5L45 48L30 38.5L15 48L19.5 31.5L6.5 20L23.5 19.5L30 4Z"
        fill={color}
        stroke="#111111"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Blue squiggle / doodle underline for "My Portfolio"
export function BlueSquiggle({
  className = "w-36 h-4",
  color = "#3B82F6",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 14C24 6 42 16 63 9C84 2 105 16 126 8C138 3 150 11 157 7"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Curved hand-drawn arrow pointing from text to an element
export function CurvedArrow({
  className = "w-16 h-12",
  color = "#111111",
  flip = false,
}: {
  className?: string;
  color?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 70 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${flip ? "-scale-x-100" : ""}`}
    >
      <path
        d="M8 8C18 32 38 42 58 35"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M48 42L60 35L54 23"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Playful browser window smiley face illustration
export function BrowserSmiley({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Head circle */}
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="#FFE57F"
        stroke="#111111"
        strokeWidth="3"
      />
      {/* Left eye - playful wink or arched lash */}
      <ellipse cx="42" cy="50" rx="4.5" ry="7" fill="#111111" />
      {/* Right eye - happy arched wink */}
      <path
        d="M70 51C73 45 83 45 86 51"
        stroke="#111111"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Big joyful smile */}
      <path
        d="M38 68C42 82 78 82 82 68"
        stroke="#111111"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="#FFFFFF"
      />
      <path
        d="M40 70C46 80 74 80 80 70"
        stroke="#111111"
        strokeWidth="2"
        fill="#FFAEC8"
      />
      {/* Rosy cheeks */}
      <circle cx="30" cy="62" r="5" fill="#FFAEC8" opacity="0.8" />
      <circle cx="90" cy="62" r="5" fill="#FFAEC8" opacity="0.8" />
      {/* Little highlight spark */}
      <path
        d="M88 28L92 20L96 28L104 32L96 36L92 44L88 36L80 32L88 28Z"
        fill="#FFFFFF"
        stroke="#111111"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// Geometric scrapbook plus sign decoration
export function GeometricCross({
  className = "w-4 h-4",
  color = "#111111",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 2V18M2 10H18"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

// Small hand-drawn circle scribble
export function ScribbleCircle({
  className = "w-8 h-8",
  color = "#111111",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18 4C10 4 5 10 5 18C5 26 11 31 19 31C27 31 32 25 31 17C30 9 24 5 16 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Himang Panchal's signature artistic logo emblem in neo-brutalist styling
export function HPLogoBadge({
  className = "w-9 h-9 sm:w-10 sm:h-10",
  bgColor = "bg-[#FFE57F]",
}: {
  className?: string;
  bgColor?: string;
}) {
  return (
    <div
      className={`${className} rounded-xl ${bgColor} border-2 border-black flex items-center justify-center p-1.5 shadow-brutal-xs group-hover:-rotate-6 transition-transform shrink-0`}
    >
      <svg
        viewBox="0 0 593 404"
        fill="currentColor"
        fillRule="evenodd"
        className="w-full h-full text-black"
      >
        <path d="M 292 0 L 257 6 L 236 12 L 154 54 L 143 58 L 84 67 L 122 105 L 117 121 L 116 150 L 121 164 L 127 169 L 131 176 L 132 184 L 130 185 L 127 179 L 123 175 L 121 174 L 121 176 L 134 195 L 139 219 L 146 225 L 158 230 L 169 230 L 179 227 L 197 217 L 214 199 L 242 190 L 255 179 L 260 171 L 269 133 L 278 102 L 282 94 L 291 88 L 310 85 L 341 72 L 363 67 L 402 67 L 448 71 L 494 80 L 532 91 L 546 98 L 574 130 L 578 140 L 578 146 L 574 152 L 563 152 L 544 131 L 532 124 L 521 120 L 519 121 L 544 136 L 561 152 L 577 179 L 577 189 L 573 192 L 563 192 L 559 190 L 536 167 L 511 153 L 530 166 L 551 186 L 563 200 L 565 204 L 565 212 L 556 219 L 545 217 L 506 186 L 493 178 L 490 178 L 490 180 L 537 224 L 539 228 L 539 236 L 534 240 L 528 241 L 511 234 L 451 190 L 419 185 L 405 180 L 377 166 L 360 166 L 349 169 L 318 184 L 251 225 L 231 235 L 172 248 L 169 251 L 166 262 L 157 277 L 136 296 L 114 308 L 104 310 L 70 309 L 43 304 L 25 297 L 11 297 L 3 303 L 0 309 L 1 323 L 5 333 L 10 338 L 15 340 L 49 344 L 85 355 L 152 355 L 170 351 L 193 339 L 213 332 L 228 328 L 240 328 L 274 348 L 285 361 L 308 382 L 313 389 L 320 393 L 339 396 L 359 403 L 387 403 L 398 399 L 411 398 L 424 389 L 437 371 L 437 368 L 435 367 L 410 373 L 387 381 L 349 382 L 336 385 L 327 385 L 315 380 L 305 368 L 290 362 L 285 357 L 277 343 L 266 340 L 245 327 L 247 322 L 262 315 L 274 314 L 274 311 L 253 294 L 235 273 L 224 252 L 224 246 L 228 243 L 242 248 L 257 261 L 291 283 L 304 284 L 320 278 L 328 273 L 325 268 L 285 252 L 277 242 L 277 234 L 283 228 L 291 228 L 303 237 L 315 243 L 330 245 L 342 249 L 357 258 L 379 278 L 392 286 L 404 290 L 429 293 L 439 296 L 463 315 L 471 318 L 481 320 L 497 318 L 520 319 L 538 312 L 547 305 L 558 293 L 576 267 L 586 240 L 592 204 L 592 165 L 581 106 L 576 92 L 558 68 L 543 57 L 521 46 L 518 43 L 517 34 L 514 28 L 499 18 L 490 15 L 461 11 L 418 2 L 370 5 L 341 0 L 291 1 Z M 169 155 L 173 154 L 175 156 L 168 166 L 168 171 L 172 175 L 176 175 L 179 171 L 179 165 L 174 167 L 174 162 L 178 158 L 183 162 L 185 166 L 185 174 L 182 180 L 176 184 L 169 184 L 161 174 L 161 163 L 163 159 L 170 154 Z" />
      </svg>
    </div>
  );
}
