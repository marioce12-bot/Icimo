import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ICIMO — Trouvez, réservez et payez votre logement au Bénin",
  description:
    "ICIMO réunit la recherche, la discussion avec le propriétaire, la réservation et le paiement dans une seule application. Location courte et longue durée au Bénin.",
  openGraph: {
    title: "ICIMO — Location de logements au Bénin",
    description:
      "Cherchez, discutez avec le propriétaire, réservez et payez depuis une seule application.",
    locale: "fr_BJ",
    type: "website",
    images: ["/icimo-logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0E4CFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
