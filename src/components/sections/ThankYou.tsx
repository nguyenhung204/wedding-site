"use client";
import Image from "next/image";
import config from "@/lib/config";
import SectionReveal from "@/components/ui/SectionReveal";

export default function ThankYou() {
  return (
    <section className="relative px-6 pb-20 pt-6 text-center">
      <SectionReveal>
        <div className="relative mx-auto h-52 w-52 float-gentle">
          <Image src={config.photos.illustrations.weddingCouple} alt="" fill sizes="208px" className="object-contain" />
        </div>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <p className="mt-6 font-script-bold text-5xl text-[#9a3636]">Thank you</p>
      </SectionReveal>
    </section>
  );
}
