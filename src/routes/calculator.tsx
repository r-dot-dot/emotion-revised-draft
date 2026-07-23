import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { PageShell, Eyebrow, SectionHead } from "@/components/page-shell";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Savings Calculator — Stack every EV rebate | eMotion Autos" },
      {
        name: "description",
        content:
          "Estimate your CCFA, DCAP, federal §30D/§25E, utility, and charger rebates in under a minute. California drivers only.",
      },
      { property: "og:title", content: "Savings Calculator — Stack every EV rebate" },
      { property: "og:description", content: "See your rebate stack in under a minute." },
    ],
  }),
  component: CalculatorPage,
});

function CalculatorPage() {
  const [income, setIncome] = useState(70000);
  const [household, setHousehold] = useState(3);
  const [zip, setZip] = useState("94510");
  const [vType, setVType] = useState<"new" | "used">("used");
  const [homeOwner, setHomeOwner] = useState(true);
  const [tribal, setTribal] = useState(false);

  const amiPct = useMemo(() => {
    // rough AMI heuristic
    const ami = 110000 + (household - 1) * 15000;
    return Math.round((income / ami) * 100);
  }, [income, household]);

  const results = useMemo(() => {
    const ccfa = amiPct <= 300 ? (amiPct <= 225 ? 7500 : 3000) : 0;
    const dcap = amiPct <= 400 ? 2000 : 0;
    const fed = vType === "used" ? 4000 : 7500;
    const utility = 1000;
    const charger = homeOwner ? 500 : 0;
    const tribalAdd = tribal ? 1500 : 0;
    return { ccfa, dcap, fed, utility, charger, tribalAdd };
  }, [amiPct, vType, homeOwner, tribal]);

  const total = Object.values(results).reduce((a, b) => a + b, 0);

  return (
    <PageShell>
      <section className="border-b border-border bg-gradient-to-b from-primary/10 to-background">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <Eyebrow>Savings Calculator</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Your rebate stack, in under a minute.
          </h1>
          <p className="mt-4 max-w-2xl text-ink-soft">
            California-only. Estimates draw from CCFA, DCAP, federal §30D/§25E, utility
            rebates, and home-charger programs. Not a formal eligibility determination.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1fr_1fr]">
          {/* Inputs */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-bold text-ink">Tell us about you</h2>

            <div className="mt-6 space-y-5">
              <Field label="Household income (annual)">
                <div className="flex items-center gap-3">
                  <span className="text-ink-soft">$</span>
                  <input
                    type="range" min={20000} max={250000} step={2500}
                    value={income} onChange={(e) => setIncome(+e.target.value)}
                    className="flex-1 accent-primary"
                  />
                  <span className="w-24 text-right font-display font-bold text-primary">${income.toLocaleString()}</span>
                </div>
              </Field>

              <Field label="Household size">
                <input
                  type="number" min={1} max={12} value={household}
                  onChange={(e) => setHousehold(+e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5"
                />
              </Field>

              <Field label="ZIP code">
                <input
                  value={zip} onChange={(e) => setZip(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5"
                />
              </Field>

              <Field label="Vehicle type">
                <div className="grid grid-cols-2 gap-2">
                  {(["used", "new"] as const).map((v) => (
                    <button key={v} onClick={() => setVType(v)}
                      className={`rounded-xl border px-4 py-2.5 text-sm font-semibold capitalize ${vType === v ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-ink"}`}>
                      {v} EV
                    </button>
                  ))}
                </div>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Toggle label="Home owner" v={homeOwner} onChange={setHomeOwner} />
                <Toggle label="Tribal member" v={tribal} onChange={setTribal} />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground shadow-lg md:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/80">Your estimated stack</p>
            <div className="mt-2 font-display text-5xl font-bold text-sun">${total.toLocaleString()}</div>
            <div className="mt-1 text-sm text-primary-foreground/85">at approximately {amiPct}% of area median income</div>

            <ul className="mt-8 space-y-3 text-sm">
              <Row k="CCFA rebate" v={results.ccfa} />
              <Row k="DCAP grant" v={results.dcap} />
              <Row k={`Federal ${vType === "used" ? "§25E" : "§30D"} credit`} v={results.fed} />
              <Row k="Utility rebate (typical)" v={results.utility} />
              <Row k="Home charger rebate" v={results.charger} />
              <Row k="Tribal supplemental" v={results.tribalAdd} />
            </ul>

            <Link to="/get-started" className="mt-8 inline-flex items-center gap-2 rounded-full bg-sun px-5 py-3 text-sm font-semibold text-sun-foreground shadow hover:brightness-95">
              Turn this into a plan <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-ink-soft">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
function Row({ k, v }: { k: string; v: number }) {
  return (
    <li className="flex items-center justify-between border-b border-primary-foreground/15 pb-2">
      <span className="text-primary-foreground/85">{k}</span>
      <span className={`font-semibold ${v > 0 ? "" : "opacity-40"}`}>${v.toLocaleString()}</span>
    </li>
  );
}
function Toggle({ label, v, onChange }: { label: string; v: boolean; onChange: (b: boolean) => void }) {
  return (
    <button onClick={() => onChange(!v)}
      className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${v ? "border-primary bg-primary/10 text-ink" : "border-border bg-background text-ink-soft"}`}>
      <div className="text-xs font-bold uppercase tracking-widest text-ink-soft">{label}</div>
      <div className="mt-1">{v ? "Yes" : "No"}</div>
    </button>
  );
}
