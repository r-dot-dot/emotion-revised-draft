import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, SectionHead } from "@/components/page-shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/incentives")({
  head: () => ({
    meta: [
      { title: "Incentives — CCFA, DCAP, federal & utility rebates | eMotion Autos" },
      { name: "description", content: "Every California EV rebate program, explained. CCFA, DCAP, federal 25E/30D, utility programs — click to expand." },
      { property: "og:title", content: "Every California EV rebate, explained" },
      { property: "og:description", content: "CCFA, DCAP, federal, utility — all in one place." },
    ],
  }),
  component: IncentivesPage,
});

const programs: { q: string; a: React.ReactNode }[] = [
  {
    q: "CCFA — Clean Cars 4 All",
    a: (
      <>
        <p>California's income-qualified rebate. Up to <strong>$12,000</strong> when you retire a qualifying older gas vehicle and buy a used or new EV/PHEV through a participating dealer.</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Income up to 300% of federal poverty level (varies by air district).</li>
          <li>Vehicle must be purchased from a CCFA-authorized dealer (we are one).</li>
          <li>Stackable with federal and utility rebates.</li>
        </ul>
      </>
    ),
  },
  {
    q: "DCAP — Driving Clean Assistance Program",
    a: (
      <>
        <p>Grant + low-interest loan program run by CalCAP. Up to <strong>$5,000 grant</strong> plus subsidized financing for income-qualified buyers.</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>No trade-in required, unlike CCFA.</li>
          <li>Requires purchase through a participating dealer.</li>
          <li>Cannot be combined with CCFA on the same vehicle — you pick one.</li>
        </ul>
      </>
    ),
  },
  {
    q: "Federal 25E — Used clean vehicle credit",
    a: (
      <>
        <p><strong>Up to $4,000</strong> or 30% of the sale price, whichever is less. Applied at the point of sale by the dealer.</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Vehicle must be at least 2 model years old, priced at $25,000 or less.</li>
          <li>Income caps: $75k single / $150k joint.</li>
          <li>Once-per-VIN, once-per-buyer-every-3-years.</li>
        </ul>
      </>
    ),
  },
  {
    q: "Federal 30D — New clean vehicle credit",
    a: (
      <>
        <p><strong>Up to $7,500</strong> on new EVs meeting battery-sourcing rules. Applied at the point of sale.</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Income caps: $150k single / $300k joint.</li>
          <li>MSRP caps: $55k cars / $80k SUVs & trucks.</li>
        </ul>
      </>
    ),
  },
  {
    q: "Utility rebates — PG&E, SCE, SDG&E, LADWP",
    a: (
      <>
        <p>Each California utility offers rebates on EV purchases and home chargers. Typical range: <strong>$500–$2,500</strong>.</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Submitted after purchase, using your registration and utility account.</li>
          <li>We file it for you as part of our closing paperwork.</li>
        </ul>
      </>
    ),
  },
  {
    q: "Home charger rebates",
    a: (
      <>
        <p>Charger hardware and installation rebates through utilities and the state. <strong>$500–$2,000</strong> depending on program and equipment.</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Must use a rebate-approved Level 2 charger — we only stock approved SKUs.</li>
          <li>Some programs require a licensed C-10 electrician install.</li>
        </ul>
      </>
    ),
  },
];

function IncentivesPage() {
  return (
    <PageShell>
      <section className="border-b border-border bg-gradient-to-b from-primary/10 to-background">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Every California EV rebate, in one place.
          </h1>
          <p className="mt-4 max-w-2xl text-ink-soft">
            Click each program to see the eligibility, dollar amount, and how it stacks.
            The <Link to="/calculator" className="text-primary underline">calculator</Link> ties them together for your specific situation.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-4xl px-4">
          <Accordion type="single" collapsible className="space-y-3">
            {programs.map((p, i) => (
              <AccordionItem key={i} value={`i-${i}`} className="rounded-2xl border border-border bg-card px-5">
                <AccordionTrigger className="text-left text-lg font-bold text-ink hover:no-underline">
                  {p.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-ink-soft">{p.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 text-center">
            <p className="text-ink-soft">Not sure which programs apply to you?</p>
            <Link to="/calculator" className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
              Run the calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
