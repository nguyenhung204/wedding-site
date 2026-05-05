"use client";
import Image from "next/image";
import config from "@/lib/config";
import SectionReveal from "@/components/ui/SectionReveal";

export default function Gallery() {
  const photos = config.photos.gallery.slice(0, 3);

  return (
    <section className="relative px-4 py-12">
      <SectionReveal>
        <p className="text-center font-cormorant tracking-[0.55em] text-[#9c3e3e] mb-6">
          INVITATION
        </p>
      </SectionReveal>

      <div className="relative mx-auto max-w-[420px]">
        {/* Decorative vertical text — left side */}
        <div className="pointer-events-none absolute -left-2 top-[15%] z-20 origin-center -rotate-90 whitespace-nowrap font-script text-[40px] text-[#cb8d8d]/50 hand-write-in">
          I love you forever
        </div>
        {/* Decorative vertical text — right side */}
        <div className="pointer-events-none absolute -right-2 bottom-[15%] z-20 origin-center rotate-90 whitespace-nowrap font-script text-[40px] text-[#cb8d8d]/50 hand-write-in">
          Nice to meet you
        </div>

        {/* Decorative frame */}
        <div className="relative rounded-md border border-[#e8cdc8]/60 bg-white/30 p-3 shadow-[0_2px_20px_rgba(200,160,160,0.12)]">
          {/* Corner floral decorations */}
          <div className="pointer-events-none absolute -top-3 -right-3 z-10 h-20 w-20 opacity-40"
            style={{
              background: "radial-gradient(circle at 70% 30%, #e8a0a0 0%, transparent 50%), radial-gradient(circle at 40% 60%, #d4c4a0 0%, transparent 40%), radial-gradient(circle at 80% 70%, #b8d4b0 0%, transparent 45%)",
            }}
          />
          <div className="pointer-events-none absolute -bottom-3 -left-3 z-10 h-20 w-20 opacity-40"
            style={{
              background: "radial-gradient(circle at 30% 70%, #e8a0a0 0%, transparent 50%), radial-gradient(circle at 60% 40%, #d4c4a0 0%, transparent 40%), radial-gradient(circle at 20% 30%, #b8d4b0 0%, transparent 45%)",
            }}
          />
          <div className="pointer-events-none absolute -bottom-3 -right-3 z-10 h-16 w-16 opacity-30"
            style={{
              background: "radial-gradient(circle at 60% 60%, #e8a0a0 0%, transparent 50%), radial-gradient(circle at 80% 40%, #b8d4b0 0%, transparent 40%)",
            }}
          />

          {/* Photos */}
          <div className="flex flex-col gap-2 overflow-hidden rounded-sm">
            {photos.map((src, i) => (
              <SectionReveal key={src + i} delay={i * 0.1}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2px]">
                  <Image src={src} alt="" fill sizes="400px" className="object-cover" />
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
