import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { hackathonsApi } from '../../api/hackathons';
import '../../styles/pages/participant/home.css';

export default function Home() {
  const navigate = useNavigate();
  const { registered } = useContext(AuthContext);

  const handleExplore = () => navigate('/hackathons');
  const handleCreate = () => {
    navigate('/signup?role=organizer');
  };
  const handleViewDetails = (id) => {
    navigate(`/hackathons/${id}`);
  };

  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentHackathons = async () => {
      try {
        const response = await hackathonsApi.getHackathons();
        const data = Array.isArray(response) ? response : (response.data?.results || response.data || []);
        // Filtre les brouillons, et on prend les 3 plus récents
        const recent = data
          .filter(h => h.status !== 'DRAFT' && h.status !== 'brouillon')
          .slice(0, 3);
        setHackathons(recent);
      } catch (error) {
        console.error("Failed to fetch hackathons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentHackathons();
  }, []);
  const handleJoin = () => {
    if (registered) {
      navigate('/profile');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section id="hero" className="hero-bg border-b border-amber-100 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
              Ton talent mérite d'être vu. On s'en occupe.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg md:text-xl">
              Un bon projet peut changer ton parcours, mais encore faut-il tomber sur la bonne opportunité. <strong>CodeToWin</strong> t’aide à découvrir les hackathons qui comptent, à travailler avec les bonnes personnes et à transformer ta participation en preuve concrète de compétence.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={handleExplore}
                className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-emerald-700 px-7 py-3.5 text-base font-semibold text-white transition duration-200 hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                Explorer les hackathons
              </button>
              <button
                type="button"
                onClick={handleCreate}
                className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition duration-200 hover:border-slate-500"
              >
                Créer un hackathon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HACKATHONS LIST SECTION */}
      <section id="hackathons" className="border-t border-slate-200 bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Les prochains challenges qui valent le déplacement
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              On sélectionne uniquement des hackathons sérieux — pour les{' '}
              <span className="keyword-highlight">devs</span>,{' '}
              <span className="keyword-highlight">designers</span>,{' '}
              <span className="keyword-highlight">data analysts</span>,{' '}
              <span className="keyword-highlight">makers</span> et{' '}
              <span className="keyword-highlight">jeunes innovateurs</span> qui ne veulent plus juste apprendre, mais prouver.
            </p>
          </div>

          <div className="mt-12 hackathon-list-grid">
            {loading ? (
              <div className="col-span-3 py-12 text-center text-slate-500">
                Chargement des hackathons récents...
              </div>
            ) : hackathons.length === 0 ? (
              <div className="col-span-3 py-12 text-center text-slate-500">
                Aucun hackathon publié pour le moment.
              </div>
            ) : (
              hackathons.map((hackathon) => (
                <article key={hackathon.id} className="hackathon-card">
                  <div className="hackathon-banner">
                    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                      <defs>
                        <linearGradient id={`home-card-${hackathon.id}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#0c3629" />
                          <stop offset="100%" stopColor="#04110d" />
                        </linearGradient>
                        <radialGradient id={`home-card-${hackathon.id}-glow`} cx="36%" cy="42%" r="58%">
                          <stop offset="0%" stopColor="#19e58f" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#19e58f" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                      <rect width="400" height="200" fill={`url(#home-card-${hackathon.id}-bg)`} />
                      <rect width="400" height="200" fill={`url(#home-card-${hackathon.id}-glow)`} />
                      <circle cx="122" cy="88" r="68" fill="#0f5d44" opacity="0.84" />
                      <circle cx="122" cy="88" r="68" fill="none" stroke="#19e58f" strokeWidth="0.6" opacity="0.32" />
                      <g fill="rgba(255,255,255,0.58)" fontFamily="Inter,sans-serif" fontSize="8" fontWeight="700" letterSpacing="0.5">
                        <text x="18" y="24">CODETOWIN · {hackathon.interest || 'INNOVATION'}</text>
                      </g>
                      <text x="18" y="132" fontFamily="Inter,sans-serif" fontSize="28" fontWeight="900" fill="white">
                        {hackathon.logo_text || hackathon.logoText || hackathon.title.substring(0, 10)}
                      </text>
                    </svg>
                  </div>

                  <div className="hackathon-body">
                    <div className="hackathon-top-row">
                      <span className="hackathon-date">
                        {hackathon.start_date || hackathon.start ? `${hackathon.start_date || hackathon.start}` : 'À venir'}
                      </span>
                      <span className="hackathon-participants flex items-center gap-1">
                        <svg width="15" height="15" fill="none" viewBox="0 0 16 16" stroke="#555555" strokeWidth="1.5">
                          <path d="M10 8a3 3 0 100-6 3 3 0 000 6zm-6 6c0-2.8 2.7-5 6-5s6 2.2 6 5" strokeLinecap="round"></path>
                          <path d="M2 14c0-2 1.5-3.5 3.5-4" strokeLinecap="round"></path>
                          <circle cx="4" cy="7" r="2.5"></circle>
                        </svg>
                        {hackathon.participants_count !== undefined ? hackathon.participants_count : (hackathon.participants || 0)}
                      </span>
                    </div>
                    <h3 className="hackathon-title">{hackathon.title}</h3>
                    <div className="hackathon-body-meta">
                      <div className="hackathon-body-meta-item">
                        <span className="hackathon-body-meta-label">Lieu</span>
                        <span className="hackathon-body-meta-value">{hackathon.location || 'En ligne'}</span>
                      </div>
                      <div className="hackathon-body-meta-item">
                        <span className="hackathon-body-meta-label">Prix</span>
                        <span className="hackathon-body-meta-value">{hackathon.prize || '-'}</span>
                      </div>
                    </div>
                    <button type="button" onClick={() => handleViewDetails(hackathon.id)} className="hackathon-link">
                      Voir le challenge
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h13M13 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={handleExplore}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-900"
            >
              Voir tous les hackathons
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h13M13 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </button>
          </div>
        </div>
      </section>

      {/* PARTICIPATE PROCESS GUIDE */}
      <section id="participer" className="border-t border-slate-200 bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-center lg:text-left font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Tu veux <span className="headline-outline-green">participer</span> ? Voici comment démarrer.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-center lg:text-left text-base leading-8 text-slate-500 sm:text-lg">
                En quatre étapes simples, tu passes de la découverte à la participation sans te perdre dans les canaux dispersés.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">1</div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Choisis un hackathon</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">Filtre par thème, format, pays et niveau pour trouver le bon défi.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">2</div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Rejoins ou crée ton équipe</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">Trouve des coéquipiers motivés ou lance ton propre groupe.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">3</div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Construis et soumets</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">Travaille sur ton projet, partage ta démo et dépose ta soumission.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">4</div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Garde une preuve visible</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">Ton profil conserve ton projet, tes badges et tes certificats vérifiables.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={handleJoin}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  Créer mon profil gratuitement
                </button>
              </div>
            </div>

            <div>
              <img
                src="/assets/illustrations/participant-profile.png"
                alt="Profil public d'un participant"
                className="h-auto w-full object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ORGANISER PROCESS GUIDE */}
      <section id="organiser" className="border-t border-slate-200 bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-center lg:text-left font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Tu veux <span className="headline-outline-green">organiser</span> un hackathon ? Voici comment démarrer.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-center lg:text-left text-base leading-8 text-slate-500 sm:text-lg">
                En quelques étapes, tu passes d’une idée à un événement clair, centralisé et facile à suivre.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">1</div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Publie ton hackathon</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">Ajoute le thème, les dates, le format, la localisation et les récompenses.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">2</div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Centralise les inscriptions</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">Garde les participants, les équipes et les candidatures au même endroit.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">3</div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Suis les projets</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">Visualise les équipes, les soumissions et les résultats sans feuilles dispersées.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">4</div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Génère des certificats</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">Donne une preuve claire et vérifiable à chaque participant.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={handleCreate}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  Publier mon hackathon
                </button>
              </div>
            </div>

            <div>
              <img
                src="/assets/illustrations/organisateur-dashboard.png"
                alt="Tableau de bord organisateur"
                className="h-auto w-full object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENCES SECTION */}
      <section id="difference" className="border-t border-slate-200 bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Ce qui rend <strong className="font-semibold">CodeToWin</strong> différent
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="rounded-[11px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-[11px] border border-slate-200 text-emerald-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="6" strokeLinecap="round" strokeLinejoin="round"></circle>
                  <path d="M16 16l4 4" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-slate-900">Des hackathons vraiment trouvables</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Pays, thème, format, deadline, prix, niveau — tout ce qu'il faut savoir est visible dès le départ. Pas de mauvaises surprises.
              </p>
            </article>

            <article className="rounded-[11px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-[11px] border border-slate-200 text-emerald-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="m9 6-5 6 5 6" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="m15 6 5 6-5 6" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-slate-900">Des projets qui laissent une trace</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Chaque participant peut documenter son équipe, sa solution, son repo GitHub, sa démo live et son résultat. Ton travail reste visible bien après la fin du hackathon.
              </p>
            </article>

            <article className="rounded-[11px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-[11px] border border-slate-200 text-emerald-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="4" width="11" height="16" rx="2"></rect>
                  <path d="M7 8h5M7 11h5M7 14h4" strokeLinecap="round" strokeLinejoin="round"></path>
                  <circle cx="17" cy="15" r="2.5"></circle>
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-slate-900">Des certificats vérifiables</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Participation, finaliste, gagnant, mentor — chaque certificat est consultable publiquement via un identifiant unique ou un QR code.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section id="cta" className="border-t border-slate-900 bg-slate-950 py-20 text-white lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            <strong className="font-semibold">CodeToWin</strong>, c'est plus qu'un calendrier de hackathons.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            C'est l'infrastructure qui manquait à l'écosystème tech africain : un espace pour construire, collaborer, se faire repérer et prouver ses compétences — avec des vraies preuves à l'appui.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handleExplore}
              className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-emerald-700 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-emerald-800"
            >
              Explorer les hackathons
            </button>
            <button
              type="button"
              onClick={handleCreate}
              className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Créer un hackathon
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
