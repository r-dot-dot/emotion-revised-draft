import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Phone, Star, ArrowRight } from "lucide-react";
import { PageShell, SectionHead } from "@/components/page-shell";

export const Route = createFileRoute("/service")({
  head: () => ({
    meta: [
      { title: "Service — Find a trusted EV shop near you | eMotion Autos" },
      { name: "description", content: "Search vetted California EV service partners by ZIP code. If none match, tell us and we'll help." },
      { property: "og:title", content: "Service — Find a trusted EV shop" },
      { property: "og:description", content: "ZIP-code search across our vetted California partners." },
    ],
  }),
  component: ServicePage,
});

type Partner = { name: string; city: string; zip: string; specialty: string; phone: string; rating: number };

const partners: Partner[] = [
  { name: "Green Motors Bay Area", city: "Benicia", zip: "94510", specialty: "EV battery, charger install", phone: "(707) 555-0142", rating: 4.9 },
  { name: "Voltage Auto", city: "Oakland", zip: "94607", specialty: "Tesla, Bolt, Leaf service", phone: "(510) 555-0119", rating: 4.8 },
  { name: "PlugPro San Jose", city: "San Jose", zip: "95112", specialty: "Level 2 install, EV diagnostics", phone: "(408) 555-0166", rating: 4.7 },
  { name: "SoCal EV Works", city: "San Diego", zip: "92101", specialty: "PHEV & EV, ADAS calibration", phone: "(619) 555-0177", rating: 4.9 },
  { name: "Sacramento eDrive", city: "Sacramento", zip: "95814", specialty: "Battery, drivetrain", phone: "(916) 555-0188", rating: 4.6 },
];

function ServicePage() {
  const [zip, setZip] = useState("");
  const [searched, setSearched] = useState(false);

  const results = useMemo(() => {
    if (!zip) return [];
    const prefix = zip.slice(0, 2);
    return partners.filter((p) => p.zip.startsWith(prefix));
  }, [zip]);

  return (
    <PageShell>
      <section className="border-b border-border bg-gradient-to-b from-primary/10 to-background">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Trusted EV shops, verified by us.
          </h1>
          <p className="mt-4 max-w-2xl text-ink-soft">
            We only list shops we've sent our own customers to. Search by ZIP — if nothing
            comes up nearby, tell us and we'll help you find one.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4">
          <form
            onSubmit={(e) => { e.preventDefault(); setSearched(true); }}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center"
          >
            <label className="flex items-center gap-2 px-2 text-ink-soft">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm font-bold uppercase tracking-widest">ZIP</span>
            </label>
            <input
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
              placeholder="e.g. 94510"
              className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-primary"
              inputMode="numeric"
            />
            <button className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:brightness-110">
              Search partners
            </button>
          </form>

          {searched && (
            <div className="mt-8">
              {results.length > 0 ? (
                <ul className="space-y-3">
                  {results.map((p) => (
                    <li key={p.name} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-ink">{p.name}</h3>
                          <p className="mt-1 text-sm text-ink-soft">{p.specialty}</p>
                          <p className="mt-1 text-xs text-ink-soft">{p.city}, CA {p.zip}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm font-bold text-sun-foreground">
                            <Star className="h-4 w-4 fill-sun text-sun" /> {p.rating.toFixed(1)}
                          </div>
                          <a href={`tel:${p.phone.replace(/\D/g, "")}`} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                            <Phone className="h-4 w-4" /> {p.phone}
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-ink-soft">
                  No partners in that ZIP. Fill in the form below and we'll help you find one.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Inquiry form */}
      <section id="inquiry" className="bg-muted/40 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHead center kicker="No partner near you?" title="Tell us what you need." lead="We'll do our own outreach and either recommend a shop or flag when to ship the car to us." />
          <form className="mt-8 space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <Input label="Your name" placeholder="Full name" />
            <Input label="Email" type="email" placeholder="you@example.com" />
            <Input label="ZIP" placeholder="94510" />
            <Input label="Vehicle" placeholder="e.g. 2022 Chevy Bolt" />
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-ink-soft">What's going on?</label>
              <textarea rows={4}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                placeholder="Symptoms, warning lights, service history — anything helps."
              />
            </div>
            <button type="button" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
              Send inquiry <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}

function Input({ label, ...p }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-ink-soft">{label}</label>
      <input {...p} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
    </div>
  );
}
