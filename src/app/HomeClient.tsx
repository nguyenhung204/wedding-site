"use client";
import { useSearchParams } from "next/navigation";
import WeddingCard from "@/components/WeddingCard";
import guests from "@/lib/guests";

export default function HomeClient() {
  const params = useSearchParams();
  const guestId = params.get("g");
  const fromQueryName = params.get("name") || undefined;
  const fromQueryGreeting = params.get("greeting") || undefined;

  let greeting: string | undefined = fromQueryGreeting;
  let name: string | undefined = fromQueryName;

  if (guestId && guests[guestId]) {
    greeting = greeting ?? guests[guestId].greeting;
    name = name ?? guests[guestId].name;
  } else if (guestId && !name) {
    name = decodeURIComponent(guestId).replace(/[-_]/g, " ");
  }

  return <WeddingCard guestId={guestId ?? undefined} guestGreeting={greeting} guestName={name} />;
}
