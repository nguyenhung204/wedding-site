/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the site can be deployed as plain HTML/JS to any CDN.
  // Remove this line and revert to the default if you deploy to Vercel /
  // any platform that supports Next.js SSR.
  output: "export",
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
};

export default nextConfig;
