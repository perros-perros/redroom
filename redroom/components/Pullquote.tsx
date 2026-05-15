import { RMark } from "./Brand";

export function Pullquote() {
  return (
    <section className="border-t border-ink-900/10 dark:border-bone-50/10">
      <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-12 sm:py-32">
        <div className="reveal relative overflow-hidden rounded-3xl bg-bone-100 px-6 py-20 ring-1 ring-ink-900/10 sm:px-12 sm:py-24 lg:px-16 dark:bg-[#16140F] dark:ring-bone-50/10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 size-[600px] rounded-full opacity-50 blur-2xl"
            style={{
              background: "radial-gradient(circle, #631823, transparent 65%)",
            }}
          />
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-4">
              <RMark className="size-7 text-burgundy-600 dark:text-burgundy-400" />
              <p className="text-caption tracking-label text-burgundy-600 dark:text-burgundy-300">
                Stockholm · SE - Est. 20XX
              </p>
            </div>
            <h2 className="section-title mt-10">
              We build{" "}
              <span className="font-light italic text-burgundy-600 dark:text-burgundy-300">
                environments
              </span>{" "}
              - where every trade is{" "}
              <span className="font-light italic text-burgundy-600 dark:text-burgundy-300">
                answerable.
              </span>
            </h2>
            <p className="mt-8 max-w-xl text-body-lg text-ink-500 dark:text-bone-50/55">
              A senior-led practice working across residential, retail, and
              hospitality - from one-room renovations to full fit-outs.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#contact" className="btn btn-primary btn-lg">
                Start a project <span className="arrow">→</span>
              </a>
              <a href="#process" className="btn btn-ghost btn-lg">
                Or read our process <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
