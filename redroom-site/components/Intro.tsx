export function Intro() {
  return (
    <section className="border-t border-ink-900/10 dark:border-bone-50/10">
      <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-12 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-1">
            <p className="reveal label">(02) - Approach</p>
            <h2 className="reveal d1 mt-8 text-h4 font-medium tracking-tight">
              One firm,
              <br /> every trade.
            </h2>
          </div>
          <div className="lg:col-span-2">
            <p className="reveal d1 editorial-prose text-ink-700 dark:text-bone-50/80">
              We design and build{" "}
              <span className="font-light italic text-burgundy-600 dark:text-burgundy-300">
                environments where craft is visible
              </span>{" "}
              - homes, shops, restaurants, and offices across Stockholm.
              Carpentry, electrical, plumbing, HVAC, painting, interior styling,
              technical installations: handled in-house, sequenced cleanly,{" "}
              <span className="font-light italic text-burgundy-600 dark:text-burgundy-300">
                finished without compromise.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
