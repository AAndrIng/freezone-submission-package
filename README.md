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

## Avalanche Fuji Deployment

FreeZone deployed two smart contracts on Avalanche Fuji C-Chain.

## Contracts

- FreeZoneDocumentRegistry: `0x8264C43Ae7dAA851D075f27A511ffd59BD8AFDB4`
- FreeZonePaymentIntentRegistry: `0x1a56b84cec847Ff8Ac1979C3d8B337bcFcb936bC`

## Demo Transactions

- Document proof: `0x2f35d3960f5051ed27447ed949ff2adbcfb3583eed92d4ccf23a63d13d81dcbe`
- Reputation attestation: `0xf1fdc3731254ec21f2cc63f4d5f230285350997804dc558d386110bba54eb29b`
- Payment intent: `0xcc5b82afddab0ace3d6ae00a8e6329564523ea8ece7a8ffd8601e96f4a0f0fae`

## Explorer Links

- Document proof: https://testnet.snowtrace.io/tx/0x2f35d3960f5051ed27447ed949ff2adbcfb3583eed92d4ccf23a63d13d81dcbe
- Reputation attestation: https://testnet.snowtrace.io/tx/0xf1fdc3731254ec21f2cc63f4d5f230285350997804dc558d386110bba54eb29b
- Payment intent: https://testnet.snowtrace.io/tx/0xcc5b82afddab0ace3d6ae00a8e6329564523ea8ece7a8ffd8601e96f4a0f0fae

This validates the core FreeZone flow:

`document hash → on-chain proof → reputation update → payment intent released by trust score`.
