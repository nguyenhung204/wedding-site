"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import config from "@/lib/config";
import SectionReveal from "@/components/ui/SectionReveal";

function getDiff(target: Date) {
  const now = Date.now();
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

export default function CountdownInvitation() {
  const target = new Date(config.weddingDate);
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setT(getDiff(target));
    const id = setInterval(() => setT(getDiff(target)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const boxes = [
    { v: t.days, l: "ngày" },
    { v: t.hours, l: "giờ" },
    { v: t.minutes, l: "phút" },
    { v: t.seconds, l: "giây" },
  ];

  return (
    <section className="relative">
      {/* Background photo with countdown overlay */}
      <div className="relative mx-1 h-[520px] overflow-hidden rounded-t-[6px]">
        <Image
          src={config.photos.countdownBackground}
          alt=""
          fill
          sizes="500px"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f9f1ef]" />
        <SectionReveal className="absolute inset-x-0 bottom-12 flex justify-center gap-2">
          {boxes.map((b) => (
            <div
              key={b.l}
              className="flex h-[58px] w-[58px] flex-col items-center justify-center rounded-[3px] bg-[#9c3e3e]/92 text-white shadow-md"
            >
              <span className="font-cormorant text-2xl leading-none">
                {String(b.v).padStart(2, "0")}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-widest">{b.l}</span>
            </div>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
