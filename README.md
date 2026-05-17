# FreeZone — Hackathon Deliverable Package

This package contains the project deliverables for **FreeZone · Operational Financial Infrastructure**.

FreeZone converts operational compliance into verifiable financial trust for cross-border payments.

## Package structure

```txt
01_application/
  Next.js 14 application deployed to Vercel.
  Includes frontend demo and mock-first API routes.

02_smart_contracts/
  Hardhat project with Avalanche Fuji smart contracts.
  Includes document/reputation registry and payment intent registry.

03_documentation/
  Technical overview, API contracts, demo script, compliance notes,
  deployment checklist and real-vs-mock disclosure.
```

## Live demo

```txt
https://freezone-demo.vercel.app
```

## Core demo flow

```txt
Supplier starts blocked
→ critical document is uploaded
→ document hash is generated
→ Avalanche proof / txHash is shown
→ compliance, risk and trust scores update
→ payment is unlocked
→ cross-border payment is initiated
→ public verifier confirms evidence by hash
```

## Important note

This is a hackathon MVP. Some integrations are implemented in mock/sandbox mode to keep the demo deterministic and auditable:

- Avalanche Fuji contracts are provided for deployment.
- Vercel application is deployed and API contracts are stable.
- Axiym/payment flow is represented as sandbox/mock.
- AI scoring is represented as deterministic scoring logic for the demo.
- Documents are represented through hashes and metadata; private files are not stored on-chain.

## Recommended validation order

1. Open the live demo.
2. Run the frontend flow.
3. Inspect API endpoints.
4. Review smart contracts.
5. Deploy contracts to Fuji.
6. Run the contract interaction demo script.
7. Compare the on-chain proof links with the product narrative.
