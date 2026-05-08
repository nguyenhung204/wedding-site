"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";

interface ImportResult {
  imported: number;
  errors: { row: number; reason: string }[];
}

export default function ImportGuestsForm() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBusy(true);
    setError(null);
    setResult(null);

    try {
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 }) as string[][];

      // Skip header row: any row whose first cell looks like a column label
      const dataRows = raw.filter((r) => {
        const first = String(r[0] ?? "").toLowerCase().trim();
        return first && !first.startsWith("tên") && first !== "name";
      });

      if (dataRows.length === 0) {
        setError("File không có dữ liệu khách.");
        return;
      }

      const payload = dataRows.map((r) => ({
        name: String(r[0] ?? "").trim(),
        greeting: String(r[1] ?? "").trim() || "Trân trọng kính mời",
      }));

      const res = await fetch("/api/admin/guests/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Import thất bại.");
      }

      const data: ImportResult = await res.json();
      setResult(data);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra.");
    } finally {
      setBusy(false);
      // Reset file input so the same file can be re-selected
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <h2 className="mb-1 text-base font-semibold text-gray-800">Import khách từ Excel</h2>
      <p className="mb-4 text-xs text-gray-500">
        File Excel: cột A&nbsp;=&nbsp;<strong>Tên khách</strong>, cột B&nbsp;=&nbsp;<strong>Lời mời</strong> (nếu bỏ trống sẽ dùng mặc định).
      </p>

      <label
        className={`inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-600 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 ${busy ? "pointer-events-none opacity-60" : ""}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4" />
        </svg>
        {busy ? "Đang import…" : "Chọn file .xlsx / .xls / .csv"}
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          className="hidden"
          onChange={handleFile}
          disabled={busy}
        />
      </label>

      {result && (
        <div className="mt-3 rounded-md bg-green-50 p-3 text-sm text-green-700">
           Đã import <strong>{result.imported}</strong> khách thành công.
          {result.errors.length > 0 && (
            <details className="mt-1">
              <summary className="cursor-pointer text-xs text-yellow-600">
                {result.errors.length} dòng lỗi
              </summary>
              <ul className="mt-1 space-y-0.5 text-xs text-yellow-700">
                {result.errors.map((e) => (
                  <li key={e.row}>Dòng {e.row}: {e.reason}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}

      {error && (
        <p className="mt-3 rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
