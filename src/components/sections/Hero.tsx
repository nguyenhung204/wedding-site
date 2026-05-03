"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import config from "@/lib/config";

interface Props {
  guestGreeting?: string;
  guestName?: string;
  onOpen?: () => void;
}

/**
 * Cover hero with the envelope-opening animation:
 *  • Top: "THIỆP MỜI" header + couple names + double-happiness symbol
 *  • Center: red envelope with wax seal — clicking flips the flap open,
 *    bursts hearts upward and slides a photo card up out of the pocket.
 *  • Bottom: greeting + guest name calligraphy.
 */
export default function Hero({ guestGreeting = "Trân trọng kính mời", guestName, onOpen }: Props) {
  const [opened, setOpened] = useState(false);

  const open = () => {
    if (opened) return;
    setOpened(true);
    onOpen?.();
  };

  const { groom, bride } = config.couple;
  const guestLine = guestName ?? "Quý khách quý";

  return (
    <section className="relative px-4 pb-8 pt-10 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-cormorant text-[26px] font-semibold tracking-[0.32em] text-[#8b2f30]"
      >
        THIỆP MỜI
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.8 }}
        className="mt-7 flex items-center justify-center gap-8 text-[#211414]"
      >
        <span className="font-script-en text-[27px]">{groom.shortName}</span>
        <span className="font-cormorant text-lg text-[#a95151]">&amp;</span>
        <span className="font-script-en text-[27px]">{bride.shortName}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="relative z-20 mx-auto mt-2 h-11 w-11 float-gentle"
        aria-hidden
      >
        <Image src={config.photos.illustrations.happiness} alt="" fill sizes="44px" className="object-contain" />
      </motion.div>

      <AnimatePresence>
        {!opened && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-2 font-script text-[17px] text-[#d09393]"
          >
            Chạm để mở thiệp
          </motion.p>
        )}
      </AnimatePresence>

      <div
        className="relative mx-auto mt-8 select-none"
        style={{ width: 342, height: 228, perspective: 1000 }}
      >
        <button
          onClick={open}
          aria-label="Mở thiệp"
          className="absolute inset-0 z-10 cursor-pointer focus:outline-none"
        />

        <div className="absolute inset-0 z-[2] overflow-hidden rounded-[3px] bg-[#aa4141] shadow-[0_4px_10px_rgba(70,0,0,.28)]">
          <div className="absolute inset-x-0 top-0 h-[52%] bg-[#922525] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
          <div className="absolute inset-0 bg-[#aa4141] [clip-path:polygon(0_0,50%_52%,0_100%)]" />
          <div className="absolute inset-0 bg-[#a43b3b] [clip-path:polygon(100%_0,50%_52%,100%_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[#a63f3f] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
        </div>

        <div
          className={`absolute left-1/2 top-0 h-[148px] w-[306px] -translate-x-1/2 overflow-hidden rounded-[3px] bg-white shadow-[0_1px_8px_rgba(0,0,0,.18)] ${
            opened ? "letter-animate" : ""
          }`}
          style={{ zIndex: opened ? 3 : 1 }}
        >
          <Image
            src={config.photos.heroEnvelope}
            alt="Hình cưới"
            fill
            sizes="320px"
            className="object-cover"
            priority
          />
        </div>

        <div
          className={`absolute inset-x-0 top-0 origin-top ${opened ? "flap-animate" : ""}`}
          style={{ height: 114, zIndex: opened ? 1 : 4 }}
        >
          <div
            aria-hidden
            className="h-full w-full"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background:
                "linear-gradient(180deg, #8d2525 0%, #762020 100%)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
            }}
          />
        </div>

        <div
          aria-hidden
          className={`absolute left-1/2 top-1/2 z-[5] h-10 w-10 -translate-x-1/2 -translate-y-1/2 transition-opacity ${
            opened ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image src={config.photos.illustrations.waxSeal} alt="" fill sizes="40px" className="object-contain" />
        </div>

        {opened && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-0">
            {Array.from({ length: 8 }).map((_, i) => {
              const startX = -110 + i * 28;
              const endX = startX + (Math.random() * 80 - 40);
              const delay = i * 0.06;
              const size = 18 + Math.random() * 16;
              return (
                <span
                  key={i}
                  className="heart-burst absolute left-1/2 top-1/3 -translate-x-1/2 inline-block"
                  style={{
                    width: size,
                    height: size,
                    animationDelay: `${delay}s`,
                    ["--dx-start" as never]: `${startX}px`,
                    ["--dx-end" as never]: `${endX}px`,
                  }}
                >
                  <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden>
                    <path
                      d="M16 28s-11-7.2-11-15a6 6 0 0 1 11-3.3A6 6 0 0 1 27 13c0 7.8-11 15-11 15Z"
                      fill="#dc2c3a"
                    />
                  </svg>
                </span>
              );
            })}
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-5"
      >
        <p className="font-cormorant text-[13px] font-semibold tracking-[0.14em] text-[#a95151]">
          {guestGreeting.toUpperCase()}
        </p>
        <p className="mt-1 font-script-bold text-2xl font-bold text-[#a95151]">{guestLine}</p>
        <div className="mx-auto mt-1 h-3 w-64 rounded-full bg-gradient-to-r from-transparent via-[#4a3a3a]/35 to-transparent blur-[3px]" />
      </motion.div>
    </section>
  );
}
