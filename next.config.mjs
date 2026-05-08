/** @type {import('next').NextConfig} */
const nextConfig = {
  // "output: export" removed — site now uses SSR/API routes/middleware (Vercel or Node.js host).
  trailingSlash: true,
  images: {
    // Static export can't use the Next.js image-optimization service, so we
    // bypass it and serve the images at their original URLs. Replace these
    // URLs with your own CDN later.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "img.cinelove.me" },
      { protocol: "https", hostname: "assets.cinelove.me" },
      { protocol: "https", hostname: "img.vietqr.io" },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent browsers from MIME-sniffing the content type
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Deny framing entirely (clickjacking protection)
          { key: "X-Frame-Options", value: "DENY" },
          // Legacy XSS filter for old IE/Edge
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Don't leak the Referer header to third-party origins
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Disallow sensitive browser features we don't use
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // Content-Security-Policy
          // - Allows Firebase Realtime Database WS/HTTPS
          // - Allows Google Fonts & self-hosted fonts
          // - Allows inline styles/scripts that Next.js requires
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Scripts: self + Next.js inline chunks + Firebase RTDB long-polling fallback
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.firebasedatabase.app",
              // Explicit script-src-elem so browsers don't fall back to script-src
              "script-src-elem 'self' 'unsafe-inline' https://*.firebasedatabase.app",
              // Styles: self + Google Fonts + inline (Tailwind)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Fonts: self + Google Fonts CDN
              "font-src 'self' https://fonts.gstatic.com",
              // Images: self + configured remote patterns + data URIs
              "connect-src 'self' https://*.firebaseio.com wss://*.firebaseio.com https://*.firebasedatabase.app wss://*.firebasedatabase.app https://firestore.googleapis.com https://sheets.googleapis.com",
              // Media: self only
              "media-src 'self'",
              // Allow Google Maps iframes
              "frame-src https://www.google.com https://maps.google.com",
              // No plugins
              "object-src 'none'",
              // Restrict <base> tag
              "base-uri 'self'",
              // All form submissions must go to same origin
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
