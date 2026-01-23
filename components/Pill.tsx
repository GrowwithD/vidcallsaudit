export function Pill({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "high" | "low" | "medium" | "blue" | "green" | "red";
}) {
  const cls =
    variant === "high"
      ? "bg-rose-50 text-rose-700 ring-rose-200"
      : variant === "low"
        ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
        : variant === "medium"
          ? "bg-sky-50 text-sky-700 ring-sky-200"
          : variant === "blue"
            ? "bg-sky-50 text-sky-700 ring-sky-200"
            : variant === "green"
              ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
              : variant === "red"
                ? "bg-rose-50 text-rose-700 ring-rose-200"
                : "bg-slate-100 text-slate-700 ring-slate-200";

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${cls}`}>
      {children}
    </span>
  );
}