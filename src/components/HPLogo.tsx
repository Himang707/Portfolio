"use client";

import React from "react";

interface HPLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  variant?: "natural" | "natural-dark" | "monochrome";
}

export default function HPLogo({
  className = "",
  size = 38,
  showText = false,
  variant = "natural",
}: HPLogoProps) {
  const numSize = typeof size === "number" ? size : 38;

  // Natural colors from the real artwork:
  // Black silhouette: #0E0F12 (rgb 6, 8, 5)
  // Warm cream/white background: #FAF7F2 (rgb 194, 189, 184 / off-white wall)
  const isDarkBadge = variant === "natural-dark";

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Emblem Container with Natural Colors */}
      <div
        className="relative flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-105 shadow-md"
        style={{
          width: numSize,
          height: numSize,
          background: isDarkBadge ? "#12141a" : "#FAF7F2",
          border: isDarkBadge
            ? "1px solid rgba(255, 255, 255, 0.12)"
            : "1px solid rgba(220, 215, 205, 0.6)",
          boxShadow: isDarkBadge
            ? "0 4px 14px rgba(0, 0, 0, 0.4)"
            : "0 4px 14px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Subtle Warm Halo on Hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: isDarkBadge
              ? "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(214,200,180,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Artwork SVG in Natural Palette */}
        <div className="relative w-full h-full p-1.5 flex items-center justify-center">
          <svg
            viewBox="0 0 593 404"
            fillRule="evenodd"
            className="w-full h-full transition-colors duration-300"
            style={{
              fill: isDarkBadge ? "#FAF7F2" : "#0E0F12",
              filter: isDarkBadge
                ? "drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
                : "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
            }}
          >
            <path
              d="M 292 0 L 257 6 L 236 12 L 154 54 L 143 58 L 84 67 L 122 105 L 117 121 L 116 150 L 121 164 L 127 169 L 131 176 L 132 184 L 130 185 L 127 179 L 123 175 L 121 174 L 121 176 L 134 195 L 139 219 L 146 225 L 158 230 L 169 230 L 179 227 L 197 217 L 214 199 L 242 190 L 255 179 L 260 171 L 269 133 L 278 102 L 282 94 L 291 88 L 310 85 L 341 72 L 363 67 L 402 67 L 448 71 L 494 80 L 532 91 L 546 98 L 574 130 L 578 140 L 578 146 L 574 152 L 563 152 L 544 131 L 532 124 L 521 120 L 519 121 L 544 136 L 561 152 L 577 179 L 577 189 L 573 192 L 563 192 L 559 190 L 536 167 L 511 153 L 530 166 L 551 186 L 563 200 L 565 204 L 565 212 L 556 219 L 545 217 L 506 186 L 493 178 L 490 178 L 490 180 L 537 224 L 539 228 L 539 236 L 534 240 L 528 241 L 511 234 L 451 190 L 419 185 L 405 180 L 377 166 L 360 166 L 349 169 L 318 184 L 251 225 L 231 235 L 172 248 L 169 251 L 166 262 L 157 277 L 136 296 L 114 308 L 104 310 L 70 309 L 43 304 L 25 297 L 11 297 L 3 303 L 0 309 L 1 323 L 5 333 L 10 338 L 15 340 L 49 344 L 85 355 L 152 355 L 170 351 L 193 339 L 213 332 L 228 328 L 240 328 L 274 348 L 285 361 L 308 382 L 313 389 L 320 393 L 339 396 L 359 403 L 387 403 L 398 399 L 411 398 L 424 389 L 437 371 L 437 368 L 435 367 L 410 373 L 387 381 L 349 382 L 336 385 L 327 385 L 315 380 L 305 368 L 290 362 L 285 357 L 277 343 L 266 340 L 245 327 L 247 322 L 262 315 L 274 314 L 274 311 L 253 294 L 235 273 L 224 252 L 224 246 L 228 243 L 242 248 L 257 261 L 291 283 L 304 284 L 320 278 L 328 273 L 325 268 L 285 252 L 277 242 L 277 234 L 283 228 L 291 228 L 303 237 L 315 243 L 330 245 L 342 249 L 357 258 L 379 278 L 392 286 L 404 290 L 429 293 L 439 296 L 463 315 L 471 318 L 481 320 L 497 318 L 520 319 L 538 312 L 547 305 L 558 293 L 576 267 L 586 240 L 592 204 L 592 165 L 581 106 L 576 92 L 558 68 L 543 57 L 521 46 L 518 43 L 517 34 L 514 28 L 499 18 L 490 15 L 461 11 L 418 2 L 370 5 L 341 0 L 291 1 Z M 169 155 L 173 154 L 175 156 L 168 166 L 168 171 L 172 175 L 176 175 L 179 171 L 179 165 L 174 167 L 174 162 L 178 158 L 183 162 L 185 166 L 185 174 L 182 180 L 176 184 L 169 184 L 161 174 L 161 163 L 163 159 L 170 154 Z"
            />
          </svg>
        </div>
      </div>

      {/* Optional Short Name HP Monogram */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-tight text-white text-[15px]">
              HP
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[10px] font-mono-code text-white/50 tracking-widest uppercase mt-0.5">
            HIMANG PANCHAL
          </span>
        </div>
      )}
    </div>
  );
}
