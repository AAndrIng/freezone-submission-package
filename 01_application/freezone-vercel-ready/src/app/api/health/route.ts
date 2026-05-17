import { ok } from "@/lib/api";
export const dynamic = "force-dynamic";
export async function GET() { return ok({ success: true, service: "freezone-demo-api", status: "ok", mode: process.env.DEMO_MODE === "false" ? "live" : "demo", timestamp: new Date().toISOString() }); }
