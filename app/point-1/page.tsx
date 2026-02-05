import Link from "next/link";
import { Container } from "@/components/Container";
import { PointTable } from "@/components/PointTable";
import { point1Rows, point1Title } from "@/lib/point1-data";

function BigPill({
  label,
  tone = "slate",
}: {
  label: string;
  tone?: "red" | "amber" | "emerald" | "blue" | "slate";
}) {
  const tones: Record<string, string> = {
    red: "bg-red-100 text-red-900 ring-red-200",
    amber: "bg-amber-100 text-amber-950 ring-amber-200",
    emerald: "bg-emerald-100 text-emerald-950 ring-emerald-200",
    blue: "bg-blue-100 text-blue-950 ring-blue-200",
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
      {label}
    </span>
  );
}

function BigCard({
  title,
  body,
  tone = "slate",
}: {
  title: string;
  body: string;
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
      <p className="mt-4 text-xl leading-relaxed text-slate-800">{body}</p>
    </div>
  );
}

export default function Point1Page() {
  return (
    <Container>
      <div className="space-y-10 hidden">
        {/* TOP NAV */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="rounded-2xl bg-white px-6 py-4 text-xl font-extrabold text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
          >
            ← Back to Overview
          </Link>

          <div className="flex items-center gap-3">
            <BigPill label="POINT #1" tone="blue" />
            <BigPill label="HIGH PRIORITY" tone="red" />
          </div>
        </div>

        {/* HEADER */}
        <div className="rounded-3xl bg-white p-10 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Server & Database Infrastructure
          </h1>

          <p className="mt-5 max-w-5xl text-2xl leading-relaxed text-slate-800">
            Goal: make VidCalls <span className="font-extrabold">stable</span>,{" "}
            <span className="font-extrabold">always online</span>, and{" "}
            <span className="font-extrabold">production-ready</span> by separating
            servers, adding load balancing, and ensuring backups & high availability.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <BigPill label="Effort: LOW–MEDIUM" tone="amber" />
            <BigPill label="Scope: Web / API / Database / Network / Backups" tone="slate" />
          </div>
        </div>

        {/* SIMPLE SUMMARY (BIG) */}
        <div className="grid gap-6 lg:grid-cols-2">
          <BigCard
            title="Current State (Today)"
            tone="slate"
            body="All services (Web App, API, background jobs, and Database) run on a single small DigitalOcean droplet. This is a single point of failure."
          />
          <BigCard
            title="Main Risks"
            tone="red"
            body="High chance of slowness, crashes, and full outage if the server runs out of memory/CPU or goes down. This directly impacts live calls and customer trust."
          />
          <BigCard
            title="Recommended Target"
            tone="blue"
            body="Use 2 application servers behind a Load Balancer, and move the database to a managed database (or dedicated DB server). Add automated backups and monitoring."
          />
          <BigCard
            title="Benefits"
            tone="emerald"
            body="Higher uptime, faster performance, safer data, easier scaling, and smoother deployments (less downtime). This is the baseline for enterprise readiness."
          />
        </div>

        {/* TITLE BOX */}
        <div className="rounded-3xl bg-white p-10 shadow-sm ring-1 ring-slate-200">
          <div className="text-lg font-extrabold text-slate-500">Document Title</div>
          <div className="mt-3 text-3xl font-extrabold text-slate-900">{point1Title}</div>

          <div className="mt-6 text-2xl leading-relaxed text-slate-800">
            Below is the detailed checklist. Each item shows:
            <span className="font-extrabold"> Current </span> →{" "}
            <span className="font-extrabold"> Risk </span> →{" "}
            <span className="font-extrabold"> Recommended Target </span> →{" "}
            <span className="font-extrabold"> Benefit </span>.
          </div>

          <div className="mt-6 rounded-3xl bg-slate-50 p-7 text-xl text-slate-800 ring-1 ring-slate-200">
            Tip: Use <span className="font-extrabold">Copy summary</span> to paste directly into Google Sheets.
          </div>
        </div>

        {/* TABLE */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <PointTable rows={point1Rows} />
        </div>
      </div>
    </Container>
  );
}