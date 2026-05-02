import WeddingCard from "@/components/WeddingCard";
import guests from "@/lib/guests";

interface PageProps {
  params: { guestId: string };
}

/**
 * Per-guest invitation. The URL slug looks up a guest in `lib/guests.ts`.
 * If unknown, we fall back to the slug (with hyphens turned into spaces) so
 * a link still feels personalised.
 */
export default function InvitePage({ params }: PageProps) {
  const id = decodeURIComponent(params.guestId);
  const guest = guests[id] ?? {
    greeting: "Trân trọng kính mời",
    name: id.replace(/[-_]/g, " "),
  };
  return <WeddingCard guestGreeting={guest.greeting} guestName={guest.name} />;
}

export function generateStaticParams() {
  return Object.keys(guests).map((guestId) => ({ guestId }));
}
