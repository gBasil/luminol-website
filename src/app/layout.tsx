import type { Metadata, Viewport } from "next";
import { Ubuntu } from "next/font/google";
import "@/styles/globals.scss";

import Background from "@/components/Background";

const font = Ubuntu({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const viewport: Viewport = {
  themeColor: "#23c6ff",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Luminol",
  description: "An RPG Maker XP-VX Ace rewrite, written in Rust with love 💕",
  openGraph: {
    type: "website",
    images: [{ url: "https://luminol.dev/header.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.png" type="image/png" />
      </head>
      <body className={font.className}>
        <Background className="bg" />
        {children}
      </body>
    </html>
  );
}
