"use client";
import config from "@/lib/config";
import SectionReveal from "@/components/ui/SectionReveal";

export default function Ceremony() {
  const { groom, bride, ceremony } = {
    groom: config.couple.groom,
    bride: config.couple.bride,
    ceremony: config.ceremony,
  };

  return (
    <section className="relative px-6 py-16 text-center">
      <SectionReveal>
        <p className="font-cormorant text-sm tracking-[0.45em] text-[#9c3e3e]">
          {ceremony.label.toUpperCase()}
        </p>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <div className="relative mx-auto mt-8 flex w-full max-w-[400px] items-center justify-center">
          {/* Vertical "Lễ Thành Hôn" stamp on the left */}
          <div
            aria-hidden
            className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center font-cormorant text-xs tracking-[0.4em] text-[#b78a8a]"
          >
            <div className="rotate-180 [writing-mode:vertical-rl]">{ceremony.label}</div>
          </div>

          <div className="flex flex-col items-center text-[#9a3636]">
            <p className="font-script text-4xl">{groom.fullName}</p>
            <p className="my-1 font-cormorant text-2xl text-[#b78a8a]">&amp;</p>
            <p className="font-script text-4xl">{bride.fullName}</p>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.3}>
        <div className="mx-auto mt-10 grid max-w-[420px] grid-cols-2 gap-6 text-left">
          {[groom.family, bride.family].map((f) => (
            <div key={f.title}>
              <p className="font-cormorant tracking-[0.25em] text-[#a95151]">
                {f.title}
              </p>
              <div className="mt-2 h-px w-12 bg-[#d68b8b]" />
              <p className="mt-3 text-[13px] text-[#7e4f4f]">{f.father}</p>
              <p className="text-[13px] text-[#7e4f4f]">{f.mother}</p>
              <p className="mt-2 text-[12px] text-[#a07c7c]">{f.address}</p>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
