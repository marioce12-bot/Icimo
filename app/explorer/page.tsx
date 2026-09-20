import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Explorer les logements — ICIMO",
};

type Params = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function ExplorerPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const p = await searchParams;
  const ville = first(p.ville);
  const arrivee = first(p.arrivee);
  const depart = first(p.depart);
  const voyageurs = first(p.voyageurs);
  const mode = first(p.mode);

  const criteres = [
    ville && `Destination : ${ville}`,
    arrivee && `Arrivée : ${arrivee}`,
    depart && `Départ : ${depart}`,
    voyageurs && `${voyageurs} voyageur(s)`,
  ].filter(Boolean) as string[];

  return (
    <main className="stub">
      <div className="wrap">
        <Link className="logo logo-dark" href="/" aria-label="ICIMO, accueil">
          <Logo />
        </Link>

        <h1>
          {mode === "proprietaire"
            ? "Espace propriétaire"
            : "Explorer les logements"}
        </h1>
        <p className="stub-lead">
          La plateforme arrive bientôt. Cette page accueillera la recherche, les
          résultats en liste et sur carte, et les fiches logements, sans compte
          requis. L&apos;inscription sera demandée seulement pour contacter un
          propriétaire, réserver ou enregistrer un favori.
        </p>

        {criteres.length > 0 && (
          <ul className="stub-criteres" aria-label="Votre recherche">
            {criteres.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}

        <Link className="btn btn-ink" href="/">
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
