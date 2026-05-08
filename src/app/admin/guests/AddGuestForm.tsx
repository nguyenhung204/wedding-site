"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Result {
  id: string;
  inviteUrl: string;
}

export default function AddGuestForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("Trân trọng kính mời");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/admin/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), greeting: greeting.trim() }),
      });
      if (!res.ok) throw new Error("Không thể tạo khách mới.");
      const data: Result = await res.json();
      setResult(data);
      setName("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-gray-800">Thêm khách mới</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="mb-1 block text-xs text-gray-500">Tên khách</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Anh Nam và bạn đồng hành"
            className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-500">Lời mời</label>
          <input
            required
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {busy ? "Đang tạo…" : "Tạo link mời"}
        </button>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </form>

      {result && (
        <div className="mt-4 rounded bg-green-50 p-3 text-sm">
          <p className="mb-1 font-medium text-green-700">Link đã tạo:</p>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={result.inviteUrl}
              className="flex-1 rounded border border-green-200 bg-white px-2 py-1 text-xs text-gray-700"
              onFocus={(e) => e.target.select()}
            />
            <button
              onClick={() => navigator.clipboard.writeText(result.inviteUrl)}
              className="rounded bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
