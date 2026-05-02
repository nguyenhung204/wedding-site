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

      <SectionReveal delay={0.15}>
        <div className="mx-auto mt-8 grid max-w-[420px] grid-cols-2 gap-3">
          {/* Bride card */}
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-md shadow-sm">
              <Image src={bride.portrait} alt={bride.fullName} fill sizes="200px" className="object-cover" />
            </div>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 rotate-90 origin-center font-script text-2xl text-[#cb8d8d]">
              Bride
            </div>
          </div>
          {/* Bride bio */}
          <div className="flex flex-col items-center justify-center text-center font-script text-[#9a3636]">
            <p className="text-3xl">{bride.fullName}</p>
            <p className="mt-2 text-lg text-[#b78a8a]">{bride.birthDate}</p>
            <p className="mt-1 text-lg text-[#b78a8a]">{bride.hometown}</p>
          </div>

          {/* Groom bio */}
          <div className="flex flex-col items-center justify-center text-center font-script text-[#9a3636]">
            <p className="text-3xl">{groom.fullName}</p>
            <p className="mt-2 text-lg text-[#b78a8a]">{groom.birthDate}</p>
            <p className="mt-1 text-lg text-[#b78a8a]">{groom.hometown}</p>
          </div>
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-md shadow-sm">
              <Image src={groom.portrait} alt={groom.fullName} fill sizes="200px" className="object-cover" />
            </div>
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 origin-center font-script text-2xl text-[#cb8d8d]">
              Groom
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
