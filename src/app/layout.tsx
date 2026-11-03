import type { Metadata, Viewport } from "next";
import {
  Abril_Fatface,
  Anton,
  Bebas_Neue,
  Caveat,
  Courier_Prime,
  DM_Serif_Display,
  Inter,
  JetBrains_Mono,
  Kalam,
  Oswald,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
});
const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});
const abril = Abril_Fatface({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-abril",
});
const oswald = Oswald({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-oswald",
});
const courier = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
});
const caveat = Caveat({
  weight: ["400", "500", "700"],
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-caveat",
});
const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
});
const jetbrains = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-jetbrains",
});
const inter = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-inter",
});

const fontVariables = [
  playfair.variable,
  dmSerif.variable,
  bebas.variable,
  anton.variable,
  abril.variable,
  oswald.variable,
  courier.variable,
  caveat.variable,
  kalam.variable,
  jetbrains.variable,
  inter.variable,
].join(" ");

export const metadata: Metadata = {
  title: "Nymtuul — Portfolio",
  description:
    "a sort of scrapbook for half-baked ideas, finished things, and the in-between drafts.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
