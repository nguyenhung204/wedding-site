import { NextRequest, NextResponse } from "next/server";
import { updateGuest, deleteGuest } from "@/lib/sheets";
import { sanitize } from "@/lib/sanitize";

const MAX_NAME_LEN = 200;
const MAX_GREETING_LEN = 300;

interface RouteContext {
  params: { guestId: string };
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const id = decodeURIComponent(params.guestId);
  if (!id || id.length > 200 || /[<>"'`]/.test(id)) {
    return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
  }

  let body: { name?: string; greeting?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const name = sanitize(body.name ?? "").slice(0, MAX_NAME_LEN);
  const greeting = (sanitize(body.greeting ?? "").slice(0, MAX_GREETING_LEN)) || "Trân trọng kính mời";

  if (!name) {
    return NextResponse.json({ error: "Tên khách là bắt buộc" }, { status: 400 });
  }

  const updated = await updateGuest(id, name, greeting);
  if (!updated) {
    return NextResponse.json({ error: "Không tìm thấy khách" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const id = decodeURIComponent(params.guestId);
  if (!id || id.length > 200 || /[<>"'`]/.test(id)) {
    return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
  }

  const deleted = await deleteGuest(id);
  if (!deleted) {
    return NextResponse.json({ error: "Không tìm thấy khách" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
