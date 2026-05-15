"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Lightbox } from "./Lightbox";

type Project = {
  index: string;
  name: string;
  location: string;
  year: string;
  preamble: string;
  images: { src: string; alt: string }[];
};

const projects: Project[] = [
  {
    index: "N° 014",
    name: "Östermalm Apartment",
    location: "Stockholm · Residential",
    year: "2025",
    preamble:
      "A turn-of-the-century three-bedroom rebuilt from the studs out - restored cornices, a quiet new kitchen in oiled oak, and brass fittings made to last another century.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1600&q=80",
        alt: "Warm kitchen with oak cabinetry and brass fixtures",
      },
      {
        src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
        alt: "Living room with restored cornices and warm light",
      },
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        alt: "Hallway looking through to a bright bedroom",
      },
    ],
  },
  {
    index: "N° 015",
    name: "Söder Workshop Café",
    location: "Stockholm · Hospitality",
    year: "2025",
    preamble:
      "A neighbourhood café and roastery on Hornsgatan. Concrete made warm with reclaimed pine, a steel mezzanine, and a service counter shaped around the morning rush.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
        alt: "Café interior with timber and concrete",
      },
      {
        src: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1600&q=80",
        alt: "Café service counter detail",
      },
      {
        src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1600&q=80",
        alt: "Espresso bar with brass detailing",
      },
    ],
  },
  {
    index: "N° 016",
    name: "Vasastan Townhouse",
    location: "Stockholm · Residential",
    year: "2024",
    preamble:
      "A four-storey townhouse re-planned around a new central stair. New services, new envelope, and a quiet material palette that lets the original structure speak.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
        alt: "Townhouse stairwell with timber treads",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
        alt: "Open-plan living and dining",
      },
      {
        src: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1600&q=80",
        alt: "Bathroom with stone and brass",
      },
    ],
  },
  {
    index: "N° 017",
    name: "Strandvägen Office",
    location: "Stockholm · Commercial",
    year: "2024",
    preamble:
      "A senior advisory firm's headquarters in a heritage building. Acoustic plaster ceilings, custom joinery in walnut, and a discreet AV fit-out concealed inside the millwork.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
        alt: "Reception with walnut joinery",
      },
      {
        src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
        alt: "Boardroom with acoustic ceiling",
      },
      {
        src: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1600&q=80",
        alt: "Quiet workspace nook",
      },
    ],
  },
];

