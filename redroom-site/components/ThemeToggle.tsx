"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "redroom-theme";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(STORAGE_KEY, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(STORAGE_KEY, "light");
    }
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mounted ? isDark : undefined}
      aria-label="Toggle dark mode"
      onClick={toggle}
      className="relative inline-flex h-8 w-[60px] shrink-0 items-center rounded-full bg-ink-900/20 ring-1 ring-inset ring-ink-900/15 backdrop-blur-md transition-colors duration-300 hover:bg-ink-900/30 dark:bg-bone-50/10 dark:ring-bone-50/15 dark:hover:bg-bone-50/15"
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none flex size-6 items-center justify-center rounded-full bg-bone-50 text-ink-900 shadow-sm transition-transform duration-300 ease-out ${
          mounted && isDark ? "translate-x-[30px]" : "translate-x-1"
        }`}
      >
        {mounted && isDark ? (
          <svg
            viewBox="0 0 24 24"
            className="size-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="size-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        )}
      </span>
    </button>
  );
}
