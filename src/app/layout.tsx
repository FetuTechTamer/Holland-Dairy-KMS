import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { Providers } from "@/providers/Providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Holland Dairy Knowledge Hub | Ethiopian Heart, Dutch Technology",
  description: "Building a brighter tomorrow through premium dairy products. Locally sourced from Ethiopian farms, processed with Dutch technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="am" className="scroll-smooth">
      <body className={`${outfit.variable} font-sans antialiased bg-background text-foreground transition-colors duration-300`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
