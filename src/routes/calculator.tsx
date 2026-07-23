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

// Clean Cars 4 All income caps per household size (300% federal poverty level, from CA guide)
const CC4A_CAP: Record<number, number> = {
  1: 47880,
  2: 64920,
  3: 81960,
  4: 99000,
  5: 116040,
  6: 133080,
};

function cc4aCap(hh: number) {
  if (hh <= 6) return CC4A_CAP[Math.max(1, hh)];
  // extrapolate ~$17,040 per extra person
  return CC4A_CAP[6] + (hh - 6) * 17040;
}

// Build discrete income brackets that anchor to real thresholds — CC4A cap,
// 2× cap (moderate ceiling), and federal §25E / §30D single-filer caps ($75k, $150k).
function incomeBrackets(hh: number): number[] {
  const cap = cc4aCap(hh);
  const raw = [
    20000,
    Math.round(cap * 0.5 / 500) * 500,
    Math.round(cap * 0.75 / 500) * 500,
    cap,                               // CC4A income limit
    Math.round(cap * 1.25 / 500) * 500,
    Math.round(cap * 1.5 / 500) * 500,
    75000,                             // Federal §25E single filer cap
    Math.round(cap * 2 / 500) * 500,
    100000,
    150000,                            // Federal §30D single filer cap
    200000,
    300000,
  ];
  return Array.from(new Set(raw)).sort((a, b) => a - b);
}

function CalculatorPage() {
  const [household, setHousehold] = useState(3);
  const brackets = useMemo(() => incomeBrackets(household), [household]);
  const [bracketIdx, setBracketIdx] = useState(() => brackets.findIndex((v) => v >= 70000));
  const income = brackets[Math.min(bracketIdx, brackets.length - 1)] ?? brackets[0];
  const [zip, setZip] = useState("94510");
  const [vType, setVType] = useState<"new" | "used">("used");
  const [homeOwner, setHomeOwner] = useState(true);
  const [tribal, setTribal] = useState(false);

  const cap = cc4aCap(household);
  const capPct = Math.round((income / cap) * 100);

  const tier: "lower" | "moderate" | "higher" =
    income <= cap ? "lower" : income <= cap * 2 ? "moderate" : "higher";

  const results = useMemo(() => {
    // Clean Cars 4 All — income-qualified up to the CC4A cap
    let ccfa = 0;
    if (income <= cap * 0.6) ccfa = 12000;
    else if (income <= cap * 0.85) ccfa = 9500;
    else if (income <= cap) ccfa = 7500;

    // DCAP — grant + subsidized financing, income-qualified
    let dcap = 0;
    if (income <= cap) dcap = 5000;
    else if (income <= cap * 1.25) dcap = 2500;

    // Federal §25E (used, $75k single cap) / §30D (new, $150k single cap)
    const fedCap = vType === "used" ? 75000 : 150000;
    const fed = income <= fedCap ? (vType === "used" ? 4000 : 7500) : 0;

    // 2026 First-Time EV Buyer rebate — no income limit
    const firstTime = vType === "used" ? 1750 : 3500;

    // Utility rebate (PG&E/SCE/SDG&E) — income-qualified adds
    const utility = income <= cap ? 2500 : income <= cap * 1.5 ? 1500 : 500;

    // Home charger rebate — owners only
    const charger = homeOwner ? (income <= cap * 1.5 ? 1500 : 500) : 0;
    const tribalAdd = tribal ? 1500 : 0;
    return { ccfa, dcap, fed, firstTime, utility, charger, tribalAdd };
  }, [income, cap, vType, homeOwner, tribal]);

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
            California-only. Estimates draw from Clean Cars 4 All, DCAP, federal §25E/§30D,
            the 2026 first-time EV buyer rebate, utility rebates, and home-charger programs.
            Not a formal eligibility determination.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1fr_1fr]">
          {/* Inputs */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-bold text-ink">Tell us about you</h2>

            <div className="mt-6 space-y-5">
              <Field label={`Household size (CC4A cap: $${cap.toLocaleString()})`}>
                <input
                  type="number" min={1} max={12} value={household}
                  onChange={(e) => {
                    const hh = Math.max(1, Math.min(12, +e.target.value || 1));
                    setHousehold(hh);
                    // clamp bracket index to new brackets length
                    const nb = incomeBrackets(hh);
                    setBracketIdx((i) => Math.min(i, nb.length - 1));
                  }}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5"
                />
              </Field>

              <Field label="Household income range">
                {(() => {
                  const idx = Math.min(bracketIdx, brackets.length - 1);
                  const lo = idx === 0 ? 0 : brackets[idx - 1];
                  const hi = idx === brackets.length - 1 ? null : brackets[idx];
                  const rangeLabel =
                    hi === null
                      ? `Over $${lo.toLocaleString()}`
                      : `$${lo.toLocaleString()} – $${hi.toLocaleString()}`;
                  return (
                    <>
                      <div className="rounded-xl bg-primary/5 px-4 py-3 text-center">
                        <div className="font-display text-xl font-bold text-primary">{rangeLabel}</div>
                        <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-ink-soft">
                          Household of {household}
                        </div>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={brackets.length - 1}
                        step={1}
                        value={idx}
                        onChange={(e) => setBracketIdx(+e.target.value)}
                        className="mt-3 w-full accent-primary"
                      />
                      <div className="mt-1 flex justify-between text-[10px] font-semibold uppercase tracking-widest text-ink-soft">
                        <span>Lowest</span>
                        <span>Highest</span>
                      </div>
                      <div className="mt-2 text-xs text-ink-soft">
                        <strong className="text-ink">
                          {tier === "lower"
                            ? "Lower income: full rebate stack available"
                            : tier === "moderate"
                            ? "Moderate income: partial rebates + federal credit"
                            : "Higher income: statewide + utility rebates only"}
                        </strong>
                      </div>
                    </>
                  );
                })()}
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
            <div className="mt-1 text-sm text-primary-foreground/85">at ${income.toLocaleString()} · household of {household} · {capPct}% of CC4A limit</div>

            <ul className="mt-8 space-y-3 text-sm">
              <Row k="Clean Cars 4 All rebate" v={results.ccfa} />
              <Row k="DCAP grant" v={results.dcap} />
              <Row k={`Federal ${vType === "used" ? "§25E" : "§30D"} credit`} v={results.fed} />
              <Row k={`First-time EV buyer rebate (2026, ${vType})`} v={results.firstTime} />
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
