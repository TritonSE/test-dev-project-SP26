import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://localhost:3001/members", { cache: "no-store" });
    if (!res.ok) throw new Error("Backend error");
    const members = (await res.json()) as unknown[];
    return NextResponse.json(members);
  } catch {
    return NextResponse.json({ error: "Could not reach backend" }, { status: 502 });
  }
}
