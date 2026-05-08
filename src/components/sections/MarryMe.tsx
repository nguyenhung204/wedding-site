"use client";
import Image from "next/image";
import config from "@/lib/config";
import SectionReveal from "@/components/ui/SectionReveal";

export default function MarryMe() {
  return (
    <section className="relative px-3 pt-6 pb-8 text-center">
      <SectionReveal>
        <p className="font-cormorant text-[16px] tracking-[0.6em] text-[#c9a0a0] uppercase">
          SWEET WEDDING
        </p>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <div className="relative mx-auto mt-3 w-full">
          {/* Row 1: MARRY ME? text on left + photo on right */}
          <div className="flex items-stretch" style={{ gap: "6px" }}>
            <div className="relative z-10 w-[38%] flex-shrink-0 overflow-hidden rounded-[2px]">
              <div className="absolute inset-0 bg-[#f5e4e1]/40 rounded-[2px]" />
              <div className="relative z-10 flex h-full flex-col justify-center px-3 py-4">
                <span className="font-cormorant text-[42px] font-semibold uppercase leading-[1.1] tracking-[3px] text-[#3a2a2a]/25">
                  MARRY
                </span>
                <span className="font-cormorant text-[42px] font-semibold uppercase leading-[1.1] tracking-[3px] text-[#3a2a2a]/25 mt-2 ml-4">
                  ME?
                </span>
              </div>
            </div>
            <div className="relative flex-1 aspect-[3/4] overflow-hidden rounded-[3px] shadow-md">
              <Image
                src={config.photos.gallery[0]}
                alt=""
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Row 2: large photo on left + YES I DO panel on right */}
          <div className="flex items-stretch mt-[6px]" style={{ gap: "6px" }}>
            <div className="relative w-[62%] flex-shrink-0 aspect-[3/4] overflow-hidden rounded-[3px] shadow-md">
              <Image
                src={config.photos.marryMeMain}
                alt=""
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col items-center justify-end rounded-[3px] bg-[#fdf0ef] py-6 px-2">
              <div className="relative mb-2 h-16 w-16">
                  <Image
                    src={config.photos.illustrations.heart}
                    alt=""
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
              </div>
              <span className="font-cormorant text-[36px] font-bold tracking-[0.2em] text-[#c9a0a0] mt-4">
                YES!
              </span>
              <span className="font-cormorant text-[36px] font-bold tracking-[0.25em] text-[#c9a0a0]">
                I DO
              </span>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.3}>
        <div className="relative mx-auto mt-5 h-32 w-32">
          <Image
            src={config.photos.illustrations.dancingCouple}
            alt=""
            fill
            sizes="128px"
            className="object-contain"
          />
        </div>
      </SectionReveal>
    </section>
  );
}
