import type { ReactNode } from "react";

type Service = {
  n: string;
  name: string;
  desc: string;
  icon: ReactNode;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const services: Service[] = [
  {
    n: "01",
    name: "Carpentry.",
    desc: "Bespoke joinery, framing, finish work.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" {...stroke}>
        <path d="M3 21l6-6" />
        <path d="M14 3l7 7-4 4-7-7z" />
        <path d="M10 7l-3 3" />
      </svg>
    ),
  },
  {
    n: "02",
    name: "Construction.",
    desc: "Renovations, builds, structural changes.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" {...stroke}>
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
        <rect x="3" y="3" width="18" height="18" rx="1" />
      </svg>
    ),
  },
  {
    n: "03",
    name: "Electrical.",
    desc: "Wiring, lighting, certified installations.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" {...stroke}>
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    n: "04",
    name: "Plumbing & HVAC.",
    desc: "Water, heating, ventilation, climate.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" {...stroke}>
        <path d="M12 3c3 4 6 7 6 11a6 6 0 1 1-12 0c0-4 3-7 6-11z" />
      </svg>
    ),
  },
  {
    n: "05",
    name: "Painting.",
    desc: "Surface prep, finishes, specialty coatings.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" {...stroke}>
        <rect x="3" y="4" width="14" height="6" rx="1" />
        <path d="M17 7h3v4h-7v3" />
        <rect x="10" y="14" width="6" height="7" rx="1" />
      </svg>
    ),
  },
  {
    n: "06",
    name: "Design.",
    desc: "Spatial planning, drawings, material selection.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" {...stroke}>
        <path d="M3 21L21 3" />
        <path d="M3 21h18" />
        <path d="M3 21V3" />
      </svg>
    ),
  },
  {
    n: "07",
    name: "Interior styling.",
    desc: "Furnishing, soft goods, final dressing.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" {...stroke}>
        <path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
        <path d="M2 17a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3h-2v-2H4v2H2z" />
        <path d="M6 11h12v4H6z" />
      </svg>
    ),
  },
  {
    n: "08",
    name: "Technical installations.",
    desc: "AV, smart home, networking.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" {...stroke}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section className="border-ink-900/10 dark:border-bone-50/10 border-t">
      <div className="mx-auto max-w-360 px-6 py-20 sm:px-12 sm:py-32">
        <div className="max-w-2xl">
          <p className="reveal label">Services</p>
          <h2 className="reveal d1 section-title mt-8">
            Every branch
            <br /> of the trade.
          </h2>
          <p className="reveal d2 text-body-lg text-ink-500 dark:text-bone-50/70 mt-8">
            From rough-in to final styling, a single point of responsibility, eight disciplines in one room, the
            redroom.
          </p>
        </div>

        <div className="reveal d2 bg-ink-900/10 ring-ink-900/10 dark:bg-bone-50/10 dark:ring-bone-50/10 mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl ring-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.n}
              className="group bg-bone-50 hover:bg-bone-100 dark:bg-ink-900 dark:hover:bg-ink-800 relative flex flex-col p-8 transition-colors duration-300 md:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="text-caption tracking-label text-burgundy-600 dark:text-burgundy-400">{s.n}</span>
                <span className="text-ink-900/70 group-hover:text-burgundy-600 dark:text-bone-50/70 dark:group-hover:text-burgundy-300 transition-colors duration-300">
                  {s.icon}
                </span>
              </div>
              <h3 className="text-h5 mt-16 font-semibold tracking-tight">{s.name}</h3>
              <p className="text-small text-ink-500 dark:text-bone-50/55 mt-3">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
