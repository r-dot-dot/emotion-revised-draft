import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, Eyebrow, SectionHead } from "@/components/page-shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Common questions about EVs & rebates | eMotion Autos" },
      { name: "description", content: "Straight answers about used EVs, California rebates, charging, and how our Flip and Search paths work." },
      { property: "og:title", content: "FAQ — Common questions" },
      { property: "og:description", content: "Straight answers about EVs, rebates, and charging." },
    ],
  }),
  component: FaqPage,
});

const groups: { title: string; items: [string, React.ReactNode][] }[] = [
  {
    title: "The basics",
    items: [
      ["Why buy used instead of new?", <p>Used EVs are where the value is. A three-year-old EV has usually depreciated 40%+ and still qualifies for the federal 25E used credit — something no new car gets.</p>],
      ["Do EV batteries really last?", <p>Modern EV batteries routinely last 200,000+ miles. We include a battery health report on every car we sell or flip.</p>],
    ],
  },
  {
    title: "Rebates & incentives",
    items: [
      ["Can I stack CCFA and DCAP?", <p>No — you pick one per vehicle. You can still stack whichever you choose with the federal credit and utility rebates.</p>],
      ["When do I get the money?", <p>Federal 25E and 30D come off the price at purchase. CCFA and DCAP arrive as a check or ACH within a few weeks of purchase.</p>],
    ],
  },
  {
    title: "Flip vs Search",
    items: [
      ["Which path is right for me?", <p><strong>Flip</strong> if you've already found a specific car. <strong>Search</strong> if you have a general idea and want us to look. Both end the same way — a rebate-eligible EV in your driveway.</p>],
      ["How much do you charge?", <p>Flip: $1,500 or 5% of purchase price, whichever is greater. Search: no fee — dealer margin covers it. Both are published up front.</p>],
    ],
  },
  {
    title: "Charging",
    items: [
      ["Do I need a Level 2 charger?", <p>If you drive more than 30 miles a day and have a garage, yes — the rebates usually cover most of it. Below that, a wall outlet works.</p>],
    ],
  },
];

function FaqPage() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);

  return (
    <PageShell>
      <section className="border-b border-border bg-gradient-to-b from-sun-soft to-background">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <Eyebrow>Frequently asked</Eyebrow>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Straight answers. No dealer fog.
          </h1>
          <p className="mt-4 max-w-2xl text-ink-soft">
            Everything we get asked most. If your question isn't here, leave your email
            below and we'll answer it directly.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-3xl space-y-10 px-4">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="text-xl font-bold text-ink">{g.title}</h2>
              <Accordion type="single" collapsible className="mt-4 space-y-2">
                {g.items.map(([q, a], i) => (
                  <AccordionItem key={i} value={`${g.title}-${i}`} className="rounded-xl border border-border bg-card px-4">
                    <AccordionTrigger className="text-left font-bold text-ink hover:no-underline">{q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-ink-soft">{a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <div className="rounded-3xl border-2 border-primary bg-primary/5 p-8">
            <h3 className="text-2xl font-bold text-ink">Still not answered?</h3>
            <p className="mt-2 text-sm text-ink-soft">Leave your email — we'll write back with a real answer within a business day.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setOk(true); }}
              className="mt-4 flex flex-col gap-2 sm:flex-row"
            >
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-full border border-border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:brightness-110">
                {ok ? "Got it ✓" : "Ask a question"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
