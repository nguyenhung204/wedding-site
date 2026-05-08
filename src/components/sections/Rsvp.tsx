"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";

interface Props {
  defaultName?: string;
  guestId?: string;
}

export default function Rsvp({ defaultName = "", guestId }: Props) {
  const [name, setName] = useState(defaultName);
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [count, setCount] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestId, attending, count }),
      });
      if (!res.ok) throw new Error("Lỗi kết nối, vui lòng thử lại.");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="rsvp" className="relative px-6 py-12">
      <SectionReveal>
        <div className="mx-auto w-full max-w-[400px] rounded-md bg-white/85 p-5 shadow-sm backdrop-blur">
          <p className="text-center font-cormorant text-xl tracking-[0.2em] text-[#9c3e3e]">
            Xác nhận tham dự
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center text-sm text-[#7e4f4f]"
            >
              <p className="font-script text-3xl text-[#9a3636]">Cảm ơn bạn!</p>
              <p className="mt-2">Chúng mình đã ghi nhận xác nhận của bạn.</p>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="mt-4 space-y-4 text-sm">
              <label className="block">
                <span className="text-[#7e4f4f]">Họ và tên</span>
                <input
                  required
                  value={name}
                  readOnly
                  className="mt-1 block w-full rounded border border-[#e1c7c7] bg-gray-100 px-3 py-2 outline-none cursor-not-allowed text-[#7e4f4f]"
                />
              </label>

              <fieldset>
                <legend className="text-[#7e4f4f]">Bạn sẽ tham dự chứ?</legend>
                <div className="mt-2 space-y-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="attending"
                      checked={attending === "yes"}
                      onChange={() => setAttending("yes")}
                      className="accent-[#a95151]"
                    />
                    Có, tôi sẽ tham dự
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="attending"
                      checked={attending === "no"}
                      onChange={() => setAttending("no")}
                      className="accent-[#a95151]"
                    />
                    Tôi bận, rất tiếc không thể tham dự
                  </label>
                </div>
              </fieldset>

              <label className="block">
                <span className="text-[#7e4f4f]">Số lượng người tham dự</span>
                <select
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="mt-1 block w-full rounded border border-[#e1c7c7] bg-white px-3 py-2 outline-none focus:border-[#a95151]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>
                      {n} người
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-full bg-[#a95151] py-2 text-white shadow disabled:opacity-60"
              >
                {busy ? "Đang gửi…" : "Gửi xác nhận"}
              </button>
              {error && (
                <p className="text-center text-xs text-red-500">{error}</p>
              )}
            </form>
          )}
        </div>
      </SectionReveal>
    </section>
  );
}
