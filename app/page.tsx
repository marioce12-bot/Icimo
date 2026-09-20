import Link from "next/link";
import Logo from "@/components/Logo";
import Skyline from "@/components/Skyline";
import OwnerCalendar from "@/components/OwnerCalendar";

const villes = [
  "Cotonou",
  "Abomey-Calavi",
  "Porto-Novo",
  "Ouidah",
  "Grand-Popo",
  "Parakou",
];

const etapes = [
  {
    titre: "Cherchez",
    texte:
      "Choisissez une ville, des dates et le nombre de personnes. Filtrez par prix, équipements, nombre de chambres, et parcourez les résultats en liste ou sur la carte.",
  },
  {
    titre: "Discutez avec le propriétaire",
    texte:
      "Posez vos questions par message, envoyez des photos ou des documents. Tout se passe dans l'application, sans échanger de numéro.",
  },
  {
    titre: "Réservez",
    texte:
      "Pour un séjour court, choisissez vos dates : le prix total est calculé pour vous. Pour une location longue durée, envoyez une demande au propriétaire.",
  },
  {
    titre: "Payez en ligne",
    texte:
      "Le paiement est sécurisé. Une fois validé, votre réservation est confirmée et les dates sont bloquées pour vous.",
  },
];

const confiance = [
  {
    titre: "Propriétaires vérifiés",
    texte:
      "Les propriétaires peuvent faire vérifier leur profil. Un badge s'affiche sur leurs annonces.",
  },
  {
    titre: "Prix clairs avant de payer",
    texte:
      "Vous voyez le prix total et les frais avant de confirmer. Pas de surprise au moment du paiement.",
  },
  {
    titre: "Pas de double réservation",
    texte:
      "Les dates sont bloquées automatiquement dès que le paiement est confirmé.",
  },
  {
    titre: "Des avis de vrais voyageurs",
    texte:
      "Seuls les voyageurs qui ont réservé peuvent laisser un avis, après leur séjour.",
  },
];

