import { listGuests } from "@/lib/sheets";

export const revalidate = 0;

export default async function RsvpPage() {
  let guests: Awaited<ReturnType<typeof listGuests>> = [];
  try {
    guests = await listGuests();
  } catch {
    // Show empty state if Sheets is not configured yet
  }

  const confirmed = guests.filter((g) => g.attending === "yes");
  const declined = guests.filter((g) => g.attending === "no");
  const pending = guests.filter((g) => !g.attending);
  const totalAttending = confirmed.reduce((s, g) => s + (g.guestCount ?? 1), 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-green-600">{totalAttending}</p>
          <p className="text-xs text-gray-500">Sẽ tham dự</p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-red-500">{declined.length}</p>
          <p className="text-xs text-gray-500">Vắng mặt</p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-gray-400">{pending.length}</p>
          <p className="text-xs text-gray-500">Chưa xác nhận</p>
        </div>
      </div>

      <div className="rounded-lg border bg-white shadow-sm">
        <div className="border-b px-5 py-3 text-sm font-semibold text-gray-700">
          Chi tiết RSVP
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500">
              <tr>
                <th className="px-4 py-2 text-left">Tên</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-left">Số lượng</th>
                <th className="px-4 py-2 text-left">Xác nhận lúc</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-700">
              {guests.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                    Chưa có dữ liệu
                  </td>
                </tr>
              ) : (
                guests.map((g) => (
                  <tr key={g.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{g.name}</td>
                    <td className="px-4 py-2">
                      {g.attending === "yes" ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          Tham dự
                        </span>
                      ) : g.attending === "no" ? (
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
                          Vắng
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Chưa xác nhận</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">{g.guestCount ?? "—"}</td>
                    <td className="px-4 py-2 text-xs text-gray-400">
                      {g.rsvpSubmittedAt
                        ? new Date(g.rsvpSubmittedAt).toLocaleString("vi-VN")
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
