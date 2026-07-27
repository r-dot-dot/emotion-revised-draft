import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Zap } from "lucide-react";
import { PageShell, SectionHead } from "@/components/page-shell";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Vehicle gallery — EVs we know inside and out | eMotion Autos" },
      {
        name: "description",
        content:
          "Browse the used BEVs, PHEVs, trucks, and vans we track most for California buyers — with typical price ranges before rebates.",
      },
      { property: "og:title", content: "Vehicle gallery — EVs we know inside and out" },
      {
        property: "og:description",
        content: "Popular BEVs, PHEVs, and electric trucks/vans with typical CA transaction prices.",
      },
    ],
  }),
  component: GalleryPage,
});

type GalleryCar = {
  name: string;
  years: string;
  style: string;
  range: string;
  mpg?: string;
  blurb: string;
  price: string;
  category: "BEV" | "PHEV" | "Truck/Van";
};

const gallery: GalleryCar[] = [
  { name: "Chevrolet Bolt EV", years: "2018–2023", style: "Hatchback", range: "240–270 mi", blurb: "Great for running errands and occasional road trips.", price: "$16,000–$23,000", category: "BEV" },
  { name: "Chevrolet Bolt EUV", years: "2022–2023", style: "Subcompact SUV", range: "240–250 mi", blurb: "A bigger Bolt with a more upright SUV-like driving position.", price: "$23,000–$28,000", category: "BEV" },
  { name: "Kia Niro EV", years: "2018–2023", style: "Subcompact SUV", range: "230–240 mi", blurb: "Subcompact with surprising room and flexibility — Kona's cousin.", price: "$20,000–$32,000", category: "BEV" },
  { name: "Tesla Model 3", years: "2018–2023", style: "Sedan", range: "200–300+ mi", blurb: "The original Tesla for the people.", price: "$23,000–$33,000", category: "BEV" },
  { name: "Tesla Model Y", years: "2020–2023", style: "SUV", range: "200–300+ mi", blurb: "The world's best-selling EV for a reason.", price: "$27,000–$41,000", category: "BEV" },
  { name: "Kia EV6", years: "2022–2023", style: "Wagon-like compact SUV", range: "250–300+ mi", blurb: "Fun to drive, long-range and practical.", price: "$27,000–$42,000", category: "BEV" },
  { name: "Toyota Prius Prime", years: "2018–2023", style: "Hatchback", range: "EV 25–30 mi", mpg: "48 mpg", blurb: "A great car that's ready for all your adventures.", price: "$23,000–$37,000", category: "PHEV" },
  { name: "Toyota RAV-4 Prime", years: "2022–2023", style: "Compact SUV", range: "EV 40 mi", mpg: "38 mpg", blurb: "Prius-like efficiency in an SUV package.", price: "$32,000–$49,000", category: "PHEV" },
  { name: "Kia Niro PHEV", years: "2019–2023", style: "Compact SUV", range: "EV 25 mi", mpg: "37 mpg", blurb: "A great alternative to a Toyota PHEV.", price: "$21,000–$33,000", category: "PHEV" },
  { name: "Honda Clarity", years: "2018–2021", style: "Sedan", range: "EV 47 mi", mpg: "42 mpg", blurb: "Legendary Honda efficiency in a futuristic package.", price: "$21,000–$30,000", category: "PHEV" },
  { name: "Mitsubishi Outlander PHEV", years: "2022–2023", style: "5–7 seater SUV", range: "EV 24 mi", mpg: "60+ combined", blurb: "A three-row budget-friendly plug-in SUV.", price: "$25,000–$33,000", category: "PHEV" },
  { name: "Hyundai Ioniq PHEV", years: "2018–2022", style: "Hatchback", range: "EV 29 mi", mpg: "52 combined", blurb: "Inexpensive, flexible, versatile, reliable.", price: "$20,000–$27,000", category: "PHEV" },
  { name: "Ford F-150 Lightning", years: "2022–2023", style: "Pickup Truck", range: "240–275 mi", blurb: "Great for those who need a work truck.", price: "$35,000–$65,000", category: "Truck/Van" },
  { name: "Rivian R1T", years: "2022–2023", style: "Pickup Truck", range: "225–300+ mi", blurb: "Great for those who want a truck for adventures.", price: "$50,000–$90,000", category: "Truck/Van" },
  { name: "Chrysler Pacifica PHEV", years: "2018–2023", style: "Minivan", range: "EV 25 mi", mpg: "30 mpg", blurb: "A van for around town and road trips with the family.", price: "$23,000–$40,000", category: "Truck/Van" },
];

function GalleryPage() {
  const bevs = gallery.filter((g) => g.category === "BEV");
  const phevs = gallery.filter((g) => g.category === "PHEV");
  const trucks = gallery.filter((g) => g.category === "Truck/Van");

  return (
    <PageShell>
      <section className="border-b border-border bg-gradient-to-b from-primary/10 to-background">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            The EVs we know inside and out.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            Use these as reference for your search brief. Prices are typical recent
            California transactions before rebates.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <GallerySection title="Popular BEVs" cars={bevs} />
          <GallerySection title="Popular PHEVs" cars={phevs} />
          <GallerySection title="Electric Trucks & Vans" cars={trucks} />

          <div className="mt-14 rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
            <SectionHead
              kicker="Ready to shop?"
              title="Tell us what you want and we'll hunt it down."
              lead="Submit a rough brief on the Search page — we'll approve you and start sourcing rebate-eligible California EVs."
            />
            <Link
              to="/search"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:brightness-110"
            >
              Start a search brief <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function GallerySection({ title, cars }: { title: string; cars: GalleryCar[] }) {
  return (
    <div className="mt-14 first:mt-0">
      <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">{title}</h2>
      <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
        {cars.map((c) => (
          <article key={c.name} className="grid gap-4 p-5 md:grid-cols-[1fr_1.4fr_auto] md:items-center md:gap-6 md:p-6">
            <div className="grid h-32 place-items-center rounded-xl bg-gradient-to-br from-primary/15 via-primary/5 to-sun-soft text-primary md:h-28">
              <Zap className="h-10 w-10 opacity-70" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-ink underline decoration-ink/30 underline-offset-4">
                {c.name}
              </h3>
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
