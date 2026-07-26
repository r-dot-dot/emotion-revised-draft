import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Upload, ArrowRight } from "lucide-react";
import { PageShell, Eyebrow, SectionHead } from "@/components/page-shell";
import { FlipSubmission } from "@/components/flip-submission";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/flip")({
  head: () => ({
    meta: [
      { title: "Flip — We buy the car you found | eMotion Autos" },
      {
        name: "description",
        content:
          "Found an EV yourself? We buy it as an authorized CCFA/DCAP dealer and resell it to you with every rebate applied. Fixed fee, independent inspection.",
      },
      { property: "og:title", content: "Flip — We buy the car you found" },
      {
        property: "og:description",
        content: "Turn a private-sale EV into a rebate-eligible purchase.",
      },
    ],
  }),
  component: FlipPage,
});

const steps = [
  { t: "You send the listing", d: "Link, seller contact, VIN, and asking price." },
  { t: "We verify eligibility", d: "We confirm the car qualifies for your program." },
  { t: "We inspect and buy", d: "Independent inspection first. If it fails, we walk away." },
  { t: "We resell to you", d: "At cost plus our fee, with every rebate applied." },
  { t: "We file everything", d: "DMV paperwork and all incentive claims, handled." },
];

const checklist = [
  { t: "Letter of Intent (LOI)", d: "We'll email you the template — about five minutes.", req: true },
  { t: "DCAP or CCFA approval documents", d: "Your voucher number or approval letter.", req: true },
  { t: "Written agreement to our fee", d: "$1,500 flat, or 5% of vehicle price on cars above $30k (whichever is greater) — applied after your rebate savings.", req: true },
  { t: "The listing link", d: "Facebook Marketplace, Craigslist, OfferUp, or a dealer page.", req: true },
  { t: "Vehicle details", d: "VIN, mileage, asking price, and seller contact.", req: true },
  { t: "Photos from the seller", d: "Helpful but optional — speeds up review.", req: false },
];

function FlipPage() {
  const [done, setDone] = useState<Record<number, boolean>>({});
  const total = checklist.length;
  const doneCount = Object.values(done).filter(Boolean).length;
  const reqCount = checklist.filter((c) => c.req).length;
  const reqDone = checklist.filter((c, i) => c.req && done[i]).length;
  const ready = reqDone === reqCount;
  const pct = useMemo(() => Math.round((doneCount / total) * 100), [doneCount, total]);

  return (
    <PageShell>
      {/* HERO */}
      <section className="border-b border-border bg-gradient-to-b from-sun-soft to-background">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <Eyebrow>Path A · You found the car</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Found the car yourself? We'll make the rebates work.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            Private sellers and non-CCFA dealers can't process your incentives. We buy the
            car as an authorized dealer and resell it to you — so every rebate you qualify
            for still applies.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#checklist" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow hover:brightness-110">
              Start the checklist <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#faq" className="inline-flex items-center rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-ink hover:bg-accent">
              Common questions
            </a>
          </div>

          {/* Compare */}
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-ink-soft">Without eMotion</div>
              <h3 className="mt-2 text-xl font-bold text-ink">You buy it directly</h3>
              <p className="mt-2 text-sm text-ink-soft">
                You pay the seller's price, and your CCFA or DCAP voucher goes unused —
                private sales and unauthorized dealers can't process incentive claims.
                Thousands left behind.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-sun bg-sun-soft p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-sun-foreground">With the flip program</div>
              <h3 className="mt-2 text-xl font-bold text-ink">We buy it, then sell it to you</h3>
              <p className="mt-2 text-sm text-ink-soft">
                We purchase on your behalf as a licensed CCFA/DCAP dealer, inspect the car,
                then resell it to you at cost plus our published fee — with every rebate
                applied and all paperwork filed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead kicker="The process" title="Five steps, about two weeks" lead="Most of the work is ours. Here's exactly what happens after you send us a listing." />
          <ol className="mt-10 grid gap-6 md:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.t} className="relative">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground font-display font-bold">
                  {i + 1}
                </div>
                <h4 className="mt-4 text-base font-bold text-ink">{s.t}</h4>
                <p className="mt-1 text-sm text-ink-soft">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CHECKLIST */}
      <section id="checklist" className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead kicker="Before you submit" title="What we need from you" lead="Paste the links and upload the documents — each checkbox stays locked until its item is actually provided." />

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <FlipSubmission />

            <aside className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h4 className="text-lg font-bold text-ink">How submission works</h4>
              <ul className="mt-3 space-y-3 text-sm text-ink-soft">
                <li className="flex gap-2">
                  <Upload className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Documents accept PDF, JPG, or PNG. Photos can be uploaded in bulk.
                </li>
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  A checkbox only unlocks after the link is pasted or the file is attached.
                </li>
                <li className="flex gap-2">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Submit becomes available once every required item is checked. We confirm
                  receipt within one business day.
                </li>
              </ul>

              <div className="mt-6 rounded-2xl bg-ink p-5 text-background">
                <div className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/70">Our fee</div>
                <div className="mt-1 font-display text-3xl font-bold">$1,500 flat</div>
                <div className="mt-1 text-xs text-primary-foreground/80">On vehicles above $30,000, the fee becomes 5% of the purchase price if that's greater. Charged <strong>after</strong> your rebate savings — never before.</div>
              </div>
            </aside>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHead center title="Flip program questions" />
          <Accordion type="single" collapsible className="mt-8">
            {[
              ["Why can't I just buy the car myself?", "You can — but CCFA and DCAP require the vehicle to be purchased through an authorized dealer for the incentive to apply. A private seller can't process that claim."],
              ["What if the car fails inspection?", "We don't buy it, and you owe nothing. That risk is exactly why we inspect before purchase."],
              ["How much do you charge?", "$1,500 flat on any vehicle under $30,000. Above $30,000, the fee is 5% of the purchase price. Either way, it's calculated after your rebate savings — never before — and it's published so there's no surprise."],
              ["Is a deposit required?", "On higher-priced vehicles, yes — refundable under California law. We tell you the amount up front."],
              ["How long does a flip take?", "About nine days from a complete submission to purchase, then a few more days for paperwork and delivery."],
              ["Can I flip a car from out of state?", "Usually not — incentives require California registration and out-of-state title issues often cost more than the rebate."],
            ].map(([q, a], i) => (
              <AccordionItem key={q} value={`i-${i}`} className="rounded-xl border border-border bg-card px-4 mb-2">
                <AccordionTrigger className="text-base font-bold text-ink hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="text-sm text-ink-soft">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 text-center">
            <Link to="/get-started" className="inline-flex items-center gap-2 rounded-full bg-sun px-5 py-3 text-sm font-semibold text-sun-foreground">
              Request a callback <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
