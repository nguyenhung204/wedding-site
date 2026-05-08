"use client";
import config from "@/lib/config";
import SectionReveal from "@/components/ui/SectionReveal";

export default function InvitationMessage() {
  return (
    <section className="relative px-8 py-14 text-center">
      <SectionReveal>
        <p className="font-cormorant tracking-[0.55em] text-[#9c3e3e]">
          INVITATION
        </p>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <div className="mx-auto mt-6 max-w-[380px] space-y-4  font-script text-[18px] leading-relaxed text-[#5e3a3a]">
          {config.invitationMessage.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
