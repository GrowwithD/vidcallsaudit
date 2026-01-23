// lib/point1-data.ts
import type { PointRow } from "./types";

export const point1Title =
  "Point #1 – Server & Database Infrastructure (Production Readiness)";

export const point1Rows: PointRow[] = [
  {
    id: "compute-web-api",
    area: "Compute",
    component: "Web & API Servers",
    currentState:
      "Single DigitalOcean droplet (1 vCPU / 1GB RAM / 25GB Disk). Web application, API services, background jobs, and database are running on the same server.",
    risks: [
      "Severe resource constraints → high risk of CPU throttling, memory exhaustion, performance degradation, crashes, and latency.",
      "Single point of failure: if the droplet goes down, the entire platform becomes unavailable.",
      "Disk I/O contention with DB during peak loads.",
    ],
    target: [
      "Two application droplets (minimum 2 vCPU / 4GB RAM each) deployed behind a Load Balancer.",
      "Separate database layer from application services.",
      "Support rolling / zero-downtime deployments.",
    ],
    benefits: [
      "High availability, fault tolerance, and better uptime.",
      "Horizontal scalability for traffic spikes.",
      "Improved performance and more stable production operation.",
    ],
    priority: "High",
    effort: "Medium",
  },

  // ✅ Jitsi server (self-hosted) upgrade
  {
    id: "compute-jitsi",
    area: "Compute",
    component: "Jitsi Server (Self-hosted)",
    currentState:
      "Self-hosted Jitsi running on a small DigitalOcean droplet (approx. 1GB RAM / 1 vCPU / 25GB Disk). Single instance setup.",
    risks: [
      "Severe resource constraints → call quality degradation (high CPU usage), audio/video lag, and meeting drops under load.",
      "Single point of failure: if the droplet fails/restarts, video calls become unavailable.",
      "No clear capacity baseline: hard to predict safe concurrent rooms/participants.",
      "Higher operational risk without monitoring/alerting and security hardening (public-facing real-time service).",
    ],
    target: [
      "Upgrade Jitsi droplet spec (minimum baseline: 2 vCPU / 4GB RAM; scale higher based on expected concurrency).",
      "Add monitoring for CPU/RAM/network + alerting (notify before call quality degrades).",
      "Harden security: firewall rules, restrict SSH, keep OS patched, rate-limit/fail2ban, and secure TURN/STUN if used.",
      "Plan growth path: separate JVB (Videobridge) and/or horizontal scaling approach when concurrency increases.",
      "Add snapshot/backup for Jitsi configs + documented restore procedure.",
    ],
    benefits: [
      "More stable call quality (less lag, fewer drops).",
      "Higher uptime for core customer experience (live calls).",
      "Clear scaling path and capacity planning.",
      "Reduced risk of incidents/security issues on a public service.",
    ],
    priority: "High",
    effort: "Medium",
  },

  {
    id: "data-db",
    area: "Data",
    component: "Database Server",
    currentState:
      "Database running inside the same droplet as Web & API services.",
    risks: [
      "Resource contention (CPU, RAM, Disk I/O) with application layer.",
      "High risk of slow queries, deadlocks, crashes, and data issues during peak load.",
      "Backup and recovery processes are limited/manual.",
    ],
    target: [
      "Migrate to Managed Database Service OR dedicated database server (minimum 2 vCPU / 4GB RAM).",
      "Automated backups + monitoring + alerting.",
      "Prefer point-in-time recovery (PITR) where possible.",
    ],
    benefits: [
      "Production-grade reliability and consistent DB performance.",
      "Automated backups and faster recovery in incident scenarios.",
      "Operational resilience and reduced risk of data loss.",
    ],
    priority: "High",
    effort: "Medium",
  },

  {
    id: "network-lb",
    area: "Network",
    component: "Load Balancer",
    currentState: "Not implemented.",
    risks: [
      "No traffic distribution, no failover, no redundancy.",
      "Any server failure results in full system outage.",
    ],
    target: [
      "Deploy DigitalOcean Load Balancer in front of application nodes.",
      "Enable health checks + automatic failover.",
      "Use SSL termination at LB (optional but recommended).",
    ],
    benefits: [
      "High availability and automatic failover.",
      "Traffic distribution and more stable response times.",
      "Zero-downtime releases become realistic.",
    ],
    priority: "High",
    effort: "Low",
  },

  {
    id: "scalability-horizontal",
    area: "Scalability",
    component: "Horizontal Scaling",
    currentState: "Not supported. Single-node architecture.",
    risks: [
      "Inability to handle traffic spikes.",
      "Poor user experience during peak hours.",
      "High risk of service interruption when load increases.",
    ],
    target: [
      "Multi-node architecture with horizontal scaling capability.",
      "Stateless app nodes behind LB; scale workers independently.",
    ],
    benefits: [
      "Seamless traffic handling and growth readiness.",
      "Elastic scaling and better peak-hour stability.",
    ],
    priority: "High",
    effort: "Medium",
  },

  {
    id: "reliability-ha",
    area: "Reliability",
    component: "High Availability (HA)",
    currentState: "Single instance architecture.",
    risks: [
      "Full outage in case of server failure.",
      "Maintenance downtime unavoidable.",
    ],
    target: [
      "Multi-node architecture + Load Balancer + Managed DB.",
      "Rolling deploy to avoid downtime.",
    ],
    benefits: [
      "Enterprise-grade uptime and business continuity.",
      "Less downtime during deployments/maintenance.",
    ],
    priority: "High",
    effort: "Medium",
  },

  // ✅ staging/testing environment
  {
    id: "reliability-staging",
    area: "Reliability",
    component: "Staging / Testing Environment",
    currentState:
      "No dedicated staging/testing environment. Testing is mostly local and/or directly in production flows.",
    risks: [
      "High risk of production regressions after deploy (bugs, broken flows, outages).",
      "Hard to safely test multi-tenant behavior, migrations, and integrations (webhooks, payments, Jitsi).",
      "No safe environment for load tests or release validation before go-live.",
    ],
    target: [
      "Create a dedicated staging environment with its own server/stack and isolated databases.",
      "Use a staging domain/subdomain (e.g., staging.vidcalls...) with separate secrets/keys.",
      "Adopt deploy flow: deploy to staging first → sanity checks → promote to production.",
      "Use anonymized seed data or sanitized snapshots (never raw production PII).",
    ],
    benefits: [
      "Safer releases and fewer customer-impacting incidents.",
      "Faster iteration with higher confidence.",
      "More enterprise-ready release process.",
    ],
    priority: "High",
    effort: "Medium",
  },

  {
    id: "backup-recovery",
    area: "Backup & Recovery",
    component: "Database Backup (Multi-tenant)",
    currentState:
      "Manual / limited backups. Multi-tenant architecture uses a separate database per tenant/company, but backup is not automated per-tenant.",
    risks: [
      "High data loss risk: a single missed backup can permanently lose one or more tenant databases.",
      "Operational risk increases with scale: the more tenants, the harder manual backups become, and failures can go unnoticed.",
      "Long recovery time (RTO) and unpredictable restore success (no routine restore verification).",
      "No off-site backup strategy: backups stored only in the same provider/environment can be lost during major incidents.",
    ],
    target: [
      "Implement automated per-tenant database backups on a schedule: Daily + Weekly + Monthly retention policy.",
      "Store backups off-site in AWS S3 (encrypted, versioned, lifecycle-managed) to protect against provider-wide incidents.",
      "Add Point-In-Time Recovery (PITR) where supported (preferred). If not possible, increase backup frequency (e.g., daily + hourly WAL/binlog shipping).",
      "Centralized backup orchestration: enumerate all tenant DBs and run backup + upload + verification automatically.",
      "Automated restore validation: scheduled restore drills (e.g., monthly) to confirm backups are usable.",
      "Monitoring + alerting: notify if any tenant backup fails, exceeds size thresholds, or misses SLA (email/Slack).",
    ],
    benefits: [
      "Strong tenant data protection with predictable recovery (lower RPO/RTO).",
      "Scales safely as tenant count grows (no manual operations).",
      "Off-site resilience: S3 storage protects against provider outages or accidental deletion.",
      "Audit/compliance readiness: retention policy, encryption, and restore evidence.",
      "Higher customer trust: enterprise-grade backup and disaster recovery posture.",
    ],
    priority: "High",
    effort: "Medium",
  },

  // ✅ CI/CD (Release Engineering)
  {
    id: "ops-cicd",
    area: "Operations",
    component: "CI/CD Pipeline (Staging → Production)",
    currentState:
      "Deployments are mostly manual (SSH / run commands on server). No consistent automated build/test checks before release.",
    risks: [
      "Higher chance of production regressions (no gated checks).",
      "Longer downtime or risky deployments (no repeatable process).",
      "Hard to rollback quickly when incidents happen.",
      "Multi-tenant migrations are risky without controlled rollout/verification.",
      "Secrets can drift or leak if env handling is not standardized.",
    ],
    target: [
      "CI: lint + typecheck + unit tests + build (optional security/dependency audit) on every PR.",
      "CD: auto-deploy to staging on merge; production deploy via tagged release or protected branch.",
      "Add smoke tests/health checks after deploy (web/api critical endpoints).",
      "Adopt zero-downtime deploy strategy where possible (rolling/release swap).",
      "Safe migrations: migrate central DB first; tenant DB migrations in batches with retries + progress reporting.",
      "Fast rollback: redeploy previous artifact/image and re-run health checks.",
      "Centralize secrets management per environment via CI secrets/variables (never in repo).",
    ],
    benefits: [
      "Safer releases with fewer customer-impacting incidents.",
      "Faster deployments with repeatable, auditable process.",
      "Quicker recovery/rollback → lower MTTR.",
      "More professional/enterprise-ready operations posture.",
    ],
    priority: "High",
    effort: "Medium",
  },

  // ✅ Free tier / trial / quota audit
  {
    id: "ops-free-tier-audit",
    area: "Operations",
    component: "Free Tier & License Audit (Prod Readiness)",
    currentState:
      "Several third-party services may be running on free or trial tiers (e.g., Firebase FCM, SMTP, TURN/STUN, monitoring/logging). Usage limits and production readiness are not formally audited.",
    risks: [
      "Silent throttling or service blocking when limits are exceeded.",
      "Production incidents caused by quota exhaustion (push notifications, email, calls, logs).",
      "Hidden operational risk due to undocumented limits and expirations.",
    ],
    target: [
      "Identify all services running on free/trial tiers and document ownership (billing, keys, renewals).",
      "Document limits: rate, quota, concurrency, storage, retention, and expiration dates.",
      "Upgrade to production-grade plans where required (FCM/SMTP/TURN/logging/monitoring).",
      "Store licenses/keys in secrets manager and rotate periodically.",
    ],
    benefits: [
      "Eliminates hidden production risks from quota exhaustion.",
      "Predictable system behavior under growth.",
      "Enterprise-grade reliability and compliance posture.",
    ],
    priority: "High",
    effort: "Low",
  },

  // ✅ Shared → Managed migration explicitly
  {
    id: "infra-managed-migration",
    area: "Infrastructure",
    component: "Shared → Managed Services Migration",
    currentState:
      "Core services (DB/cache/backups/monitoring) are partially self-managed or hosted in shared environments. Managed services are not fully adopted.",
    risks: [
      "Higher operational burden and manual maintenance.",
      "Higher failure domain (OS + service + app in one stack).",
      "Slower recovery and scaling.",
    ],
    target: [
      "Migrate database → managed database service.",
      "Use managed Redis/queue where applicable.",
      "Use managed load balancer + managed monitoring/alerts where possible.",
      "Reduce direct OS-level management and standardize images/configuration.",
    ],
    benefits: [
      "Lower operational complexity and fewer manual tasks.",
      "Higher reliability with built-in HA capabilities.",
      "Clear enterprise posture for customers/security reviews.",
    ],
    priority: "High",
    effort: "Medium",
  },

  // ✅ Disaster Recovery (beyond backups)
  {
    id: "reliability-dr",
    area: "Reliability",
    component: "Disaster Recovery Plan & Restore Drills",
    currentState:
      "Backups may exist but there is no documented full disaster recovery plan (RPO/RTO) and no routine restore drills for full environment recovery.",
    risks: [
      "Long and unpredictable recovery time after major incidents.",
      "Uncertainty whether backups are truly restorable under pressure.",
      "High business risk during provider-wide outages or severe failures.",
    ],
    target: [
      "Define RPO (acceptable data loss window) and RTO (target recovery time).",
      "Document full restore procedure: infra + DB + storage + secrets + DNS.",
      "Run scheduled restore drills (e.g., quarterly) and record evidence.",
      "Maintain a DR runbook (who/what/when) with clear escalation.",
    ],
    benefits: [
      "Predictable recovery under worst-case scenarios.",
      "Lower business risk and stronger customer trust.",
      "Enterprise-grade business continuity readiness.",
    ],
    priority: "High",
    effort: "Medium",
  },
];