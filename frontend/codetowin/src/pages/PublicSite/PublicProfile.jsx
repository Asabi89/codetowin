import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { 
  Mail, 
  MapPin, 
  Star, 
  Award, 
  BookOpen, 
  Calendar, 
  ExternalLink, 
  MessageSquare, 
  Activity,
  Briefcase
} from 'lucide-react';
import { mentorsApi } from '../../api/mentors';
import { usersApi } from '../../api/users';
import EmbeddedPublicView from '../../components/common/EmbeddedPublicView';
import useAuth from '../../hooks/useAuth';
import {
  canViewFullProfile,
  canViewSensitiveProfileInfo,
  getVisibilityLabel,
  isProfileDiscoverable,
} from '../../services/profileVisibility';

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const publicProfiles = {
  organizers: {
    'techhub-senegal': {
      role: 'organizer',
      visibility: 'public',
      name: 'TechHub Sénégal',
      title: "Incubateur d'innovations numériques",
      location: 'Dakar, Sénégal',
      avatar: 'https://ui-avatars.com/api/?name=TechHub+Senegal&background=047857&color=fff&size=160',
      cover: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
      bio: "TechHub Sénégal accompagne les talents tech africains à travers des hackathons, programmes d'incubation et connexions avec des experts métiers.",
      tags: ['Innovation', 'Incubation', 'Data Science', 'GreenTech'],
      stats: [
        { label: 'Hackathons organisés', value: '18', icon: Award },
        { label: 'Participants accompagnés', value: '2 400+', icon: Activity },
        { label: 'Projets incubés', value: '64', icon: Briefcase },
      ],
      highlights: [
        { title: 'AI for Climate Africa', role: 'Organisateur Principal', date: 'Mai 2026' },
        { title: 'FinTech Builders Dakar', role: 'Co-organisateur', date: 'Févr 2026' },
        { title: 'HealthTech Challenge Sénégal', role: 'Organisateur unique', date: 'Nov 2025' },
      ],
      socials: {
        linkedin: 'https://linkedin.com',
        website: 'https://techhub.sn',
        email: 'contact@techhub.sn',
      },
      contactLabel: 'Contacter l’organisateur',
      contactTo: '/contact',
    },
  },
  mentors: {
    'dr-ousmane-diop': {
      role: 'mentor',
      visibility: 'public',
      name: 'Dr. Ousmane Diop',
      title: 'Expert IA & Data Science',
      location: 'Dakar, Sénégal',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      cover: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
      bio: "Mentor spécialisé en intelligence artificielle appliquée, Ousmane aide les équipes à cadrer leurs problèmes, structurer leurs modèles et présenter des solutions robustes.",
      tags: ['IA', 'Machine Learning', 'Python', 'Pitch produit'],
      stats: [
        { label: 'Équipes mentorées', value: '32', icon: Briefcase },
        { label: 'Note moyenne', value: '4.9/5', icon: Star },
        { label: 'Hackathons', value: '12', icon: Award },
      ],
      highlights: [
        { title: 'AI for Climate Africa', role: 'Mentor Principal', date: 'Mai 2026' },
        { title: 'AgriData Challenge', role: 'Jury & Spécialiste IA', date: 'Mars 2026' },
        { title: 'Smart Cities Hackathon', role: 'Superviseur technique', date: 'Janv 2026' },
      ],
      socials: {
        linkedin: 'https://linkedin.com/in/ousmanediop',
        website: 'https://ousmanediop.com',
        email: 'ousmane.diop@example.com',
      },
      contactLabel: 'Demander un mentorat',
      contactTo: '/contact',
    },
    'marie-kone': {
      role: 'mentor',
      visibility: 'public',
      name: 'Marie Koné',
      title: 'Lead Product Designer',
      location: 'Abidjan, Côte d’Ivoire',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      cover: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
      bio: "Marie accompagne les équipes sur la recherche utilisateur, le prototypage rapide et la narration produit pour les jurys.",
      tags: ['UX Research', 'Design Sprint', 'Figma', 'Storytelling'],
      stats: [
        { label: 'Équipes mentorées', value: '27', icon: Briefcase },
        { label: 'Note moyenne', value: '4.8/5', icon: Star },
        { label: 'Hackathons', value: '10', icon: Award },
      ],
      highlights: [
        { title: 'Women In Tech Challenge', role: 'Mentor UX/UI', date: 'Avril 2026' },
        { title: 'FinTech Builders Dakar', role: 'Jury Design', date: 'Févr 2026' },
        { title: 'EduTech Sprint', role: 'Facilitatrice Design Sprint', date: 'Oct 2025' },
      ],
      socials: {
        linkedin: 'https://linkedin.com',
        website: 'https://mariekone.design',
        email: 'marie.kone@example.com',
      },
      contactLabel: 'Demander un mentorat',
      contactTo: '/contact',
    },
  },
};

