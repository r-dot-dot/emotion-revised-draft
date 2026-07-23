import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell, Eyebrow, SectionHead } from "@/components/page-shell";
import { Zap, Gauge, DollarSign, Info, Receipt } from "lucide-react";


export const Route = createFileRoute("/vehicles")({
  head: () => ({
    meta: [
      { title: "Popular EVs — Rebate-eligible used vehicles | eMotion Autos" },
      { name: "description", content: "Browse used EVs and plug-in hybrids we track for California buyers. Filter by body, brand, and price." },
      { property: "og:title", content: "Popular EVs — Rebate-eligible used vehicles" },
      { property: "og:description", content: "Filter used EVs by body, brand, and price." },
    ],
  }),
  component: VehiclesPage,
});

type V = { id: number; name: string; brand: string; body: string; price: number; range: number; year: number };

const inventory: V[] = [
  { id: 1, name: "Chevrolet Bolt EV", brand: "Chevrolet", body: "Hatchback", price: 15900, range: 259, year: 2022 },
  { id: 2, name: "Nissan Leaf SV Plus", brand: "Nissan", body: "Hatchback", price: 17200, range: 212, year: 2022 },
  { id: 3, name: "Tesla Model 3 SR+", brand: "Tesla", body: "Sedan", price: 24500, range: 272, year: 2021 },
  { id: 4, name: "Tesla Model Y LR", brand: "Tesla", body: "SUV", price: 32900, range: 326, year: 2022 },
  { id: 5, name: "Hyundai Kona Electric", brand: "Hyundai", body: "SUV", price: 21500, range: 258, year: 2022 },
  { id: 6, name: "Kia Niro EV", brand: "Kia", body: "SUV", price: 22800, range: 239, year: 2022 },
  { id: 7, name: "Ford Mustang Mach-E", brand: "Ford", body: "SUV", price: 27900, range: 247, year: 2022 },
  { id: 8, name: "Ford F-150 Lightning", brand: "Ford", body: "Truck", price: 39500, range: 240, year: 2022 },
  { id: 9, name: "Volkswagen ID.4", brand: "Volkswagen", body: "SUV", price: 24900, range: 260, year: 2022 },
  { id: 10, name: "Toyota Prius Prime (PHEV)", brand: "Toyota", body: "Hatchback", price: 19900, range: 44, year: 2022 },
  { id: 11, name: "Chevrolet Bolt EUV", brand: "Chevrolet", body: "SUV", price: 17900, range: 247, year: 2022 },
  { id: 12, name: "Hyundai Ioniq 5", brand: "Hyundai", body: "SUV", price: 29900, range: 266, year: 2022 },
];

const bodies = ["All", "Sedan", "SUV", "Hatchback", "Truck"];
const brands = ["All", "Tesla", "Chevrolet", "Ford", "Hyundai", "Kia", "Nissan", "Toyota", "Volkswagen"];
const prices = [
  { label: "All prices", min: 0, max: Infinity },
  { label: "Under $20k", min: 0, max: 20000 },
  { label: "$20k – $30k", min: 20000, max: 30000 },
  { label: "$30k – $40k", min: 30000, max: 40000 },
  { label: "$40k+", min: 40000, max: Infinity },
];

function VehiclesPage() {
  const [body, setBody] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceIdx, setPriceIdx] = useState(0);

  const filtered = useMemo(() => {
    const p = prices[priceIdx];
    return inventory.filter(
      (v) =>
        (body === "All" || v.body === body) &&
        (brand === "All" || v.brand === brand) &&
        v.price >= p.min && v.price < p.max,
    );
  }, [body, brand, priceIdx]);

  return (
    <PageShell>
      <section className="border-b border-border bg-gradient-to-b from-primary/10 to-background">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <Eyebrow>Popular vehicles</Eyebrow>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            EVs we know inside and out.
          </h1>
          <p className="mt-4 max-w-2xl text-ink-soft">
            These are the models we track most for California buyers. Prices are typical
            recent transactions — your actual out-the-door number depends on the specific
            car and your rebate stack.
          </p>

          {/* Customization fee heads-up */}
          <div className="mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-sun/40 bg-sun-soft p-5">
            <Info className="mt-0.5 h-5 w-5 flex-none text-sun-foreground" />
            <div className="text-sm text-ink">
              <strong className="text-ink">Heads up — each customization adds a fee.</strong>{" "}
              Every extra you request in your search brief (specific color, options,
              accessories, upgraded charger, extended warranty) adds to the final bill.
              Use the receipt calculator below to see how the numbers add up before you
              lock in your brief.
            </div>
          </div>
        </div>
      </section>

      {/* Receipt-style fee calculator */}
      <ReceiptCalculator />


      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <Select label="Body type" value={body} onChange={setBody} options={bodies} />
            <Select label="Brand" value={brand} onChange={setBrand} options={brands} />
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-ink-soft">Price range</div>
              <select value={priceIdx} onChange={(e) => setPriceIdx(+e.target.value)}
                className="mt-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm">
                {prices.map((p, i) => <option key={p.label} value={i}>{p.label}</option>)}
              </select>
            </div>
            <div className="ml-auto text-sm font-semibold text-ink-soft">
              {filtered.length} match{filtered.length === 1 ? "" : "es"}
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((v) => <Card key={v.id} v={v} />)}
            {filtered.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-border p-10 text-center text-ink-soft">
                No matches — widen a filter or tell us what you're after.
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-widest text-ink-soft">{label}</div>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Card({ v }: { v: V }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-40 bg-gradient-to-br from-primary/20 via-primary/5 to-sun-soft">
        <div className="absolute left-3 top-3 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-ink backdrop-blur">
          {v.year}
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
          {v.body}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-ink">{v.name}</h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-soft">
          <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-primary" /> {v.range} mi</span>
          <span className="flex items-center gap-1"><Gauge className="h-3.5 w-3.5 text-primary" /> {v.brand}</span>
        </div>
        <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-soft">Typical</div>
            <div className="font-display text-xl font-bold text-ink flex items-center"><DollarSign className="h-4 w-4" />{v.price.toLocaleString()}</div>
          </div>
          <a href="/get-started" className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Ask about it</a>
        </div>
      </div>
    </article>
  );
}

