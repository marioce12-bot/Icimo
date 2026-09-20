# ICIMO

Plateforme africaine de location immobilière, lancement initial au Bénin.
Une marque d'**ICE HOLDING**.

ICIMO réunit dans une seule application la recherche de logements, la messagerie avec le propriétaire, la réservation, le paiement et la gestion propriétaire (courte et longue durée).

## Stack

| Brique | Rôle |
| --- | --- |
| Next.js 15 (App Router) + TypeScript | Application web mobile-first et routes API |
| Vercel | Hébergement et déploiement |
| Supabase | PostgreSQL, authentification, stockage média, temps réel |
| Saspay.me | Encaissement et décaissement (Bénin) |
| GitHub | Code source et workflow |

Le serveur reste la source de vérité pour les réservations, disponibilités, paiements, commissions et autorisations.

## Démarrer en local

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs
npm run dev
```

Le site tourne sur http://localhost:3000.

## Structure

```
app/
  layout.tsx        Layout racine (polices, métadonnées)
  page.tsx          Landing page
  explorer/         Plateforme (accès sans connexion) — provisoire
  globals.css       Styles globaux et tokens de design
components/         Logo, Skyline (illustration du hero), OwnerCalendar
```

## Parcours prévu

1. **Landing page** : présente ICIMO, un bouton invite à explorer la plateforme sans connexion.
2. **Plateforme** (`/explorer`) : navigation, recherche, résultats et fiches logements accessibles sans compte.
3. **Inscription à la demande** : le compte n'est demandé qu'au moment d'une action (contacter, réserver, favori).

## Design

- Palette : indigo (`#14205C`), soleil (`#FFC233`), lagune (`#23B5A5`), craie (`#F4F6FB`).
- Titres : Bricolage Grotesque. Texte : Instrument Sans (auto-hébergées via Fontsource).
- Mobile-first, focus clavier visible, animations désactivées si `prefers-reduced-motion`.

## Environnements

Développement, staging et production doivent rester séparés. Les clés secrètes (Supabase service role, Saspay.me) ne sont utilisées que côté serveur et ne sont jamais committées.

## Feuille de route MVP

Comptes, recherche, annonces, vérification, favoris, chat, réservation courte durée, paiement, espace propriétaire, calendrier, notifications, avis et back-office.
