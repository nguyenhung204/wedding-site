"use client";
import SectionReveal from "@/components/ui/SectionReveal";

export default function LoveQuote() {
  return (
    <section className="relative px-6 py-10 text-center">
      <SectionReveal>
        <p className="font-script text-3xl leading-relaxed text-[#cb6e6e] hand-write-in">
          I love you forever
        </p>
      </SectionReveal>
      <SectionReveal delay={0.2}>
        <p className="mt-3 font-script text-2xl text-[#d4a0a0] hand-write-in">
          Nice to meet you
        </p>
      </SectionReveal>
    </section>
  );
}
