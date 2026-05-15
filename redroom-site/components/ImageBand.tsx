"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ImageBandProps = {
  src: string;
  alt: string;
  /** Kept for API compatibility; both variants now fill the viewport. */
  height?: "tall" | "short";
  caption?: { label: string; line: string };
  /** How far (in px) the image drifts across its full travel through the viewport. */
  parallaxRange?: number;
};

export function ImageBand({
  src,
  alt,
  caption,
  parallaxRange = 160,
}: ImageBandProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Reveal on first enter - drives the bottom-up zoom-in animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRevealed(true);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Parallax: translate the over-sized image based on the section's
  // position within the viewport.
  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const wrap = parallaxRef.current;
    if (!section || !wrap) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the section is just entering from the bottom,
      // 1 when it has just left from the top.
      const progress = 1 - (rect.top + rect.height) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      const y = (0.5 - clamped) * parallaxRange;
      wrap.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [parallaxRange, reduced]);

  const showOpen = reduced || revealed;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[560px] overflow-hidden bg-ink-900"
    >
      {/* Reveal mask: clip from bottom up on first scroll-in */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: showOpen ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
          transition: reduced
            ? "none"
            : "clip-path 1.4s cubic-bezier(.2,.8,.2,1)",
        }}
      >
        {/* Parallax wrapper - oversized so translate never exposes edges */}
        <div
          ref={parallaxRef}
          className="absolute inset-x-0 -inset-y-[14%] will-change-transform"
        >
          {/* Zoom-in from bottom origin on first reveal */}
          <div
            className="relative h-full w-full"
            style={{
              transform: showOpen ? "scale(1)" : "scale(1.2)",
              transformOrigin: "50% 100%",
              transition: reduced
                ? "none"
                : "transform 1.6s cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {caption && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-900/70 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0">
            <div
              className={`mx-auto max-w-[1440px] px-6 pb-10 transition-all duration-1000 ease-out sm:px-12 sm:pb-14 ${
                showOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: showOpen && !reduced ? "0.6s" : "0s" }}
            >
              <p className="label text-bone-50/90">{caption.label}</p>
              <p className="mt-4 text-body-lg font-light italic text-bone-50/90">
                {caption.line}
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
