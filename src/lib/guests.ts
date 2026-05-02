/**
 * Per-guest greeting & name lookup.
 *  - Key: the slug used in the URL `/invite/<slug>`.
 *  - Value: the greeting line + the personalised guest line.
 *
 * Add as many entries as you like. Anything not listed here will fall back
 * to a default greeting + the slug as the name (decoded for spaces).
 */

export interface GuestEntry {
  greeting: string;
  name: string;
}

const guests: Record<string, GuestEntry> = {
  "EMT-HAGTH2": {
    greeting: "Thân mời",
    name: "Em Thư và người thương",
  },
  "demo": {
    greeting: "Trân trọng kính mời",
    name: "Quý khách",
  },
};

export default guests;
