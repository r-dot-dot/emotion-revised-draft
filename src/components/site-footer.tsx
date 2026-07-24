import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Calendar, Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

function setTranslateCookie(lang: "en" | "es") {
  const value = `/en/${lang}`;
  const host = window.location.hostname;
  // Set on current host and parent domain to cover google's cookie lookups
  document.cookie = `googtrans=${value};path=/`;
  document.cookie = `googtrans=${value};path=/;domain=${host}`;
  const parent = host.split(".").slice(-2).join(".");
  if (parent && parent !== host) {
    document.cookie = `googtrans=${value};path=/;domain=.${parent}`;
  }
}

function readTranslateCookie(): "en" | "es" {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/(en|es)/);
  return (m?.[1] as "en" | "es") ?? "en";
}

function LanguageToggle() {
  const [lang, setLang] = useState<"en" | "es">("en");
  useEffect(() => setLang(readTranslateCookie()), []);
  const toggle = () => {
    const next = lang === "es" ? "en" : "es";
    setTranslateCookie(next);
    setLang(next);
    window.location.reload();
  };
  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-ink-soft transition hover:text-ink hover:border-primary/40"
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
    >
      <Languages className="h-3.5 w-3.5 text-primary" />
      {lang === "es" ? "View in English" : "Se habla español"}
    </button>
  );
}


export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Slim human-help bar */}
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-card px-6 py-5 shadow-sm md:flex-row md:items-center md:gap-8">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-sun-foreground">
              Talk to a human
            </p>
            <p className="mt-1 text-base font-bold text-ink">
              We answer real questions about EVs — no forms required.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-soft">
            <a href="mailto:info@emotionautos.com" className="flex items-center gap-1.5 hover:text-ink">
              <Mail className="h-4 w-4 text-primary" /> info@emotionautos.com
            </a>
            <a href="tel:6506992193" className="flex items-center gap-1.5 hover:text-ink">
              <Phone className="h-4 w-4 text-primary" /> 650-699-2193
            </a>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> Benicia, CA</span>
          </div>
          <a
            href="https://calendly.com/ccleminshaw-emotionautos/30min"
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            <Calendar className="h-4 w-4" /> Book an appointment
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-border pt-6 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <Logo />
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
            <Link to="/flip" className="hover:text-ink">Flip</Link>
            <Link to="/search" className="hover:text-ink">Search</Link>
            <Link to="/calculator" className="hover:text-ink">Calculator</Link>
            <Link to="/charging" className="hover:text-ink">Charging</Link>
            <Link to="/incentives" className="hover:text-ink">Incentives</Link>
            <Link to="/gallery" className="hover:text-ink">Vehicle gallery</Link>
            <Link to="/service" className="hover:text-ink">Service</Link>
            <Link to="/faq" className="hover:text-ink">FAQ</Link>
          </nav>
        </div>
        <div className="mt-4 flex flex-col justify-between gap-2 text-xs text-ink-soft md:flex-row">
          <span>© {new Date().getFullYear()} eMotion Autos · Authorized CCFA &amp; DCAP dealer</span>
          <LanguageToggle />
        </div>
      </div>
    </footer>
  );
}