export function Gallery() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<{
    startX: number;
    startScroll: number;
    pointerId: number;
    moved: boolean;
  } | null>(null);
  const suppressNextClick = useRef(false);

  // Lightbox state - track project index + image index separately so we can
  // navigate (loop) through a project's 3 images while the lightbox is open.
  const [lightboxProject, setLightboxProject] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const imageButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  function openLightbox(key: string) {
    if (suppressNextClick.current) return;
    const [pi, ii] = key.split(":").map(Number);
    setLightboxProject(pi);
    setLightboxIndex(ii);
  }

  function closeLightbox() {
    setLightboxProject(null);
  }

  const lightboxImages =
    lightboxProject !== null
      ? (projects[lightboxProject]?.images ?? null)
      : null;

  const lightboxCaption = (i: number) => {
    if (lightboxProject === null) return undefined;
    const p = projects[lightboxProject];
    if (!p) return undefined;
    return `${p.index} - ${p.name}, ${p.location} · ${p.year}`;
  };

  const originForIndex = (i: number): HTMLElement | null => {
    if (lightboxProject === null) return null;
    return imageButtonRefs.current.get(`${lightboxProject}:${i}`) ?? null;
  };

  // Track scroll position → active card + progress
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? track.scrollLeft / max : 0;
      setProgress(p);

      const cards = Array.from(
        track.querySelectorAll<HTMLElement>("[data-card]"),
      );
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      cards.forEach((c, i) => {
        const cardCenter = c.offsetLeft + c.clientWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActive(closest);
    };

    onScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Pointer-drag scrolling (desktop mouse + touch fallback)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const DRAG_THRESHOLD = 5;

    const onPointerDown = (e: PointerEvent) => {
      // Allow native touch panning on touch devices
      if (e.pointerType === "touch") return;
      // Only react to primary mouse button
      if (e.button !== 0) return;
      dragState.current = {
        startX: e.clientX,
        startScroll: track.scrollLeft,
        pointerId: e.pointerId,
        moved: false,
      };
      // NOTE: do NOT setPointerCapture here. Capturing immediately would
      // hijack the click event from any focusable child (image buttons),
      // preventing them from firing on a simple mouse click.
    };

    const onPointerMove = (e: PointerEvent) => {
      const s = dragState.current;
      if (!s || s.pointerId !== e.pointerId) return;
      const dx = e.clientX - s.startX;
      if (!s.moved) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        s.moved = true;
        // Promote to a real drag now that the user has moved past the
        // threshold - capture so we keep getting move/up events.
        try {
          track.setPointerCapture(e.pointerId);
        } catch {
          /* no-op */
        }
        setIsDragging(true);
      }
      track.scrollLeft = s.startScroll - dx;
      e.preventDefault();
    };

    const endDrag = (e: PointerEvent) => {
      const s = dragState.current;
      if (!s || s.pointerId !== e.pointerId) return;
      if (track.hasPointerCapture(e.pointerId)) {
        track.releasePointerCapture(e.pointerId);
      }
      const wasMoved = s.moved;
      dragState.current = null;
      setIsDragging(false);
      if (wasMoved) {
        // Suppress the click event that immediately follows the drag.
        suppressNextClick.current = true;
        window.setTimeout(() => {
          suppressNextClick.current = false;
        }, 50);
      }
    };

    const onClickCapture = (e: MouseEvent) => {
      // Suppress the click that ends a drag
      if (suppressNextClick.current) {
        e.stopPropagation();
        e.preventDefault();
        suppressNextClick.current = false;
      }
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("click", onClickCapture, true);

    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointercancel", endDrag);
      track.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  function scrollToCard(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelectorAll<HTMLElement>("[data-card]")[i];
    if (!card) return;
    track.scrollTo({
      left: card.offsetLeft - 24,
      behavior: "smooth",
    });
  }

  function nudge(dir: 1 | -1) {
    scrollToCard(Math.max(0, Math.min(projects.length - 1, active + dir)));
  }

  return (
    <section
      ref={sectionRef}
      className="border-t border-ink-900/10 dark:border-bone-50/10"
    >
      {/* Header */}
      <div className="mx-auto max-w-[1440px] px-6 pt-20 sm:px-12 sm:pt-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="max-w-2xl">
            <p className="reveal label">(04) - Selected work</p>
            <h2 className="reveal d1 section-title mt-6 sm:mt-8">
              Four rooms,
              <br />
              <span className="font-light italic text-burgundy-600 dark:text-burgundy-300">
                <span className="sm:hidden">swipe to wander.</span>
                <span className="hidden sm:inline">drag to wander.</span>
              </span>
            </h2>
          </div>
          <div className="reveal d2 flex items-center gap-3">
            <span className="text-caption tracking-label text-ink-500 dark:text-bone-50/55">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => nudge(-1)}
              disabled={active === 0}
              className="inline-flex size-11 items-center justify-center rounded-full ring-1 ring-ink-900/15 text-ink-900 transition-colors duration-300 hover:bg-ink-900 hover:text-bone-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink-900 dark:text-bone-50 dark:ring-bone-50/20 dark:hover:bg-bone-50 dark:hover:text-ink-900 dark:disabled:hover:bg-transparent dark:disabled:hover:text-bone-50"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4"
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
              aria-label="Next project"
              onClick={() => nudge(1)}
              disabled={active === projects.length - 1}
              className="inline-flex size-11 items-center justify-center rounded-full ring-1 ring-ink-900/15 text-ink-900 transition-colors duration-300 hover:bg-ink-900 hover:text-bone-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink-900 dark:text-bone-50 dark:ring-bone-50/20 dark:hover:bg-bone-50 dark:hover:text-ink-900 dark:disabled:hover:bg-transparent dark:disabled:hover:text-bone-50"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className={`gallery-track mt-10 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-6 sm:mt-12 sm:gap-6 sm:pb-8 lg:gap-8 ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        style={{
          scrollbarWidth: "none",
          scrollPaddingLeft: "var(--gallery-pad)",
          paddingLeft: "var(--gallery-pad)",
          paddingRight: "var(--gallery-pad)",
          // 1.5rem on mobile, 3rem on >=sm, then center-align inside max-w-[1440px]
          ["--gallery-pad" as string]:
            "max(1.5rem, calc((100vw - 1440px) / 2 + 3rem))",
        }}
      >
        {projects.map((p, i) => (
          <article
            key={p.index}
            data-card
            className="snap-start shrink-0 w-[92vw] sm:w-[80vw] lg:w-[68vw] xl:w-[60vw] max-w-[1100px]"
          >
            <header className="grid grid-cols-1 gap-4 md:grid-cols-[auto_1fr] md:items-end md:gap-12">
              <div>
                <p className="text-caption tracking-label text-burgundy-600 dark:text-burgundy-400">
                  {p.index} · {p.year}
                </p>
                <h3 className="mt-4 text-h4 font-semibold tracking-tight sm:text-h3">
                  {p.name}
                </h3>
                <p className="mt-2 text-caption tracking-label text-ink-500 dark:text-bone-50/55">
                  {p.location.toUpperCase()}
                </p>
              </div>
              <p className="max-w-md text-small text-ink-500 sm:text-body md:justify-self-end dark:text-bone-50/65">
                {p.preamble}
              </p>
            </header>

            {/* 3-image collage - mobile: main on top, two below; sm+: side-by-side */}
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:grid sm:h-[60vh] sm:min-h-[420px] sm:grid-cols-6 sm:grid-rows-6 sm:gap-4">
              <ImageWell
                pIndex={i}
                iIndex={0}
                image={p.images[0]}
                onOpen={openLightbox}
                refMap={imageButtonRefs}
                className="aspect-[4/3] sm:aspect-auto sm:col-span-4 sm:row-span-6"
                sizes="(min-width:1024px) 45vw, 92vw"
              />
              <div className="grid grid-cols-2 gap-3 sm:contents">
                <ImageWell
                  pIndex={i}
                  iIndex={1}
                  image={p.images[1]}
                  onOpen={openLightbox}
                  refMap={imageButtonRefs}
                  className="aspect-[4/3] sm:aspect-auto sm:col-span-2 sm:row-span-3"
                  sizes="(min-width:1024px) 22vw, 45vw"
                />
                <ImageWell
                  pIndex={i}
                  iIndex={2}
                  image={p.images[2]}
                  onOpen={openLightbox}
                  refMap={imageButtonRefs}
                  className="aspect-[4/3] sm:aspect-auto sm:col-span-2 sm:row-span-3"
                  sizes="(min-width:1024px) 22vw, 45vw"
                />
              </div>
            </div>

            {/* Counter */}
            <div className="mt-4 flex items-center justify-between text-caption tracking-label text-ink-500 dark:text-bone-50/55">
              <span>
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
              <span>3 IMAGES</span>
            </div>
          </article>
        ))}
      </div>

      {/* Progress rail */}
      <div className="mx-auto max-w-[1440px] px-6 pb-20 sm:px-12 sm:pb-32">
        <div className="mt-2 flex items-center gap-6">
          <div className="relative h-px flex-1 bg-ink-900/10 dark:bg-bone-50/10">
            <div
              className="absolute left-0 top-0 h-px bg-burgundy-600 transition-[width] duration-200 ease-out dark:bg-burgundy-400"
              style={{
                width: `${Math.max(0.06, progress * (1 - 1 / projects.length) + 1 / projects.length) * 100}%`,
              }}
            />
          </div>
          <span className="text-caption tracking-label text-ink-500 dark:text-bone-50/55">
            DRAG ⇠⇢
          </span>
        </div>
      </div>

      <style jsx>{`
        .gallery-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <Lightbox
        images={lightboxImages}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        originForIndex={originForIndex}
        captionForIndex={lightboxCaption}
        onClose={closeLightbox}
      />
    </section>
  );
}

type ImageWellProps = {
  pIndex: number;
  iIndex: number;
  image: { src: string; alt: string };
  caption?: string;
  onOpen: (key: string) => void;
  refMap: React.MutableRefObject<Map<string, HTMLButtonElement>>;
  className?: string;
  sizes?: string;
};

function ImageWell({
  pIndex,
  iIndex,
  image,
  onOpen,
  refMap,
  className = "",
  sizes,
}: ImageWellProps) {
  const key = `${pIndex}:${iIndex}`;
  return (
    <button
      type="button"
      ref={(el) => {
        if (el) refMap.current.set(key, el);
        else refMap.current.delete(key);
      }}
      onClick={() => onOpen(key)}
      aria-label={`Open image: ${image.alt}`}
      className={`group relative block w-full overflow-hidden rounded-2xl bg-ink-900/5 ring-1 ring-ink-900/10 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bone-50 dark:bg-bone-50/5 dark:ring-bone-50/10 dark:focus-visible:ring-offset-ink-900 ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        draggable={false}
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-ink-900/55 text-bone-50 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </span>
    </button>
  );
}
