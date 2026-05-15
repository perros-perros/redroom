import { RMark } from "./Brand";

export function Footer() {
  return (
    <footer className="border-t border-ink-900/10 dark:border-bone-50/10">
      <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-12 sm:py-24">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-10">
          <div className="col-span-2 md:col-span-2">
            <RMark className="size-10 text-burgundy-600 dark:text-burgundy-400" />
            <p className="mt-8 max-w-md text-h3 font-medium leading-tight tracking-tight">
              A full-service contractor for buildings that should{" "}
              <span className="font-light italic text-burgundy-600 dark:text-burgundy-300">
                outlast
              </span>{" "}
              their brief.
            </p>
          </div>

          <FooterCol
            label="Studio"
            items={["Stockholm", "Established 20XX", "Org.nr 000000-0000"]}
          />

          <FooterCol
            label="Contact"
            items={[
              { text: "hello@redroom.se", href: "mailto:hello@redroom.se" },
              { text: "+46 8 000 00 00", href: "tel:+4680000000" },
              "Mon–Fri 08:00–17:00",
            ]}
          />

          <div className="col-span-2 md:col-span-1 md:col-start-4 md:row-start-2 md:-mt-10">
            <FooterCol
              label="Social"
              items={[
                { text: "Instagram", href: "https://instagram.com" },
                { text: "LinkedIn", href: "https://linkedin.com" },
              ]}
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ink-900/10 pt-8 text-caption tracking-label text-ink-500 sm:flex-row sm:items-center sm:justify-between dark:border-bone-50/10 dark:text-bone-50/55">
          <p>
            © 2026{" "}
            <span className="text-burgundy-600 dark:text-burgundy-300">
              REDROOM
            </span>{" "}
            AB
          </p>
          <p>STOCKHOLM</p>
        </div>
      </div>
    </footer>
  );
}

type Item = string | { text: string; href: string };

function FooterCol({ label, items }: { label: string; items: Item[] }) {
  return (
    <div>
      <p className="text-caption tracking-label text-ink-500 dark:text-bone-50/45">
        {label.toUpperCase()}
      </p>
      <ul className="mt-6 space-y-3 text-small text-ink-700 dark:text-bone-50/75">
        {items.map((item, i) => {
          const text = typeof item === "string" ? item : item.text;
          const href = typeof item === "string" ? undefined : item.href;
          return (
            <li key={i}>
              {href ? (
                <a
                  href={href}
                  className="transition-colors duration-200 hover:text-ink-900 dark:hover:text-bone-50"
                >
                  {text}
                </a>
              ) : (
                <span>{text}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
