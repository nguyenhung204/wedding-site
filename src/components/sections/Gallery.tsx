"use client";
import Image from "next/image";
import config from "@/lib/config";
import SectionReveal from "@/components/ui/SectionReveal";

const calligraphyLines = ["I love", "you", "forever"];

export default function Gallery() {
  const photos = config.photos.gallery;

  return (
    <section className="relative px-6 py-12">
      <SectionReveal>
        <p className="text-center font-cormorant tracking-[0.55em] text-[#9c3e3e] mb-6">
          <span className="inline-block">I N V I T A T I O N</span>
        </p>
      </SectionReveal>

      <div className="relative mx-auto grid w-full max-w-[420px] grid-cols-[50px,1fr] gap-3">
        {/* Vertical calligraphy on LEFT */}
        <div className="flex flex-col items-center justify-around font-script text-2xl text-[#cb6e6e]">
          {calligraphyLines.map((l, i) => (
            <SectionReveal key={l} delay={0.2 + i * 0.15}>
              <span className="block hand-write-in [writing-mode:vertical-rl] origin-center rotate-180 whitespace-nowrap">
                {l}
              </span>
            </SectionReveal>
          ))}
        </div>

        {/* Photos */}
        <div className="flex flex-col gap-3">
          {photos.map((src, i) => (
            <SectionReveal key={src + i} delay={i * 0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] shadow-sm">
                <Image src={src} alt="" fill sizes="360px" className="object-cover" />
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
