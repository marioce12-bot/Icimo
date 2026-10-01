'use client';

import { useState } from 'react';

// Types
export type View = 'landing' | 'app';
type Tab = 'explorer' | 'favoris' | 'messages' | 'reservations' | 'profil';
type Stay = 'Courte' | 'Longue';

const logements = [
  { id: 1, ville: "Haie Vive, Cotonou", prix: "35 000", prixMois: "450 000", type: "Appart", meuble: true, note: "4.9", avis: 32, verified: true, surface: "45m² • 2 ch", dispo: "Disponible", cat: "Meublés" },
  { id: 2, ville: "Abomey-Calavi Centre", prix: "25 000", prixMois: "180 000", type: "Villa", meuble: true, note: "4.8", avis: 18, verified: true, surface: "120m² • 3 ch", dispo: "Meublé", cat: "Villa" },
  { id: 3, ville: "Fidjrossè, Cotonou", prix: "45 000", prixMois: "650 000", type: "Appart", meuble: true, note: "5.0", avis: 47, verified: true, surface: "60m² • 2 ch • Vue mer", dispo: "Vue mer", cat: "Meublés" },
  { id: 4, ville: "Parakou Centre", prix: "15 000", prixMois: "120 000", type: "Appart", meuble: false, note: "4.7", avis: 9, verified: true, surface: "35m² • 1 ch", dispo: "Longue durée", cat: "Appart" },
  { id: 5, ville: "Ouidah - Plage", prix: "55 000", prixMois: "850 000", type: "Villa", meuble: true, note: "4.9", avis: 21, verified: true, surface: "90m² • 3 ch • Plage", dispo: "Disponible", cat: "Villa" },
  { id: 6, ville: "Ganhi, Cotonou", prix: "30 000", prixMois: "250 000", type: "Appart", meuble: true, note: "4.8", avis: 14, verified: false, surface: "40m² • 1 ch", dispo: "Nouveau", cat: "Appart" },
  { id: 7, ville: "Akpakpa, Cotonou", prix: "18 000", prixMois: "95 000", type: "Appart", meuble: true, note: "4.6", avis: 11, verified: true, surface: "32m² • 1 ch", dispo: "Disponible", cat: "Meublés" },
  { id: 8, ville: "Godomey, Abomey-Calavi", prix: "22 000", prixMois: "140 000", type: "Appart", meuble: true, note: "4.7", avis: 7, verified: true, surface: "38m² • 2 ch", dispo: "Disponible", cat: "Tous" },
];


const logementDetailMock = {
  photos: 12,
  equip: ["WiFi fibre", "Clim", "Cuisine équipée", "Parking sécurisé", "Générateur", "Eau surpresseur"],
  proprio: { name: "M. Dossou", verified: true, response: "< 2h", rate: "4.9", annonces: 3 },
  description: "Appartement lumineux en étage, très bien ventilé, proche de toutes commodités. Immeuble sécurisé avec gardien 24/7. Idéal couple ou professionnel.",
  regles: ["Non fumeur", "Pas de fête", "1 mois caution", "Contrat inclus"]
};

const messagesMock = [
  { id: 1, name: "M. Dossou - Proprio Haie Vive", last: "Bonjour, l'appartement est dispo dès demain ?", time: "09:42", unread: 2, avatar: "MD" },
  { id: 2, name: "Villa Ouidah - Agence Atlantique", last: "J'ai envoyé les photos supplémentaires", time: "Hier", unread: 0, avatar: "OA" },
  { id: 3, name: "Support ICIMO", last: "Votre demande de réservation a été confirmée", time: "Lun", unread: 1, avatar: "IC" },
];

