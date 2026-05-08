/**
 * Lightweight in-memory rate limiter (per-IP, sliding window).
 * Suitable for low-traffic deployments (single Node.js process).
 *
 * Usage:
 *   const limiter = createRateLimiter({ windowMs: 60_000, max: 5 });
 *   const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
 *   if (!limiter.check(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
 */

interface RateLimiterOptions {
  /** Window duration in milliseconds */
  windowMs: number;
  /** Maximum requests allowed per window per key */
  max: number;
}

interface Bucket {
  count: number;
  resetAt: number;
}

export function createRateLimiter({ windowMs, max }: RateLimiterOptions) {
  const store = new Map<string, Bucket>();

  // Periodically purge expired buckets to prevent memory leaks
  const interval = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of store) {
      if (bucket.resetAt <= now) store.delete(key);
    }
  }, windowMs);

  // Allow GC to collect this timer when the module is unloaded (tests / edge cases)
  if (typeof interval === "object" && "unref" in interval) {
    (interval as NodeJS.Timeout).unref();
  }

  return {
    /**
     * Returns true if the request is allowed, false if rate-limited.
     */
    check(key: string): boolean {
      const now = Date.now();
      const bucket = store.get(key);

      if (!bucket || bucket.resetAt <= now) {
        store.set(key, { count: 1, resetAt: now + windowMs });
        return true;
      }

      if (bucket.count >= max) return false;

      bucket.count += 1;
      return true;
    },
  };
}
