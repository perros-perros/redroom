const steps = [
  {
    n: "01",
    title: "Brief.",
    desc: "We listen, walk the site, and ask the questions that surface the real budget and timeline.",
  },
  {
    n: "02",
    title: "Design.",
    desc: "Drawings, material samples, and a fixed price before a tool comes out.",
  },
  {
    n: "03",
    title: "Build.",
    desc: "Trades sequenced and supervised by your project lead, daily on-site.",
  },
  {
    n: "04",
    title: "Hand-over.",
    desc: "Walkthrough, snag list, warranty - and we stay reachable.",
  },
];

export function Process() {
  return (
    <section className="border-t border-ink-900/10 dark:border-bone-50/10">
      <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-12 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="reveal label">(06) - Process</p>
            <h2 className="reveal d1 section-title mt-8">
              One contract.
              <br />
              <span className="font-light italic text-burgundy-600 dark:text-burgundy-300">
                One number to call.
              </span>
            </h2>
            <p className="reveal d2 mt-8 max-w-md text-body-lg text-ink-500 dark:text-bone-50/70">
              Most projects fail at the seams between trades. We don&rsquo;t
              have seams - every discipline reports through one project lead, on
              one schedule, against one budget.
            </p>
          </div>

          <ol className="flex flex-col">
            {steps.map((s, i) => (
              <li
                key={s.n}
                className={`reveal d${Math.min(i + 1, 4)} grid grid-cols-[auto_1fr] gap-6 py-8 sm:gap-10 ${
                  i !== 0
                    ? "border-t border-ink-900/10 dark:border-bone-50/10"
                    : ""
                }`}
              >
                <span className="text-caption tracking-label text-burgundy-600 dark:text-burgundy-400">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-h5 font-semibold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-small text-ink-500 dark:text-bone-50/60">
                    {s.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
