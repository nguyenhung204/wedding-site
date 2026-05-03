"use client";
import { useEffect, useState } from "react";
import config from "@/lib/config";
import LoadingSplash from "@/components/ui/LoadingSplash";
import PetalEffect from "@/components/ui/PetalEffect";
import AudioPlayer from "@/components/ui/AudioPlayer";
import BottomToolbar from "@/components/ui/BottomToolbar";
import AutoScroll from "@/components/ui/AutoScroll";

import Hero from "@/components/sections/Hero";

interface Props {
  guestGreeting?: string;
  guestName?: string;
}

export default function WeddingCard({ guestGreeting, guestName }: Props) {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <LoadingSplash show={loading} />
      {config.effects.petals && opened && <PetalEffect />}

      <main className={`card-canvas ${opened ? "is-opened" : ""}`}>
        <Hero guestGreeting={guestGreeting} guestName={guestName} onOpen={() => setOpened(true)} />
      </main>

      <AudioPlayer
        src={config.audio.src}
        title={config.audio.title}
        autoplay={config.audio.autoplay}
        open={opened}
      />
      <BottomToolbar open={opened} />
      <AutoScroll
        enabled={config.effects.autoScroll.enabled}
        speed={config.effects.autoScroll.speed}
        active={opened}
      />
    </>
  );
}
