import { notFound } from "next/navigation";
import type { Metadata } from "next";
import WeddingCard from "@/components/WeddingCard";
import guests from "@/lib/guests";
import { getGuestById } from "@/lib/sheets";
import { config as weddingConfig } from "@/lib/config";

export const revalidate = 60;

interface PageProps {
  params: { guestId: string };
}

async function resolveGuest(guestId: string) {
  const id = decodeURIComponent(guestId);
  if (!id || id.length > 200 || /[<>"'`]/.test(id)) return null;
  let guest = guests[id];
  if (!guest) {
    try {
      const row = await getGuestById(id);
      if (row) guest = { greeting: row.greeting, name: row.name };
    } catch { /* Sheets unavailable */ }
  }
  return guest ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const guest = await resolveGuest(params.guestId);
  const { groom, bride } = weddingConfig.couple;
  const coupleNames = `${groom.shortName} ❤️ ${bride.shortName}`;

  if (!guest) {
    return {
      title: coupleNames,
      description: weddingConfig.meta.description,
    };
  }

  const title = `${guest.greeting} ${guest.name} | ${coupleNames}`;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  return {
    title,
    description: `${coupleNames} trân trọng kính mời bạn đến chung vui trong ngày hạnh phúc.`,
    openGraph: {
      title,
      description: `${coupleNames} trân trọng kính mời bạn đến chung vui trong ngày hạnh phúc.`,
      images: [{ url: `${baseUrl}${weddingConfig.meta.ogImage}` }],
      locale: weddingConfig.meta.locale,
      type: "website",
    },
  };
}

export default async function InvitePage({ params }: PageProps) {
  const id = decodeURIComponent(params.guestId);
  const guest = await resolveGuest(params.guestId);
  if (!guest) notFound();

  return (
    <WeddingCard
      guestId={id}
      guestGreeting={guest.greeting}
      guestName={guest.name}
    />
  );
}
