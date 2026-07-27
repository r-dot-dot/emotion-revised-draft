import { useMemo, useRef, useState } from "react";
import { Check, Upload, Link2, FileText, Image as ImageIcon, X, Lock } from "lucide-react";

type ItemKind = "link" | "text" | "details" | "file" | "photos";

type Item = {
  id: string;
  title: string;
  hint: string;
  req: boolean;
  kind: ItemKind;
  placeholder?: string;
  accept?: string;
};

const ITEMS: Item[] = [
  {
    id: "loi",
    title: "Letter of Intent (LOI)",
    hint: "We email you the template — sign it and upload the PDF here.",
    req: true,
    kind: "file",
    accept: ".pdf,.jpg,.jpeg,.png",
  },
  {
    id: "approval",
    title: "DCAP or CCFA approval documents",
    hint: "Upload your voucher or approval letter (PDF or photo).",
    req: true,
    kind: "file",
    accept: ".pdf,.jpg,.jpeg,.png",
  },
  {
    id: "listing",
    title: "The listing link",
    hint: "Paste the full URL — Facebook Marketplace, Craigslist, OfferUp, or a dealer page.",
    req: true,
    kind: "link",
    placeholder: "https://www.facebook.com/marketplace/item/...",
  },
  {
    id: "details",
    title: "Vehicle details & asking price",
    hint: "Seller's asking price plus VIN, mileage, and seller contact.",
    req: true,
    kind: "details",
    placeholder: "VIN 5YJ3E1EA7JF..., 48,000 mi, seller: Ana (415) 555-0000",
  },
  {
    id: "fee",
    title: "Written agreement to our fee",
    hint: "Upload the countersigned fee agreement: $1,500 flat, or 5% of vehicle price on cars above $30k (whichever is greater), applied after your rebate savings.",
    req: true,
    kind: "file",
    accept: ".pdf,.jpg,.jpeg,.png",
  },
  {
    id: "photos",
    title: "Photos of the vehicle",
    hint: "Optional but speeds up review — upload as many photos as you have.",
    req: false,
    kind: "photos",
    accept: "image/*",
  },
];

type Value = { text: string; price: string; files: File[] };

export function flipFee(price: number) {
  return Math.max(1500, price > 30000 ? Math.round(price * 0.05) : 0);
}

