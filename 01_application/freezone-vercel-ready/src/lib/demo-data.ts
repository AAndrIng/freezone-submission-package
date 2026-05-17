export type CompanyType = "supplier" | "manufacturer" | "distributor" | "bank";
export type CompanyStatus = "blocked" | "active" | "verified";
export type Score = { compliance: number; risk: number; trust: number; overall: number };
export type Company = { id: string; name: string; type: CompanyType; country: string; description: string; score: Score; status: CompanyStatus };

export const CHANNEL = { id: "channel-demo-001", name: "AR-MX Industrial Supply Corridor", description: "Proveedor México → Elaboradora Argentina → Distribuidora USA" };
export const SCORES = {
  supplierBefore: { compliance: 35, risk: 72, trust: 28, overall: 30 },
  supplierAfter: { compliance: 78, risk: 31, trust: 71, overall: 74 },
  manufacturer: { compliance: 85, risk: 18, trust: 82, overall: 83 },
  distributor: { compliance: 79, risk: 24, trust: 76, overall: 77 }
} satisfies Record<string, Score>;
export const COMPANIES_BEFORE: Company[] = [
  { id: "company-mx-001", name: "Materiales Norteño SA", type: "supplier", country: "Mexico", description: "Proveedor de acero y materiales de construcción", score: SCORES.supplierBefore, status: "blocked" },
  { id: "company-ar-001", name: "Industrias Austral SA", type: "manufacturer", country: "Argentina", description: "Manufactura de componentes industriales", score: SCORES.manufacturer, status: "active" },
  { id: "company-us-001", name: "Global Parts Distribution LLC", type: "distributor", country: "United States", description: "Distribución industrial norteamérica", score: SCORES.distributor, status: "active" }
];
export const COMPANIES_AFTER: Company[] = COMPANIES_BEFORE.map((company) => company.id === "company-mx-001" ? { ...company, score: SCORES.supplierAfter, status: "verified" } : company);
export const REQUIRED_DOCUMENTS = [
  { id: "doc-req-001", companyId: "company-mx-001", docType: "certificate_of_origin", label: "Certificate of Origin", status: "pending", priority: "critical" },
  { id: "doc-req-002", companyId: "company-mx-001", docType: "quality_report", label: "Quality Report Q1 2025", status: "verified", priority: "high" },
  { id: "doc-req-003", companyId: "company-mx-001", docType: "purchase_order", label: "Purchase Order IND-2025-0134", status: "verified", priority: "high" }
];
export function getDemoState(stage: "before" | "after" = "before") {
  const after = stage === "after";
  return {
    success: true,
    stage,
    channel: CHANNEL,
    companies: after ? COMPANIES_AFTER : COMPANIES_BEFORE,
    requiredDocuments: REQUIRED_DOCUMENTS.map((doc) => after && doc.id === "doc-req-001" ? { ...doc, status: "verified" } : doc),
    pendingPayment: {
      id: "payment-demo-001", channelId: CHANNEL.id, amountUsd: 47500, currencyFrom: "ARS", currencyTo: "MXN",
      fromCompanyId: "company-ar-001", toCompanyId: "company-mx-001", status: after ? "pending" : "blocked",
      reason: after ? "Supplier meets minimum operational trust threshold." : "Supplier trust score below minimum threshold."
    },
    demoNarrative: after ? "Document verified, supplier score improved and cross-border payment is now unlocked." : "Supplier is blocked until critical documentation is verified."
  };
}
export function getCompanyScore(companyId: string): Score | null {
  if (companyId === "company-mx-001") return SCORES.supplierAfter;
  if (companyId === "company-ar-001") return SCORES.manufacturer;
  if (companyId === "company-us-001") return SCORES.distributor;
  return null;
}
export function getCompanyName(companyId: string): string { return COMPANIES_AFTER.find((company) => company.id === companyId)?.name ?? "Unknown Company"; }
export function buildTxHash(seed: string) { const clean = Buffer.from(seed).toString("hex").slice(0, 64).padEnd(64, "0"); return `0x${clean}`; }
export function explorerUrl(txHash: string) { return `https://testnet.snowtrace.io/tx/${txHash}`; }
