export function Intro() {
  return (
    <section>
      <div className="mx-auto max-w-360 px-6 py-20 sm:px-12 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-1">
            <p className="label reveal">Approach</p>
            <h2 className="d1 reveal text-h4 mt-8 font-medium tracking-tight">
              One firm,
              <br /> every trade.
            </h2>
          </div>
          <div className="lg:col-span-2">
            <p className="d1 editorial-prose reveal text-ink-700 dark:text-bone-50/80">
              We design and build{" "}
              <span className="text-burgundy-600 dark:text-burgundy-300 font-light italic">
                environments where craft is visible
              </span>{" "}
              - homes, shops, restaurants, and offices across Stockholm. Carpentry, electrical, plumbing, HVAC,
              painting, interior styling, technical installations: handled in-house, sequenced cleanly,{" "}
              <span className="text-burgundy-600 dark:text-burgundy-300 font-light italic">
                finished without compromise.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
