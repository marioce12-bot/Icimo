import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/instrument-sans";
import "./globals.css";

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
  themeColor: "#14205C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
