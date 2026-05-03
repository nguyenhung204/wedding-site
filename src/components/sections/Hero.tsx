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

export default function Hero({ guestGreeting = "Trân trọng kính mời", guestName, onOpen }: Props) {
  const [opened, setOpened] = useState(false);
  const { groom, bride } = config.couple;
  const guestLine = guestName ?? "Quý khách quý";

  const open = () => {
    if (opened) return;
    setOpened(true);
    onOpen?.();
  };

  return (
    <section className={`cinelove-hero text-center ${opened ? "is-opened" : ""}`}>
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="absolute left-[156.35px] top-[78.48px] w-[190px] font-sans text-[26px] font-medium uppercase leading-normal tracking-[2px] text-[#834343]"
      >
        Thiệp mời
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="absolute left-[31px] top-[114.08px] w-[177px] font-bucthu text-[39px] font-medium leading-normal text-black"
      >
        {groom.shortName}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="absolute left-[198.6px] top-[122.1px] w-[97.4px] font-script-en text-[30px] font-medium leading-normal text-[#834343]"
      >
        &amp;
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="absolute left-[280.5px] top-[114.07px] w-[177px] font-bucthu text-[39px] font-medium leading-normal text-black"
      >
        {bride.shortName}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="absolute left-[225px] top-[158px] z-20 h-[52px] w-[52px]"
        aria-hidden
      >
        <Image src={config.photos.illustrations.happiness} alt="" fill sizes="52px" className="object-contain" />
      </motion.div>

      <AnimatePresence>
        {!opened && (
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.41, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            className="absolute left-[160px] top-[237px] w-[180px] font-script-en text-[22px] font-bold leading-normal text-[#8b2f30]"
          >
            Chạm để mở thiệp
          </motion.p>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute left-[34.95px] top-[291.92px] z-10"
      >
        <div className="cinelove-envelope-wrap">
          <div className="cinelove-envelope-shadow" />
          <button
            onClick={open}
            aria-label="Mở thiệp"
            className="absolute inset-0 z-20 cursor-pointer bg-transparent focus:outline-none"
          />
          <div className={`cinelove-envelope ${opened ? "open" : "close"}`}>
            <div className="cinelove-letter">
              <Image
                src={config.photos.heroEnvelope}
                alt="Hình cưới"
                fill
                sizes="388px"
                className="object-cover"
                priority
              />
            </div>
            <div className="cinelove-front cinelove-flap" />
            <div className="cinelove-front cinelove-pocket" />
            <div className="cinelove-wax">
              <Image src={config.photos.illustrations.waxSeal} alt="" fill sizes="56px" className="object-contain" />
            </div>
          </div>

          {opened && (
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[30] h-0">
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="absolute left-[145px] top-[585px] z-[5] w-[210px]"
      >
        <p className="font-sans text-[15px] font-bold uppercase leading-normal tracking-[1px] text-[#a95151]">
          {guestGreeting.toUpperCase()} KÍNH MỜI
        </p>
        <p className="mt-[4px] font-script-bold text-[26px] font-bold leading-normal text-[#a95151]">
          {guestLine}
        </p>
        
      </motion.div>
    </section>
  );
}
