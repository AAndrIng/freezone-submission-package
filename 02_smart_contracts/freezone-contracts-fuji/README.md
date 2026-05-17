# FreeZone Contracts — Avalanche Fuji

Minimal smart-contract package for the FreeZone hackathon demo.

## Contracts

### 1. FreeZoneDocumentRegistry

Registers operational evidence without storing private documents on-chain.

It stores:
- document hash
- company ID
- document type
- timestamp
- validity flag
- latest reputation attestation per company

Main functions:
- `registerDocument(bytes32 docHash, string companyId, string docType)`
- `verifyDocument(bytes32 docHash)`
- `updateReputation(string companyId, uint8 compliance, uint8 risk, uint8 trust, uint8 overall)`
- `getReputation(string companyId)`

### 2. FreeZonePaymentIntentRegistry

Records cross-border payment intents gated by operational trust.

It does **not** custody funds. It only records whether a payment is blocked, released, settled or cancelled according to the recipient company's reputation score.

Main functions:
- `createPaymentIntent(...)`
- `releasePayment(bytes32 paymentId)`
- `markSettled(bytes32 paymentId, string providerReference)`
- `getPayment(bytes32 paymentId)`

## Network

Avalanche Fuji C-Chain:

```txt
RPC URL: https://api.avax-test.network/ext/bc/C/rpc
Chain ID: 43113
Currency: AVAX
Explorer: https://testnet.snowtrace.io
```

## Setup

```bash
npm install
cp .env.example .env
```

Put a Fuji-only private key in `.env`:

```bash
DEPLOYER_PRIVATE_KEY=0x...
```

Do not use a wallet with real funds. Use a fresh deployer wallet.

## Compile

```bash
npm run compile
```

## Deploy to Fuji

```bash
npm run deploy:fuji
```

The deployment output is saved to:

```txt
deployments/fuji.json
```

## Optional demo transaction flow

After deployment:

```bash
npm run demo:fuji
```

This script:
1. Registers a document proof.
2. Updates supplier reputation.
3. Creates a payment intent gated by overall score.
4. Prints transaction hashes and Snowtrace links.

## Security note

These contracts are hackathon MVP contracts. They are not audited and should not be used in production without review.
