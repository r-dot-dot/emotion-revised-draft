import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Car, Search as SearchIcon, Calculator, Zap, ShieldCheck, Sparkles, Star, Quote } from "lucide-react";
import { PageShell, Eyebrow, SectionHead } from "@/components/page-shell";
import heroEv from "@/assets/hero-ev.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "eMotion Autos — Used EVs with every rebate applied" },
      {
        name: "description",
        content:
          "California CCFA & DCAP authorized dealer. Estimate your rebate stack or learn how we source, inspect, and file every incentive for you.",
      },
      { property: "og:title", content: "eMotion Autos — Used EVs with every rebate applied" },
      {
        property: "og:description",
        content: "Estimate your savings or learn how we file every California EV rebate for you.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      {/* HERO — calculate vs learn-more */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sun-soft via-sun-soft/40 to-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-14 md:grid-cols-[1.05fr_.95fr] md:pt-20 md:pb-24">
          <div className="flex flex-col justify-center">
            <Eyebrow>California EV specialists</Eyebrow>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-6xl">
              Drive electric.<br />
              <span className="text-primary">Keep every rebate</span> you're owed.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-soft">
              Buying an EV shouldn't mean losing thousands in incentives to paperwork. We're
              an authorized CCFA and DCAP dealer — we source the car, stack the rebates, and
              file every form.
            </p>

            {/* Two clear paths for a new visitor */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/calculator"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
              >
                Estimate my savings
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 bg-card px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/40"
              >
                See how it works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-soft">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Authorized dealer</div>
              <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> All paperwork filed</div>
              <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> 1,200+ EVs delivered</div>
            </div>
          </div>

          {/* EV hero image */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/10 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
              <img
                src={heroEv}
                alt="Electric SUV in eMotion Autos green"
                width={1280}
                height={960}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card px-5 py-4 shadow-lg md:block">
              <div className="text-xs font-bold uppercase tracking-widest text-ink-soft">Avg. rebate stack</div>
              <div className="mt-1 font-display text-2xl font-bold text-primary">$14,200</div>
            </div>
          </div>
        </div>
      </section>

      {/* TWO PATHS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            kicker="Two ways to buy"
            title="Pick the path that matches where you are."
            lead="Whether you already found the car or need us to hunt it down, we handle the rebates."
          />
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
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-muted/40 py-20 scroll-mt-20">
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

      {/* REVIEWS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            kicker="What drivers say"
            title="5 stars from California EV buyers."
            lead="Real customers who kept every dollar the rebate programs owed them."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                name: "Daniel D.",
                city: "Mountain View, CA",
                quote:
                  "This is definitely the place to go for EV rebates that are hard/impossible to find elsewhere. They saved my family an absolutely incredible amount of money on three used Chevy Bolts using rebates from BAAQMD, PG&E, IRS and MCE.",
              },
              {
                name: "Rita DeAngelis",
                city: "Google review",
                quote:
                  "The most positive, productive and quick experience I've ever had when purchasing a vehicle. Adam and Cole found the perfect vehicle for me, helped with all of the EV incentives and, most important, made me feel valued.",
              },
              {
                name: "Matthew Tessema",
                city: "Google review",
                quote:
                  "Fast, quick responses, easy, they were patient when I took a while to get my credit union loan, good knowledge on EV vehicles and maximizing all rebate options, fair dealership fees/prices, and the ability to buy via auction.",
              },
              {
                name: "Ruff Riffing",
                city: "Google Local Guide",
                quote:
                  "It has been such a great experience with emotion autos. Adam has been such great help. Very knowledgeable, professional, super patient and extremely helpful. Let these guys find your car. Best move you can ever make!",
              },
              {
                name: "A Z",
                city: "Google review",
                quote:
                  "eMotion Autos is by far the most professional, most honest, most ethical and most trustworthy dealership in the country.",
              },
              {
                name: "BH Design",
                city: "Google review",
                quote:
                  "The Emotion process was supportive and painless. Unlike anything I've ever experienced when buying a car. Adam was kind, patient, informed, and communicative. Would definitely use them again.",
              },
            ].map((r) => (
              <figure key={r.name} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-1 text-sun">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-sun" />
                  ))}
                </div>
                <Quote className="mt-4 h-6 w-6 text-primary/30" />
                <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-ink">
                  {r.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <div className="text-sm font-semibold text-ink">{r.name}</div>
                  <div className="text-xs text-ink-soft">{r.city}</div>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-widest text-ink-soft">
            <span>★ 5.0 Google</span>
            <span>★ 5.0 Yelp</span>
            <span>CCFA authorized</span>
            <span>DCAP authorized</span>
          </div>
        </div>
      </section>


      {/* CALC PROMO */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 rounded-3xl border border-border bg-gradient-to-br from-primary to-primary/85 p-8 text-primary-foreground md:grid-cols-[1.2fr_1fr] md:p-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-sun">
                Savings calculator
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
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
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink transition-all group-hover:gap-2">
        {cta} <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
