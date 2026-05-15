"use client";

import { useReveal } from "@/hooks/useReveal";

export function RevealRoot({ children }: { children: React.ReactNode }) {
  useReveal();
  return <>{children}</>;
}
