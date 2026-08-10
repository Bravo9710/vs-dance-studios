import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ctaClickDelegationScript } from "@/lib/analytics";

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
        {/*
          Google Tag Manager — the client already runs container
          GTM-MP9FZ7KJ on the live site. Uncomment when this section ships
          to production; no other infrastructure change is needed, since
          dataLayer.push calls below already use the same event shape GTM
          would consume.

          <script dangerouslySetInnerHTML={{ __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MP9FZ7KJ');
          `}} />
        */}
        <script dangerouslySetInnerHTML={{ __html: ctaClickDelegationScript }} />
        {children}
      </body>
    </html>
  );
}
