import Image from "next/image";

type Project = {
  name: string;
  location: string;
  type: string;
  src: string;
};

const projects: Project[] = [
  {
    name: "Östermalm Apartment",
    location: "SE",
    type: "Residential",
    src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Söder Workshop Café",
    location: "SE",
    type: "Hospitality",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Vasastan Townhouse",
    location: "SE",
    type: "Residential",
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
];

export function Projects() {
  return (
    <section id="projects" className="border-ink-900/10 dark:border-bone-50/10 border-t">
      <div className="mx-auto max-w-360 px-6 py-20 sm:px-12 sm:py-32">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="reveal label">Recent</p>
            <h2 className="reveal d1 section-title mt-8">
              A few we&rsquo;re{" "}
              <span className="text-burgundy-600 dark:text-burgundy-300 font-light italic">proud of.</span>
            </h2>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {projects.map((p, i) => (
            <article key={p.name} className={`reveal d${Math.min(i + 1, 3)} group`}>
              <div className="ring-ink-900/10 dark:ring-bone-50/10 relative aspect-[4/5] overflow-hidden rounded-3xl ring-1">
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-body-lg font-medium tracking-tight">{p.name}</h3>
                  <p className="text-caption tracking-label text-ink-500 dark:text-bone-50/55 mt-2">
                    ({p.location}) · {p.type}
                  </p>
                </div>
                <a
                  href="#"
                  aria-label={`Open ${p.name}`}
                  className="ring-ink-900/15 text-ink-900 hover:bg-ink-900 hover:text-bone-50 dark:text-bone-50 dark:ring-bone-50/20 dark:hover:bg-bone-50 dark:hover:text-ink-900 inline-flex size-10 shrink-0 items-center justify-center rounded-full ring-1 transition-colors duration-300"
                >
                  <svg
                    viewBox="0 0 14 14"
                    className="size-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 11L11 3M5 3h6v6" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-end">
          <a href="#" className="btn btn-ghost btn-md">
            View all projects
          </a>
        </div>
      </div>
    </section>
  );
}
