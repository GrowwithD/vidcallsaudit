import Link from "next/link";
import { Container } from "@/components/Container";

export default function Page() {
  return (
    <Container>
      <div className="space-y-10">
        {/* HEADER */}
        <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-sm ring-1 ring-slate-200">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-slate-200">
            Production Readiness
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            VidCalls – Production Readiness Audit
          </h1>

          <p className="mt-4 max-w-4xl text-lg sm:text-xl leading-relaxed text-slate-700">
            This document explains what needs to be improved so VidCalls is{" "}
            <span className="font-extrabold text-slate-900">
              stable, secure, and enterprise-ready
            </span>{" "}
            for production use.
            <br />
            Written in simple terms for both business and technical review.
          </p>
        </div>

        {/* POINT CARD */}
        <Link
          href="/point-1"
          aria-label="Open Point 1 – Server & Database Infrastructure"
          className="group block rounded-3xl bg-white p-8 sm:p-10 shadow-sm ring-1 ring-slate-200 transition
                     hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
        >
          <div className="space-y-7">
            {/* Title row */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Point #1 – Server & Database Infrastructure
                </h2>
                <p className="mt-2 text-lg sm:text-xl text-slate-700">
                  Ensure VidCalls servers and database are reliable, scalable, and always online.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-red-100 px-4 py-2 text-sm sm:text-base font-extrabold text-red-800 ring-1 ring-red-200">
                  HIGH PRIORITY
                </span>

                <div className="hidden sm:flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-base font-extrabold text-white shadow-sm group-hover:opacity-95">
                  Open
                  <span aria-hidden="true">→</span>
                </div>
              </div>
            </div>

            {/* GRID */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* CURRENT */}
              <div className="rounded-3xl bg-slate-50 p-7 ring-1 ring-slate-200">
                <h3 className="text-xl font-extrabold text-slate-900">Current State</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-700">
                  All services (web app, API, background jobs, and database) are running on a single
                  small server.
                </p>
              </div>

              {/* RISK */}
              <div className="rounded-3xl bg-red-50 p-7 ring-1 ring-red-200">
                <h3 className="text-xl font-extrabold text-red-900">Risks</h3>
                <p className="mt-3 text-lg leading-relaxed text-red-900/90">
                  High risk of slowdown, crashes, and complete outage if the server fails.
                  This directly impacts live customer calls.
                </p>
              </div>

              {/* TARGET */}
              <div className="rounded-3xl bg-blue-50 p-7 ring-1 ring-blue-200">
                <h3 className="text-xl font-extrabold text-blue-900">Recommended Target</h3>
                <p className="mt-3 text-lg leading-relaxed text-blue-900/90">
                  Separate application and database servers, run multiple app servers behind a load
                  balancer, and enable automated backups.
                </p>
              </div>

              {/* BENEFIT */}
              <div className="rounded-3xl bg-emerald-50 p-7 ring-1 ring-emerald-200">
                <h3 className="text-xl font-extrabold text-emerald-900">Business Impact</h3>
                <p className="mt-3 text-lg leading-relaxed text-emerald-900/90">
                  Higher uptime, smoother calls, faster performance, lower outage risk, and
                  enterprise-grade reliability.
                </p>
              </div>
            </div>

            {/* Footer CTA (mobile-friendly) */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
              <div className="text-lg font-bold text-slate-800">
                Click to view the full technical & business breakdown
              </div>

              <div className="flex sm:hidden items-center justify-center rounded-2xl bg-slate-900 px-6 py-4 text-lg font-extrabold text-white shadow-sm">
                Open <span aria-hidden="true" className="ml-2">→</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Container>
  );
}