"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { GuestRow } from "@/lib/sheets";

interface EditState {
  id: string;
  name: string;
  greeting: string;
}

export default function GuestTable({ guests }: { guests: GuestRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editing, setEditing] = useState<EditState | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? guests.filter((g) =>
        g.name.toLowerCase().includes(search.trim().toLowerCase())
      )
    : guests;

  const refresh = () => startTransition(() => router.refresh());

  const startEdit = (g: GuestRow) =>
    setEditing({ id: g.id, name: g.name, greeting: g.greeting });

  const cancelEdit = () => setEditing(null);

  const saveEdit = async () => {
    if (!editing) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/guests/${encodeURIComponent(editing.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editing.name, greeting: editing.greeting }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Không thể lưu.");
      }
      setEditing(null);
      refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Đã có lỗi xảy ra.");
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async (id: string) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/guests/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Không thể xóa.");
      }
      setDeletingId(null);
      refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Đã có lỗi xảy ra.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3">
        <span className="text-sm font-semibold text-gray-700">
          Danh sách khách ({filtered.length}{search.trim() ? `/${guests.length}` : ""})
          {isPending && <span className="ml-2 text-xs font-normal text-gray-400">Đang cập nhật…</span>}
        </span>
        <input
          type="search"
          placeholder="Tìm theo tên…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-56 rounded-md border border-gray-300 px-3 py-1.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
        />
      </div>

      {error && (
        <div className="mx-5 mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Tên</th>
              <th className="px-4 py-2 text-left">Lời mời</th>
              <th className="px-4 py-2 text-left">Link</th>
              <th className="px-4 py-2 text-left">RSVP</th>
              <th className="px-4 py-2 text-left">Ngày tạo</th>
              <th className="px-4 py-2 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-700">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                  {search.trim() ? "Không tìm thấy khách phù hợp" : "Chưa có khách nào"}
                </td>
              </tr>
            ) : (
              filtered.map((g) => {
                const isEditing = editing?.id === g.id;
                const isDeleting = deletingId === g.id;

                return (
                  <tr key={g.id} className={`hover:bg-gray-50 ${isEditing ? "bg-yellow-50" : ""}`}>
                    <td className="px-4 py-2 font-mono text-xs text-gray-500">{g.id}</td>

                    {/* Name */}
                    <td className="px-4 py-2">
                      {isEditing ? (
                        <input
                          className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-rose-400"
                          value={editing.name}
                          onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                          disabled={busy}
                        />
                      ) : (
                        g.name
                      )}
                    </td>

                    {/* Greeting */}
                    <td className="px-4 py-2 text-gray-500">
                      {isEditing ? (
                        <input
                          className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-rose-400"
                          value={editing.greeting}
                          onChange={(e) => setEditing({ ...editing, greeting: e.target.value })}
                          disabled={busy}
                        />
                      ) : (
                        g.greeting
                      )}
                    </td>

                    {/* Link */}
                    <td className="px-4 py-2">
                      {g.inviteUrl ? (
                        <a
                          href={g.inviteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          {g.inviteUrl}
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>

                    {/* RSVP */}
                    <td className="px-4 py-2">
                      {g.attending ? (
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            g.attending === "yes"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {g.attending === "yes" ? `Có (${g.guestCount ?? 1})` : "Vắng"}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Chưa xác nhận</span>
                      )}
                    </td>

                    {/* Created */}
                    <td className="px-4 py-2 text-xs text-gray-400">
                      {g.createdAt ? new Date(g.createdAt).toLocaleDateString("vi-VN") : "—"}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-2">
                      {isDeleting ? (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">Xóa?</span>
                          <button
                            onClick={() => confirmDelete(g.id)}
                            disabled={busy}
                            className="rounded bg-red-500 px-2 py-0.5 text-xs text-white hover:bg-red-600 disabled:opacity-50"
                          >
                            Xác nhận
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            disabled={busy}
                            className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-300"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : isEditing ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={saveEdit}
                            disabled={busy || !editing.name.trim()}
                            className="rounded bg-rose-500 px-2 py-0.5 text-xs text-white hover:bg-rose-600 disabled:opacity-50"
                          >
                            {busy ? "…" : "Lưu"}
                          </button>
                          <button
                            onClick={cancelEdit}
                            disabled={busy}
                            className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-300"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEdit(g)}
                            className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-200"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => setDeletingId(g.id)}
                            className="rounded bg-red-50 px-2 py-0.5 text-xs text-red-500 hover:bg-red-100"
                          >
                            Xóa
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
