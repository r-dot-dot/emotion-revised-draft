import { Link } from "@tanstack/react-router";
import logoIcon from "@/assets/logo-icon.png.asset.json";

export function Logo({ className = "", showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 font-display font-bold text-ink ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl shadow-sm overflow-hidden">
        <img
          src={logoIcon.url}
          alt="eMotion Autos"
          className="h-full w-full object-cover"
        />
      </span>
      {showWordmark && (
        <span className="text-lg leading-none tracking-tight">
          eMotion <span className="text-primary">Autos</span>
        </span>
      )}
    </Link>
  );
}