function isUrl(v: string) {
  try {
    const u = new URL(v.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function satisfied(item: Item, v: Value) {
  if (item.kind === "link") return isUrl(v.text);
  if (item.kind === "details")
    return v.text.trim().length >= 12 && Number(v.price) > 0;
  if (item.kind === "text") return v.text.trim().length >= 12;
  return v.files.length > 0;
}

function kindIcon(kind: ItemKind) {
  if (kind === "link") return <Link2 className="h-4 w-4" />;
  if (kind === "text" || kind === "details") return <FileText className="h-4 w-4" />;
  if (kind === "photos") return <ImageIcon className="h-4 w-4" />;
  return <Upload className="h-4 w-4" />;
}

export function FlipSubmission({ aside }: { aside?: React.ReactNode }) {
  const [values, setValues] = useState<Record<string, Value>>(
    () => Object.fromEntries(ITEMS.map((i) => [i.id, { text: "", price: "", files: [] }])) as Record<string, Value>,
  );
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState<string | null>(ITEMS[0].id);
  const [submitted, setSubmitted] = useState(false);
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});

  const setValue = (id: string, patch: Partial<Value>) => {
    setValues((v) => ({ ...v, [id]: { ...v[id], ...patch } }));
    setChecked((c) => (c[id] ? { ...c, [id]: false } : c));
  };

  const reqItems = ITEMS.filter((i) => i.req);
  const reqDone = reqItems.filter((i) => checked[i.id]).length;
  const doneCount = ITEMS.filter((i) => checked[i.id]).length;
  const ready = reqDone === reqItems.length;
  const pct = useMemo(() => Math.round((doneCount / ITEMS.length) * 100), [doneCount]);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-ink">Flip submitted</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
          We have your listing, documents{values.photos.files.length ? ", photos" : ""} and vehicle
          details. We confirm receipt within one business day and start eligibility review
          immediately.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setChecked({});
            setValues(Object.fromEntries(ITEMS.map((i) => [i.id, { text: "", price: "", files: [] }])) as Record<string, Value>);
          }}
          className="mt-6 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-ink hover:bg-accent"
        >
          Submit another flip
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <h3 className="text-xl font-bold text-ink">Your submission checklist</h3>
      <p className="mt-1 text-sm text-ink-soft">
        Each item unlocks its checkbox only once the required link, text, or upload is actually
        provided. Nothing is sent until you submit.
      </p>

      <ul className="mt-6 space-y-3">
        {ITEMS.map((item) => {
          const v = values[item.id];
          const ok = satisfied(item, v);
          const isOpen = open === item.id;
          return (
            <li key={item.id} className="rounded-xl border border-border bg-background">
              <div className="flex items-start gap-3 p-4">
                <button
                  type="button"
                  aria-label={`Mark ${item.title} complete`}
                  disabled={!ok}
                  onClick={() => setChecked((c) => ({ ...c, [item.id]: !c[item.id] }))}
                  className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition ${
                    checked[item.id]
                      ? "border-primary bg-primary text-primary-foreground"
                      : ok
                        ? "border-primary/50 bg-card hover:bg-primary/10"
                        : "cursor-not-allowed border-border bg-muted text-ink-soft"
                  }`}
                >
                  {checked[item.id] ? (
                    <Check className="h-4 w-4" />
                  ) : ok ? null : (
                    <Lock className="h-3 w-3" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  className="min-w-0 flex-1 text-left"
                >
                  <div
                    className={`flex items-center gap-2 text-sm font-bold ${
                      checked[item.id] ? "text-ink-soft line-through" : "text-ink"
                    }`}
                  >
                    {kindIcon(item.kind)}
                    {item.title}
                  </div>
                  <div className="text-xs text-ink-soft">{item.hint}</div>
                </button>

                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-widest ${
                    item.req ? "bg-sun-soft text-sun-foreground" : "bg-primary/10 text-primary"
                  }`}
                >
                  {item.req ? "REQUIRED" : "OPTIONAL"}
                </span>
              </div>

              {isOpen && (
                <div className="border-t border-border p-4">
                  {item.kind === "link" && (
                    <>
                      <input
                        type="url"
                        inputMode="url"
                        maxLength={2000}
                        value={v.text}
                        onChange={(e) => setValue(item.id, { text: e.target.value })}
                        placeholder={item.placeholder}
                        className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-ink outline-none focus:border-primary"
                      />
                      {v.text.trim() && !ok && (
                        <p className="mt-2 text-xs font-semibold text-destructive">
                          Paste a full link starting with https://
                        </p>
                      )}
                    </>
                  )}

                  {(item.kind === "text" || item.kind === "details") && (
                    <>
                      <textarea
                        rows={3}
                        maxLength={1000}
                        value={v.text}
                        onChange={(e) => setValue(item.id, { text: e.target.value })}
                        placeholder={item.placeholder}
                        className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-ink outline-none focus:border-primary"
                      />
                      {!ok && (
                        <p className="mt-2 text-xs text-ink-soft">
                          Include VIN, mileage, asking price, and seller contact.
                        </p>
                      )}
                    </>
                  )}

                  {(item.kind === "file" || item.kind === "photos") && (
                    <>
                      <input
                        ref={(el) => {
                          inputs.current[item.id] = el;
                        }}
                        type="file"
                        accept={item.accept}
                        multiple={item.kind === "photos"}
                        className="hidden"
                        onChange={(e) => {
                          const picked = Array.from(e.target.files ?? []);
                          if (!picked.length) return;
                          setValue(item.id, {
                            files: item.kind === "photos" ? [...v.files, ...picked] : picked,
                          });
                          e.target.value = "";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => inputs.current[item.id]?.click()}
                        className="w-full rounded-xl border-2 border-dashed border-border p-6 text-center transition hover:border-primary hover:bg-primary/5"
                      >
                        {item.kind === "photos" ? (
                          <ImageIcon className="mx-auto h-6 w-6 text-primary" />
                        ) : (
                          <Upload className="mx-auto h-6 w-6 text-primary" />
                        )}
                        <div className="mt-2 text-sm font-bold text-ink">
                          {item.kind === "photos" ? "Upload photos" : "Upload file"}
                        </div>
                        <div className="text-xs text-ink-soft">
                          {item.kind === "photos" ? "JPG or PNG, add as many as you like" : "PDF, JPG, or PNG"}
                        </div>
                      </button>

                      {v.files.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {v.files.map((f, idx) => (
                            <li
                              key={`${f.name}-${idx}`}
                              className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs text-ink"
                            >
                              <FileText className="h-3.5 w-3.5 shrink-0 text-primary" />
                              <span className="min-w-0 flex-1 truncate">{f.name}</span>
                              <span className="shrink-0 text-ink-soft">
                                {Math.max(1, Math.round(f.size / 1024))} KB
                              </span>
                              <button
                                type="button"
                                aria-label={`Remove ${f.name}`}
                                onClick={() =>
                                  setValue(item.id, { files: v.files.filter((_, i2) => i2 !== idx) })
                                }
                                className="shrink-0 text-ink-soft hover:text-destructive"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}

                  <p className="mt-3 text-xs font-semibold text-ink-soft">
                    {ok
                      ? "Ready — tick the box to mark this item complete."
                      : "Checkbox unlocks once this is provided."}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      </div>

      <div className="space-y-6 lg:sticky lg:top-24">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="font-display text-lg font-bold text-ink">
            {doneCount} of {ITEMS.length} complete
          </div>
          <div className="mt-1 text-xs text-ink-soft">
            {ready
              ? "All required items uploaded and checked — you can submit"
              : `${reqItems.length - reqDone} required item(s) left`}
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-border">
            <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
          <button
            type="button"
            disabled={!ready}
            onClick={() => setSubmitted(true)}
            className="mt-4 w-full rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit flip
          </button>
        </div>
        {aside}
      </div>
    </div>
  );
}
