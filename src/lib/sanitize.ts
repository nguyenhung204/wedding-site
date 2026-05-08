/**
 * Centralised input sanitisation — applied to every user-supplied string
 * before it is stored or reflected in a response.
 *
 * Defence layers:
 *  1. Strip ALL HTML/XML tags  → prevents tag injection
 *  2. Strip JS pseudo-protocols → prevents href="javascript:…" etc.
 *  3. Remove C0/C1 control chars → prevents null-byte / CRLF injection
 *  4. Trim surrounding whitespace
 */
export function sanitize(input: unknown): string {
  if (typeof input !== "string") return "";

  return input
    // 1. Remove every <tag ...> or </tag> construct
    .replace(/<[^>]*>/g, "")
    // 2. Remove javascript: / vbscript: / data: pseudo-protocols (case-insensitive)
    .replace(/\b(javascript|vbscript|data)\s*:/gi, "")
    // 3. Strip C0 control chars (except TAB 0x09 / LF 0x0A / CR 0x0D) and DEL
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();
}
