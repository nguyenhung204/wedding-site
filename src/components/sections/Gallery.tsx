"use client";
import Image from "next/image";
import config from "@/lib/config";
import SectionReveal from "@/components/ui/SectionReveal";

const calligraphyLines = ["Nice", "to meet", "you forever"];

export default function Gallery() {
  const photos = config.photos.gallery;

  return (
    <section className="relative px-6 py-12">
      <div className="relative mx-auto grid w-full max-w-[420px] grid-cols-[1fr,90px] gap-3">
        <div className="flex flex-col gap-3">
          {photos.map((src, i) => (
            <SectionReveal key={src + i} delay={i * 0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] shadow-sm">
                <Image src={src} alt="" fill sizes="320px" className="object-cover" />
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Vertical calligraphy */}
        <div className="flex flex-col items-center justify-around font-script text-3xl text-[#cb6e6e]">
          {calligraphyLines.map((l, i) => (
            <SectionReveal key={l} delay={0.2 + i * 0.15}>
              <span className="block hand-write-in [writing-mode:vertical-rl] origin-center rotate-180 whitespace-nowrap">
                {l}
              </span>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
