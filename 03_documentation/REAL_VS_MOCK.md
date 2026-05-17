# FreeZone — Real vs Mock Disclosure

This document explains what is real, what is mocked and why.

## Real

```txt
Vercel deployment
Next.js frontend
API contracts
SHA-256 hash generation
Demo state transition
Public verifier endpoint
Smart contract source code
Hardhat deployment scripts
Avalanche Fuji deployment target
```

## Mock / sandbox

```txt
Axiym payment execution
AI scoring
Historical reputation dataset
Some txHash values in frontend demo before live contract connection
```

## Why mock-first

The MVP uses a mock-first adapter architecture so the demo remains deterministic and frontend integration does not depend on external providers, RPC availability, wallet state or payment sandbox latency.

The contracts and integration points are included so validators can inspect the intended production path.

## Production replacement path

```txt
Mock upload adapter
→ Supabase Storage + encrypted document storage
→ SHA-256 hash
→ Avalanche DocumentRegistry transaction

Mock score adapter
→ OpenAI document/risk analysis
→ Reputation attestation on Avalanche

Mock payment adapter
→ Axiym/payment provider sandbox
→ PaymentIntentRegistry status update
```