type Customization = { id: string; label: string; fee: number };

const CUSTOMIZATIONS: Customization[] = [
  { id: "color", label: "Specific paint color", fee: 500 },
  { id: "interior", label: "Specific interior / trim", fee: 400 },
  { id: "wheels", label: "Upgraded wheels", fee: 350 },
  { id: "tow", label: "Tow package", fee: 600 },
  { id: "l2", label: "Level 2 home charger install", fee: 1200 },
  { id: "warranty", label: "Extended warranty", fee: 1500 },
  { id: "detail", label: "Full detail + ceramic coat", fee: 450 },
  { id: "outofstate", label: "Out-of-state sourcing", fee: 750 },
];

function ReceiptCalculator() {
  const [carBudget, setCarBudget] = useState(22000);
  const [savings, setSavings] = useState(9500);
  const [picked, setPicked] = useState<Record<string, boolean>>({});

  const customList = CUSTOMIZATIONS.filter((c) => picked[c.id]);
  const customTotal = customList.reduce((a, c) => a + c.fee, 0);
  const finalTotal = carBudget + customTotal - savings;

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          kicker="Estimate your bill"
          title="Car budget + customizations − rebate savings = your final total."
          lead="Pick the extras you want in your search brief. Each one adds a fee. Your rebate stack comes off the bottom line."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Inputs */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h3 className="text-lg font-bold text-ink">Your brief</h3>
            <div className="mt-5 space-y-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-ink-soft">
                  Car budget
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-ink-soft">$</span>
                  <input
                    type="range" min={10000} max={60000} step={500}
                    value={carBudget}
                    onChange={(e) => setCarBudget(+e.target.value)}
                    className="flex-1 accent-primary"
                  />
                  <span className="w-24 text-right font-display font-bold text-primary">
                    ${carBudget.toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-ink-soft">
                  Estimated rebate savings
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-ink-soft">$</span>
                  <input
                    type="range" min={0} max={20000} step={250}
                    value={savings}
                    onChange={(e) => setSavings(+e.target.value)}
                    className="flex-1 accent-primary"
                  />
                  <span className="w-24 text-right font-display font-bold text-primary">
                    ${savings.toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink-soft">
                  Use the <a className="text-primary underline" href="/calculator">savings calculator</a> to size this precisely.
                </p>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-ink-soft">
                  Customizations (each adds a fee)
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {CUSTOMIZATIONS.map((c) => {
                    const on = !!picked[c.id];
                    return (
                      <button
                        key={c.id}
                        onClick={() => setPicked((p) => ({ ...p, [c.id]: !on }))}
                        className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                          on
                            ? "border-primary bg-primary/10 text-ink"
                            : "border-border bg-background text-ink-soft hover:border-ink/30"
                        }`}
                      >
                        <span className="font-semibold">{c.label}</span>
                        <span className={`text-xs font-bold ${on ? "text-primary" : "text-ink-soft"}`}>
                          +${c.fee.toLocaleString()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Receipt */}
          <div className="rounded-3xl bg-background p-1 shadow-lg">
            <div className="rounded-[calc(1.5rem-4px)] border border-dashed border-ink/20 bg-card p-6 font-mono text-sm text-ink md:p-8">
              <div className="flex items-center gap-2 text-ink-soft">
                <Receipt className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Estimated receipt</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-b border-dashed border-ink/20 pb-2">
                <span>Car budget</span>
                <span className="font-semibold">${carBudget.toLocaleString()}</span>
              </div>

              <div className="mt-3 text-xs font-bold uppercase tracking-widest text-ink-soft">
                Customization fees
              </div>
              <ul className="mt-2 space-y-1.5">
                {customList.length === 0 && (
                  <li className="text-xs italic text-ink-soft">— none selected —</li>
                )}
                {customList.map((c) => (
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
                <span>− Rebate savings</span>
                <span className="font-semibold">− ${savings.toLocaleString()}</span>
              </div>

              <div className="mt-5 flex items-end justify-between rounded-xl bg-ink px-4 py-4 text-background">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-background/70">Final total</div>
                  <div className="text-[10px] text-background/60">car + customizations − savings</div>
                </div>
                <div className="font-display text-3xl font-bold text-sun">
                  ${finalTotal.toLocaleString()}
                </div>
              </div>
              <p className="mt-4 text-[11px] text-ink-soft">
                Estimate only. Actual fees depend on the specific vehicle and rebate approvals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