const fallbackByType = {
  organizers: publicProfiles.organizers['techhub-senegal'],
  mentors: publicProfiles.mentors['dr-ousmane-diop'],
};

const getName = (data) => {
  if (data?.name) return data.name;
  const fullName = [data?.firstName || data?.first_name, data?.lastName || data?.last_name].filter(Boolean).join(' ');
  return fullName || data?.email || null;
};

const normalizeProfile = (data, type, fallback) => ({
  ...fallback,
  role: type === 'organizers' ? 'organizer' : 'mentor',
  visibility: data?.visibility || fallback.visibility,
  name: getName(data) || fallback.name,
  title: data?.title || data?.headline || data?.role || data?.specialty || fallback.title,
  location: data?.location || data?.city || data?.country || fallback.location,
  avatar: data?.avatar || data?.avatarUrl || data?.avatar_url || data?.logo || fallback.avatar,
  cover: data?.cover || data?.coverUrl || data?.bannerUrl || fallback.cover,
  bio: data?.bio || data?.description || data?.about || fallback.bio,
  tags: data?.tags || data?.skills || data?.expertise || fallback.tags,
  stats: fallback.stats,
  highlights: data?.hackathons || data?.events || fallback.highlights,
  socials: {
    linkedin: data?.linkedin || data?.linkedinUrl || fallback.socials?.linkedin,
    website: data?.website || data?.portfolioUrl || fallback.socials?.website,
    email: data?.email || fallback.socials?.email,
  }
});

