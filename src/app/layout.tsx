import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const oswald = localFont({
  src: "../fonts/oswald/Oswald-Variable.woff2",
  weight: "200 700",
  variable: "--font-oswald",
  display: "swap",
});

const ptSans = localFont({
  src: [
    { path: "../fonts/pt-sans/PTSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/pt-sans/PTSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-pt-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VS DANCE StudioS",
  description:
    "Танцово студио в София за деца, младежи и възрастни — улични танци и съвременни техники от 2009 г.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg" className={`${oswald.variable} ${ptSans.variable}`}>
      <body className="bg-paper font-body text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
