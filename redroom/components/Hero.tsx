import { Wordmark } from "./Brand";
import { HeroCarousel } from "./HeroCarousel";
import { ThemeToggle } from "./ThemeToggle";

export function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100svh+20px)] w-full overflow-hidden">
      {/* Animated background carousel - 6 images */}
      <HeroCarousel />

      {/* Top bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-360 items-start justify-between px-6 pt-8 sm:px-12 sm:pt-10">
        <span aria-label="Redroom" className="text-burgundy-600 dark:text-bone-50 block">
          <Wordmark className="h-7 w-auto" />
        </span>
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-caption text-ink-700/70 tracking-label dark:text-bone-50/60 hidden sm:inline-block">
            STOCKHOLM
          </span>
          <ThemeToggle />
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-120px)] w-full max-w-360 flex-col justify-end px-6 pb-20 sm:px-12 sm:pb-28">
        <div className="max-w-5xl">
          <p className="d1 label reveal">Full-service contractor</p>
          <h1 className="d2 hero-title reveal text-ink-900 dark:text-bone-50 mt-8 uppercase">
            This is <br />
            <span className="text-burgundy-500 dark:text-burgundy-400 font-light whitespace-nowrap">Redroom</span>
          </h1>
          {/* <p className="d3 reveal text-body-lg text-ink-700/85 max-w-xl mt-10 dark:text-bone-50/75">
            Redroom is a full-service contractor working across carpentry, construction, and interior design. From
            structure to surface, we cover every trade - and answer for the result.
          </p> */}
          <div className="d3 reveal mt-10 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn btn-lg btn-primary">
              Start a project <span className="arrow">→</span>
            </a>
            <a href="#projects" className="btn btn-lg btn-on-image">
              See our work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
