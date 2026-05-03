"use client";
import Image from "next/image";
import config from "@/lib/config";
import SectionReveal from "@/components/ui/SectionReveal";

export default function MarryMe() {
  return (
    <section className="relative px-6 pt-6 pb-12 text-center">
      <SectionReveal>
        <p className="font-cormorant text-2xl tracking-[0.4em] text-[#a95151]/30 mb-2">
          SWEET WEDDING
        </p>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <div className="relative mx-auto mt-4 grid w-full max-w-[420px] grid-cols-[1fr,100px] gap-3">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[3px] shadow-md">
            <Image
              src={config.photos.marryMeMain}
              alt=""
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
          <div className="relative flex flex-col items-center justify-center gap-2 font-cormorant text-[#cb8d8d]">
            <span className="text-4xl text-pink-400/80">&#9829;</span>
            <span className="text-[28px] font-bold tracking-[0.25em] text-[#a95151]">YES!</span>
            <span className="text-[28px] font-bold tracking-[0.3em] text-[#a95151]">I DO</span>
            <span className="text-4xl text-pink-400/80">&#9829;</span>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.3}>
        <div className="relative mx-auto mt-5 h-36 w-36">
          <Image src={config.photos.illustrations.dancingCouple} alt="" fill sizes="144px" className="object-contain" />
        </div>
      </SectionReveal>
    </section>
  );
}
