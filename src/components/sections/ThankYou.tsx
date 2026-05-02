"use client";
import SectionReveal from "@/components/ui/SectionReveal";

export default function ThankYou() {
  return (
    <section className="relative px-6 pb-20 pt-6 text-center">
      <SectionReveal>
        {/* Tiny couple icon (SVG silhouette so we don't depend on external assets) */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 120 120"
          className="mx-auto float-gentle text-[#9a3636]"
          aria-hidden
        >
          <g fill="currentColor">
            {/* Bride dress silhouette */}
            <ellipse cx="68" cy="100" rx="38" ry="14" opacity=".18" />
            <path d="M62 60c4-2 8-2 12 0 0 0 6 18 14 32H56c2-12 4-22 6-32Z" />
            <circle cx="62" cy="50" r="8" />
            {/* Groom silhouette */}
            <path d="M44 62h6l4 30H40Z" fill="#3a2a2a" />
            <circle cx="46" cy="50" r="7" fill="#3a2a2a" />
          </g>
        </svg>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <p className="mt-6 font-script-bold text-5xl text-[#9a3636]">Thank you</p>
      </SectionReveal>
    </section>
  );
}
