import { ok } from "@/lib/api";
export const dynamic = "force-dynamic";
type RouteContext = { params: { id: string } };
export async function GET(_req: Request, context: RouteContext) { const { id } = context.params; return ok({ success: true, paymentId: id, status: "completed", settledAt: new Date().toISOString(), amountUsd: 47500, fee: "$0.002", route: "ARS → USD → MXN", provider: "Axiym Sandbox", message: "Payment settled successfully without SWIFT." }); }