export default function IcimoApp({ initialView = 'landing' }: { initialView?: View }) {
  const [view, setView] = useState<View>(initialView);
  const [activeTab, setActiveTab] = useState<Tab>('explorer');
  const [stay, setStay] = useState<Stay>('Courte');
  const [filter, setFilter] = useState('Tous');
  const [listMode, setListMode] = useState<'liste' | 'carte'>('liste');
  const [favorites, setFavorites] = useState<number[]>([1, 3]);
  const [modeProprio, setModeProprio] = useState(false);
  const [activeConv, setActiveConv] = useState<number | null>(null);
  const [q, setQ] = useState('');
  const [selectedLogement, setSelectedLogement] = useState<number|null>(null);
  const detailLogement = logements.find(l=>l.id===selectedLogement);

  const filtered = logements.filter(l => {
    if (filter !== 'Tous') {
      if (filter === 'Meublés' && !l.meuble) return false;
      if (filter === 'Villa' && l.type !== 'Villa') return false;
      if (filter === 'Appart' && l.type !== 'Appart') return false;
      if (filter === 'Disponible' && l.dispo !== 'Disponible') return false;
      if (filter.includes('100k') && parseInt(l.prixMois.replace(/\s/g, '')) >= 100000) return false;
    }
    if (q && !l.ville.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const toggleFav = (id: number) => {
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  };

  const enterApp = () => {
    setView('app');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white text-[#334155] selection:bg-[#0E4CFF]/15 antialiased">
      {view === 'landing' && (
        <div className="min-h-screen bg-white">
          {/* HEADER LANDING */}
          <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-[#F0F5FF]">
            <div className="max-w-[1120px] mx-auto px-6 h-[64px] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[10px] bg-[#0E4CFF] grid place-items-center text-white font-bold text-[14px]">I</div>
                <span className="display text-[22px] font-bold tracking-[-0.02em] text-[#0A2540]">ICIMO</span>
                <span className="hidden sm:inline ml-3 text-[10px] tracking-[0.16em] uppercase font-semibold text-[#0A2540]/50 border-l border-[#0A2540]/10 pl-3">par ICE HOLDING</span>
              </div>
              <button onClick={enterApp} className="text-[14px] font-medium text-[#0A2540] hover:text-[#0E4CFF] transition px-4 py-2 rounded-full hover:bg-[#F0F5FF]">Se connecter</button>
            </div>
          </header>

          {/* HERO */}
          <section className="max-w-[1120px] mx-auto px-6 pt-14 md:pt-24 pb-16">
            <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F5FF] border border-[#0E4CFF]/10 text-[11px] font-semibold tracking-[0.08em] uppercase text-[#0E4CFF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E4CFF] animate-pulse" /> Nouveau au Bénin
                </div>
                <h1 className="display text-[40px] md:text-[60px] leading-[0.95] tracking-[-0.03em] text-[#0A2540] mt-6">Le logement au<br/>Bénin, enfin simple.</h1>
                <p className="mt-5 text-[17px] md:text-[18px] leading-[1.6] text-[#475569] max-w-[46ch]">ICIMO réunit en un seul endroit les meilleures offres vérifiées. Fini les intermédiaires, les fausses annonces et les paiements risqués.</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button onClick={enterApp} className="h-[48px] px-7 rounded-full bg-[#0E4CFF] text-white font-semibold text-[15px] shadow-blue hover:bg-[#0A3DD1] transition hover:scale-[1.01] active:scale-[0.98]">Commencer gratuitement</button>
                  <button onClick={enterApp} className="h-[48px] px-7 rounded-full border border-[#0A2540]/12 bg-white text-[#0A2540] font-semibold text-[15px] hover:bg-[#F0F5FF] transition">Visiter la plateforme</button>
                </div>
                <div className="mt-6 flex items-center gap-3 text-[13px] text-[#64748B]">
                  <div className="flex -space-x-2">
                    {['A','B','C'].map(c=> <div key={c} className="w-7 h-7 rounded-full bg-[#F0F5FF] border-2 border-white grid place-items-center text-[11px] font-bold text-[#0A2540]">{c}</div>)}
                  </div>
                  <span>Rejoignez 1 200+ personnes qui cherchent déjà</span>
                </div>
              </div>

              {/* ABSTRACT VISUAL */}
              <div className="relative">
                <div className="absolute -inset-6 bg-[#F0F5FF] rounded-[36px] -rotate-1" />
                <div className="relative bg-white rounded-[28px] shadow-blue border border-[#0E4CFF]/8 p-6 md:p-8">
                  {/* mock app window */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0A2540]/15"/><span className="w-2.5 h-2.5 rounded-full bg-[#0A2540]/10"/><span className="w-2.5 h-2.5 rounded-full bg-[#0A2540]/8"/></div>
                    <div className="h-6 w-24 rounded-full bg-[#F0F5FF]" />
                  </div>
                  <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
                    <div className="space-y-4">
                      <div className="h-[132px] rounded-[20px] bg-gradient-to-br from-[#0E4CFF]/18 to-[#F0F5FF] border border-[#0E4CFF]/10 p-4 flex flex-col justify-between">
                        <div className="flex justify-between"><span className="px-2.5 py-1 rounded-full bg-white text-[10px] font-bold text-[#0E4CFF] shadow-soft">VÉRIFIÉ</span><span className="w-7 h-7 rounded-full bg-white grid place-items-center text-[12px]">♡</span></div>
                        <div><div className="text-[12px] font-semibold text-[#0A2540]">Appartement lumineux</div><div className="text-[11px] text-[#64748B]">Haie Vive • 45m²</div></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-[88px] rounded-[16px] bg-[#F0F5FF] border border-[#0E4CFF]/8" />
                        <div className="h-[88px] rounded-[16px] bg-[#0A2540] text-white p-3 flex flex-col justify-between"><span className="text-[10px] uppercase tracking-widest opacity-70">Revenus</span><span className="display text-[18px]">+23%</span></div>
                      </div>
                    </div>
                    <div className="rounded-[20px] bg-[#0A2540] text-white p-4 flex flex-col justify-between">
                      <div className="text-[11px] uppercase tracking-widest opacity-60">Carte Bénin</div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-[12px]"><span className="w-2 h-2 rounded-full bg-[#0E4CFF]"/>Cotonou</div>
                        <div className="flex items-center gap-2 text-[12px] opacity-70"><span className="w-2 h-2 rounded-full bg-white/40"/>Abomey-Calavi</div>
                        <div className="flex items-center gap-2 text-[12px] opacity-70"><span className="w-2 h-2 rounded-full bg-white/40"/>Ouidah</div>
                        <div className="mt-6 h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full w-[70%] bg-[#0E4CFF]"/></div>
                      </div>
                      <button className="mt-6 w-full h-8 rounded-full bg-white text-[#0A2540] text-[12px] font-semibold">Explorer</button>
                    </div>
                  </div>
                </div>
                {/* float badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-[16px] shadow-soft border border-black/5 px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0E4CFF] text-white grid place-items-center font-bold">✓</div>
                  <div><div className="text-[12px] font-semibold text-[#0A2540] leading-none">Annonces vérifiées</div><div className="text-[11px] text-[#64748B] mt-1">Contrôle en 24h</div></div>
                </div>
              </div>
            </div>
          </section>

          {/* 3 arguments */}
          <section className="max-w-[1120px] mx-auto px-6 py-12">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Vérifié", desc: "Chaque logement est contrôlé par notre équipe. Photos réelles, adresse confirmée, badge bleu.", icon: "✓" },
                { title: "Sécurisé", desc: "Paiements protégés, messagerie intégrée, pas besoin de partager votre numéro personnel.", icon: "◍" },
                { title: "Sans commission cachée", desc: "Prix affichés = prix payés. Transparence totale pour locataires et propriétaires.", icon: "◐" },
              ].map(f=>(
                <div key={f.title} className="rounded-[20px] bg-[#F0F5FF]/70 border border-[#0E4CFF]/8 p-6">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#0E4CFF]/10 shadow-soft grid place-items-center text-[#0E4CFF] font-bold">{f.icon}</div>
                  <h3 className="mt-4 font-semibold text-[16px] text-[#0A2540]">{f.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-[#475569]">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pour locataires & proprios */}
          <section className="max-w-[1120px] mx-auto px-6 py-12">
            <div className="rounded-[28px] border border-[#0A2540]/8 bg-white shadow-soft overflow-hidden grid md:grid-cols-2">
              <div className="p-8 md:p-10">
                <div className="inline-flex px-3 py-1 rounded-full bg-[#0A2540] text-white text-[11px] font-semibold tracking-[0.08em] uppercase">Pour locataires</div>
                <h3 className="display text-[28px] leading-[0.95] text-[#0A2540] mt-4">Trouvez plus vite. Louez en confiance.</h3>
                <ul className="mt-6 space-y-3 text-[14px] text-[#475569]">
                  <li className="flex gap-2.5"><span className="w-5 h-5 rounded-full bg-[#F0F5FF] grid place-items-center text-[10px] text-[#0E4CFF]">✓</span> Filtres précis: meublé, ville, budget, disponibilité</li>
                  <li className="flex gap-2.5"><span className="w-5 h-5 rounded-full bg-[#F0F5FF] grid place-items-center text-[10px] text-[#0E4CFF]">✓</span> Chat direct avec le propriétaire, sans intermédiaire</li>
                  <li className="flex gap-2.5"><span className="w-5 h-5 rounded-full bg-[#F0F5FF] grid place-items-center text-[10px] text-[#0E4CFF]">✓</span> Réservation courte ou longue durée en quelques clics</li>
                </ul>
                <button onClick={enterApp} className="mt-7 h-11 px-5 rounded-full bg-[#0A2540] text-white font-semibold text-[14px] hover:bg-[#0E4CFF] transition">Explorer les logements</button>
              </div>
              <div className="p-8 md:p-10 bg-[#0A2540] text-white relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-[#0E4CFF]/20 blur-[30px]" />
                <div className="relative">
                  <div className="inline-flex px-3 py-1 rounded-full bg-white/10 text-[11px] font-semibold tracking-[0.08em] uppercase">Pour propriétaires</div>
                  <h3 className="display text-[28px] leading-[0.95] mt-4">Publiez en 3 minutes. Gérez tout au même endroit.</h3>
                  <ul className="mt-6 space-y-3 text-[14px] text-white/80">
                    <li className="flex gap-2.5"><span className="w-5 h-5 rounded-full bg-white/10 grid place-items-center text-[10px]">✓</span> Création d'annonce guidée avec photos</li>
                    <li className="flex gap-2.5"><span className="w-5 h-5 rounded-full bg-white/10 grid place-items-center text-[10px]">✓</span> Calendrier intelligent et gestion des demandes</li>
                    <li className="flex gap-2.5"><span className="w-5 h-5 rounded-full bg-white/10 grid place-items-center text-[10px]">✓</span> Suivi des revenus et messagerie centralisée</li>
                  </ul>
                  <button onClick={enterApp} className="mt-7 h-11 px-5 rounded-full bg-white text-[#0A2540] font-semibold text-[14px] hover:bg-[#F0F5FF] transition">Devenir hôte</button>
                </div>
              </div>
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="max-w-[1120px] mx-auto px-6 py-16">
            <div className="rounded-[32px] bg-[#0E4CFF] p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-white/10 blur-[20px]" />
              <div className="relative max-w-[640px]">
                <h3 className="display text-[30px] md:text-[42px] leading-[0.95]">Prêt à trouver votre chez-vous ?</h3>
                <p className="mt-3 text-[16px] leading-[1.6] text-white/80">Rejoignez ICIMO, la plateforme pensée pour le Bénin. Sans frais cachés, avec des annonces vérifiées.</p>
                <div className="mt-7 flex gap-3">
                  <button onClick={enterApp} className="h-12 px-7 rounded-full bg-white text-[#0E4CFF] font-bold text-[15px] shadow-soft hover:scale-[1.02] transition">Commencer gratuitement</button>
                  <button onClick={enterApp} className="h-12 px-7 rounded-full border border-white/20 text-white font-semibold text-[14px] hover:bg-white/10 transition">Visiter la plateforme</button>
                </div>
              </div>
            </div>
          </section>

          <footer className="border-t border-[#F0F5FF] py-10">
            <div className="max-w-[1120px] mx-auto px-6 flex flex-col md:flex-row justify-between gap-6 text-[13px]">
              <div>
                <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-[8px] bg-[#0A2540] grid place-items-center text-white font-bold text-[12px]">I</div><span className="display font-bold text-[#0A2540]">ICIMO</span><span className="text-[#64748B] ml-2">par ICE HOLDING</span></div>
                <p className="mt-3 text-[#64748B] max-w-[32ch] leading-[1.5]">Plateforme de logement au Bénin. Lancement Cotonou, architecture prête pour l'Afrique.</p>
              </div>
              <div className="text-[#94A3B8]">© {new Date().getFullYear()} ICIMO • Cotonou, Bénin • contact@icimo.bj</div>
            </div>
          </footer>
        </div>
      )}

      {view === 'app' && (
        <div className="min-h-screen bg-[#F8FAFF]">
          {/* APP HEADER */}
          <header className="sticky top-0 z-30 glass-app border-b border-[#0E4CFF]/10" style={{ paddingTop: 'var(--safe-area-inset-top, 0px)' }}>
            <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-[64px] flex items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setView('landing')} className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-[10px] bg-[#0E4CFF] grid place-items-center text-white font-bold text-[14px] group-hover:scale-105 transition">I</div>
                  <span className="display font-bold text-[20px] text-[#0A2540] hidden md:inline">ICIMO</span>
                </button>
                <div className="hidden lg:flex items-center gap-6 ml-6 text-[14px] font-medium">
                  {[
                    { k: 'explorer', l: 'Explorer' },
                    { k: 'favoris', l: 'Favoris' },
                    { k: 'messages', l: 'Messages' },
                    { k: 'reservations', l: 'Réservations' },
                    { k: 'profil', l: 'Profil' },
                  ].map(i => (
                    <button key={i.k} onClick={() => setActiveTab(i.k as Tab)} className={`px-3 py-1.5 rounded-full transition ${activeTab === i.k ? 'bg-[#0A2540] text-white' : 'text-[#475569] hover:bg-[#F0F5FF] hover:text-[#0A2540]'}`}>{i.l}</button>
                  ))}
                </div>
              </div>

              {/* Search bar compact */}
              <div className="flex-1 max-w-[560px] hidden md:flex items-center">
                <div className="w-full bg-white border border-[#0E4CFF]/10 rounded-full shadow-soft flex items-center p-1.5">
                  <div className="flex-1 px-4">
                    <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94A3B8]">Où ?</div>
                    <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cotonou, Abomey..." className="w-full bg-transparent outline-none text-[13px] font-medium text-[#0A2540] placeholder:text-[#94A3B8]" />
                  </div>
                  <div className="w-[1px] h-8 bg-[#0E4CFF]/10" />
                  <div className="px-4 hidden lg:block">
                    <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94A3B8]">Dates</div>
                    <div className="text-[13px] font-medium text-[#0A2540]">Ajouter</div>
                  </div>
                  <div className="w-[1px] h-8 bg-[#0E4CFF]/10 hidden lg:block" />
                  <div className="flex items-center gap-1 pl-2">
                    <div className="flex bg-[#F0F5FF] rounded-full p-1">
                      {(['Courte', 'Longue'] as Stay[]).map(t => (
                        <button key={t} onClick={() => setStay(t)} className={`px-3 py-1 rounded-full text-[11px] font-semibold transition ${stay === t ? 'bg-[#0A2540] text-white shadow-soft' : 'text-[#64748B]'}`}>{t}</button>
                      ))}
                    </div>
                    <button className="w-9 h-9 rounded-full bg-[#0E4CFF] text-white grid place-items-center hover:bg-[#0A3DD1] transition">↗</button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setActiveTab('profil')} className="w-9 h-9 rounded-full bg-[#0A2540] text-white grid place-items-center text-[13px] font-bold">JD</button>
              </div>
            </div>

            {/* mobile search row */}
            <div className="md:hidden px-4 pb-3">
              <div className="bg-white border border-[#0E4CFF]/10 rounded-[16px] p-2 flex items-center gap-2 shadow-soft">
                <div className="flex-1 px-3"><input value={q} onChange={e => setQ(e.target.value)} placeholder="Où ? Cotonou..." className="w-full bg-transparent outline-none text-[14px] font-medium placeholder:text-[#94A3B8]" /></div>
                <div className="flex bg-[#F0F5FF] rounded-full p-1">
                  {(['Courte','Longue'] as Stay[]).map(t=> <button key={t} onClick={()=>setStay(t)} className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${stay===t?'bg-[#0A2540] text-white':'text-[#64748B]'}`}>{t}</button>)}
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-[1280px] mx-auto px-4 md:px-6 py-6 pb-[88px] md:pb-6">
            {/* EXPLORER */}
            {activeTab === 'explorer' && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h1 className="display text-[26px] md:text-[32px] text-[#0A2540] leading-[1.1]">Explorer • <span className="text-[#0E4CFF]">{filtered.length} logements</span></h1>
                  <div className="flex items-center gap-2">
                    <div className="flex bg-white rounded-full p-1 border border-[#0E4CFF]/10 shadow-soft">
                      <button onClick={() => setListMode('liste')} className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition ${listMode === 'liste' ? 'bg-[#0A2540] text-white' : 'text-[#64748B]'}`}>Liste</button>
                      <button onClick={() => setListMode('carte')} className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition ${listMode === 'carte' ? 'bg-[#0A2540] text-white' : 'text-[#64748B]'}`}>Carte</button>
                    </div>
                    <span className="text-[12px] text-[#94A3B8] hidden md:inline">{stay} durée • {q || 'Bénin'}</span>
                  </div>
                </div>

                <div className="mt-5 flex gap-2 overflow-x-auto scrollbar-none pb-1">
                  {['Tous','Meublés','Villa','Appart','Disponible','< 100k FCFA'].map(p => (
                    <button key={p} onClick={() => setFilter(p)} className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-medium border transition ${filter===p ? 'bg-[#0E4CFF] text-white border-[#0E4CFF] shadow-blue' : 'bg-white border-[#0E4CFF]/10 text-[#334155] hover:border-[#0E4CFF]/20'}`}>{p}</button>
                  ))}
                </div>

                {listMode === 'liste' ? (
                  <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filtered.map(l => (
                      <div key={l.id} onClick={() => setSelectedLogement(l.id)} className="group cursor-pointer bg-white rounded-[20px] border border-[#0E4CFF]/8 shadow-soft overflow-hidden hover:shadow-blue hover:-translate-y-0.5 transition-all duration-300">
                        <div className="h-[172px] bg-[#F0F5FF] relative p-3 flex flex-col justify-between overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#0E4CFF]/12 to-[#F0F5FF]" />
                          <div className="relative flex justify-between items-start">
                            <span className="px-2.5 py-1 rounded-full bg-white text-[10px] font-bold tracking-widest text-[#0A2540] shadow-soft">{l.dispo.toUpperCase()}</span>
                            <button onClick={(e) => { e.stopPropagation(); toggleFav(l.id); }} className={`w-8 h-8 rounded-full grid place-items-center backdrop-blur border transition ${favorites.includes(l.id) ? 'bg-[#0E4CFF] text-white border-[#0E4CFF]' : 'bg-white/90 border-black/5 text-[#0A2540] hover:bg-white'}`}>{favorites.includes(l.id) ? '♥' : '♡'}</button>
                          </div>
                          <div className="relative">
                            <div className="inline-flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-white grid place-items-center text-[11px] font-bold text-[#0A2540] shadow-soft">{l.ville.slice(0,2).toUpperCase()}</div>
                              <span className="px-2 py-0.5 rounded-full bg-[#0A2540] text-white text-[10px] font-semibold">{stay}</span>
                              {l.verified && <span className="px-2 py-0.5 rounded-full bg-[#0E4CFF] text-white text-[10px] font-bold">Vérifié</span>}
                            </div>
                            <div className="mt-3 text-[11px] text-[#475569]">{l.surface}</div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="font-semibold text-[14px] text-[#0A2540] leading-[1.3]">{l.ville}</div>
                            <div className="text-[12px] font-medium text-[#0A2540] shrink-0">★ {l.note} <span className="text-[#94A3B8]">({l.avis})</span></div>
                          </div>
                          <div className="mt-2 flex items-baseline gap-1.5">
                            <span className="display text-[18px] font-bold text-[#0A2540]">{stay === 'Courte' ? l.prix : l.prixMois} FCFA</span>
                            <span className="text-[11px] text-[#64748B]">/ {stay === 'Courte' ? 'nuit' : 'mois'} • {l.type}</span>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${l.meuble ? 'bg-[#F0F5FF] text-[#0E4CFF] border border-[#0E4CFF]/10' : 'bg-[#F8FAFF] text-[#94A3B8] border border-black/5'}`}>{l.meuble ? 'Meublé' : 'Non meublé'}</span>
                            <span className="px-2.5 py-1 rounded-full bg-[#0A2540]/5 text-[#0A2540] text-[11px]">Chat</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-4">
                    <div className="rounded-[24px] bg-[#F0F5FF] border border-[#0E4CFF]/10 h-[520px] relative overflow-hidden p-4">
                      <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-[radial-gradient(#0E4CFF_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.06]" />
                        <svg viewBox="0 0 400 600" className="w-full h-full opacity-[0.07]"><path d="M200 40 Q260 80 250 180 Q240 300 260 380 Q270 480 200 560 Q130 480 140 380 Q160 300 150 180 Q140 80 200 40Z" fill="#0A2540"/></svg>
                      </div>
                      <div className="relative h-full">
                        {filtered.slice(0,6).map((l,i)=>(
                          <div key={l.id} style={{ left: `${12 + (i*14)%68}%`, top: `${10 + (i*18)%72}%` }} className="absolute">
                            <div className="px-3 py-1.5 rounded-full bg-[#0A2540] text-white text-[11px] font-semibold shadow-blue flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0E4CFF] animate-pulse" />{l.ville.split(',')[0]} • {l.prix} FCFA
                            </div>
                          </div>
                        ))}
                        <div className="absolute bottom-3 left-3 right-3 bg-white rounded-[16px] border border-black/5 p-3 shadow-soft flex justify-between items-center">
                          <span className="text-[12px] font-medium text-[#0A2540]">Carte fictive • Cotonou & alentours</span>
                          <span className="text-[11px] px-2 py-1 rounded-full bg-[#F0F5FF] text-[#0E4CFF]">Bénin</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 max-h-[520px] overflow-auto pr-1">
                      {filtered.slice(0,4).map(l=>(
                        <div key={l.id} className="bg-white rounded-[18px] border border-[#0E4CFF]/8 p-3 flex gap-3 shadow-soft">
                          <div className="w-[72px] h-[72px] rounded-[14px] bg-[#F0F5FF] grid place-items-center font-bold text-[#0A2540]">{l.ville.slice(0,2).toUpperCase()}</div>
                          <div className="flex-1"><div className="text-[13px] font-semibold text-[#0A2540]">{l.ville}</div><div className="text-[12px] text-[#64748B] mt-1">{l.surface}</div><div className="text-[13px] font-bold text-[#0A2540] mt-1">{l.prix} FCFA <span className="font-normal text-[11px] text-[#64748B]">/ nuit</span></div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favoris' && (
              <div>
                <h2 className="display text-[26px] text-[#0A2540]">Favoris</h2>
                <p className="text-[14px] text-[#64748B] mt-1">Vos logements sauvegardés pour cette session.</p>
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {logements.filter(l=>favorites.includes(l.id)).map(l=>(
                    <div key={l.id} className="bg-white rounded-[20px] border border-[#0E4CFF]/8 shadow-soft p-4 flex gap-3">
                      <div className="w-[64px] h-[64px] rounded-[14px] bg-[#F0F5FF] grid place-items-center font-bold text-[#0A2540]">{l.ville.slice(0,2).toUpperCase()}</div>
                      <div className="flex-1"><div className="font-semibold text-[13px] text-[#0A2540]">{l.ville}</div><div className="text-[12px] text-[#64748B]">{l.prix} FCFA / nuit</div><button onClick={()=>toggleFav(l.id)} className="mt-2 text-[11px] px-2.5 py-1 rounded-full bg-[#0A2540] text-white">Retirer</button></div>
                    </div>
                  ))}
                  {favorites.length===0 && <div className="col-span-full rounded-[20px] bg-white border border-dashed border-[#0E4CFF]/20 p-10 text-center text-[#64748B]">Aucun favori. Ajoutez-en depuis Explorer ♥</div>}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="grid md:grid-cols-[340px_1fr] gap-4 h-[calc(100vh-160px)]">
                <div className="bg-white rounded-[20px] border border-[#0E4CFF]/8 shadow-soft overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-[#F0F5FF]"><div className="font-semibold text-[#0A2540]">Messages</div><div className="text-[12px] text-[#64748B]">3 conversations • Temps réel (mock)</div></div>
                  <div className="flex-1 overflow-auto">
                    {messagesMock.map(m=>(
                      <button key={m.id} onClick={()=>setActiveConv(m.id)} className={`w-full text-left p-4 flex gap-3 hover:bg-[#F0F5FF] transition border-b border-[#F0F5FF]/80 ${activeConv===m.id?'bg-[#F0F5FF]':''}`}>
                        <div className="w-10 h-10 rounded-full bg-[#0A2540] text-white grid place-items-center font-bold text-[12px]">{m.avatar}</div>
                        <div className="flex-1 min-w-0"><div className="flex justify-between items-center"><span className="font-medium text-[13px] text-[#0A2540] truncate">{m.name}</span><span className="text-[11px] text-[#94A3B8]">{m.time}</span></div><div className="text-[12px] text-[#64748B] truncate mt-0.5">{m.last}</div></div>
                        {m.unread>0 && <span className="w-5 h-5 rounded-full bg-[#0E4CFF] text-white grid place-items-center text-[10px] font-bold">{m.unread}</span>}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-[20px] border border-[#0E4CFF]/8 shadow-soft flex flex-col overflow-hidden">
                  {activeConv ? (
                    <>
                      <div className="p-4 border-b border-[#F0F5FF] flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-[#F0F5FF] grid place-items-center font-bold text-[#0A2540]">{messagesMock.find(x=>x.id===activeConv)?.avatar}</div><div className="font-semibold text-[14px] text-[#0A2540]">{messagesMock.find(x=>x.id===activeConv)?.name}</div></div><span className="px-2.5 py-1 rounded-full bg-[#0E4CFF]/10 text-[#0E4CFF] text-[11px] font-semibold">En ligne</span></div>
                      <div className="flex-1 p-4 space-y-3 bg-[#F8FAFF] overflow-auto">
                        <div className="max-w-[72%] bg-white border border-black/5 rounded-[16px] rounded-bl-[6px] p-3 text-[13px] text-[#334155] shadow-soft">Bonjour, l'appartement Haie Vive est-il toujours disponible pour 3 nuits à partir de demain ?</div>
                        <div className="max-w-[72%] ml-auto bg-[#0E4CFF] text-white rounded-[16px] rounded-br-[6px] p-3 text-[13px] shadow-blue">Oui, disponible ! Je vous envoie la localisation et les photos du salon. Vous pouvez réserver directement depuis l'annonce.</div>
                        <div className="max-w-[72%] bg-white border border-black/5 rounded-[16px] rounded-bl-[6px] p-3 text-[13px] shadow-soft flex items-center gap-2"><span className="w-8 h-8 rounded-[8px] bg-[#F0F5FF] grid place-items-center text-[14px]">📍</span> Haie Vive, Cotonou — localisation partagée</div>
                      </div>
                      <div className="p-3 border-t border-[#F0F5FF] flex gap-2">
                        <div className="flex-1 bg-[#F0F5FF] rounded-full px-4 h-11 flex items-center"><input placeholder="Écrire un message..." className="w-full bg-transparent outline-none text-[13px] placeholder:text-[#94A3B8]" /></div>
                        <button className="w-11 h-11 rounded-full bg-[#0E4CFF] text-white grid place-items-center">↗</button>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 grid place-items-center text-center p-8"><div><div className="w-14 h-14 rounded-full bg-[#F0F5FF] mx-auto grid place-items-center text-[20px] text-[#0E4CFF]">💬</div><div className="mt-3 font-semibold text-[#0A2540]">Sélectionnez une conversation</div><div className="text-[13px] text-[#64748B] mt-1">Chat temps réel mock — photos, docs, localisation</div></div></div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'reservations' && (
              <div>
                <h2 className="display text-[26px] text-[#0A2540]">Réservations</h2>
                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-[20px] border border-[#0E4CFF]/8 shadow-soft p-5">
                    <div className="flex justify-between items-center"><span className="text-[12px] uppercase tracking-widest font-semibold text-[#94A3B8]">Mes séjours</span><span className="px-2.5 py-1 rounded-full bg-[#0E4CFF] text-white text-[11px]">À venir</span></div>
                    <div className="mt-4 flex gap-3">
                      <div className="w-[64px] h-[64px] rounded-[14px] bg-[#F0F5FF] grid place-items-center font-bold text-[#0A2540]">HV</div>
                      <div><div className="font-semibold text-[#0A2540] text-[14px]">Haie Vive, Cotonou — Appart 45m²</div><div className="text-[12px] text-[#64748B] mt-1">12-15 Juin • 3 nuits • 105 000 FCFA</div><div className="mt-2 inline-flex px-2.5 py-1 rounded-full bg-[#0A2540]/5 text-[11px] text-[#0A2540]">Paiement confirmé</div></div>
                    </div>
                    <div className="mt-4 h-1.5 bg-[#F0F5FF] rounded-full overflow-hidden"><div className="h-full w-[72%] bg-[#0E4CFF] rounded-full" /></div>
                  </div>
                  <div className="bg-[#0A2540] rounded-[20px] p-5 text-white shadow-soft">
                    <div className="text-[12px] uppercase tracking-widest opacity-60">Mes demandes</div>
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between items-center bg-white/5 rounded-[12px] p-3 border border-white/10"><span className="text-[13px]">Fidjrossè — Longue durée</span><span className="text-[11px] px-2 py-1 rounded-full bg-white text-[#0A2540]">En attente</span></div>
                      <div className="flex justify-between items-center bg-white/5 rounded-[12px] p-3 border border-white/10"><span className="text-[13px]">Ouidah — Courte durée</span><span className="text-[11px] px-2 py-1 rounded-full bg-[#0E4CFF] text-white">Confirmée</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profil' && (
              <div className="grid lg:grid-cols-[360px_1fr] gap-6">
                <div className="space-y-4">
                  <div className="bg-white rounded-[20px] border border-[#0E4CFF]/8 shadow-soft p-6">
                    <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-full bg-[#0A2540] text-white grid place-items-center font-bold">JD</div><div><div className="font-semibold text-[#0A2540]">John Doe</div><div className="text-[12px] text-[#64748B]">+229 01 23 45 67 • Cotonou</div></div></div>
                    <div className="mt-5 flex bg-[#F0F5FF] rounded-full p-1">
                      <button onClick={()=>setModeProprio(false)} className={`flex-1 h-9 rounded-full text-[13px] font-semibold transition ${!modeProprio?'bg-[#0A2540] text-white shadow-soft':'text-[#64748B]'}`}>Client</button>
                      <button onClick={()=>setModeProprio(true)} className={`flex-1 h-9 rounded-full text-[13px] font-semibold transition ${modeProprio?'bg-[#0E4CFF] text-white shadow-blue':'text-[#64748B]'}`}>Propriétaire</button>
                    </div>
                    <div className="mt-5 grid gap-2 text-[13px]">
                      <button className="text-left px-4 py-3 rounded-[12px] bg-[#F8FAFF] border border-[#0E4CFF]/8 hover:bg-white transition">⚙️ Paramètres & préférences</button>
                      <button className="text-left px-4 py-3 rounded-[12px] bg-[#F8FAFF] border border-[#0E4CFF]/8 hover:bg-white transition">🛡️ Vérification d'identité</button>
                      <button onClick={()=>setView('landing')} className="text-left px-4 py-3 rounded-[12px] bg-[#F8FAFF] border border-[#0E4CFF]/8 hover:bg-white transition">↩️ Retour à la landing</button>
                    </div>
                  </div>
                  {!modeProprio && (
                    <div className="bg-[#0E4CFF] rounded-[20px] p-5 text-white shadow-blue">
                      <div className="text-[13px] font-semibold">Devenez hôte et augmentez vos revenus</div>
                      <div className="text-[12px] opacity-80 mt-1 leading-[1.5]">Publiez en 3 minutes, gérez votre calendrier et recevez vos paiements sécurisés.</div>
                      <button onClick={()=>setModeProprio(true)} className="mt-3 h-9 px-4 rounded-full bg-white text-[#0E4CFF] text-[12px] font-bold">Passer en mode hôte</button>
                    </div>
                  )}
                </div>

                <div>
                  {modeProprio ? (
                    <div>
                      <h3 className="display text-[22px] text-[#0A2540]">Mode Hôte • Dashboard</h3>
                      <div className="mt-4 grid sm:grid-cols-3 gap-3">
                        <div className="bg-white rounded-[16px] border border-[#0E4CFF]/8 p-4 shadow-soft"><div className="text-[11px] uppercase tracking-widest text-[#94A3B8]">Revenus ce mois</div><div className="display text-[22px] text-[#0A2540] mt-1">1 240 000 FCFA</div><div className="text-[11px] text-[#0E4CFF] mt-1">+12% vs mois dernier</div></div>
                        <div className="bg-white rounded-[16px] border border-[#0E4CFF]/8 p-4 shadow-soft"><div className="text-[11px] uppercase tracking-widest text-[#94A3B8]">Annonces actives</div><div className="display text-[22px] text-[#0A2540] mt-1">3 logements</div><div className="text-[11px] text-[#64748B] mt-1">2 vérifiées • 1 en attente</div></div>
                        <div className="bg-[#0A2540] rounded-[16px] p-4 text-white shadow-soft"><div className="text-[11px] uppercase tracking-widest opacity-60">Demandes</div><div className="display text-[22px] mt-1">8 nouvelles</div><div className="text-[11px] opacity-70 mt-1">Répondre dans 24h pour boost</div></div>
                      </div>
                      <div className="mt-6 grid md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-[20px] border border-[#0E4CFF]/8 shadow-soft p-5">
                          <div className="flex justify-between items-center"><span className="font-semibold text-[#0A2540] text-[14px]">Mes annonces</span><button className="px-3 py-1 rounded-full bg-[#0E4CFF] text-white text-[11px] font-semibold">+ Publier</button></div>
                          <div className="mt-4 space-y-3">
                            {logements.slice(0,3).map(l=>(
                              <div key={l.id} className="flex items-center justify-between bg-[#F8FAFF] rounded-[12px] p-3 border border-[#0E4CFF]/5"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-[10px] bg-white grid place-items-center font-bold text-[11px] text-[#0A2540] border border-black/5">{l.ville.slice(0,2).toUpperCase()}</div><div className="text-[13px] font-medium text-[#0A2540]">{l.ville}</div></div><span className="text-[10px] px-2 py-1 rounded-full bg-[#0E4CFF]/10 text-[#0E4CFF] font-bold">ACTIVE</span></div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white rounded-[20px] border border-[#0E4CFF]/8 shadow-soft p-5">
                          <div className="font-semibold text-[#0A2540] text-[14px]">Calendrier</div>
                          <div className="mt-4 grid grid-cols-7 gap-1 text-[11px] text-center">
                            {Array.from({length:28}).map((_,i)=>(
                              <div key={i} className={`h-8 grid place-items-center rounded-[8px] ${[3,4,5,12,13,20].includes(i)?'bg-[#0E4CFF] text-white font-bold':'bg-[#F0F5FF] text-[#64748B]'}`}>{i+1}</div>
                            ))}
                          </div>
                          <div className="mt-3 text-[11px] text-[#64748B]">Bleu = réservé • Calendrier intelligent anti-chevauchement</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="display text-[22px] text-[#0A2540]">Mon compte locataire</h3>
                      <div className="mt-4 bg-white rounded-[20px] border border-[#0E4CFF]/8 shadow-soft p-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="rounded-[14px] bg-[#F0F5FF] p-4"><div className="text-[11px] uppercase tracking-widest text-[#64748B]">Séjours</div><div className="text-[18px] font-bold text-[#0A2540] mt-1">2 séjours à venir</div></div>
                          <div className="rounded-[14px] bg-[#F0F5FF] p-4"><div className="text-[11px] uppercase tracking-widest text-[#64748B]">Favoris</div><div className="text-[18px] font-bold text-[#0A2540] mt-1">{favorites.length} logements</div></div>
                        </div>
                        <div className="mt-6 text-[13px] text-[#475569] leading-[1.6]">Un seul compte pour les deux modes. Passez en mode propriétaire à tout moment, même OTP, même messagerie.</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>

          {/* BOTTOM NAV MOBILE - 5 max */}
          <nav className="md:hidden fixed bottom-0 inset-x-0 z-30">
            <div className="mx-3 mb-3 rounded-[24px] bg-white/90 backdrop-blur-xl border border-[#0E4CFF]/10 shadow-blue px-2 py-2 flex justify-around" style={{ paddingBottom: 'calc(0.5rem + var(--safe-area-inset-bottom, 0px))' }}>
              {[
                { k: 'explorer', label: 'Accueil', icon: '⌂' },
                { k: 'favoris', label: 'Favoris', icon: '♡' },
                { k: 'messages', label: 'Messages', icon: '✉' },
                { k: 'reservations', label: 'Séjours', icon: '◫' },
                { k: 'profil', label: 'Profil', icon: '○' },
              ].map(item => {
                const active = activeTab === item.k;
                return (
                  <button key={item.k} onClick={() => setActiveTab(item.k as Tab)} className={`flex flex-col items-center justify-center w-[56px] h-[56px] rounded-[16px] transition ${active ? 'bg-[#0A2540] text-white' : 'text-[#64748B] hover:bg-[#F0F5FF]'}`}>
                    <span className={`text-[18px] leading-none ${active ? 'text-white' : 'text-[#0A2540]'}`}>{item.icon}</span>
                    <span className={`text-[10px] mt-1 font-medium ${active ? 'text-white' : 'text-[#64748B]'}`}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      )}

          {/* FICHE LOGEMENT MODAL */}
          {detailLogement && (
            <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center">
              <div className="absolute inset-0 bg-[#0A2540]/60 backdrop-blur-[6px]" onClick={()=>setSelectedLogement(null)} />
              <div className="relative w-full md:max-w-[920px] max-h-[92vh] md:max-h-[85vh] bg-white rounded-t-[28px] md:rounded-[28px] shadow-blue overflow-hidden flex flex-col">
                <div className="h-[240px] md:h-[320px] bg-gradient-to-br from-[#E8F0FF] to-[#D6E4FF] relative shrink-0">
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-white text-[11px] font-bold text-[#0A2540] shadow-soft">{detailLogement.ville}</span>
                    {detailLogement.verified && <span className="px-3 py-1 rounded-full bg-[#0E4CFF] text-white text-[11px] font-bold shadow-soft">✓ Vérifié</span>}
                  </div>
                  <button onClick={()=>setSelectedLogement(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow-soft grid place-items-center">✕</button>
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-[#0A2540] text-white text-[11px] font-medium">{logementDetailMock.photos} photos • Vidéo</div>
                  <div className="absolute inset-0 grid place-items-center"><div className="text-[56px] opacity-10">⌂</div></div>
                </div>
                <div className="overflow-auto p-6 md:p-8">
                  <div className="flex justify-between gap-4">
                    <div><h2 className="display text-[24px] md:text-[28px] text-[#0A2540] leading-[1.1]">{detailLogement.type} • {detailLogement.surface}</h2><div className="text-[13px] text-[#64748B] mt-1">{detailLogement.ville} • {detailLogement.note}★ ({detailLogement.avis} avis)</div></div>
                    <div className="text-right shrink-0"><div className="display text-[22px] text-[#0A2540]">{stay==='Courte'? detailLogement.prix : detailLogement.prixMois} FCFA</div><div className="text-[11px] text-[#64748B]">/{stay==='Courte'? 'nuit':'mois'}</div></div>
                  </div>
                  <div className="mt-6 grid md:grid-cols-[1.2fr_0.8fr] gap-8">
                    <div>
                      <p className="text-[14px] leading-[1.6] text-[#334155]">{logementDetailMock.description}</p>
                      <div className="mt-5"><div className="text-[12px] font-semibold uppercase tracking-widest text-[#0A2540]">Équipements</div><div className="mt-3 flex flex-wrap gap-2">{logementDetailMock.equip.map(e=>(<span key={e} className="px-3 py-1.5 rounded-full bg-[#F0F5FF] border border-[#0E4CFF]/10 text-[12px] text-[#0A2540]">{e}</span>))}</div></div>
                      <div className="mt-5"><div className="text-[12px] font-semibold uppercase tracking-widest text-[#0A2540]">Règles</div><div className="mt-3 space-y-1">{logementDetailMock.regles.map(r=>(<div key={r} className="text-[13px] text-[#475569]">• {r}</div>))}</div></div>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-[16px] bg-[#F8FAFF] border border-[#0E4CFF]/10 p-4">
                        <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-[#0A2540] text-white grid place-items-center font-bold text-[12px]">MD</div><div><div className="text-[13px] font-semibold text-[#0A2540]">{logementDetailMock.proprio.name} {logementDetailMock.proprio.verified && <span className="text-[#0E4CFF]">✓</span>}</div><div className="text-[11px] text-[#64748B]">Répond {logementDetailMock.proprio.response} • {logementDetailMock.proprio.rate}★</div></div></div>
                        <div className="mt-3 grid grid-cols-2 gap-2"><button className="h-10 rounded-full bg-white border border-black/10 text-[13px] font-medium">Appeler</button><button onClick={()=>{setSelectedLogement(null); setActiveTab('messages')}} className="h-10 rounded-full bg-[#0A2540] text-white text-[13px] font-semibold">Message</button></div>
                      </div>
                      <div className="rounded-[16px] bg-[#0A2540] text-white p-5 shadow-blue">
                        <div className="flex justify-between items-center"><span className="text-[13px] font-medium">Réserver</span><span className="text-[11px] opacity-70">{stay}</span></div>
                        <div className="mt-3 grid grid-cols-2 gap-2"><div className="bg-white/10 rounded-[12px] p-2.5"><div className="text-[10px] uppercase opacity-60">Arrivée</div><div className="text-[13px] font-semibold">12 Oct</div></div><div className="bg-white/10 rounded-[12px] p-2.5"><div className="text-[10px] uppercase opacity-60">Départ</div><div className="text-[13px] font-semibold">15 Oct</div></div></div>
                        <button className="mt-4 w-full h-11 rounded-full bg-[#0E4CFF] text-white font-semibold text-[14px]">Demander / Payer</button>
                        <div className="mt-2 text-[10px] opacity-60 text-center">Paiement sécurisé • Confirmation instantanée</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

    </div>
  );
}
