"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=2400&q=80",
];

const SLIDE_MS = 5000;
const REVEAL_MS = 1400;

export function HeroCarousel() {
  const [base, setBase] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const transitioning = useRef(false);

  const advance = useCallback(() => {
    if (transitioning.current) return;
    transitioning.current = true;
    setBase((b) => {
      const n = (b + 1) % IMAGES.length;
      setIncoming(n);
      window.setTimeout(() => {
        setBase(n);
        setIncoming(null);
        transitioning.current = false;
      }, REVEAL_MS);
      return b;
    });
  }, []);

  // Auto-advance
  useEffect(() => {
    if (incoming !== null) return;
    const id = window.setTimeout(advance, SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [base, incoming, advance]);

  return (
    <>
      {/* Stacked image layers */}
      <div className="absolute inset-0 -z-10">
        {/* Base layer - currently revealed image */}
        <div key={`base-${base}`} className="hero-asset hero-asset--base">
          <div className="hero-asset__inner">
            <Image src={IMAGES[base]} alt="" aria-hidden="true" fill priority sizes="100vw" className="object-cover" />
          </div>
        </div>

        {/* Incoming layer - wipes in on top */}
        {incoming !== null && (
          <div key={`reveal-${incoming}`} className="hero-asset hero-asset--reveal" style={{ zIndex: 2 }}>
            <div className="hero-asset__inner">
              <Image
                src={IMAGES[incoming]}
                alt=""
                aria-hidden="true"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Overlay gradient for legibility */}
        <div
          aria-hidden="true"
          className="from-bone-50/40 via-bone-50/10 to-bone-50/80 dark:from-ink-900/80 dark:via-ink-900/40 dark:to-ink-900/95 absolute inset-0 z-10 bg-linear-to-b"
        />
      </div>
    </>
  );
}
