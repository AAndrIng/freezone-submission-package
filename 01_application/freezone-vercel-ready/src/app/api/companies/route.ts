import { NextRequest } from "next/server";
import { ok } from "@/lib/api";
import { COMPANIES_AFTER, COMPANIES_BEFORE } from "@/lib/demo-data";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) { const stage = req.nextUrl.searchParams.get("stage") === "after" ? "after" : "before"; return ok({ success: true, companies: stage === "after" ? COMPANIES_AFTER : COMPANIES_BEFORE }); }
