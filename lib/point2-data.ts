// lib/point2-data.ts
import type { PointRow } from "./types";

export const point2Title =
  "Point #2 – Observability & Operations (Monitoring, Logging, Alerting)";

export const point2Rows: PointRow[] = [
  {
    id: "monitoring-core",
    area: "Monitoring",
    component: "Infrastructure & App Monitoring (Core)",
    currentState:
      "Monitoring is minimal. Limited visibility into CPU/RAM/Disk, request latency, error rates, and service health across app + workers + Jitsi.",
    risks: [
      "Incidents detected late (often after customers complain).",
      "Hard to pinpoint root cause: infra vs app vs DB vs network vs Jitsi.",
      "Scaling/capacity decisions become guessing.",
    ],
    target: [
      "Dashboards for: CPU/RAM/Disk, network, load balancer, app latency (p95), error rate, queue depth, DB health, Jitsi health.",
      "Define basic SLOs: uptime + p95 latency + error budget.",
      "Use Grafana+Prometheus or managed monitoring (DO Monitoring / Datadog / New Relic).",
    ],
    benefits: [
      "Faster detection & diagnosis, fewer downtime minutes.",
      "Clear capacity planning and confident scaling.",
      "Baseline enterprise observability.",
    ],
    priority: "High",
    effort: "Medium",
  },

  {
    id: "logging-centralized",
    area: "Logging",
    component: "Centralized Logs (App / Worker / Jitsi)",
    currentState:
      "Logs are mostly server-local and fragmented. Searching and correlating incidents across services is slow and incomplete.",
    risks: [
      "Slow incident investigation (no single log search).",
      "Hard to correlate app ↔ worker ↔ Jitsi events.",
      "Logs can be lost if the server is down or rotated.",
    ],
    target: [
      "Centralize logs (Loki/ELK/Datadog Logs).",
      "Standardize JSON logs + add request/correlation IDs.",
      "Ship logs off-host with retention policy + access controls.",
    ],
    benefits: [
      "Fast debugging with one place to search.",
      "Lower MTTR via correlation across services.",
      "Better auditability and operational maturity.",
    ],
    priority: "High",
    effort: "Medium",
  },

  {
    id: "alerting-oncall",
    area: "Alerting",
    component: "Alert Rules + Notifications",
    currentState:
      "Alerting is not standardized. Failures may go unnoticed (queue backlog, high error rates, DB issues, Jitsi issues).",
    risks: [
      "Undetected outages and prolonged downtime.",
      "Silent failures (queue stuck, disk full, DB overload) without early warning.",
      "Reactive operations (always firefighting).",
    ],
    target: [
      "Alert rules: uptime/health checks, high error rate, p95 latency, queue backlog, DB connections, disk usage, backup job failures, Jitsi health.",
      "Send alerts to Slack/Email/PagerDuty with severity levels.",
      "Each alert includes a short runbook link (what to check first).",
    ],
    benefits: [
      "Immediate detection with clear action path.",
      "Lower downtime and fewer customer-facing incidents.",
      "Predictable support posture.",
    ],
    priority: "High",
    effort: "Low",
  },

  {
    id: "uptime-synthetic",
    area: "Reliability",
    component: "Uptime Checks (External) + Critical Endpoint Checks",
    currentState:
      "No consistent external uptime monitoring for web/API and critical endpoints (login, create room, join call/token).",
    risks: [
      "Outages remain invisible until users report.",
      "Partial outages (some endpoints failing) are missed.",
    ],
    target: [
      "External uptime checks (1–5 min) for web + API + health endpoints.",
      "Add simple checks for key flows: auth, create room, join call/token.",
      "Track uptime history + incident timelines.",
    ],
    benefits: [
      "Early detection of partial failures/regressions.",
      "Higher confidence after deploys (basic smoke checks).",
    ],
    priority: "High",
    effort: "Low",
  },

  // ✅ NEW: Business metrics & session traceability
  {
    id: "observability-business",
    area: "Observability",
    component: "Business Metrics & Session Tracing",
    currentState:
      "Monitoring focuses mostly on infrastructure and system health. Limited visibility into business events (room created, calls started/ended, join failures) and session-level tracing.",
    risks: [
      "Hard to correlate technical incidents with business impact.",
      "Difficult to debug user complaints without session-level tracing.",
    ],
    target: [
      "Track key business events: room creation, call start/end, join failures, recording events, webhook status.",
      "Add correlation ID per request/session and propagate across app → worker → Jitsi.",
      "Optional: APM/distributed tracing via OpenTelemetry or a vendor APM.",
    ],
    benefits: [
      "Faster root cause analysis for user-facing issues.",
      "Better customer support diagnostics (trace a specific session).",
      "Clear visibility into product reliability and failure rates.",
    ],
    priority: "Medium",
    effort: "Medium",
  },

  // ✅ NEW: Capacity baseline (so scaling isn't guesswork)
  {
    id: "capacity-baseline",
    area: "Capacity Planning",
    component: "Concurrency & Load Baseline Metrics",
    currentState:
      "No formal baseline exists for maximum safe concurrency (rooms, participants, Jitsi load, queue depth).",
    risks: [
      "Unpredictable performance under traffic spikes.",
      "Risk of sudden call quality degradation under load.",
    ],
    target: [
      "Measure baseline: max rooms/participants, CPU/RAM, Jitsi bandwidth, queue depth, p95 latency.",
      "Define safe concurrency thresholds and alert when approaching capacity limits.",
      "Use baseline results to guide droplet sizing and scaling decisions.",
    ],
    benefits: [
      "Predictable scaling and less firefighting.",
      "Early detection before degradation.",
      "Cost-efficient growth planning.",
    ],
    priority: "Medium",
    effort: "Low",
  },
];