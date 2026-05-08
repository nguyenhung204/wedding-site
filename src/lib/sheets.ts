import { google } from "googleapis";

const SHEET_ID = () => process.env.GOOGLE_SHEETS_ID!;
const TAB = "Guests";

// Columns: A=id, B=name, C=greeting, D=attending, E=guestCount, F=rsvpSubmittedAt, G=createdAt, H=inviteUrl

function getSheetsClient() {
  // GOOGLE_SERVICE_ACCOUNT_KEY = base64 of the full service-account JSON file
  const serviceAccount = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!, "base64").toString("utf-8")
  );

  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export interface GuestRow {
  id: string;
  name: string;
  greeting: string;
  attending?: string;
  guestCount?: number;
  rsvpSubmittedAt?: string;
  createdAt: string;
  inviteUrl?: string;
}

function rowToGuest(r: string[]): GuestRow {
  return {
    id: r[0] ?? "",
    name: r[1] ?? "",
    greeting: r[2] ?? "",
    attending: r[3] || undefined,
    guestCount: r[4] ? Number(r[4]) : undefined,
    rsvpSubmittedAt: r[5] || undefined,
    createdAt: r[6] ?? "",
    inviteUrl: r[7] || undefined,
  };
}

export async function getGuestById(id: string): Promise<GuestRow | null> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: `${TAB}!A:H`,
  });
  const rows = (res.data.values ?? []).slice(1); // skip header
  const row = rows.find((r) => r[0] === id);
  return row ? rowToGuest(row as string[]) : null;
}

export async function listGuests(): Promise<GuestRow[]> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: `${TAB}!A:H`,
  });
  return ((res.data.values ?? []).slice(1) as string[][]).map(rowToGuest);
}

export async function appendGuest(
  id: string,
  name: string,
  greeting: string,
  inviteUrl: string
): Promise<void> {
  const sheets = getSheetsClient();
  const now = new Date().toISOString();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID(),
    range: `${TAB}!A:H`,
    valueInputOption: "RAW",
    requestBody: { values: [[id, name, greeting, "", "", "", now, inviteUrl]] },
  });
}

export async function appendGuestBatch(
  guests: { id: string; name: string; greeting: string; inviteUrl: string }[]
): Promise<void> {
  if (guests.length === 0) return;
  const sheets = getSheetsClient();
  const now = new Date().toISOString();
  const values = guests.map(({ id, name, greeting, inviteUrl }) => [
    id, name, greeting, "", "", "", now, inviteUrl,
  ]);
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID(),
    range: `${TAB}!A:H`,
    valueInputOption: "RAW",
    requestBody: { values },
  });
}

export async function updateRsvp(
  guestId: string,
  attending: string,
  guestCount: number
): Promise<boolean> {
  const sheets = getSheetsClient();
  // Fetch only column A to find the row index efficiently
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: `${TAB}!A:A`,
  });
  const rows = res.data.values ?? [];
  // rows[0] = header; rows[n] = data row at sheet row n+1
  const idx = rows.findIndex((r) => r[0] === guestId);
  if (idx === -1) return false;

  const sheetRow = idx + 1; // 1-based row number (header is row 1, first data is row 2)
  const now = new Date().toISOString();
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID(),
    range: `${TAB}!D${sheetRow}:F${sheetRow}`,
    valueInputOption: "RAW",
    requestBody: { values: [[attending, guestCount, now]] },
  });
  return true;
}

export async function updateGuest(
  guestId: string,
  name: string,
  greeting: string
): Promise<boolean> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: `${TAB}!A:A`,
  });
  const rows = res.data.values ?? [];
  const idx = rows.findIndex((r) => r[0] === guestId);
  if (idx === -1) return false;

  const sheetRow = idx + 1;
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID(),
    range: `${TAB}!B${sheetRow}:C${sheetRow}`,
    valueInputOption: "RAW",
    requestBody: { values: [[name, greeting]] },
  });
  return true;
}

export async function deleteGuest(guestId: string): Promise<boolean> {
  const sheets = getSheetsClient();
  // Need the spreadsheet ID for batchUpdate
  const sheetId = SHEET_ID();

  // First get sheet tab's numeric sheetId
  const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
  const tab = meta.data.sheets?.find(
    (s) => s.properties?.title === TAB
  );
  if (!tab?.properties?.sheetId == null) return false;
  const tabId = tab!.properties!.sheetId!;

  // Find the row index
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${TAB}!A:A`,
  });
  const rows = res.data.values ?? [];
  const idx = rows.findIndex((r) => r[0] === guestId);
  if (idx === -1) return false;

  // Delete the row (0-based index)
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: sheetId,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: tabId,
              dimension: "ROWS",
              startIndex: idx,
              endIndex: idx + 1,
            },
          },
        },
      ],
    },
  });
  return true;
}
