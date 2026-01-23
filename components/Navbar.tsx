import Link from "next/link";

const nav = [
  { href: "/", label: "Overview" },
  { href: "/point-1", label: "Point #1" },
  { href: "/point-2", label: "Point #2" },
];

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "rounded-2xl px-4 py-2.5 text-base font-extrabold",
        "ring-1 transition",
        active
          ? "bg-slate-900 text-white ring-slate-900 hover:bg-slate-800"
          : "bg-white text-slate-800 ring-slate-200 hover:bg-slate-50",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export function Navbar({ active = "/" }: { active?: string }) {
  return (
    <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-white text-base font-extrabold shadow-sm">
            VC
          </div>

          <div className="leading-tight">
            <div className="text-base font-extrabold text-slate-900">VidCalls</div>
            <div className="text-sm font-semibold text-slate-500">
              Production Readiness Audit
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="flex items-center gap-2">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={active === item.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
}