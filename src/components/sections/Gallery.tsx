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

      <div className="mx-auto flex max-w-[420px] flex-col gap-3">
        {photos.map((src, i) => (
          <SectionReveal key={src + i} delay={i * 0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] shadow-sm">
              <Image src={src} alt="" fill sizes="420px" className="object-cover" />
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
