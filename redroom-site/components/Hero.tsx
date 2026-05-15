import Image from "next/image";
import { Wordmark } from "./Brand";
import { ThemeToggle } from "./ThemeToggle";

export function Hero() {
  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-bone-50/40 via-bone-50/10 to-bone-50/80 dark:from-ink-900/80 dark:via-ink-900/40 dark:to-ink-900/95"
        />
      </div>

      {/* Top bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] items-start justify-between px-6 pt-8 sm:px-12 sm:pt-10">
        <span
          aria-label="Redroom"
          className="block text-burgundy-600 dark:text-bone-50"
        >
          <Wordmark className="h-7 w-auto" />
        </span>
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="hidden text-caption tracking-label text-ink-700/70 dark:text-bone-50/60 sm:inline-block">
            STOCKHOLM
          </span>
          <ThemeToggle />
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-120px)] w-full max-w-[1440px] flex-col justify-end px-6 pb-20 sm:px-12 sm:pb-28">
        <div className="max-w-5xl">
          <p className="reveal d1 label">(01) - Full-service contractor</p>
          <h1 className="reveal d2 hero-title mt-8 text-ink-900 dark:text-bone-50">
            Built in{" "}
            <span className="font-light italic text-burgundy-500 dark:text-burgundy-400">
              Stockholm.
            </span>
            <br />
            Finished with{" "}
            <span className="font-light italic text-burgundy-500 dark:text-burgundy-400">
              intent.
            </span>
          </h1>
          <p className="reveal d3 mt-10 max-w-xl text-body-lg text-ink-700/85 dark:text-bone-50/75">
            Redroom is a full-service contractor working across carpentry,
            construction, and interior design. From structure to surface, we
            cover every trade - and answer for the result.
          </p>
          <div className="reveal d3 mt-10 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn btn-primary btn-lg">
              Start a project <span className="arrow">→</span>
            </a>
            <a href="#projects" className="btn btn-on-image btn-lg">
              See our work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
