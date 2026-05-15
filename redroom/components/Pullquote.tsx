import { RMark } from "./Brand";

export function Pullquote() {
  return (
    <section className="border-ink-900/10 dark:border-bone-50/10 border-t">
      <div className="mx-auto max-w-360 px-6 py-20 sm:px-12 sm:py-32">
        <div className="reveal bg-bone-100 ring-ink-900/10 dark:ring-bone-50/10 relative overflow-hidden rounded-3xl px-6 py-20 ring-1 sm:px-12 sm:py-24 lg:px-16 dark:bg-[#16140F]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-32 size-[600px] rounded-full opacity-50 blur-2xl"
            style={{
              background: "radial-gradient(circle, #631823, transparent 65%)",
            }}
          />
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-4">
              <RMark className="text-burgundy-600 dark:text-burgundy-400 size-7" />
              <p className="text-caption tracking-label text-burgundy-600 dark:text-burgundy-300">
                Stockholm · SE - Est. 20XX
              </p>
            </div>
            <h2 className="section-title mt-10">
              We build <span className="text-burgundy-600 dark:text-burgundy-300 font-light italic">environments</span>{" "}
              - where every trade is{" "}
              <span className="text-burgundy-600 dark:text-burgundy-300 font-light italic">answerable.</span>
            </h2>
            <p className="text-body-lg text-ink-500 dark:text-bone-50/55 mt-8 max-w-xl">
              A senior-led practice working across residential, retail, and hospitality - from one-room renovations to
              full fit-outs.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#contact" className="btn btn-primary btn-lg">
                Start a project
              </a>
              <a href="#process" className="btn btn-ghost btn-lg">
                Or read our process
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