const faq = [
  {
    q: "Dois-je créer un compte pour parcourir les logements ?",
    r: "Non. Vous explorez les annonces librement. Un compte est demandé uniquement quand vous voulez contacter un propriétaire, réserver ou enregistrer un favori.",
  },
  {
    q: "Comment fonctionne le paiement ?",
    r: "Pour un séjour de courte durée, vous payez en ligne depuis l'application. La réservation est confirmée et les dates sont bloquées une fois le paiement validé. Pour une location longue durée, vous envoyez d'abord une demande au propriétaire.",
  },
  {
    q: "Quels frais dois-je prévoir ?",
    r: "Le prix total, frais compris, est affiché avant que vous payiez.",
  },
  {
    q: "Puis-je être client et propriétaire avec le même compte ?",
    r: "Oui. Un seul compte suffit : vous passez du mode client au mode propriétaire depuis votre profil.",
  },
  {
    q: "Comment savoir si un propriétaire est fiable ?",
    r: "Cherchez le badge « Propriétaire vérifié » sur l'annonce et lisez les avis laissés après les séjours. Vous pouvez aussi signaler une annonce à l'équipe ICIMO.",
  },
  {
    q: "ICIMO est-il disponible en dehors du Bénin ?",
    r: "ICIMO démarre au Bénin. L'extension vers d'autres pays africains est prévue, progressivement.",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip" href="#contenu">
        Aller au contenu
      </a>

      <header className="hero on-dark">
        <nav className="nav" aria-label="Navigation principale">
          <div className="wrap">
            <Link className="logo" href="/" aria-label="ICIMO, accueil">
              <Logo />
            </Link>
            <div className="nav-links">
              <a href="#fonctionnement">Comment ça marche</a>
              <a href="#durees">Courte ou longue durée</a>
              <a href="#proprietaires">Propriétaires</a>
              <a href="#faq">Questions</a>
            </div>
            <Link className="btn btn-sun" href="/explorer">
              Explorer les logements
            </Link>
          </div>
        </nav>

        <div className="wrap hero-body" id="contenu">
          <h1>
            <span>Trouvez.</span>
            <span>Réservez.</span>
            <span>Installez-vous.</span>
          </h1>
          <p className="hero-lead">
            ICIMO réunit la recherche, la discussion avec le propriétaire, la
            réservation et le paiement dans une seule application. Courte ou
            longue durée, au Bénin d&apos;abord.
          </p>

          <form className="search" action="/explorer" method="get">
            <div className="field">
              <label htmlFor="ville">Destination</label>
              <input
                id="ville"
                name="ville"
                list="villes"
                placeholder="Cotonou, Porto-Novo…"
                autoComplete="off"
              />
              <datalist id="villes">
                {villes.map((v) => (
                  <option key={v} value={v} />
                ))}
              </datalist>
            </div>
            <div className="field">
              <label htmlFor="arrivee">Arrivée</label>
              <input id="arrivee" name="arrivee" type="date" />
            </div>
            <div className="field">
              <label htmlFor="depart">Départ</label>
              <input id="depart" name="depart" type="date" />
            </div>
            <div className="field">
              <label htmlFor="voyageurs">Voyageurs</label>
              <select id="voyageurs" name="voyageurs" defaultValue="2">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n > 1 ? "personnes" : "personne"}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-sun" type="submit">
              Rechercher
            </button>
          </form>

          <p className="hero-note">
            Aucun compte requis pour parcourir les logements.{" "}
            <a href="#proprietaires">Vous êtes propriétaire ?</a>
          </p>
        </div>

        <Skyline />
      </header>

      <main>
        <section className="section" id="fonctionnement">
          <div className="wrap how">
            <div className="how-intro">
              <h2 className="h2">
                De la recherche au paiement, sans quitter l&apos;application.
              </h2>
              <p>
                Plus besoin de jongler entre les appels, les messages et les
                virements. ICIMO garde chaque étape au même endroit.
              </p>
            </div>
            <ol className="steps">
              {etapes.map((e, i) => (
                <li key={e.titre}>
                  <span className="step-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3>{e.titre}</h3>
                    <p>{e.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section-tight" id="durees">
          <div className="wrap">
            <h2 className="h2 center-h">Un séjour d&apos;une nuit ou un bail d&apos;un an.</h2>
            <div className="duo">
              <article className="panel panel-short">
                <h3>Courte durée</h3>
                <p>
                  Appartements meublés pour un week-end, un déplacement
                  professionnel ou des vacances.
                </p>
                <ul className="checks">
                  <li>Choisissez vos dates, le prix se calcule tout seul</li>
                  <li>Réservation confirmée dès que le paiement est validé</li>
                  <li>Historique de vos réservations toujours à portée de main</li>
                </ul>
              </article>
              <article className="panel panel-long">
                <h3>Longue durée</h3>
                <p>
                  Pour s&apos;installer : vous échangez d&apos;abord avec le
                  propriétaire, puis vous avancez ensemble.
                </p>
                <ul className="checks">
                  <li>Envoyez une demande directement au propriétaire</li>
                  <li>Discutez et partagez vos documents dans le chat</li>
                  <li>Le contrat et les paiements suivent, à votre rythme</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="confiance">
          <div className="wrap">
            <h2 className="h2">Louer en confiance.</h2>
            <div className="trust">
              {confiance.map((c) => (
                <div className="trust-item" key={c.titre}>
                  <h3>{c.titre}</h3>
                  <p>{c.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section owners on-dark" id="proprietaires">
          <div className="wrap owners-grid">
            <div>
              <h2 className="h2">Vous avez un logement ? Mettez-le en location.</h2>
              <ul className="checks">
                <li>Publiez votre annonce avec photos et vidéos</li>
                <li>Ouvrez ou bloquez vos dates depuis un calendrier</li>
                <li>Répondez à vos clients dans l&apos;application</li>
                <li>Suivez vos réservations, vos revenus et vos versements</li>
                <li>Demandez le badge « Propriétaire vérifié »</li>
              </ul>
              <p className="owners-note">
                Le même compte sert pour louer et pour proposer : vous changez
                de mode en un geste.
              </p>
              <Link className="btn btn-sun" href="/explorer?mode=proprietaire">
                Devenir propriétaire
              </Link>
            </div>
            <OwnerCalendar />
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="wrap">
            <h2 className="h2">Vos questions.</h2>
            <div className="faq-list">
              {faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section-cta">
          <div className="wrap">
            <div className="cta">
              <h2>Découvrez les logements, sans créer de compte.</h2>
              <p>
                Parcourez les annonces à votre rythme. Vous vous inscrivez
                seulement le jour où vous voulez contacter un propriétaire.
              </p>
              <Link className="btn btn-ink" href="/explorer">
                Explorer les logements
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-row">
          <Link className="logo logo-dark" href="/" aria-label="ICIMO, accueil">
            <Logo />
          </Link>
          <p>ICIMO est une marque d&apos;ICE HOLDING. Lancement au Bénin.</p>
          <p>© 2026 ICIMO</p>
        </div>
      </footer>
    </>
  );
}
