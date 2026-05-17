# FreeZone — API Contracts

Base URL:

```txt
https://freezone-demo.vercel.app
```

## Health

```http
GET /api/health
```

Returns service status.

## Demo state

```http
GET /api/demo/state
GET /api/demo/state?stage=after
```

Returns the current demo state.

- `before`: supplier blocked, payment blocked.
- `after`: document verified, supplier score improved, payment unlocked.

## Companies

```http
GET /api/companies
GET /api/companies?stage=after
```

Returns companies in the demo corridor.

## Upload document

```http
POST /api/documents/upload
Content-Type: multipart/form-data
```

Fields:

```txt
file
companyId
channelId
docType
```

Example response includes:

```json
{
  "success": true,
  "documentId": "doc-demo",
  "companyId": "company-mx-001",
  "docType": "certificate_of_origin",
  "docHash": "sha256...",
  "txHash": "0x...",
  "avalancheNetwork": "Fuji Testnet",
  "status": "minted",
  "scoreImpact": {
    "previousScore": {
      "overall": 30
    },
    "newScore": {
      "overall": 74
    },
    "paymentUnlocked": true
  }
}
```

## Verify document

```http
GET /api/documents/verify?hash=<docHash>
```

Returns whether the document proof is valid.

## Calculate score

```http
POST /api/scores/calculate
Content-Type: application/json
```

Request:

```json
{
  "companyId": "company-mx-001",
  "documentId": "doc-demo-001"
}
```

Returns:

- Previous score.
- New score.
- Payment unlock status.
- Reputation attestation data.

## Get company score

```http
GET /api/scores/company-mx-001
```

Returns the current operational reputation score.

## Initiate payment

```http
POST /api/payments/initiate
Content-Type: application/json
```

Request:

```json
{
  "channelId": "channel-demo-001",
  "fromCompanyId": "company-ar-001",
  "toCompanyId": "company-mx-001",
  "amountUsd": 47500,
  "currencyFrom": "ARS",
  "currencyTo": "MXN"
}
```

Returns payment status and SWIFT comparison.

## Payment status

```http
GET /api/payments/status/payment-demo-001
```

Returns completed payment status.
