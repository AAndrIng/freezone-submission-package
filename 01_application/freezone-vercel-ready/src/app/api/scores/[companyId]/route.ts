import { fail, ok } from "@/lib/api";
import { getCompanyName, getCompanyScore } from "@/lib/demo-data";
export const dynamic = "force-dynamic";
type RouteContext = { params: { companyId: string } };
export async function GET(_req: Request, context: RouteContext) { const { companyId } = context.params; const score = getCompanyScore(companyId); if (!score) return fail(`Score not found for companyId: ${companyId}`, 404, "NOT_FOUND"); return ok({ success: true, companyId, companyName: getCompanyName(companyId), score, status: score.overall >= 70 ? "verified" : "blocked", updatedAt: new Date().toISOString() }); }
