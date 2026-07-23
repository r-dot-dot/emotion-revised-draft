import { Link } from "@tanstack/react-router";

export function Logo({ className = "", showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 font-display font-bold text-ink ${className}`}>
      {/* Half-circle 'e' with lightning bolt */}
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6" aria-hidden>
          {/* lowercase 'e' — open half-circle */}
          <path
            d="M26 16a10 10 0 1 0-3.2 7.3"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M8 16h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          {/* lightning bolt */}
          <path
            d="M18 8.5l-5 8h4l-2.5 7 5.5-8.5h-4L18 8.5z"
            fill="var(--sun)"
            stroke="var(--sun)"
            strokeWidth="0.6"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {showWordmark && (
        <span className="text-lg leading-none tracking-tight">
          eMotion <span className="text-primary">Autos</span>
        </span>
      )}
    </Link>
  );
}