export default function PublicProfile({
  profileType: forcedProfileType,
  embedded = false,
  backTo,
  backLabel,
}) {
  const { id } = useParams();
  const location = useLocation();
  const { registered, role } = useAuth();
  const profileType = forcedProfileType || (location.pathname.includes('/organizers/') ? 'organizers' : 'mentors');
  const fallback = publicProfiles[profileType]?.[id] || fallbackByType[profileType];
  const [profile, setProfile] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const viewer = { registered, role, embedded };
  const canViewFull = canViewFullProfile(profile, viewer);
  const canViewSensitive = canViewSensitiveProfileInfo(profile, viewer);

  const backLink = useMemo(() => (
    backTo && backLabel
      ? { to: backTo, label: backLabel }
      : profileType === 'organizers'
      ? { to: '/hackathons', label: 'Retour aux hackathons' }
      : { to: '/talents', label: 'Retour au réseau' }
  ), [backLabel, backTo, profileType]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = profileType === 'mentors'
          ? await mentorsApi.getMentorById(id)
          : await usersApi.getUserById(id);
        setProfile(normalizeProfile(data, profileType, fallback));
      } catch (err) {
        console.warn('Profil public indisponible côté API, fallback local utilisé.', err);
        setProfile(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [fallback, id, profileType]);

  const roleLabel = profile.role === 'organizer' ? 'Organisateur' : 'Mentor';

  if (!isProfileDiscoverable(profile) && !canViewFull) {
    return (
      <EmbeddedPublicView
        embedded={embedded}
        backTo={backLink.to}
        backLabel={backLink.label}
        notice="Ce profil est privé."
      >
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="font-display text-2xl font-extrabold text-slate-900">Profil privé</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
            Cette personne ou organisation ne rend pas son profil visible publiquement.
          </p>
        </div>
      </EmbeddedPublicView>
    );
  }

  return (
    <EmbeddedPublicView
      embedded={embedded}
      backTo={backLink.to}
      backLabel={backLink.label}
      notice="Vous consultez ce profil sans quitter votre espace dashboard."
    >
        {/* Profile Card Header */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
          {/* Banner Section */}
          <div className="relative h-48 bg-slate-100 sm:h-64 md:h-72">
            <img src={profile.cover} alt="" className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
            
            <div className="absolute right-5 top-5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-700 shadow-md backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-600"></span>
                {roleLabel}
              </span>
              <span className="inline-flex items-center rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-md backdrop-blur-md">
                {getVisibilityLabel(profile)}
              </span>
            </div>

            {/* Banner bottom profile overview */}
            <div className="absolute bottom-6 left-6 right-6 hidden sm:flex items-end justify-between">
              <div className="flex items-end gap-5">
                <div className="relative h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl">
                  <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
                </div>
                <div className="mb-2 text-white">
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-sm">{profile.name}</h1>
                  <p className="text-sm font-medium text-slate-200/90 flex items-center gap-1.5 mt-1">
                    <MapPin className="h-4 w-4 text-slate-300" />
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Basic Info Mobile & Bottom controls */}
          <div className="p-6 sm:px-8 sm:py-6 bg-white border-b border-slate-100">
            {/* Mobile View Profile Details */}
            <div className="flex flex-col gap-4 sm:hidden -mt-16 mb-4 relative z-10">
              <div className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg">
                <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-extrabold text-slate-900">{profile.name}</h1>
                <p className="text-sm font-medium text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  {profile.location}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <h2 className="text-lg font-bold text-slate-900">{profile.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  {canViewFull && profile.bio ? profile.bio.substring(0, 120) + '...' : 'Identité publique visible. Les détails complets dépendent des paramètres de visibilité.'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {canViewSensitive && profile.socials?.linkedin && (
                  <a 
                    href={profile.socials.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                <Link 
                  to={profile.contactTo || '/contact'} 
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition-all hover:scale-[1.02]"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {profile.contactLabel || 'Contacter'}
                </Link>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {profile.tags.map((tag) => (
                <span key={tag} className="rounded-lg bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 border border-brand-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {!canViewFull && (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <strong className="font-semibold">Profil complet réservé aux membres autorisés.</strong>{" "}
            Vous voyez l’identité publique. Connectez-vous ou ouvrez ce profil depuis un dashboard lié pour voir les détails.
          </div>
        )}

        {loading && (
          <div className="mt-8 flex justify-center py-6">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-brand-600"></span>
              <span className="text-sm font-medium">Chargement des détails...</span>
            </div>
          </div>
        )}

        {/* Profile Main Grid Content */}
        {canViewFull && <div className="mt-6 grid gap-6 md:grid-cols-3">
          {/* Bio Column */}
          <div className="md:col-span-2 space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-brand-600" />
                À propos
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 whitespace-pre-line">{profile.bio}</p>
            </section>

            {/* Hackathons Highlights */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-brand-600" />
                {profile.role === 'organizer' ? 'Hackathons organisés' : 'Hackathons accompagnés'}
              </h3>
              
              <div className="mt-6 space-y-4">
                {Array.isArray(profile.highlights) && profile.highlights.length > 0 ? (
                  profile.highlights.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-brand-200 hover:shadow-sm transition-all"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                          {typeof item === 'string' ? item : item?.title}
                        </h4>
                        {typeof item !== 'string' && item?.role && (
                          <p className="text-xs text-slate-500 mt-0.5">{item.role}</p>
                        )}
                      </div>
                      {typeof item !== 'string' && item?.date && (
                        <span className="inline-flex self-start sm:self-center items-center rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600">
                          {item.date}
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 italic">Aucune information sur les hackathons.</p>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Stats Column */}
          <div className="space-y-6">
            {/* Impact Metrics */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="h-5 w-5 text-brand-600" />
                Impact & Chiffres
              </h3>
              
              <div className="mt-5 space-y-4">
                {profile.stats.map((stat, index) => {
                  const Icon = stat.icon || Award;
                  return (
                    <div key={index} className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-slate-500">{stat.label}</dt>
                        <dd className="text-base font-extrabold text-slate-900 mt-0.5">{stat.value}</dd>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Quick Contact / Socials */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-brand-600" />
                Coordonnées
              </h3>
              
              <div className="mt-5 space-y-3.5">
                {canViewSensitive && profile.socials?.email && (
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                    <a href={`mailto:${profile.socials.email}`} className="hover:text-brand-600 truncate transition-colors">
                      {profile.socials.email}
                    </a>
                  </div>
                )}
                {canViewSensitive && profile.socials?.website && (
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <ExternalLink className="h-4 w-4 text-slate-400 shrink-0" />
                    <a 
                      href={profile.socials.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-brand-600 truncate transition-colors"
                    >
                      {profile.socials.website.replace(/(^\w+:|^)\/\//, '')}
                    </a>
                  </div>
                )}
                {canViewSensitive && profile.socials?.linkedin && (
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Linkedin className="h-4 w-4 text-slate-400 shrink-0" />
                    <a 
                      href={profile.socials.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-brand-600 truncate transition-colors"
                    >
                      Linkedin Profile
                    </a>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>}
    </EmbeddedPublicView>
  );
}
