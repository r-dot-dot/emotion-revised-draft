import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ArrowRight, Zap, Search as SearchIcon } from "lucide-react";
import { PageShell, SectionHead } from "@/components/page-shell";

export const Route = createFileRoute("/get-started")({
  head: () => ({
    meta: [
      { title: "Get started — Request a callback | eMotion Autos" },
      { name: "description", content: "Pick Flip or Search, leave your details, and we'll call you back the same business day." },
      { property: "og:title", content: "Get started with eMotion Autos" },
      { property: "og:description", content: "Flip or Search — one form, one callback." },
    ],
  }),
  component: GetStartedPage,
});

function GetStartedPage() {
  const [path, setPath] = useState<"flip" | "search">("search");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <PageShell>
        <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
          <CheckCircle2 className="h-16 w-16 text-primary" />
          <h1 className="mt-6 text-3xl font-bold text-ink md:text-4xl">Got it — talk soon.</h1>
          <p className="mt-3 text-ink-soft">
            We'll call within one business day. If it's urgent, phone 650-699-2193.
          </p>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="border-b border-border bg-gradient-to-b from-primary/10 to-background">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            One form. One callback. Same business day.
          </h1>
          <p className="mt-4 max-w-2xl text-ink-soft">
            Pick the path that matches where you are. We'll follow up with a short call —
            no scripts, no upsell.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-4xl px-4">
          {/* Path picker */}
          <div className="grid gap-3 sm:grid-cols-2">
            <PathButton
              active={path === "flip"} onClick={() => setPath("flip")}
              icon={Zap} tag="Flip" title="I found the car" body="Send the listing — we buy it as a dealer and rebate it back to you."
            />
            <PathButton
              active={path === "search"} onClick={() => setPath("search")}
              icon={SearchIcon} tag="Search" title="Find one for me" body="Tell us the brief — we'll return a shortlist."
            />
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="mt-8 space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name"><input required className={inputCls} placeholder="Alex Chen" /></Field>
              <Field label="Best phone"><input required type="tel" className={inputCls} placeholder="(555) 555-0110" /></Field>
              <Field label="Email"><input required type="email" className={inputCls} placeholder="you@example.com" /></Field>
              <Field label="ZIP"><input required className={inputCls} placeholder="94510" /></Field>
            </div>

            {path === "flip" ? (
              <>
                <Field label="Listing URL"><input className={inputCls} placeholder="https://…" /></Field>
                <Field label="Vehicle & asking price"><input className={inputCls} placeholder="2022 Chevy Bolt · $16,500" /></Field>
              </>
            ) : (
              <>
                <Field label="What are you looking for?">
                  <textarea rows={4} className={inputCls} placeholder="Body type, budget, range needs, deal-breakers…" />
                </Field>
              </>
            )}

            <Field label="Anything else?">
              <textarea rows={3} className={inputCls} placeholder="Optional — anything that helps us prep for the call." />
            </Field>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <p className="text-xs text-ink-soft">By submitting, you agree to a follow-up call. No spam, ever.</p>
              <button className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:brightness-110">
                Request my callback <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}

const inputCls = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-ink-soft">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function PathButton({
  active, onClick, icon: Icon, tag, title, body,
}: {
  active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; tag: string; title: string; body: string;
}) {
  return (
    <button
      type="button" onClick={onClick}
      className={`rounded-3xl border-2 p-6 text-left transition ${active ? "border-primary bg-primary/5" : "border-border bg-card hover:border-ink-soft"}`}
    >
      <div className="flex items-center gap-2">
        <span className={`grid h-9 w-9 place-items-center rounded-xl ${active ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
          <Icon className="h-5 w-5" />
        </span>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${active ? "bg-primary text-primary-foreground" : "bg-muted text-ink-soft"}`}>{tag}</span>
      </div>
      <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-ink-soft">{body}</p>
    </button>
  );
}
