import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NextGen English Academy - Multilingual Dictionary",
  description:
    "A modern multilingual dictionary supporting English to Tamil, Arabic, Sinhala, and French translations. Built for NextGen English Academy by Mohamed Niyas Mohamed Nilaam.",
  keywords: [
    "dictionary",
    "english",
    "tamil",
    "arabic",
    "sinhala",
    "french",
    "multilingual",
    "translation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-[var(--font-poppins)] antialiased">
        {children}
      </body>
    </html>
  );
}
