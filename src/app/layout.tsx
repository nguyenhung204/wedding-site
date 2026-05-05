import type { Metadata } from "next";
import { Sacramento, Playfair_Display, Quicksand, Cormorant_Garamond, Dancing_Script, Pinyon_Script, Allura } from "next/font/google";
import "./globals.css";
import config from "@/lib/config";

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sacramento",
  display: "swap",
});
const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-allura",
  display: "swap",
});
const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});
const quicksand = Quicksand({
  subsets: ["latin", "vietnamese"],
  variable: "--font-quicksand",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant-gf",
  display: "swap",
});
const dancing = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: config.meta.title,
  description: config.meta.description,
  openGraph: {
    title: config.meta.title,
    description: config.meta.description,
    images: [config.meta.ogImage],
    locale: config.meta.locale,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body
        className={`${sacramento.variable} ${allura.variable} ${pinyon.variable} ${playfair.variable} ${quicksand.variable} ${cormorant.variable} ${dancing.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
