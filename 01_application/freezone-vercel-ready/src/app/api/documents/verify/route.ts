import { NextRequest } from "next/server";
import { fail, ok } from "@/lib/api";
import { buildTxHash, explorerUrl } from "@/lib/demo-data";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) { const hash = req.nextUrl.searchParams.get("hash"); if (!hash) return fail("Hash is required. Use /api/documents/verify?hash=<docHash>"); const txHash = buildTxHash(`verify:${hash}`); return ok({ success: true, isValid: true, docHash: hash, companyId: "company-mx-001", companyName: "Materiales Norteño SA", docType: "certificate_of_origin", registeredAt: new Date().toISOString(), avalancheNetwork: "Fuji Testnet", txHash, avalancheExplorer: explorerUrl(txHash), message: "Original document verified on Avalanche Fuji." }); }
