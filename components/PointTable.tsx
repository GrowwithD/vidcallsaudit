"use client";

import { useMemo, useState } from "react";

type Row = {
  area: string;
  component: string;
  currentState: string;
  risks: string;
  targetState: string;
  benefits: string;
  priority: string;
  effort: string;
};

function toneForPriority(p: string) {
  const v = (p || "").toLowerCase();
  if (v.includes("high")) return "red";
  if (v.includes("medium")) return "amber";
  return "slate";
}

function toneForEffort(e: string) {
  const v = (e || "").toLowerCase();
  if (v.includes("low")) return "emerald";
  if (v.includes("medium")) return "amber";
  return "red";
}

function Chip({
  text,
  tone = "slate",
}: {
  text: string;
  tone?: "red" | "amber" | "emerald" | "slate";
}) {
  const tones: Record<string, string> = {
    red: "bg-red-100 text-red-900 ring-red-200",
    amber: "bg-amber-100 text-amber-950 ring-amber-200",
    emerald: "bg-emerald-100 text-emerald-950 ring-emerald-200",
    slate: "bg-slate-100 text-slate-950 ring-slate-200",
  };

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-5 py-3",
        "text-lg font-extrabold ring-1",
        tones[tone],
      ].join(" ")}
    >
      {text}
    </span>
  );
}

function Panel({
  title,
  text,
  tone = "slate",
}: {
  title: string;
  text: string;
  tone?: "slate" | "red" | "blue" | "emerald";
}) {
  const tones: Record<string, string> = {
    slate: "bg-slate-50 ring-slate-200",
    red: "bg-red-50 ring-red-200",
    blue: "bg-blue-50 ring-blue-200",
    emerald: "bg-emerald-50 ring-emerald-200",
  };

  return (
    <div className={`rounded-3xl p-8 ring-1 ${tones[tone]}`}>
      <div className="text-2xl font-extrabold text-slate-900">{title}</div>
      <div className="mt-4 whitespace-pre-wrap text-xl leading-relaxed text-slate-800">
        {text}
      </div>
    </div>
  );
}

/** ✅ normalize: apapun inputnya -> string yang "isi" */
function toText(v: unknown): string {
  if (v == null) return "";
  if (Array.isArray(v)) {
    return v
      .map((x) => String(x ?? "").trim())
      .filter(Boolean)
      .join("\n");
  }
  return String(v).trim();
}

/**
 * ✅ normalize row dari berbagai bentuk data:
 * - risks/target/benefits bisa string atau string[]
 * - targetState bisa namanya target atau targetState
 */
function normalizeRow(r: any): Row {
  const area = toText(r?.area) || "-";
  const component = toText(r?.component) || "-";
  const currentState = toText(r?.currentState) || "-";

  const risks = toText(r?.risks) || "-";
  const targetState = toText(r?.targetState ?? r?.target) || "-";
  const benefits = toText(r?.benefits) || "-";

  const priority = toText(r?.priority) || "-";
  const effort = toText(r?.effort) || "-";

  return {
    area,
    component,
    currentState,
    risks,
    targetState,
    benefits,
    priority,
    effort,
  };
}

export function PointTable({ rows }: { rows: any[] }) {
  const safeRows: Row[] = useMemo(() => (rows || []).map(normalizeRow), [rows]);

  const ids = useMemo(() => safeRows.map((_, i) => `row-${i}`), [safeRows]);
  const [openAll, setOpenAll] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isOpen = (id: string) => (openAll ? true : !!open[id]);
  const toggleOne = (id: string) => setOpen((p) => ({ ...p, [id]: !p[id] }));

  const expandAll = () => setOpenAll(true);
  const collapseAll = () => {
    setOpenAll(false);
    setOpen({});
  };

  const copyRow = async (id: string, r: Row) => {
    const text = [
      `Area\t${r.area}`,
      `Component\t${r.component}`,
      `Current State\t${r.currentState}`,
      `Risks / Issues\t${r.risks}`,
      `Target State (Recommended)\t${r.targetState}`,
      `Business & Technical Benefits\t${r.benefits}`,
      `Priority\t${r.priority}`,
      `Estimated Effort\t${r.effort}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1400);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
        <div className="text-3xl font-extrabold text-slate-900">
          Detailed Checklist
        </div>
        <div className="mt-3 text-2xl leading-relaxed text-slate-800">
          Click <span className="font-extrabold">Show details</span> for full
          explanation. Use{" "}
          <span className="font-extrabold">Copy summary</span> to paste into
          Google Sheets.
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={expandAll}
            className="rounded-2xl bg-slate-900 px-8 py-5 text-xl font-extrabold text-white hover:opacity-95"
          >
            Expand all
          </button>

          <button
            type="button"
            onClick={collapseAll}
            className="rounded-2xl bg-white px-8 py-5 text-xl font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
          >
            Collapse all
          </button>
        </div>
      </div>

      {/* Rows */}
      {safeRows.map((r, i) => {
        const id = ids[i];
        const opened = isOpen(id);

        return (
          <div key={id} className="rounded-3xl bg-white p-10 ring-1 ring-slate-200">
            {/* Title (ALWAYS VISIBLE) */}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="text-lg font-extrabold tracking-wide text-slate-500">
                  {r.area.toUpperCase()}
                </div>
                <div className="mt-2 text-4xl font-extrabold text-slate-900">
                  {r.component}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Chip
                  text={`Priority: ${r.priority}`}
                  tone={toneForPriority(r.priority) as any}
                />
                <Chip
                  text={`Effort: ${r.effort}`}
                  tone={toneForEffort(r.effort) as any}
                />
              </div>
            </div>

            {/* Actions (ALWAYS VISIBLE) */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => toggleOne(id)}
                className="rounded-2xl bg-blue-600 px-8 py-5 text-xl font-extrabold text-white hover:opacity-95"
              >
                {opened ? "Hide details" : "Show details"}
              </button>

              <button
                type="button"
                onClick={() => copyRow(id, r)}
                className="rounded-2xl bg-white px-8 py-5 text-xl font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
              >
                {copiedId === id ? "Copied ✓" : "Copy summary"}
              </button>
            </div>

            {/* DETAILS (ONLY WHEN OPEN) */}
            {opened && (
              <div className="mt-9 grid grid-cols-1 gap-6">
                {/* ✅ SINGLE VERSION ONLY (no preview vs full duplicates) */}
                <Panel title="Current State" text={r.currentState} tone="slate" />
                <Panel title="Risks / Issues" text={r.risks} tone="red" />
                <Panel title="Target State (Recommended)" text={r.targetState} tone="blue" />
                <Panel title="Business & Technical Benefits" text={r.benefits} tone="emerald" />
              </div>
            )}
          </div>
        );
      })}

      {safeRows.length === 0 && (
        <div className="rounded-3xl bg-white p-10 text-center ring-1 ring-slate-200">
          <div className="text-2xl font-extrabold text-slate-900">No data</div>
          <div className="mt-2 text-xl text-slate-600">
            The <code className="font-bold">rows</code> prop is empty.
          </div>
        </div>
      )}
    </div>
  );
}