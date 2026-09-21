import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

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
    <main className="stub explorer-page">
      <div className="wrap">
        <Link className="logo logo-dark" href="/" aria-label="ICIMO, accueil">
          <Image src="/icimo-logo.png" alt="ICIMO" width={132} height={48} priority />
        </Link>

        <h1>
          {mode === "proprietaire"
            ? "Espace propriétaire"
            : "Explorer les logements"}
        </h1>
        <p className="stub-lead">Parcourez librement les logements disponibles au Bénin. Aucun compte n&apos;est requis pour découvrir les annonces ; la connexion est demandée uniquement pour contacter, réserver ou enregistrer un favori.</p>

        <div className="explorer-toolbar">
          <input aria-label="Rechercher une ville" placeholder="Rechercher une ville..." defaultValue={ville ?? ""} />
          <button className="btn btn-ink" type="button">Rechercher</button>
        </div>

        <div className="explorer-cards">
          {["Appartement lumineux à Cotonou", "Maison paisible à Ouidah", "Studio central à Porto-Novo"].map((title, index) => (
            <article className="explorer-card" key={title}>
              <div className={`explorer-image explorer-image-${index + 1}`}><span>ICIMO</span></div>
              <div className="explorer-card-body"><p>{["Cotonou", "Ouidah", "Porto-Novo"][index]} · Bénin</p><h2>{title}</h2><strong>{["28 000", "22 000", "18 000"][index]} FCFA / nuit</strong><button className="explorer-action" type="button" onClick={() => alert("Connectez-vous ou créez un compte pour continuer.")}>Réserver <span>→</span></button></div>
            </article>
          ))}
        </div>

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
