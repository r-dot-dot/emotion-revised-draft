import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-sun/40 bg-sun-soft px-3 py-1 text-xs font-bold uppercase tracking-widest text-sun-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-sun" />
      {children}
    </span>
  );
}

export function SectionHead({
  kicker,
  title,
  lead,
  center,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {kicker && (
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          {kicker}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">{title}</h2>
      {lead && <p className="mt-4 text-base text-ink-soft md:text-lg">{lead}</p>}
    </div>
  );
}
