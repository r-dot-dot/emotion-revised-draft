import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { PageShell, SectionHead } from "@/components/page-shell";
import { gallery, type GalleryCar } from "@/data/gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Vehicle gallery — EVs we know inside and out | eMotion Autos" },
      {
        name: "description",
        content:
          "Browse real photos and specs of the used BEVs, PHEVs, trucks, and vans we track most for California buyers — seating, range, charging, and typical prices.",
      },
      { property: "og:title", content: "Vehicle gallery — EVs we know inside and out" },
      {
        property: "og:description",
        content: "Real photos, seating and range specs, and typical CA transaction prices.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const bevs = gallery.filter((g) => g.category === "BEV");
  const phevs = gallery.filter((g) => g.category === "PHEV");
  const trucks = gallery.filter((g) => g.category === "Truck/Van");

  return (
    <PageShell>
      <section className="border-b border-border bg-gradient-to-b from-primary/10 to-background">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            The EVs we know inside and out.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            Click through the photos of each model and check the specs. Prices are typical
            recent California transactions before rebates.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <GallerySection title="Popular BEVs" cars={bevs} />
          <GallerySection title="Popular PHEVs" cars={phevs} />
          <GallerySection title="Electric Trucks & Vans" cars={trucks} />

          <div className="mt-14 rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
            <SectionHead
              kicker="Ready to shop?"
              title="Tell us what you want and we'll hunt it down."
              lead="Submit a rough brief on the Search page — we'll approve you and start sourcing rebate-eligible California EVs."
            />
            <Link
              to="/search"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:brightness-110"
            >
              Start a search brief <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function GallerySection({ title, cars }: { title: string; cars: GalleryCar[] }) {
  return (
    <div className="mt-14 first:mt-0">
      <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">{title}</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cars.map((c) => (
          <CarCard key={c.name} car={c} />
        ))}
      </div>
    </div>
  );
}

function CarCard({ car }: { car: GalleryCar }) {
  const [i, setI] = useState(0);
  const total = car.photos.length;
  const go = (d: number) => setI((p) => (p + d + total) % total);
  const photo = car.photos[i];

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="relative aspect-[4/3] bg-muted">
        <img
          src={photo.url}
          alt={`${car.name} — ${photo.caption}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {total > 1 && (
          <>
            <button
              type="button"
              aria-label={`Previous photo of ${car.name}`}
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-ink shadow hover:bg-card"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label={`Next photo of ${car.name}`}
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-ink shadow hover:bg-card"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
              {car.photos.map((p, idx) => (
                <button
                  key={p.url}
                  type="button"
                  aria-label={`Show photo ${idx + 1} of ${car.name}`}
                  onClick={() => setI(idx)}
                  className={`h-2 w-2 rounded-full transition ${
                    idx === i ? "bg-primary" : "bg-card/80 hover:bg-card"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-ink">{car.name}</h3>
        <p className="text-xs text-ink-soft">
          {car.years} · {car.style}
        </p>
        <p className="mt-2 text-sm text-ink-soft">{car.blurb}</p>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <Spec label="Seats" value={`${car.seats} passengers`} icon />
          <Spec label="Range" value={car.range + (car.mpg ? ` · ${car.mpg}` : "")} />
          <Spec label="Drivetrain" value={car.drivetrain} />
          <Spec label="Charging" value={car.charging} />
          <Spec label="Cargo" value={car.cargo} />
        </dl>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div className="font-display text-lg font-bold text-ink">{car.price}</div>
          <Link
            to="/get-started"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-background hover:brightness-110"
          >
            Get your deal <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Spec({ label, value, icon }: { label: string; value: string; icon?: boolean }) {
  return (
    <div>
      <dt className="flex items-center gap-1 font-bold uppercase tracking-widest text-ink-soft">
        {icon && <Users className="h-3 w-3" />}
        {label}
      </dt>
      <dd className="mt-0.5 text-ink">{value}</dd>
    </div>
  );
}
