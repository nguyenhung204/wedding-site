"use client";
import config from "@/lib/config";
import SectionReveal from "@/components/ui/SectionReveal";

export default function Party() {
  const { party, display } = config;

  return (
    <section className="relative px-6 py-12 text-center">
      <SectionReveal>
        <p className="font-cormorant text-[15px] tracking-[0.35em] text-[#9c3e3e]">
          {party.title.toUpperCase()}
        </p>
        <p className="mt-2 font-cormorant tracking-[0.2em] text-[#a95151]">
          {party.timeLine.toUpperCase()}
        </p>
      </SectionReveal>

      {/* Big date row */}
      <SectionReveal delay={0.15}>
        <div className="mx-auto mt-6 flex max-w-[360px] items-center justify-between border-y border-[#d68b8b]/60 py-4 font-cormorant text-[#9c3e3e]">
          <span className="text-lg tracking-widest translate-y-2">THÁNG {display.month}</span>
          <span className="text-6xl leading-none translate-y-5">{display.day}</span>
          <span className="text-lg tracking-widest translate-y-2">NĂM {display.year}</span>
        </div>
        <p className="mt-3 font-cormorant text-sm text-[#a07c7c]">({display.lunar})</p>
      </SectionReveal>

      <SectionReveal delay={0.3}>
        <p className="mt-6 font-cormorant tracking-[0.3em] text-[#a95151]">ĐỊA ĐIỂM TỔ CHỨC</p>
        <p className="mt-1 text-[14px] text-[#7e4f4f]">{party.venueHall}</p>
        <p className="mt-2 font-script text-2xl text-[#9a3636]">{party.venueName}</p>
        <p className="mt-1 text-[12px] text-[#a07c7c]">({party.address})</p>
      </SectionReveal>

      <SectionReveal delay={0.4}>
        <div className="mx-auto mt-5 aspect-[4/3] w-full max-w-[400px] overflow-hidden rounded-md border border-[#d68b8b]/40 shadow-sm">
          <iframe
            title="Bản đồ địa điểm"
            src={party.mapEmbedSrc}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </SectionReveal>


    </section>
  );
}
