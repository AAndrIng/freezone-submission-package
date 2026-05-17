# FreeZone — Deployment Checklist

## Application

Location:

```txt
01_application/freezone-vercel-ready/
```

Local run:

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Deploy:

```bash
npx vercel@latest --prod
```

Live URL:

```txt
https://freezone-demo.vercel.app
```

Smoke test:

```bash
BASE="https://freezone-demo.vercel.app"

curl "$BASE/api/health"
curl "$BASE/api/demo/state"
curl "$BASE/api/demo/state?stage=after"
curl "$BASE/api/scores/company-mx-001"
curl "$BASE/api/documents/verify?hash=demo-hash"
```

## Contracts

Location:

```txt
02_smart_contracts/freezone-contracts-fuji/
```

Install:

```bash
npm install
cp .env.example .env
```

Required env:

```bash
DEPLOYER_PRIVATE_KEY=0x...
FUJI_RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
```

Compile:

```bash
npm run compile
```

Deploy to Fuji:

```bash
npm run deploy:fuji
```

Run demo interaction script:

```bash
npx hardhat run scripts/demo-interact.js --network fuji
```

## What to capture after contract deployment

```txt
FreeZoneDocumentRegistry address
FreeZonePaymentIntentRegistry address
Document registration txHash
Reputation update txHash
Payment intent txHash
Snowtrace explorer links
```
