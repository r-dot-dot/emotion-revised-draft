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
  Zap,
} from "lucide-react";
import { PageShell, Eyebrow, SectionHead } from "@/components/page-shell";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — Join the waitlist. We find your EV. | eMotion Autos" },
      {
        name: "description",
        content:
          "Submit a rough brief, join our search waitlist, and we hand you an approved shortlist of rebate-eligible California EVs. Browse the models we track most.",
      },
      { property: "og:title", content: "Search — Join the waitlist. We find your EV." },
      { property: "og:description", content: "Waitlist → approval → your EV. Browse the models we track." },
    ],
  }),
  component: SearchPage,
});

const bodyTypes = ["Sedan", "SUV", "Hatchback", "Truck", "Van"] as const;
const brandOptions = ["Any", "Tesla", "Chevrolet", "Ford", "Hyundai", "Kia", "Nissan", "Toyota", "Volkswagen"] as const;

type GalleryCar = {
  name: string;
  years: string;
  style: string;
  range: string;
  mpg?: string;
  blurb: string;
  price: string;
  minPrice: number;
  maxPrice: number;
  category: "BEV" | "PHEV" | "Truck/Van";
};

const gallery: GalleryCar[] = [
  // BEVs
  { name: "Chevrolet Bolt EV", years: "2018–2023", style: "Hatchback", range: "240–270 mi", blurb: "Great for running errands and occasional road trips.", price: "$16,000–$23,000", minPrice: 16000, maxPrice: 23000, category: "BEV" },
  { name: "Chevrolet Bolt EUV", years: "2022–2023", style: "Subcompact SUV", range: "240–250 mi", blurb: "A bigger Bolt with a more upright SUV-like driving position.", price: "$23,000–$28,000", minPrice: 23000, maxPrice: 28000, category: "BEV" },
  { name: "Kia Niro EV", years: "2018–2023", style: "Subcompact SUV", range: "230–240 mi", blurb: "Subcompact with surprising room and flexibility — Kona's cousin.", price: "$20,000–$32,000", minPrice: 20000, maxPrice: 32000, category: "BEV" },
  { name: "Tesla Model 3", years: "2018–2023", style: "Sedan", range: "200–300+ mi", blurb: "The original Tesla for the people.", price: "$23,000–$33,000", minPrice: 23000, maxPrice: 33000, category: "BEV" },
  { name: "Tesla Model Y", years: "2020–2023", style: "SUV", range: "200–300+ mi", blurb: "The world's best-selling EV for a reason.", price: "$27,000–$41,000", minPrice: 27000, maxPrice: 41000, category: "BEV" },
  { name: "Kia EV6", years: "2022–2023", style: "Wagon-like compact SUV", range: "250–300+ mi", blurb: "Fun to drive, long-range and practical.", price: "$27,000–$42,000", minPrice: 27000, maxPrice: 42000, category: "BEV" },
  // PHEVs
  { name: "Toyota Prius Prime", years: "2018–2023", style: "Hatchback", range: "EV 25–30 mi", mpg: "48 mpg", blurb: "A great car that's ready for all your adventures.", price: "$23,000–$37,000", minPrice: 23000, maxPrice: 37000, category: "PHEV" },
  { name: "Toyota RAV-4 Prime", years: "2022–2023", style: "Compact SUV", range: "EV 40 mi", mpg: "38 mpg", blurb: "Prius-like efficiency in an SUV package.", price: "$32,000–$49,000", minPrice: 32000, maxPrice: 49000, category: "PHEV" },
  { name: "Kia Niro PHEV", years: "2019–2023", style: "Compact SUV", range: "EV 25 mi", mpg: "37 mpg", blurb: "A great alternative to a Toyota PHEV.", price: "$21,000–$33,000", minPrice: 21000, maxPrice: 33000, category: "PHEV" },
  { name: "Honda Clarity", years: "2018–2021", style: "Sedan", range: "EV 47 mi", mpg: "42 mpg", blurb: "Legendary Honda efficiency in a futuristic package.", price: "$21,000–$30,000", minPrice: 21000, maxPrice: 30000, category: "PHEV" },
  { name: "Mitsubishi Outlander PHEV", years: "2022–2023", style: "5–7 seater SUV", range: "EV 24 mi", mpg: "60+ combined", blurb: "A three-row budget-friendly plug-in SUV.", price: "$25,000–$33,000", minPrice: 25000, maxPrice: 33000, category: "PHEV" },
  { name: "Hyundai Ioniq PHEV", years: "2018–2022", style: "Hatchback", range: "EV 29 mi", mpg: "52 combined", blurb: "Inexpensive, flexible, versatile, reliable.", price: "$20,000–$27,000", minPrice: 20000, maxPrice: 27000, category: "PHEV" },
  // Trucks & Vans
  { name: "Ford F-150 Lightning", years: "2022–2023", style: "Pickup Truck", range: "240–275 mi", blurb: "Great for those who need a work truck.", price: "$35,000–$65,000", minPrice: 35000, maxPrice: 65000, category: "Truck/Van" },
  { name: "Rivian R1T", years: "2022–2023", style: "Pickup Truck", range: "225–300+ mi", blurb: "Great for those who want a truck for adventures.", price: "$50,000–$90,000", minPrice: 50000, maxPrice: 90000, category: "Truck/Van" },
  { name: "Chrysler Pacifica PHEV", years: "2018–2023", style: "Minivan", range: "EV 25 mi", mpg: "30 mpg", blurb: "A van for around town and road trips with the family.", price: "$23,000–$40,000", minPrice: 23000, maxPrice: 40000, category: "Truck/Van" },
];

