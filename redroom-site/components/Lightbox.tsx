"use client";

import { useEffect, useRef, useState } from "react";

type LightboxImage = { src: string; alt: string };

type LightboxProps = {
  /** When non-null, the lightbox is open. Pass null to close. */
  images: LightboxImage[] | null;
  /** Index of the active image into `images`. */
  index: number;
  onIndexChange: (next: number) => void;
  /** Resolves the gallery element matching a given image index - used for the morph origin/destination. */
  originForIndex: (i: number) => HTMLElement | null;
  /** Optional caption builder. Called with the current index. */
  captionForIndex?: (i: number) => string | undefined;
  onClose: () => void;
};

type Rect = { top: number; left: number; width: number; height: number };

const PAD = 48; // viewport padding when fully open
const PAD_SM = 16;

function getOriginRect(el: HTMLElement | null): Rect {
  if (!el) {
    const w = typeof window !== "undefined" ? window.innerWidth : 1024;
    const h = typeof window !== "undefined" ? window.innerHeight : 768;
    return { top: h / 2, left: w / 2, width: 0, height: 0 };
  }
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

function getTargetRect(): Rect {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pad = vw < 640 ? PAD_SM : PAD;
  const w = vw - pad * 2;
  const h = vh - pad * 2 - 64; // leave room for caption / close
  return {
    top: (vh - h) / 2,
    left: (vw - w) / 2,
    width: w,
    height: h,
  };
}

export function Lightbox({
  images,
  index,
  onIndexChange,
  originForIndex,
  captionForIndex,
  onClose,
}: LightboxProps) {
  const [phase, setPhase] = useState<"closed" | "opening" | "open" | "closing">(
    "closed",
  );
  const [rect, setRect] = useState<Rect | null>(null);
  const [backdrop, setBackdrop] = useState(0);
  const [dragDx, setDragDx] = useState(0);
  const [animateSlide, setAnimateSlide] = useState(true);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    moved: boolean;
  } | null>(null);

  const isOpen = images !== null && images.length > 0;
  const count = images?.length ?? 0;

  // Open / close lifecycle (driven by `images` becoming null)
  useEffect(() => {
    if (!isOpen) {
      // Close requested
      if (phase === "open" || phase === "opening") {
        const back = getOriginRect(originForIndex(index));
        setRect(back);
        setBackdrop(0);
        setPhase("closing");
        const t = window.setTimeout(() => {
          setPhase("closed");
          lastFocused.current?.focus({ preventScroll: true });
          lastFocused.current = null;
        }, 360);
        return () => window.clearTimeout(t);
      }
      return;
    }

    // Open requested (only when transitioning from a non-open phase)
    if (phase !== "closed") return;
    lastFocused.current = (document.activeElement as HTMLElement) ?? null;
    const start = getOriginRect(originForIndex(index));
    setRect(start);
    setBackdrop(0);
    setDragDx(0);
    setPhase("opening");

    let r1 = 0;
    let r2 = 0;
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        setRect(getTargetRect());
        setBackdrop(1);
      });
    });
    const t = window.setTimeout(() => {
      setPhase("open");
      closeBtnRef.current?.focus({ preventScroll: true });
    }, 380);

    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Reposition on resize while open
  useEffect(() => {
    if (phase !== "open") return;
    const onResize = () => setRect(getTargetRect());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [phase]);

  // Esc + arrow keys + focus trap + body scroll lock
  useEffect(() => {
    if (phase === "closed") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, count, index]);

  function go(delta: number) {
    if (count === 0) return;
    const next = (((index + delta) % count) + count) % count; // loop
    setAnimateSlide(true);
    setDragDx(0);
    onIndexChange(next);
  }
  function next() {
    go(1);
  }
  function prev() {
    go(-1);
  }

  // Pointer drag for swipe-to-navigate (only when fully open)
  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (phase !== "open") return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      moved: false,
    };
    setAnimateSlide(false);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const s = dragRef.current;
    if (!s || s.pointerId !== e.pointerId) return;
    const dx = e.clientX - s.startX;
    if (Math.abs(dx) > 4) s.moved = true;
    setDragDx(dx);
  }
  function onPointerEnd(e: React.PointerEvent<HTMLDivElement>) {
    const s = dragRef.current;
    if (!s || s.pointerId !== e.pointerId) return;
    const w = rect?.width ?? window.innerWidth;
    const dx = e.clientX - s.startX;
    const target = e.currentTarget as HTMLElement;
    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }
    dragRef.current = null;
    setAnimateSlide(true);
    // Threshold: 18% of the image width or 80 px, whichever is smaller.
    const threshold = Math.min(w * 0.18, 80);
    if (dx <= -threshold) {
      go(1);
    } else if (dx >= threshold) {
      go(-1);
    } else {
      setDragDx(0);
    }
  }

  if (phase === "closed" || !rect || !images) return null;

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const showChrome = phase === "open" || phase === "opening";
  const caption = captionForIndex?.(index);

  // The sliding strip is `count * 100%` wide (relative to the morph container)
  // and each child is `100/count %` of the strip - i.e. exactly one container
  // width. Therefore one step = `100/count %` of the strip, NOT `100%`.
  const stepPct = count > 0 ? 100 / count : 0;
  const slideStyle: React.CSSProperties = {
    transform: `translate3d(calc(${-index * stepPct}% + ${dragDx}px), 0, 0)`,
    transition:
      animateSlide && !reduced
        ? "transform .45s cubic-bezier(.22,1,.36,1)"
        : "none",
    width: `${count * 100}%`,
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={images[index]?.alt || "Image preview"}
      className="fixed inset-0 z-[100]"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close image"
        onClick={onClose}
        tabIndex={-1}
        className="absolute inset-0 cursor-zoom-out bg-ink-900"
        style={{
          opacity: backdrop * 0.92,
          transition: reduced
            ? "none"
            : "opacity .35s cubic-bezier(.2,.8,.2,1)",
        }}
      />

      {/* Morphing container */}
      <div
        ref={trackRef}
        className="absolute touch-none select-none overflow-hidden rounded-2xl bg-ink-900 shadow-burgundy-lg"
        style={{
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          transition: reduced
            ? "none"
            : "top .42s cubic-bezier(.22,1,.36,1), left .42s cubic-bezier(.22,1,.36,1), width .42s cubic-bezier(.22,1,.36,1), height .42s cubic-bezier(.22,1,.36,1)",
          willChange: "top, left, width, height",
          cursor: phase === "open" && count > 1 ? "grab" : "default",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        {/* Sliding strip of all images */}
        <div className="flex h-full" style={slideStyle}>
          {images.map((img, i) => (
            <div
              key={i}
              className="relative h-full shrink-0"
              style={{ width: `${100 / count}%` }}
              aria-hidden={i !== index}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={i === index ? img.alt : ""}
                draggable={false}
                className="block h-full w-full select-none object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next buttons */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-bone-50/10 text-bone-50 ring-1 ring-bone-50/20 backdrop-blur-md transition-colors duration-200 hover:bg-bone-50 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-400 sm:left-6"
            style={{
              opacity: showChrome ? backdrop : 0,
              transition: reduced ? "none" : "opacity .35s ease .1s",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-bone-50/10 text-bone-50 ring-1 ring-bone-50/20 backdrop-blur-md transition-colors duration-200 hover:bg-bone-50 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-400 sm:right-6"
            style={{
              opacity: showChrome ? backdrop : 0,
              transition: reduced ? "none" : "opacity .35s ease .1s",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </>
      )}

      {/* Caption + counter */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-4 sm:p-8"
        style={{
          opacity: backdrop,
          transition: reduced ? "none" : "opacity .35s ease .15s",
        }}
      >
        {caption ? (
          <p className="pointer-events-auto max-w-2xl text-caption tracking-label text-bone-50/80">
            {caption}
          </p>
        ) : (
          <span />
        )}
        {count > 1 && (
          <p className="text-caption tracking-label text-bone-50/60">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </p>
        )}
      </div>

      <button
        ref={closeBtnRef}
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-4 top-4 inline-flex size-12 items-center justify-center rounded-full bg-bone-50/10 text-bone-50 ring-1 ring-bone-50/20 backdrop-blur-md transition-colors duration-200 hover:bg-bone-50 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-400 sm:right-8 sm:top-8"
        style={{
          opacity: backdrop,
          transition: reduced
            ? "none"
            : "opacity .35s ease .1s, background-color .2s, color .2s",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}
