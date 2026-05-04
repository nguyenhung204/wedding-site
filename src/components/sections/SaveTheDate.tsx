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

const scheduleIcons = [
  /* Đón khách – couple icon */
  <svg key="icon-0" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="9" cy="7" r="3" stroke="#c47070" strokeWidth="1.2" />
    <circle cx="15" cy="7" r="3" stroke="#c47070" strokeWidth="1.2" />
    <path d="M3 20c0-3.3 2.7-6 6-6h0c1.1 0 2.1.3 3 .8.9-.5 1.9-.8 3-.8h0c3.3 0 6 2.7 6 6" stroke="#c47070" strokeWidth="1.2" strokeLinecap="round" />
  </svg>,
  /* Nghi lễ – rings icon */
  <svg key="icon-1" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="9" cy="12" r="5" stroke="#c47070" strokeWidth="1.2" />
    <circle cx="15" cy="12" r="5" stroke="#c47070" strokeWidth="1.2" />
  </svg>,
  /* Khai tiệc – toast icon */
  <svg key="icon-2" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M8 22V12m8 10V12M6 12c0-4 2-8 6-10 4 2 6 6 6 10" stroke="#c47070" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

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
          <div className="relative aspect-[3/4] overflow-hidden rounded-[3px] shadow-md">
            <Image src={config.photos.saveTheDate} alt="" fill sizes="400px" className="object-cover" />
          </div>

          {/* Year ribbon */}
          <div className="ribbon stamp-wobble absolute -right-1 top-3 px-2 py-3 text-[10px] font-cormorant tracking-[0.4em] text-white shadow-md">
            <div className="[writing-mode:vertical-rl]">{year} / Feb</div>
          </div>

          {/* Calendar overlay */}
          <div className="absolute bottom-3 right-3 w-[55%] rounded border border-[#c47070]/40 bg-white/85 p-3 backdrop-blur-sm">
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
                    className={`relative py-0.5 ${isWedding ? "text-white font-bold" : ""}`}
                  >
                    {isWedding && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 flex items-center justify-center"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#dc4a4a]" />
                      </span>
                    )}
                    <span className="relative z-[1]">{c ?? ""}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* Vertical timeline with icons and hearts */}
      <SectionReveal delay={0.3}>
        <div className="mx-auto mt-8 flex max-w-[320px] flex-col items-center">
          {config.party.schedule.map((s, i) => (
            <div key={s.time} className="flex items-center gap-4 py-3">
              {/* Icon */}
              <div className="flex h-10 w-10 items-center justify-center">
                {scheduleIcons[i]}
              </div>
              {/* Heart dot */}
              <div className="flex flex-col items-center">
                <span className="text-lg text-[#e49696]">&#9829;</span>
                {i < config.party.schedule.length - 1 && (
                  <div className="h-6 w-px bg-[#e49696]/50" />
                )}
              </div>
              {/* Time + label */}
              <div className="text-left">
                <span className="font-cormorant text-xl text-[#9c3e3e]">{s.time}</span>
                <span className="ml-2 text-sm text-[#7e4f4f]">: {s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
