"use client";
import Image from "next/image";
import config from "@/lib/config";
import SectionReveal from "@/components/ui/SectionReveal";

export default function Gallery() {
  const photos = config.photos.gallery;

  return (
    <section className="relative px-6 py-12">
      <SectionReveal>
        <p className="text-center font-cormorant tracking-[0.55em] text-[#9c3e3e] mb-6">
          INVITATION
        </p>
      </SectionReveal>

      <div className="relative mx-auto max-w-[420px]">
        {/* Decorative vertical text — left side */}
        <div className="pointer-events-none absolute -left-4 top-1/4 z-10 origin-center -rotate-90 whitespace-nowrap font-script text-[44px] text-[#cb8d8d]/50 hand-write-in">
          I love you forever
        </div>
        {/* Decorative vertical text — right side */}
        <div className="pointer-events-none absolute -right-4 bottom-1/4 z-10 origin-center rotate-90 whitespace-nowrap font-script text-[44px] text-[#cb8d8d]/50 hand-write-in">
          Nice to meet you
        </div>

        <div className="flex flex-col gap-3">
          {photos.map((src, i) => (
            <SectionReveal key={src + i} delay={i * 0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] shadow-sm">
                <Image src={src} alt="" fill sizes="420px" className="object-cover" />
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
