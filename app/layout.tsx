import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { ThemeRegistry } from "@/components/ThemeRegistry";
import { Cursor } from "@/components/Cursor";

const bebas = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "benhob — Roblox Animator",
  description:
    "Portfolio of benhob, Roblox animator specializing in combat, locomotion, and cinematic sequences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable}`}>
      <body>
        <ThemeRegistry>
          <Cursor />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
