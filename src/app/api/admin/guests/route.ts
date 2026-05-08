import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { listGuests, appendGuest } from "@/lib/sheets";
import { sanitize } from "@/lib/sanitize";

const MAX_NAME_LEN = 200;
const MAX_GREETING_LEN = 300;

export async function GET() {
  const guests = await listGuests();
  return NextResponse.json(guests);
}

export async function POST(req: NextRequest) {
  let body: { name?: string; greeting?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const name = sanitize(body.name ?? "").slice(0, MAX_NAME_LEN);
  const greeting = sanitize(body.greeting ?? "").slice(0, MAX_GREETING_LEN);

  if (!name || !greeting) {
    return NextResponse.json({ error: "Tên và lời mời là bắt buộc" }, { status: 400 });
  }

  // Only allow the app's own origin to build invite URLs
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const id = nanoid(10);
  const inviteUrl = `${base}/invite/${id}`;
  await appendGuest(id, name, greeting, inviteUrl);

  return NextResponse.json({ id, inviteUrl }, { status: 201 });
}
