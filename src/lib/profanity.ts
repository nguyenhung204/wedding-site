

const PROFANE_PATTERNS: RegExp[] = [

  // ── Từ tục trực tiếp ──────────────────────────────────────────────────────
  /đụ/,
  /địt/,
  /lồn/,
  /cặc/,
  /buồi/,
  /cứt/,
  /đéo/,
  /đệch/,
  /dâm/,
  /loạn\s*dâm/,
  /hiếp/,

  // ── Chửi có "mẹ" ──────────────────────────────────────────────────────────
  /con\s*mẹ/,
  /mẹ\s*mày/,
  /mẹ\s*kiếp/,
  /đĩ\s*mẹ/,
  /mẹ\s*ơi[!.]{1,}/,      
  /^mẹ[!.?]{1,}$/,           
  /\bmẹ\s*mày\b/,

  // ── Chửi có "chó" ─────────────────────────────────────────────────────────
  /thằng\s*chó/,
  /đồ\s*chó/,
  /óc\s*chó/,
  /chó\s*chết/,
  /con\s*chó/,
  /chó\s*má/,
  /súc\s*vật/,
  /súc\s*sinh/,

  // ── Chửi có "đĩ" / "đĩ thõa" ─────────────────────────────────────────────
  /con\s*đĩ/,
  /đĩ\s*thõa/,
  /đĩ\s*thoã/,
  /con\s*điếm/,

  // ── Chửi thông thường ─────────────────────────────────────────────────────
  /đồ\s*ngu/,
  /ngu\s*như\s*chó/,
  /ngu\s*vl/,
  /đồ\s*khốn/,
  /thằng\s*khốn/,
  /đồ\s*hèn/,
  /đồ\s*tệ/,
  /thằng\s*lừa/,
  /đồ\s*lừa/,
  /đồ\s*phản/,
  /thằng\s*điên/,
  /đồ\s*điên/,
  /mày\s*chết/,
  /chúc\s*mày\s*chết/,
  /tao\s*ghét/,
  /biến\s*đi/,

  // ── Viết tắt tiếng Việt ───────────────────────────────────────────────────
  / đm+[!.? ]*/,
  / dcm+[!.? ]*/,
  / dkm+[!.? ]*/,
  / dm+[!.? ]*/,
  / vcl[!.? ]*/,
  / vkl[!.? ]*/,
  / clm[!.? ]*/,
  / clt[!.? ]*/,
  / cmm[!.? ]*/,
  / đkm[!.? ]*/,
  / đcm[!.? ]*/,
  / wtf[!.? ]*/i,
  / mẹ\s*m[^a-zA-ZÀ-ỹ]/,

  // ── Tiếng Anh ─────────────────────────────────────────────────────────────
  /\bfuck\b/i,
  /\bfucking\b/i,
  /\bfucker\b/i,
  /\bshit\b/i,
  /\bbitch\b/i,
  /\bcunt\b/i,
  /\bnigger\b/i,
  /\bfaggot\b/i,
  /\basshole\b/i,
  /\bdickhead\b/i,
  /\bwhore\b/i,
  /\bslut\b/i,
  /\bbastard\b/i,
  /\bdamn\b/i,
  /\bwtf\b/i,
];

/**
 * Returns true if `text` contains any profane or inappropriate content.
 * The text is normalised to lowercase and padded with spaces so that
 * space-delimited abbreviation matching works correctly.
 */
export function isProfane(text: string): boolean {
  const normalized = ` ${text.toLowerCase()} `;
  return PROFANE_PATTERNS.some((p) => p.test(normalized));
}
