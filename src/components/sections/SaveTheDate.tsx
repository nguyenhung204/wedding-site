"use client";
import Image from "next/image";
import config from "@/lib/config";
import SectionReveal from "@/components/ui/SectionReveal";

function buildCalendar(year: number, month: number) {
  const first = new Date(year, month - 1, 1);
  const days = new Date(year, month, 0).getDate();
  const startCol = (first.getDay() + 6) % 7; // make Mon=0
  const cells: (number | null)[] = Array(startCol).fill(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);
  return cells;
}

export default function SaveTheDate() {
  const { day, month, year } = config.display;
  const cells = buildCalendar(year, month);
  const weekdayLabels = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <section className="relative px-6 py-14">
      <SectionReveal>
        <p className="text-center font-cormorant text-3xl tracking-[0.18em] text-[#9c3e3e]">
          Save the date
        </p>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <div className="relative mx-auto mt-6 w-full max-w-[400px]">
          {/* Photo */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-md shadow-md">
            <Image src={config.photos.saveTheDate} alt="" fill sizes="400px" className="object-cover" />
          </div>

          {/* Year ribbon */}
          <div className="ribbon stamp-wobble absolute -right-1 top-3 px-2 py-3 text-[10px] font-cormorant tracking-[0.4em] text-white shadow-md">
            <div className="[writing-mode:vertical-rl]">{year} / Feb</div>
          </div>

          {/* Calendar overlay */}
          <div className="absolute bottom-3 left-1/2 w-[90%] -translate-x-1/2 rounded bg-white/85 p-3 backdrop-blur-sm">
            <div className="grid grid-cols-7 gap-y-1 text-center font-cormorant text-[11px] text-[#a07c7c]">
              {weekdayLabels.map((d, i) => (
                <span key={i} className="opacity-70">
                  {d}
                </span>
              ))}
              {cells.map((c, i) => {
                const isWedding = c === day;
                return (
                  <span
                    key={i}
                    className={`relative py-0.5 ${isWedding ? "text-[#9c3e3e] font-bold" : ""}`}
                  >
                    {c ?? ""}
                    {isWedding && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 flex items-center justify-center"
                      >
                        <span className="text-[18px] text-[#e49696]">♡</span>
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.3}>
        <div className="mx-auto mt-6 grid max-w-[360px] grid-cols-2 gap-4 text-[#7e4f4f]">
          {config.party.schedule.map((s) => (
            <div key={s.time} className="flex items-center gap-3">
              <span className="font-cormorant text-2xl text-[#9c3e3e]">{s.time}</span>
              <span className="text-sm">— {s.label}</span>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
