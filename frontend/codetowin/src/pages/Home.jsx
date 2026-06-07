import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../assets/css/home.css';

export default function Home() {
  const navigate = useNavigate();
  const { registered } = useContext(AuthContext);

  const handleExplore = () => navigate('/hackathons');
  const handleCreate = () => {
    alert("La création de hackathon sera disponible prochainement dans l'espace Organisateur !");
  };
  const handleViewDetails = (slug) => {
    navigate(`/hackathons/google-cloud-rapid-agent`);
  };
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
            {/* CARD 1 */}
            <article className="hackathon-card">
              <div className="hackathon-banner">
                <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <defs>
                    <linearGradient id="home-card-1-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0c3629" />
                      <stop offset="100%" stopColor="#04110d" />
                    </linearGradient>
                    <radialGradient id="home-card-1-glow" cx="36%" cy="42%" r="58%">
                      <stop offset="0%" stopColor="#19e58f" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#19e58f" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="400" height="200" fill="url(#home-card-1-bg)" />
                  <rect width="400" height="200" fill="url(#home-card-1-glow)" />
                  <circle cx="122" cy="88" r="68" fill="#0f5d44" opacity="0.84" />
                  <circle cx="122" cy="88" r="68" fill="none" stroke="#19e58f" strokeWidth="0.6" opacity="0.32" />
                  <rect x="258" y="76" width="12" height="100" rx="6" fill="#03110b" opacity="0.82" />
                  <path d="M274 87c18-18 54-18 72 0" fill="none" stroke="#03110b" strokeWidth="12" strokeLinecap="round" opacity="0.85" />
                  <path d="M274 110c24-10 44-10 68 0" fill="none" stroke="#03110b" strokeWidth="10" strokeLinecap="round" opacity="0.8" />
                  <path d="M274 132c20-6 40-6 60 0" fill="none" stroke="#03110b" strokeWidth="8" strokeLinecap="round" opacity="0.75" />
                  <g fill="rgba(255,255,255,0.58)" fontFamily="Inter,sans-serif" fontSize="8" fontWeight="700" letterSpacing="0.5">
                    <text x="18" y="24">CODETOWIN · CLIMATE BUILDERS</text>
                  </g>
                  <text x="18" y="132" fontFamily="Inter,sans-serif" fontSize="28" fontWeight="900" fill="white">AI CLIMATE</text>
                  <text x="18" y="158" fontFamily="Inter,sans-serif" fontSize="28" fontWeight="900" fill="white">SPRINT</text>
                </svg>
                <div className="hackathon-status hackathon-status--register">Register</div>
                <div className="hackathon-format">Hybrid</div>
              </div>

              <div className="hackathon-body">
                <div className="hackathon-top-row">
                  <span className="hackathon-date">24–26 MAY 2026</span>
                  <span className="hackathon-participants flex items-center gap-1">
                    <svg width="15" height="15" fill="none" viewBox="0 0 16 16" stroke="#555555" strokeWidth="1.5">
                      <path d="M10 8a3 3 0 100-6 3 3 0 000 6zm-6 6c0-2.8 2.7-5 6-5s6 2.2 6 5" strokeLinecap="round"></path>
                      <path d="M2 14c0-2 1.5-3.5 3.5-4" strokeLinecap="round"></path>
                      <circle cx="4" cy="7" r="2.5"></circle>
                    </svg>
                    561
                  </span>
                </div>
                <h3 className="hackathon-title">AI Climate Sprint</h3>
                <div className="hackathon-body-meta">
                  <div className="hackathon-body-meta-item">
                    <span className="hackathon-body-meta-label">Organisateur</span>
                    <span className="hackathon-body-meta-value">Climate Builders Lab</span>
                  </div>
                  <div className="hackathon-body-meta-item">
                    <span className="hackathon-body-meta-label">Prix</span>
                    <span className="hackathon-body-meta-value">$5,000</span>
                  </div>
                </div>
                <button type="button" onClick={() => handleViewDetails('ai-climate-sprint')} className="hackathon-link">
                  Voir le challenge
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h13M13 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </button>
              </div>
            </article>

            {/* CARD 2 */}
            <article className="hackathon-card">
              <div className="hackathon-banner">
                <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <defs>
                    <linearGradient id="home-card-2-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#070d18" />
                      <stop offset="100%" stopColor="#0b1624" />
                    </linearGradient>
                    <radialGradient id="home-card-2-glow" cx="52%" cy="28%" r="62%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="400" height="200" fill="url(#home-card-2-bg)" />
                  <rect width="400" height="200" fill="url(#home-card-2-glow)" />
                  <g fill="#0e1f33" opacity="0.95">
                    <rect x="0" y="116" width="28" height="84" />
                    <rect x="24" y="92" width="22" height="108" />
                    <rect x="42" y="108" width="16" height="92" />
                    <rect x="58" y="76" width="30" height="124" />
                    <rect x="86" y="100" width="18" height="100" />
                    <rect x="102" y="66" width="34" height="134" />
                    <rect x="134" y="88" width="20" height="112" />
                    <rect x="152" y="58" width="26" height="142" />
                    <rect x="176" y="82" width="18" height="118" />
                    <rect x="192" y="70" width="28" height="130" />
                    <rect x="220" y="94" width="16" height="106" />
                    <rect x="234" y="62" width="24" height="138" />
                    <rect x="256" y="92" width="18" height="108" />
                    <rect x="274" y="76" width="26" height="124" />
                    <rect x="298" y="100" width="20" height="100" />
                    <rect x="316" y="72" width="28" height="128" />
                    <rect x="342" y="88" width="16" height="112" />
                    <rect x="356" y="56" width="24" height="144" />
                    <rect x="378" y="80" width="22" height="120" />
                  </g>
                  <g fill="#38bdf8" opacity="0.45">
                    <rect x="30" y="100" width="3" height="3"></rect>
                    <rect x="36" y="100" width="3" height="3"></rect>
                    <rect x="66" y="84" width="3" height="3"></rect>
                    <rect x="73" y="84" width="3" height="3"></rect>
                    <rect x="106" y="76" width="3" height="3"></rect>
                    <rect x="113" y="76" width="3" height="3"></rect>
                    <rect x="154" y="66" width="3" height="3"></rect>
                    <rect x="161" y="66" width="3" height="3"></rect>
                    <rect x="236" y="72" width="3" height="3"></rect>
                    <rect x="243" y="72" width="3" height="3"></rect>
                    <rect x="316" y="80" width="3" height="3"></rect>
                    <rect x="323" y="80" width="3" height="3"></rect>
                    <rect x="356" y="68" width="3" height="3"></rect>
                    <rect x="363" y="68" width="3" height="3"></rect>
                  </g>
                  <g fill="rgba(255,255,255,0.56)" fontFamily="Inter,sans-serif" fontSize="8" fontWeight="700" letterSpacing="0.5">
                    <text x="18" y="24">CODETOWIN · FINTECH INNOVATORS</text>
                  </g>
                  <text x="18" y="132" fontFamily="Inter,sans-serif" fontSize="28" fontWeight="900" fill="white">FINTECH</text>
                  <text x="18" y="158" fontFamily="Inter,sans-serif" fontSize="28" fontWeight="900" fill="white">BUILDERS</text>
                </svg>
                <div className="hackathon-status hackathon-status--finished">TBA</div>
                <div className="hackathon-format">Hybrid</div>
              </div>

              <div className="hackathon-body">
                <div className="hackathon-top-row">
                  <span className="hackathon-date">To be announced</span>
                  <span className="hackathon-participants flex items-center gap-1">
                    <svg width="15" height="15" fill="none" viewBox="0 0 16 16" stroke="#555555" strokeWidth="1.5">
                      <path d="M10 8a3 3 0 100-6 3 3 0 000 6zm-6 6c0-2.8 2.7-5 6-5s6 2.2 6 5" strokeLinecap="round"></path>
                      <path d="M2 14c0-2 1.5-3.5 3.5-4" strokeLinecap="round"></path>
                      <circle cx="4" cy="7" r="2.5"></circle>
                    </svg>
                    375
                  </span>
                </div>
                <h3 className="hackathon-title">Fintech Builders Challenge</h3>
                <div className="hackathon-body-meta">
                  <div className="hackathon-body-meta-item">
                    <span className="hackathon-body-meta-label">Organisateur</span>
                    <span className="hackathon-body-meta-value">Lagos Fintech Hub</span>
                  </div>
                  <div className="hackathon-body-meta-item">
                    <span className="hackathon-body-meta-label">Prix</span>
                    <span className="hackathon-body-meta-value">$8,000</span>
                  </div>
                </div>
                <button type="button" onClick={() => handleViewDetails('fintech-builders-challenge')} className="hackathon-link">
                  Voir le challenge
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h13M13 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </button>
              </div>
            </article>

            {/* CARD 3 */}
            <article className="hackathon-card">
              <div className="hackathon-banner">
                <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <defs>
                    <linearGradient id="home-card-3-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#050818" />
                      <stop offset="100%" stopColor="#0a0f22" />
                    </linearGradient>
                    <radialGradient id="home-card-3-glow-1" cx="70%" cy="40%" r="50%">
                      <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="home-card-3-glow-2" cx="30%" cy="60%" r="40%">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.42" />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="400" height="200" fill="url(#home-card-3-bg)" />
                  <rect width="400" height="200" fill="url(#home-card-3-glow-1)" />
                  <rect width="400" height="200" fill="url(#home-card-3-glow-2)" />
                  <g fill="#4a9eff" opacity="0.58">
                    <circle cx="300" cy="25" r="2"></circle>
                    <circle cx="325" cy="18" r="1.5"></circle>
                    <circle cx="350" cy="30" r="2.5"></circle>
                    <circle cx="375" cy="15" r="1.5"></circle>
                    <circle cx="315" cy="45" r="1.5"></circle>
                    <circle cx="345" cy="52" r="2"></circle>
                    <circle cx="370" cy="42" r="1.5"></circle>
                    <circle cx="385" cy="58" r="2.5"></circle>
                    <circle cx="295" cy="60" r="1.5"></circle>
                    <circle cx="260" cy="35" r="2"></circle>
                    <circle cx="280" cy="70" r="1.5"></circle>
                    <circle cx="360" cy="75" r="1.5"></circle>
                    <circle cx="390" cy="80" r="2"></circle>
                    <circle cx="255" cy="75" r="1.5"></circle>
                  </g>
                  <g stroke="#4a9eff" strokeOpacity="0.2" strokeWidth="0.7">
                    <line x1="300" y1="25" x2="325" y2="18"></line>
                    <line x1="325" y1="18" x2="350" y2="30"></line>
                    <line x1="350" y1="30" x2="375" y2="15"></line>
                    <line x1="350" y1="30" x2="345" y2="52"></line>
                    <line x1="345" y1="52" x2="370" y2="42"></line>
                    <line x1="370" y1="42" x2="385" y2="58"></line>
                    <line x1="315" y1="45" x2="295" y2="60"></line>
                    <line x1="260" y1="35" x2="295" y2="60"></line>
                    <line x1="280" y1="70" x2="260" y2="35"></line>
                    <line x1="360" y1="75" x2="385" y2="58"></line>
                  </g>
                  <g fill="rgba(255,255,255,0.48)" fontFamily="Inter,sans-serif" fontSize="8" fontWeight="700" letterSpacing="0.5">
                    <text x="18" y="22">CODETOWIN · AGRITECH BUILDERS</text>
                  </g>
                  <text x="18" y="132" fontFamily="Inter,sans-serif" fontSize="28" fontWeight="900" fill="white">AGRITECH</text>
                  <text x="18" y="158" fontFamily="Inter,sans-serif" fontSize="28" fontWeight="900" fill="white">YOUTH HACK</text>
                </svg>
                <div className="hackathon-status hackathon-status--finished">Finished</div>
                <div className="hackathon-format">Remote</div>
              </div>

              <div className="hackathon-body">
                <div className="hackathon-top-row">
                  <span className="hackathon-date">25–31 MAY 2026</span>
                  <span className="hackathon-participants flex items-center gap-1">
                    <svg width="15" height="15" fill="none" viewBox="0 0 16 16" stroke="#555555" strokeWidth="1.5">
                      <path d="M10 8a3 3 0 100-6 3 3 0 000 6zm-6 6c0-2.8 2.7-5 6-5s6 2.2 6 5" strokeLinecap="round"></path>
                      <path d="M2 14c0-2 1.5-3.5 3.5-4" strokeLinecap="round"></path>
                      <circle cx="4" cy="7" r="2.5"></circle>
                    </svg>
                    2310
                  </span>
                </div>
                <h3 className="hackathon-title">AgriTech Youth Hack</h3>
                <div className="hackathon-body-meta">
                  <div className="hackathon-body-meta-item">
                    <span className="hackathon-body-meta-label">Organisateur</span>
                    <span className="hackathon-body-meta-value">AgriTech Collective</span>
                  </div>
                  <div className="hackathon-body-meta-item">
                    <span className="hackathon-body-meta-label">Prix</span>
                    <span className="hackathon-body-meta-value">$3,000</span>
                  </div>
                </div>
                <button type="button" onClick={() => handleViewDetails('agritech-youth-hack')} className="hackathon-link">
                  Voir le challenge
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h13M13 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </button>
              </div>
            </article>
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
