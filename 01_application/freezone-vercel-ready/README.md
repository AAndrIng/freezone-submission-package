# FreeZone — Vercel Ready Demo

Full Next.js App Router project for the FreeZone hackathon demo.

This repo is intentionally mock-first:
- Frontend can consume stable API contracts immediately.
- Backend internals can later be replaced with Supabase, Avalanche Fuji, OpenAI and Axiym.
- The demo flow stays stable.

## Product narrative

FreeZone converts operational compliance into verifiable financial trust for cross-border payments.

```txt
Supplier blocked
→ critical document uploaded
→ hash generated
→ Avalanche proof shown
→ trust score improves 30 → 74
→ cross-border payment unlocks
→ payment completes
→ public hash verifier confirms evidence
```

## Local run

```bash
npm install
npm run dev
```

Open: http://localhost:3000

## Vercel deploy

```bash
npx vercel@latest login
npx vercel@latest
```

For production:

```bash
npx vercel@latest --prod
```

## Environment

No real secrets required for mock mode.

Optional:

```bash
DEMO_MODE=true
```

## API endpoints

```txt
GET  /api/health
GET  /api/demo/state
GET  /api/demo/state?stage=after
GET  /api/companies
GET  /api/companies?stage=after

POST /api/documents/upload
GET  /api/documents/verify?hash=<docHash>

POST /api/scores/calculate
GET  /api/scores/company-mx-001

POST /api/payments/initiate
GET  /api/payments/status/payment-demo-001
```

## Smoke test

```bash
BASE="https://your-vercel-url.vercel.app"
curl "$BASE/api/health"
curl "$BASE/api/demo/state"
curl "$BASE/api/demo/state?stage=after"
curl "$BASE/api/scores/company-mx-001"
curl "$BASE/api/documents/verify?hash=demo-hash"
```

Or locally:

```bash
npm run smoke
```

## What is real vs mocked

| Layer | Status |
|---|---|
| UI flow | Working |
| API contracts | Working |
| SHA-256 hash generation | Working |
| Avalanche transaction | Mocked deterministic txHash |
| AI scoring | Mocked deterministic score transition |
| Payment provider | Mocked Axiym Sandbox response |
| Persistence | Stateless demo responses |
