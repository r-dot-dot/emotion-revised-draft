import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Target, Filter, ClipboardCheck, Handshake } from "lucide-react";
import { PageShell, Eyebrow, SectionHead } from "@/components/page-shell";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — We find the EV for you | eMotion Autos" },
      {
        name: "description",
        content:
          "Tell us your body type, budget, and range needs. We search vetted California EV inventory and hand you a rebate-eligible shortlist.",
      },
      { property: "og:title", content: "Search — We find the EV for you" },
      { property: "og:description", content: "Skip Craigslist. We find rebate-eligible EVs matching your brief." },
    ],
  }),
  component: SearchPage,
});

const bodyTypes = ["Sedan", "SUV", "Hatchback", "Truck", "Van"];
const brands = ["Any", "Tesla", "Chevrolet", "Ford", "Hyundai", "Kia", "Nissan", "Toyota", "Volkswagen"];

function SearchPage() {
  const [body, setBody] = useState("SUV");
  const [brand, setBrand] = useState("Any");
  const [budget, setBudget] = useState(25000);
  const [rangeMin, setRangeMin] = useState(150);

  return (
    <PageShell>
      <section className="border-b border-border bg-gradient-to-b from-primary/10 to-background">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <Eyebrow>Path B · Tell us what you want</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Tell us what you want. We'll find it — rebate-eligible and inspected.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            Body type, budget, range needs — we search vetted California inventory,
            verify each car qualifies for your program, and hand you a shortlist worth
            your time.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold text-ink">Your search brief</h2>
              <p className="mt-1 text-sm text-ink-soft">Rough is fine — we'll refine over one call.</p>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-ink-soft">Body type</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {bodyTypes.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBody(b)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          body === b ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-ink hover:bg-accent"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-ink-soft">Brand preference</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                  >
                    {brands.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>

                <div>
                  <label className="flex justify-between text-xs font-bold uppercase tracking-widest text-ink-soft">
                    <span>Max budget</span>
                    <span className="text-primary">${budget.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min={10000} max={60000} step={1000}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="mt-2 w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-xs font-bold uppercase tracking-widest text-ink-soft">
                    <span>Minimum range</span>
                    <span className="text-primary">{rangeMin} mi</span>
                  </label>
                  <input
                    type="range"
                    min={80} max={350} step={10}
                    value={rangeMin}
                    onChange={(e) => setRangeMin(Number(e.target.value))}
                    className="mt-2 w-full accent-primary"
                  />
                </div>

                <Link
                  to="/get-started"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow hover:brightness-110"
                >
                  Send this brief <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              <SectionHead kicker="How Search works" title="Four steps to a shortlist you can trust." />
              <ol className="mt-8 space-y-6">
                {[
                  { i: Target, t: "You brief us", d: "Body type, budget, range, deal-breakers — 10 minutes." },
                  { i: Filter, t: "We scan inventory", d: "CCFA-participating dealers, auctions, and off-market listings across California." },
                  { i: ClipboardCheck, t: "We verify each candidate", d: "Rebate eligibility, service history, and independent pre-purchase inspection." },
                  { i: Handshake, t: "You choose. We close.", d: "Delivery, DMV, and every incentive filed for you." },
                ].map((s, idx) => (
                  <li key={s.t} className="flex gap-5">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <s.i className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold uppercase tracking-widest text-ink-soft">Step {idx + 1}</div>
                      <h3 className="mt-1 text-lg font-bold text-ink">{s.t}</h3>
                      <p className="mt-1 text-sm text-ink-soft">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
