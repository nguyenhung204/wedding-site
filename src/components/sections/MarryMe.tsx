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
        <h2 className="font-cormorant text-5xl font-bold tracking-[0.3em] text-[#a95151]">
          MARRY
        </h2>
        <h2 className="mt-1 font-cormorant text-5xl font-bold tracking-[0.3em] text-[#a95151]">
          ME?
        </h2>
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <div className="relative mx-auto mt-8 grid w-full max-w-[420px] grid-cols-[1fr,80px] gap-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-md shadow-md">
            <Image
              src={config.photos.marryMeMain}
              alt=""
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
          <div className="relative flex flex-col items-center justify-center font-cormorant text-[#cb8d8d]">
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-pink-300/80">♡</span>
            <span className="mt-6 text-2xl tracking-[0.25em]">YES!</span>
            <span className="mt-2 text-2xl tracking-[0.3em]">I DO</span>
            <span className="mt-2 text-pink-300/80">♡</span>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
