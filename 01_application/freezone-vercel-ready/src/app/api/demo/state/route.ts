import { NextRequest } from "next/server";
import { ok } from "@/lib/api";
import { getDemoState } from "@/lib/demo-data";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) { const stageParam = req.nextUrl.searchParams.get("stage"); const stage = stageParam === "after" ? "after" : "before"; return ok(getDemoState(stage)); }
