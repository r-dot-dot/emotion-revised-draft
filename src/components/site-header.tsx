import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./logo";

const primaryTabs = [
  { to: "/flip", label: "Flip" },
  { to: "/search", label: "Search" },
  { to: "/calculator", label: "Savings Calculator" },
] as const;

const moreLinks = [
  { to: "/charging", label: "Charging" },
  { to: "/incentives", label: "Incentives" },
  { to: "/service", label: "Service" },
  { to: "/faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
        <Logo />

        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {primaryTabs.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              inactiveProps={{ className: "text-ink hover:bg-accent" }}
              className="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
            >
              {t.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setMore(true)}
            onMouseLeave={() => setMore(false)}
          >
            <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-ink hover:bg-accent">
              More <ChevronDown className="h-4 w-4" />
            </button>
            {more && (
              <div className="absolute left-0 top-full min-w-[180px] rounded-xl border border-border bg-card p-1.5 shadow-lg">
                {moreLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="block rounded-lg px-3 py-2 text-sm text-ink hover:bg-accent"
                    activeProps={{ className: "bg-accent" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="ml-auto hidden md:block">
          <Link
            to="/get-started"
            className="inline-flex items-center rounded-full bg-sun px-4 py-2 text-sm font-semibold text-sun-foreground shadow-sm transition hover:brightness-95"
          >
            Get started →
          </Link>
        </div>

        <button
          className="ml-auto md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {[...primaryTabs, ...moreLinks].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-ink hover:bg-accent"
                activeProps={{ className: "bg-accent" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/get-started"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-sun px-3 py-2 text-center text-sm font-semibold text-sun-foreground"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
