import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { appendGuestBatch } from "@/lib/sheets";
import { sanitize } from "@/lib/sanitize";

const BATCH_SIZE = 40;

const MAX_NAME_LEN = 200;
const MAX_GREETING_LEN = 300;
const MAX_ROWS = 500;

interface ImportRow {
  name: string;
  greeting: string;
}

export async function POST(req: NextRequest) {
  let rows: ImportRow[];
  try {
    rows = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  if (!Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json({ error: "Không có dữ liệu để import" }, { status: 400 });
  }

  if (rows.length > MAX_ROWS) {
    return NextResponse.json(
      { error: `Tối đa ${MAX_ROWS} khách mỗi lần import` },
      { status: 400 }
    );
  }

  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const results: { id: string; name: string; inviteUrl: string }[] = [];
  const errors: { row: number; reason: string }[] = [];

  // Pre-validate and build guest records
  const valid: { index: number; id: string; name: string; greeting: string; inviteUrl: string }[] = [];
  for (let i = 0; i < rows.length; i++) {
    const name = sanitize(rows[i].name ?? "").slice(0, MAX_NAME_LEN);
    const greeting = sanitize(rows[i].greeting ?? "").slice(0, MAX_GREETING_LEN) || "Trân trọng kính mời";
    if (!name) {
      errors.push({ row: i + 1, reason: "Thiếu tên khách" });
      continue;
    }
    const id = nanoid(10);
    valid.push({ index: i + 1, id, name, greeting, inviteUrl: `${base}/invite/${id}` });
  }

  // Write in batches of BATCH_SIZE (1 API call per batch)
  for (let b = 0; b < valid.length; b += BATCH_SIZE) {
    const batch = valid.slice(b, b + BATCH_SIZE);
    try {
      await appendGuestBatch(batch);
      batch.forEach(({ id, name, inviteUrl }) => results.push({ id, name, inviteUrl }));
    } catch {
      batch.forEach(({ index }) =>
        errors.push({ row: index, reason: "Không thể ghi vào Google Sheets" })
      );
    }
  }

  return NextResponse.json({ imported: results.length, errors }, { status: 201 });
}
