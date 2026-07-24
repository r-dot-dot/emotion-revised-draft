import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Target,
  Filter,
  ClipboardCheck,
  Handshake,
  ListChecks,
  UserCheck,
  Lock,
  Receipt,
} from "lucide-react";
import { PageShell, Eyebrow, SectionHead } from "@/components/page-shell";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — Join the waitlist. We find your EV. | eMotion Autos" },
      {
        name: "description",
        content:
          "Submit a rough brief, join our search waitlist, and we hand you an approved shortlist of rebate-eligible California EVs.",
      },
      { property: "og:title", content: "Search — Join the waitlist. We find your EV." },
      { property: "og:description", content: "Waitlist → approval → your EV." },
    ],
  }),
  component: SearchPage,
});

const bodyTypes = ["Sedan", "SUV", "Hatchback", "Truck", "Van"] as const;
const brandOptions = ["Any", "Tesla", "Chevrolet", "Ford", "Hyundai", "Kia", "Nissan", "Toyota", "Volkswagen"] as const;

function SearchPage() {
  const [body, setBody] = useState<(typeof bodyTypes)[number]>("SUV");
  const [brand, setBrand] = useState<(typeof brandOptions)[number]>("Any");
  const [budget, setBudget] = useState(25000);
  const [rangeMin, setRangeMin] = useState(150);

  return (
    <PageShell>
      {/* HERO — waitlist framing */}
      <section className="border-b border-border bg-gradient-to-b from-primary/10 to-background">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <Eyebrow>Search · Join the waitlist</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Tell us what you want. Join the search. We hand you the shortlist.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            Submit a rough brief — it's like joining our search waitlist. We review it,
            approve you into an active search, and then hunt down rebate-eligible California
            EVs that match.
          </p>

          {/* Waitlist flow strip */}
          <ol className="mt-10 grid gap-4 sm:grid-cols-4">
            {[
              { i: ListChecks, t: "Submit your brief", d: "Rough is fine — body, budget, range." },
              { i: UserCheck, t: "We review & approve", d: "$500 refundable deposit starts the search." },
              { i: Filter, t: "We source candidates", d: "Vetted CA inventory, private sellers, auctions." },
              { i: Handshake, t: "You approve, we close", d: "Rebates filed. DMV handled. Delivered." },
            ].map((s, i) => (
              <li key={s.t} className="flex flex-col rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                    <s.i className="h-4 w-4" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink-soft">
                    Step {i + 1}
                  </span>
                </div>
                <div className="mt-3 text-sm font-bold text-ink">{s.t}</div>
                <div className="mt-1 text-xs text-ink-soft">{s.d}</div>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-2xl border border-sun/40 bg-sun-soft p-4 text-sm text-ink">
            <strong>Fee:</strong> $1,500 flat on vehicles under $30k. Above $30k, the fee
            is 5% of the vehicle price. Either way, it's calculated <em>after</em> your
            rebate savings — never before.
          </div>
        </div>
      </section>

      {/* Brief form */}
      <section id="brief" className="py-16 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold text-ink">Your search brief</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Rough is fine — this joins the waitlist. We refine over one call.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-ink-soft">Body type</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {bodyTypes.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBody(b)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          body === b
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-ink hover:bg-accent"
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
                    onChange={(e) => setBrand(e.target.value as (typeof brandOptions)[number])}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                  >
                    {brandOptions.map((b) => <option key={b}>{b}</option>)}
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
                  Join the waitlist <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              <SectionHead kicker="How Search works" title="Four steps to an approved shortlist." />
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

      {/* Approval-gated price estimate calculator */}
      <PriceEstimateCalculator budget={budget} />
    </PageShell>
  );
}

type Customization = { id: string; label: string; fee: number };

const CUSTOMIZATIONS: Customization[] = [
  { id: "color", label: "Specific paint color", fee: 500 },
  { id: "interior", label: "Specific interior / trim", fee: 400 },
  { id: "wheels", label: "Upgraded wheels", fee: 350 },
  { id: "tow", label: "Tow package", fee: 600 },
  { id: "l2", label: "Home plug installation", fee: 1200 },
  { id: "warranty", label: "Extended warranty", fee: 1500 },
  { id: "detail", label: "Full detail + ceramic coat", fee: 450 },
  { id: "outofstate", label: "Out-of-state sourcing", fee: 750 },
];

function PriceEstimateCalculator({ budget }: { budget: number }) {
  const [picked, setPicked] = useState<Record<string, boolean>>({});

  const selected = useMemo(() => CUSTOMIZATIONS.filter((c) => picked[c.id]), [picked]);
  const customTotal = selected.reduce((a, c) => a + c.fee, 0);
  // Mock rebate savings (rough placeholder — real number lives on /calculator)
  const mockSavings = 9500;
  const estimate = budget + customTotal - mockSavings;

  return (
    <section className="border-t border-border bg-muted/40 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          kicker="Preview — unlocks after approval"
          title="Estimate your price with customizations."
          lead="Once your brief is approved, this calculator becomes your working receipt. Check the extras you're considering — we'll show a rough estimate of your out-the-door price with rebate savings applied."
        />

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-sun/40 bg-sun-soft p-4 text-sm text-ink">
          <Lock className="mt-0.5 h-5 w-5 flex-none text-sun-foreground" />
          <div>
            <strong>Preview mode.</strong> Numbers below are illustrative. After we approve
            your search brief, this tool locks in your actual vehicle budget, verified
            rebate stack, and real customization fees.
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Checkboxes */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h3 className="text-lg font-bold text-ink">Customizations</h3>
            <p className="mt-1 text-sm text-ink-soft">
              Check each extra you'd want in your brief. Each one adds a fee.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {CUSTOMIZATIONS.map((c) => {
                const on = !!picked[c.id];
                return (
                  <label
                    key={c.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 text-sm transition ${
                      on
                        ? "border-primary bg-primary/10 text-ink"
                        : "border-border bg-background text-ink-soft hover:border-ink/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => setPicked((p) => ({ ...p, [c.id]: !on }))}
                      className="mt-0.5 h-4 w-4 accent-primary"
                    />
                    <span className="flex flex-1 items-center justify-between gap-2">
                      <span className="font-semibold">{c.label}</span>
                      <span className={`text-xs font-bold ${on ? "text-primary" : "text-ink-soft"}`}>
                        +${c.fee.toLocaleString()}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Estimate readout */}
          <div className="rounded-3xl bg-background p-1 shadow-lg">
            <div className="rounded-[calc(1.5rem-4px)] border border-dashed border-ink/20 bg-card p-6 font-mono text-sm text-ink md:p-8">
              <div className="flex items-center gap-2 text-ink-soft">
                <Receipt className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Preview estimate</span>
              </div>

              <div className="mt-4 flex items-center justify-between border-b border-dashed border-ink/20 pb-2">
                <span>Car budget (from brief)</span>
                <span className="font-semibold">${budget.toLocaleString()}</span>
              </div>

              <div className="mt-3 text-xs font-bold uppercase tracking-widest text-ink-soft">
                Customization fees
              </div>
              <ul className="mt-2 space-y-1.5">
                {selected.length === 0 && (
                  <li className="text-xs italic text-ink-soft">— none selected —</li>
                )}
                {selected.map((c) => (
                  <li key={c.id} className="flex items-center justify-between">
                    <span>+ {c.label}</span>
                    <span>${c.fee.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex items-center justify-between border-b border-dashed border-ink/20 pb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-ink-soft">Customizations subtotal</span>
                <span className="font-semibold">+ ${customTotal.toLocaleString()}</span>
              </div>

              <div className="mt-3 flex items-center justify-between border-b border-dashed border-ink/20 pb-2 text-primary">
                <span>− Estimated rebate savings</span>
                <span className="font-semibold">− ${mockSavings.toLocaleString()}</span>
              </div>

              <div className="mt-5 flex items-end justify-between rounded-xl bg-ink px-4 py-4 text-background">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-background/70">Rough estimate</div>
                  <div className="text-[10px] text-background/60">unlocks fully after brief approval</div>
                </div>
                <div className="font-display text-3xl font-bold text-sun">
                  ${estimate.toLocaleString()}
                </div>
              </div>
              <p className="mt-4 text-[11px] text-ink-soft">
                Preview only. Real numbers activate once your brief is approved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
