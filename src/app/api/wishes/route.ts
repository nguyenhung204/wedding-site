import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { isProfane } from "@/lib/profanity";
import { sanitize } from "@/lib/sanitize";
import guests from "@/lib/guests";
import { getGuestById } from "@/lib/sheets";
import { createRateLimiter } from "@/lib/rate-limit";

const MAX_NAME_LEN = 100;
const MAX_MSG_LEN = 50;
// 3 wishes per IP per 5 minutes
const limiter = createRateLimiter({ windowMs: 5 * 60_000, max: 3 });

/** Returns true only if the guestId exists in our verified guest list */
async function isValidGuest(id: string): Promise<boolean> {
  if (!id || id.length > 200) return false;
  // Fast path: hardcoded list
  if (guests[id]) return true;
  // Authoritative check: Google Sheets
  try {
    const row = await getGuestById(id);
    return row !== null;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!limiter.check(ip)) {
    return NextResponse.json({ error: "Quá nhiều yêu cầu, vui lòng thử lại sau" }, { status: 429 });
  }

  let body: { name?: string; message?: string; guestId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  // ── 1. Validate guestId ──────────────────────────────────────────────────
  const guestId = typeof body.guestId === "string" ? body.guestId.trim() : "";
  if (!guestId) {
    return NextResponse.json({ error: "Không tìm thấy thông tin khách" }, { status: 403 });
  }
  const valid = await isValidGuest(guestId);
  if (!valid) {
    return NextResponse.json({ error: "Không tìm thấy thông tin khách" }, { status: 403 });
  }

  // ── 2. Sanitize inputs ───────────────────────────────────────────────────
  const name = sanitize(body.name ?? "").slice(0, MAX_NAME_LEN);
  const message = sanitize(body.message ?? "");

  if (!name || !message) {
    return NextResponse.json({ error: "Vui lòng nhập đầy đủ thông tin" }, { status: 400 });
  }

  // ── 3. Enforce message length ────────────────────────────────────────────
  if (message.length > MAX_MSG_LEN) {
    return NextResponse.json(
      { error: `Lời chúc tối đa ${MAX_MSG_LEN} ký tự` },
      { status: 400 },
    );
  }

  // ── 4. Profanity check ───────────────────────────────────────────────────
  if (isProfane(name) || isProfane(message)) {
    return NextResponse.json({ error: "Nội dung không phù hợp" }, { status: 400 });
  }

  // ── 5. Persist ───────────────────────────────────────────────────────────
  const db = getAdminDb();
  await db.ref("wishes").push({
    name,
    message,
    guestId,
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
