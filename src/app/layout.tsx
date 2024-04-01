import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "@/styles/globals.scss";

import Background from "@/components/Background";

const font = Ubuntu({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "???",
  description: "???",
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
