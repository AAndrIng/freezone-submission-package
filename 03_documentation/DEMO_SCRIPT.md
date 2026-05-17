# FreeZone — Demo Script

## 90-second demo

FreeZone is operational financial infrastructure for cross-border B2B payments.

In this demo, we show a supplier in Mexico, a manufacturer in Argentina and a distributor in the United States.

At the beginning, the supplier has a low operational score because a critical compliance document is missing. Because of that, the cross-border payment is blocked.

The supplier uploads the required document. FreeZone generates a SHA-256 hash, creates a verifiable proof, and updates the supplier's compliance, risk and trust score.

The supplier's overall score moves from 30 to 74.

Once the score meets the minimum threshold, the payment becomes available. The manufacturer can release the cross-border payment, and the system shows faster settlement and lower friction compared with SWIFT.

The important point is that FreeZone does not put private documents on-chain. It uses Avalanche as a verification layer for hashes, timestamps and attestations.

FreeZone turns operational compliance into verifiable financial trust.

## Demo steps

1. Open `https://freezone-demo.vercel.app`.
2. Show `Payment blocked`.
3. Show supplier score: 30.
4. Show pending `Certificate of Origin`.
5. Click `Upload document + update score`.
6. Show hash and txHash/proof output.
7. Show updated score: 74.
8. Show payment is unlocked.
9. Click `Release payment`.
10. Show completed payment.
11. Click `Verify hash`.
12. Show public verification response.

## Closing sentence

FreeZone connects compliance, verifiable reputation and cross-border settlement into a single operational workflow.
