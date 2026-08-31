import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "UUID & ULID Generator — Browser-Local Identifier Tools",
  description:
    "Generate single or bulk random UUID v4, modern timestamp-sortable UUID v7, and Base32 ULIDs directly in your browser. Inspect existing identifiers and decode creation timestamps with zero server transmission.",
  keywords: [
    "UUID generator",
    "ULID generator",
    "UUID v4",
    "UUID v7",
    "bulk UUID",
    "identifier inspector",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
