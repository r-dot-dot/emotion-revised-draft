import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Eyebrow, SectionHead } from "@/components/page-shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plug, Zap, Gauge, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/charging")({
  head: () => ({
    meta: [
      { title: "Charging — Home & road charging for EV owners | eMotion Autos" },
      { name: "description", content: "L1, L2, and DC fast charging explained plainly. We sell chargers and connect you with trusted installers." },
      { property: "og:title", content: "Charging — L1, L2, DC Fast" },
      { property: "og:description", content: "Everything a new EV owner needs — no jargon." },
    ],
  }),
  component: ChargingPage,
});

function ChargingPage() {
  return (
    <PageShell>
      <section className="border-b border-border bg-gradient-to-b from-sun-soft to-background">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <Eyebrow>Charging</Eyebrow>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            How charging actually works — and what you'll actually use.
          </h1>
          <p className="mt-4 max-w-2xl text-ink-soft">
            Most drivers use one level of charging 95% of the time. Here's what each
            speed does, when you need it, and what it costs.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-4xl px-4">
          <Accordion type="single" collapsible className="space-y-3">
            {[
              {
                icon: Plug,
                q: "Level 1 — the wall outlet",
                a: (
                  <>
                    <p>Plugs into any standard 120V household outlet. Adds about <strong>4 miles of range per hour</strong>. Slow, but zero installation cost and perfect if you drive fewer than 30 miles a day.</p>
                    <ul className="mt-3 list-disc space-y-1 pl-5">
                      <li>Best for: PHEVs, low-mileage drivers, apartment renters with garage access.</li>
                      <li>Cost: $0 install. The cable ships with the car.</li>
                    </ul>
                  </>
                ),
              },
              {
                icon: Zap,
                q: "Level 2 — the home standard",
                a: (
                  <>
                    <p>240V, dryer-plug style. Adds <strong>20–35 miles per hour</strong> — a full overnight top-up for almost any EV. This is the sweet spot for home charging.</p>
                    <ul className="mt-3 list-disc space-y-1 pl-5">
                      <li>Best for: 95% of home charging needs.</li>
                      <li>Cost: $500–$1,500 hardware + $500–$2,000 installation. Rebates often cover most of it.</li>
                    </ul>
                  </>
                ),
              },
              {
                icon: Gauge,
                q: "DC Fast Charging — the road-trip solution",
                a: (
                  <>
                    <p>High-power public chargers (50–350 kW). Adds <strong>100+ miles in about 20 minutes</strong>. You'll use it on trips, rarely at home.</p>
                    <ul className="mt-3 list-disc space-y-1 pl-5">
                      <li>Best for: long trips, one-off top-ups.</li>
                      <li>Cost: $0.30–$0.60 per kWh at public stations.</li>
                    </ul>
                  </>
                ),
              },
            ].map(({ icon: Icon, q, a }, i) => (
              <AccordionItem key={i} value={`i-${i}`} className="rounded-2xl border border-border bg-card px-5">
                <AccordionTrigger className="hover:no-underline">
                  <span className="flex items-center gap-3 text-left text-lg font-bold text-ink">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    {q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-14 text-sm text-ink-soft">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Two-up panels */}
      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2">
          <div className="rounded-3xl border-2 border-primary bg-primary/5 p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">We sell chargers</p>
            <h3 className="mt-2 text-2xl font-bold text-ink">Level 2 chargers, at cost.</h3>
            <p className="mt-3 text-sm text-ink-soft">
              We stock ChargePoint, Wallbox, and Emporia units. Rebate-eligible SKUs
              only, priced at our dealer cost so you keep the utility rebate margin.
            </p>
            <a href="/get-started" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
              Ask for pricing <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="rounded-3xl border-2 border-sun bg-sun-soft p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-sun-foreground">Trusted installers</p>
            <h3 className="mt-2 text-2xl font-bold text-ink">Vetted local electricians.</h3>
            <p className="mt-3 text-sm text-ink-soft">
              We keep a short list of California C-10 electricians who understand
              utility rebate paperwork and won't blow your permit timeline.
            </p>
            <a href="/service" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background">
              Find an installer <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
