# FreeZone — Smart Contracts

The smart contracts are located in:

```txt
02_smart_contracts/freezone-contracts-fuji/contracts/
```

## 1. FreeZoneDocumentRegistry

Purpose:

Registers operational evidence and reputation attestations on Avalanche Fuji.

It stores:

- Document hash.
- Company ID.
- Document type.
- Timestamp.
- Validity flag.
- Latest reputation score per company.

It does **not** store private documents on-chain.

Main functions:

```solidity
registerDocument(bytes32 docHash, string companyId, string docType)
verifyDocument(bytes32 docHash)
setDocumentValidity(bytes32 docHash, bool isValid)
updateReputation(string companyId, uint8 compliance, uint8 risk, uint8 trust, uint8 overall)
getReputation(string companyId)
```

Why it matters:

It creates a public proof that a specific operational document existed at a given time and was associated with a specific company. It also records the company's latest operational trust attestation.

## 2. FreeZonePaymentIntentRegistry

Purpose:

Records cross-border payment intents gated by operational reputation.

It does **not** custody funds.

It stores:

- Payment ID.
- Channel ID.
- Origin company.
- Destination company.
- Amount.
- Source and destination currency.
- Required trust threshold.
- Observed overall score.
- Payment status.

Main functions:

```solidity
createPaymentIntent(...)
releasePayment(bytes32 paymentId)
markSettled(bytes32 paymentId, string providerReference)
cancelPayment(bytes32 paymentId)
getPayment(bytes32 paymentId)
```

Why it matters:

It proves that payment release can be conditioned by verified operational trust. If the recipient company does not meet the required score, the payment intent is blocked. If the company meets the threshold, the payment intent can be released.

## Compliance stance

The contracts are designed to avoid custody of user funds and avoid issuing a new token. Avalanche is used as a verification and recordkeeping layer, not as a speculative asset layer.
