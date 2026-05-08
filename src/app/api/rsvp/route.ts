import { NextRequest, NextResponse } from "next/server";
import { updateRsvp } from "@/lib/sheets";
import { sanitize } from "@/lib/sanitize";
import { createRateLimiter } from "@/lib/rate-limit";

const MAX_GUEST_ID_LEN = 200;
// 5 RSVP submissions per IP per 10 minutes
const limiter = createRateLimiter({ windowMs: 10 * 60_000, max: 5 });

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!limiter.check(ip)) {
    return NextResponse.json({ error: "Quá nhiều yêu cầu, vui lòng thử lại sau" }, { status: 429 });
  }
  let body: { guestId?: string; attending?: string; count?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  // ── Sanitize & validate ─────────────────────────────────────────────────
  const guestId = sanitize(body.guestId ?? "").slice(0, MAX_GUEST_ID_LEN);
  const attending = sanitize(body.attending ?? "");
  const count = body.count;

  if (!guestId || !attending || count == null) {
    return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
  }
  if (attending !== "yes" && attending !== "no") {
    return NextResponse.json({ error: "Giá trị tham dự không hợp lệ" }, { status: 400 });
  }
  const safeCount = Math.max(0, Math.min(100, Math.trunc(Number(count))));
  if (!Number.isFinite(safeCount)) {
    return NextResponse.json({ error: "Số lượng không hợp lệ" }, { status: 400 });
  }

  const ok = await updateRsvp(guestId, attending, safeCount);
  if (!ok) {
    return NextResponse.json({ error: "Không tìm thấy khách" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
