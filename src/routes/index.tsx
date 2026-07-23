import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Car, Search as SearchIcon, Calculator, Zap, ShieldCheck, Sparkles } from "lucide-react";
import { PageShell, Eyebrow, SectionHead } from "@/components/page-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "eMotion Autos — Used EVs with every rebate applied" },
      {
        name: "description",
        content:
          "Two ways to buy a used electric car in California: let us Flip a car you found, or Search our vetted inventory. Every CCFA and DCAP dollar counted.",
      },
      { property: "og:title", content: "eMotion Autos — Used EVs with every rebate applied" },
      {
        property: "og:description",
        content: "Flip or Search — two clear paths to a rebated used EV in California.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,var(--sun-soft),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 md:pt-20">
          <div className="max-w-3xl">
            <Eyebrow>California CCFA &amp; DCAP authorized dealer</Eyebrow>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
              Used electric cars, with{" "}
              <span className="text-primary">every rebate</span> made usable.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-soft">
              Most Californians leave thousands of rebate dollars behind because private
              sellers can't process incentive claims. We fix that — pick the path that
              matches where you are.
            </p>
          </div>

          {/* Two-path cards */}
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <PathCard
              to="/flip"
              tint="sun"
              tag="Flip"
              title="You found the car. We make the rebates work."
              body="Send us a listing — private seller, out-of-state, or a dealer that can't process CCFA. We buy the car as an authorized dealer, then resell it to you with every incentive applied."
              cta="Start a flip"
            />
            <PathCard
              to="/search"
              tint="primary"
              tag="Search"
              title="Tell us what you want. We'll find it."
              body="Body type, budget, range needs — we search vetted inventory, verify eligibility, and hand you the shortlist. You never comb Craigslist alone."
              cta="Start a search"
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-ink-soft">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Independent inspection before purchase</div>
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Every rebate filed for you</div>
            <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> EV &amp; plug-in specialists</div>
          </div>
        </div>
      </section>

      {/* HOW WE DIFFER */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            kicker="Why this exists"
            title="Rebates only work through an authorized dealer."
            lead="CCFA vouchers, DCAP grants, and even the federal §25E credit require the car to be sold by a participating dealer. A private seller can't file the paperwork. We can."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { icon: Car, t: "Authorized dealership", d: "Licensed to process CCFA and DCAP claims on your behalf." },
              { icon: Calculator, t: "Transparent fees", d: "$1,500 or 5% of price — whichever is greater. Published, not negotiated." },
              { icon: SearchIcon, t: "We do the legwork", d: "Verification, inspection, DMV, and rebate filings — one point of contact." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <x.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{x.t}</h3>
                <p className="mt-2 text-sm text-ink-soft">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALC PROMO */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 rounded-3xl border border-border bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground md:grid-cols-[1.2fr_1fr] md:p-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/80">
                Savings calculator
              </p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                See your rebate stack in under a minute.
              </h2>
              <p className="mt-4 max-w-prose text-primary-foreground/90">
                Answer six questions — income, household, zip, vehicle type, home
                ownership, tribal status — and we'll show every program you qualify for,
                stacked and totaled.
              </p>
              <Link
                to="/calculator"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-sun px-5 py-3 text-sm font-semibold text-sun-foreground shadow-lg hover:brightness-95"
              >
                Open the calculator <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-2xl bg-background/10 p-6 backdrop-blur">
              <div className="space-y-3 text-sm">
                {[
                  ["CCFA rebate", "$7,500"],
                  ["DCAP grant", "$2,000"],
                  ["Federal §25E credit", "$4,000"],
                  ["Utility rebate (PG&E)", "$1,000"],
                  ["Home charger rebate", "$500"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-primary-foreground/15 pb-2">
                    <span className="text-primary-foreground/85">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 text-lg font-bold">
                  <span>Example stack</span><span className="text-sun">$15,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function PathCard({
  to, tag, title, body, cta, tint,
}: {
  to: "/flip" | "/search";
  tag: string;
  title: string;
  body: string;
  cta: string;
  tint: "sun" | "primary";
}) {
  const ring = tint === "sun" ? "hover:border-sun" : "hover:border-primary";
  const chip =
    tint === "sun"
      ? "bg-sun text-sun-foreground"
      : "bg-primary text-primary-foreground";
  return (
    <Link
      to={to}
      className={`group relative flex flex-col rounded-3xl border-2 border-border bg-card p-8 shadow-sm transition ${ring}`}
    >
      <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${chip}`}>
        {tag}
      </span>
      <h3 className="mt-5 text-2xl font-bold text-ink">{title}</h3>
      <p className="mt-3 flex-1 text-sm text-ink-soft">{body}</p>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink group-hover:gap-2 transition-all">
        {cta} <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
