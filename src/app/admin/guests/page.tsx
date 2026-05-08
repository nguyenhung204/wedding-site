import { listGuests } from "@/lib/sheets";
import AddGuestForm from "./AddGuestForm";
import ImportGuestsForm from "./ImportGuestsForm";
import GuestTable from "./GuestTable";

export const revalidate = 0;

export default async function GuestsPage() {
  let guests: Awaited<ReturnType<typeof listGuests>> = [];
  try {
    guests = await listGuests();
  } catch {
    // Show empty state if Sheets is not configured yet
  }

  return (
    <div className="space-y-6 ">
      <AddGuestForm />
      <ImportGuestsForm />

      <GuestTable guests={guests} />
    </div>
  );
}
