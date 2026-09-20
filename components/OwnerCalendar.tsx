// Exemple de calendrier de disponibilités — octobre 2026 (1er octobre = jeudi).
const DAYS = 31;
const OFFSET = 3; // colonnes vides avant le 1er (semaine commençant le lundi)
const BOOKED: [number, number][] = [
  [6, 9],
  [15, 19],
  [26, 28],
];
const DOW = ["L", "M", "M", "J", "V", "S", "D"];

function stateOf(d: number) {
  for (const [a, b] of BOOKED) {
    if (d >= a && d <= b) {
      if (a === b) return "cal-booked cal-solo";
      if (d === a) return "cal-booked cal-start";
      if (d === b) return "cal-booked cal-end";
      return "cal-booked";
    }
  }
  return "";
}

export default function OwnerCalendar() {
  return (
    <figure
      className="cal"
      role="img"
      aria-label="Exemple de calendrier de disponibilités d'un logement, avec trois périodes réservées en octobre"
    >
      <div className="cal-head">
        <span className="cal-title">Octobre 2026</span>
        <span className="cal-legend">
          <span>
            <i /> Réservé
          </span>
          <span>Libre</span>
        </span>
      </div>
      <div className="cal-grid" aria-hidden="true">
        {DOW.map((d, i) => (
          <span key={i} className="cal-dow">
            {d}
          </span>
        ))}
        {Array.from({ length: OFFSET }).map((_, i) => (
          <span key={`e${i}`} />
        ))}
        {Array.from({ length: DAYS }).map((_, i) => (
          <span key={i} className={`cal-day ${stateOf(i + 1)}`}>
            {i + 1}
          </span>
        ))}
      </div>
      <figcaption className="cal-note">
        Les dates se bloquent dès que le paiement est confirmé.
      </figcaption>
    </figure>
  );
}
