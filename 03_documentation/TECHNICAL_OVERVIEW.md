# FreeZone — Technical Overview

## What FreeZone does

FreeZone is operational financial infrastructure for cross-border B2B payments.

The product links:

1. Operational documentation.
2. Verifiable reputation.
3. Compliance-gated payment release.
4. Avalanche-based auditability.

The demo models a commercial corridor:

```txt
Supplier in Mexico
→ Manufacturer in Argentina
→ Distributor in the United States
```

A supplier starts with a low operational trust score because critical documentation is missing. Once the required document is uploaded and verified, the score improves and a cross-border payment is unlocked.

## Architecture

```txt
Frontend
  Next.js 14 + TypeScript
  Vercel deployment

API layer
  Next.js App Router API Routes
  Mock-first stable API contracts
  Replaceable adapters for future real integrations

Evidence layer
  SHA-256 document hashes
  Avalanche Fuji C-Chain transaction / smart contract proof
  Public verifier by hash

Reputation layer
  Compliance Score
  Risk Score
  Trust Score
  Overall Score

Payment layer
  Payment intent gated by operational trust score
  External payment provider / sandbox model
  No custody by FreeZone
```

## Why Avalanche

Avalanche Fuji C-Chain is used as an EVM-compatible verification layer. The system does not store business documents on-chain. It stores document hashes, timestamps, and attestations so that operational evidence can be publicly verified without exposing private business data.

## Main components

### Application

Located in:

```txt
01_application/freezone-vercel-ready/
```

Contains:

- Next.js frontend demo.
- API endpoints.
- Deterministic mock data.
- Upload, score, payment and verification flow.

### Smart contracts

Located in:

```txt
02_smart_contracts/freezone-contracts-fuji/
```

Contains:

- `FreeZoneDocumentRegistry.sol`
- `FreeZonePaymentIntentRegistry.sol`
- Hardhat deployment scripts.
- Demo interaction script.

## Deployment URLs

Live application:

```txt
https://freezone-demo.vercel.app
```

## Technical positioning

FreeZone does not attempt to become a bank, broker, dealer, exchange or custodian.

The MVP uses blockchain as a recordkeeping and verification layer:

```txt
document hash
→ timestamp
→ txHash
→ reputation attestation
→ payment intent release
```

Actual payment execution can be routed through regulated providers or sandbox infrastructure.