function SearchPage() {
  const [body, setBody] = useState<(typeof bodyTypes)[number]>("SUV");
  const [brand, setBrand] = useState<(typeof brandOptions)[number]>("Any");
  const [budget, setBudget] = useState(25000);
  const [rangeMin, setRangeMin] = useState(150);

  const bevs = useMemo(() => gallery.filter((g) => g.category === "BEV"), []);
  const phevs = useMemo(() => gallery.filter((g) => g.category === "PHEV"), []);
  const trucks = useMemo(() => gallery.filter((g) => g.category === "Truck/Van"), []);

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
            EVs that match. Browse the models we track most below to shape your brief.
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

      {/* Vehicle gallery — merged from Vehicles */}
      <section id="gallery" className="border-t border-border bg-muted/40 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            kicker="Vehicle gallery"
            title="The EVs we know inside and out."
            lead="Use these as reference for your brief. Prices are typical recent California transactions before rebates."
          />

          <GallerySection title="Popular BEVs" cars={bevs} />
          <GallerySection title="Popular PHEVs" cars={phevs} />
          <GallerySection title="Electric Trucks & Vans" cars={trucks} />
        </div>
      </section>
    </PageShell>
  );
}

function GallerySection({ title, cars }: { title: string; cars: GalleryCar[] }) {
  return (
    <div className="mt-14 first:mt-10">
      <h3 className="font-display text-2xl font-bold text-ink md:text-3xl">{title}</h3>
      <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
        {cars.map((c) => (
          <article key={c.name} className="grid gap-4 p-5 md:grid-cols-[1fr_1.4fr_auto] md:items-center md:gap-6 md:p-6">
            <div className="grid h-32 place-items-center rounded-xl bg-gradient-to-br from-primary/15 via-primary/5 to-sun-soft text-primary md:h-28">
              <Zap className="h-10 w-10 opacity-70" />
            </div>
            <div className="min-w-0">
              <h4 className="text-lg font-bold text-ink underline decoration-ink/30 underline-offset-4">
                {c.name}
              </h4>
              <ul className="mt-2 space-y-1 text-sm text-ink-soft">
                <li>Years: {c.years}</li>
                <li>Style: {c.style}</li>
                <li>Range: {c.range}{c.mpg ? ` · ${c.mpg}` : ""}</li>
                <li>{c.blurb}</li>
              </ul>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <div className="font-display text-lg font-bold text-ink">{c.price}</div>
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-background hover:brightness-110"
              >
                Get your deal <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
