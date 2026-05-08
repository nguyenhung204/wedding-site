"use client";
import { useEffect, useState } from "react";
import config from "@/lib/config";
import LoadingSplash from "@/components/ui/LoadingSplash";
import PetalEffect from "@/components/ui/PetalEffect";
import AudioPlayer from "@/components/ui/AudioPlayer";
import BottomToolbar from "@/components/ui/BottomToolbar";
import AutoScroll from "@/components/ui/AutoScroll";

import Hero from "@/components/sections/Hero";
import CountdownInvitation from "@/components/sections/CountdownInvitation";
import InvitationMessage from "@/components/sections/InvitationMessage";
import Ceremony from "@/components/sections/Ceremony";
import Party from "@/components/sections/Party";
import MarryMe from "@/components/sections/MarryMe";
import AboutUs from "@/components/sections/AboutUs";
import SaveTheDate from "@/components/sections/SaveTheDate";
import Gallery from "@/components/sections/Gallery";
import Rsvp from "@/components/sections/Rsvp";
import Gift from "@/components/sections/Gift";
import WishWall from "@/components/sections/WishWall";
import ThankYou from "@/components/sections/ThankYou";

interface Props {
  guestId?: string;
  guestGreeting?: string;
  guestName?: string;
}

export default function WeddingCard({ guestId, guestGreeting, guestName }: Props) {
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
        {opened && (
          <>
            <CountdownInvitation />
            <InvitationMessage />
            <Ceremony />
            <Party />
            <MarryMe />
            <AboutUs />
            <SaveTheDate />
            <Gallery />
            <Rsvp defaultName={guestName} guestId={guestId} />
            <Gift />
            <WishWall guestName={guestName} guestId={guestId} />
            <ThankYou />
          </>
        )}
      </main>

      <AudioPlayer
        src={config.audio.src}
        title={config.audio.title}
        autoplay={config.audio.autoplay}
        open={opened}
      />
      <BottomToolbar open={opened} guestId={guestId} guestName={guestName} />
      <AutoScroll
        enabled={config.effects.autoScroll.enabled}
        speed={config.effects.autoScroll.speed}
        active={opened}
      />
    </>
  );
}
