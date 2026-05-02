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
    <section className="relative px-4 pb-12 pt-16 text-center">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-cormorant text-[26px] tracking-[0.45em] text-[#a95151]"
      >
        THIỆP MỜI
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.8 }}
        className="mt-4 flex items-center justify-center gap-6 text-[#3a2a2a]"
      >
        <span className="font-script text-3xl">{groom.shortName}</span>
        <span className="text-[#b78a8a]">&amp;</span>
        <span className="font-script text-3xl">{bride.shortName}</span>
      </motion.div>

      {/* Double happiness symbol */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="mx-auto mt-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#d68b8b] text-[#a95151] float-gentle"
        aria-hidden
      >
        <span className="text-2xl leading-none">囍</span>
      </motion.div>

      {/* Tap-to-open hint */}
      <AnimatePresence>
        {!opened && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-4 font-script text-xl text-[#c87a7a]"
          >
            Chạm để mở thiệp
          </motion.p>
        )}
      </AnimatePresence>

      {/* Envelope */}
      <div
        className="relative mx-auto mt-8 select-none"
        style={{ width: 320, height: 220, perspective: 900 }}
      >
        <button
          onClick={open}
          aria-label="Mở thiệp"
          className="absolute inset-0 z-10 cursor-pointer focus:outline-none"
        />

        {/* Envelope body */}
        <div className="absolute inset-0 rounded-md bg-[#a13a3a] shadow-lg overflow-hidden">
          {/* Diagonal seams */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, transparent 49.5%, rgba(0,0,0,0.18) 50%, transparent 50.5%), linear-gradient(45deg, transparent 49.5%, rgba(0,0,0,0.18) 50%, transparent 50.5%)",
            }}
          />
        </div>

        {/* Photo card sliding up out of envelope */}
        <div
          className={`absolute inset-x-4 top-3 bottom-10 overflow-hidden rounded-md bg-white shadow-md ${
            opened ? "letter-animate" : ""
          }`}
          style={{ zIndex: 1 }}
        >
          <Image
            src={config.photos.hero}
            alt="Hình cưới"
            fill
            sizes="320px"
            className="object-cover"
            priority
          />
        </div>

        {/* Envelope flap (folds open) */}
        <div
          className={`absolute inset-x-0 top-0 origin-top ${opened ? "flap-animate" : ""}`}
          style={{ height: 110, zIndex: 3 }}
        >
          <div
            aria-hidden
            className="h-full w-full"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background:
                "linear-gradient(180deg, #a13a3a 0%, #762626 100%)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          />
        </div>

        {/* Wax seal (always on top) */}
        <div
          aria-hidden
          className={`absolute left-1/2 top-1/2 z-[4] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity ${
            opened ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #c08a4a, #6e3f17 70%)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.4), inset 0 0 6px rgba(0,0,0,0.5)",
          }}
        >
          <svg viewBox="0 0 24 24" className="h-full w-full p-2 opacity-70">
            <path
              d="M12 19s-7-4.5-7-9.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 7 3.5C19 14.5 12 19 12 19Z"
              fill="#fff7e8"
            />
          </svg>
        </div>

        {/* Hearts bursting upward */}
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

      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-12"
      >
        <p className="font-cormorant tracking-[0.3em] text-[#a95151]">
          {guestGreeting.toUpperCase()}
        </p>
        <p className="mt-2 font-script-bold text-3xl text-[#9a3636]">{guestLine}</p>
        <div className="mx-auto mt-2 h-px w-32 bg-gradient-to-r from-transparent via-[#d68b8b] to-transparent" />
      </motion.div>
    </section>
  );
}
