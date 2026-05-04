"use client";
import Image from "next/image";
import config from "@/lib/config";
import SectionReveal from "@/components/ui/SectionReveal";

export default function AboutUs() {
  const { groom, bride } = config.couple;

  return (
    <section className="relative px-6 py-12">
      <SectionReveal>
        <p className="text-center font-script text-4xl text-[#cb8d8d]">About us</p>
      </SectionReveal>

      {/* Bride: bio box LEFT, portrait RIGHT */}
      <SectionReveal delay={0.15}>
        <div className="mx-auto mt-8 grid max-w-[420px] grid-cols-[140px,1fr] gap-3 items-stretch">
          <div className="flex flex-col items-center justify-center rounded-[3px] border border-[#c47070] px-3 py-6 text-center">
            <p className="font-script text-2xl text-[#9a3636]">{bride.fullName}</p>
            <p className="mt-3 font-script text-lg text-[#b78a8a]">{bride.birthDate}</p>
            <p className="mt-1 font-script text-lg text-[#b78a8a]">{bride.hometown}</p>
          </div>
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[3px] shadow-sm">
              <Image src={bride.portrait} alt={bride.fullName} fill sizes="260px" className="object-cover" />
            </div>
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 rotate-90 origin-center font-script text-xl text-[#cb8d8d] tracking-wider">
              Bride
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* Groom: portrait LEFT, bio box RIGHT */}
      <SectionReveal delay={0.3}>
        <div className="mx-auto mt-6 grid max-w-[420px] grid-cols-[1fr,140px] gap-3 items-stretch">
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[3px] shadow-sm">
              <Image src={groom.portrait} alt={groom.fullName} fill sizes="260px" className="object-cover" />
            </div>
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 -rotate-90 origin-center font-script text-xl text-[#cb8d8d] tracking-wider">
              Groom
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-[3px] border border-[#c47070] px-3 py-6 text-center">
            <p className="font-script text-2xl text-[#9a3636]">{groom.fullName}</p>
            <p className="mt-3 font-script text-lg text-[#b78a8a]">{groom.birthDate}</p>
            <p className="mt-1 font-script text-lg text-[#b78a8a]">{groom.hometown}</p>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
