import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Logo } from "./logo";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-14">
        {/* Side-by-side support / contact block */}
        <div className="grid gap-8 rounded-3xl border border-border bg-card p-6 shadow-sm md:grid-cols-2 md:p-10">
          <div className="flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-sun-foreground">
                Talk to a human
              </p>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                We answer real questions about EVs — no forms required.
              </h3>
              <p className="mt-3 max-w-prose text-sm text-ink-soft">
                Reach out directly, or book a 20-minute consult on the calendar.
                We reply the same business day.
              </p>
            </div>
            <div className="space-y-2 text-sm text-ink-soft">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /><a href="mailto:info@emotionautos.com" className="hover:text-ink">info@emotionautos.com</a></div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><a href="tel:6506992193" className="hover:text-ink">650-699-2193</a></div>
              <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /><span>1060 Grant Street, Suite 1C · Benicia, CA 94510</span></div>
            </div>
            <a
              href="https://calendly.com/ccleminshaw-emotionautos/30min"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              <Calendar className="h-4 w-4" /> Book an appointment
            </a>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-2xl bg-sun-soft p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-sun-foreground">
                Newsletter
              </p>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                EV incentives change often. Stay ahead.
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                One short email per month with new rebate windows, model deals,
                and charging news for California drivers.
              </p>
            </div>
            <form
              className="flex w-full min-w-0 flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setSubscribed(true);
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full min-w-0 flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm outline-none ring-primary focus:ring-2"
              />
              <button className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-background hover:brightness-110">
                {subscribed ? "You're in ✓" : "Subscribe"}
              </button>
            </form>
            <div className="text-xs text-ink-soft">
              <strong>Hours:</strong> Mon–Fri 9a–6p · Sat by appointment
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <Logo />
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
            <Link to="/flip" className="hover:text-ink">Flip</Link>
            <Link to="/search" className="hover:text-ink">Search</Link>
            <Link to="/calculator" className="hover:text-ink">Calculator</Link>
            <Link to="/vehicles" className="hover:text-ink">Vehicles</Link>
            <Link to="/charging" className="hover:text-ink">Charging</Link>
            <Link to="/incentives" className="hover:text-ink">Incentives</Link>
            <Link to="/service" className="hover:text-ink">Service</Link>
            <Link to="/faq" className="hover:text-ink">FAQ</Link>
          </nav>
        </div>
        <div className="mt-4 flex flex-col justify-between gap-2 text-xs text-ink-soft md:flex-row">
          <span>© {new Date().getFullYear()} eMotion Autos · Authorized CCFA &amp; DCAP dealer</span>
          <span>Se habla español</span>
        </div>
      </div>
    </footer>
  );
}
