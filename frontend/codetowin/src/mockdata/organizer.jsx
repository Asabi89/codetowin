import React from 'react';
import { Bell, FileText, UserCheck, UserPlus, Users } from 'lucide-react';

export const MEMBERS_MOCK = [
  {
    id: 1,
    name: 'Emmanuel D.',
    email: 'emmanuel@techhub.com',
    avatar: 'https://ui-avatars.com/api/?name=Emmanuel+D&background=047857&color=fff',
    role: 'Propriétaire',
    status: 'Actif',
  },
  {
    id: 2,
    name: 'Aïssatou S.',
    email: 'aissatou@techhub.com',
    avatar: 'https://ui-avatars.com/api/?name=Aissatou+S&background=cbd5e1&color=334155',
    role: 'Éditeur',
    status: 'Actif',
  },
  {
    id: 3,
    name: 'Moussa K.',
    email: 'moussa@gmail.com',
    avatar: '', // To use the initials block
    initials: 'M',
    role: 'Administrateur',
    status: 'Invitation en attente',
  },
  {
    id: 4,
    name: 'Nadia Ba',
    email: 'member@codetowin.com',
    avatar: 'https://ui-avatars.com/api/?name=Nadia+Ba&background=0f766e&color=fff',
    role: 'Évaluateur',
    status: 'Actif',
  },
];

export const PARTICIPANTS_MOCK = [
  {
    id: 1,
    name: 'Amadou Diallo',
    email: 'amadou.d@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    country: 'Sénégal',
    team: null,
    status: 'En attente',
    date: 'Il y a 2 heures',
  },
  {
    id: 2,
    name: 'Sarah Kone',
    email: 'sarah.kone@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    country: "Côte d'Ivoire",
    team: 'AgriTech Innovators',
    status: 'Approuvé',
    date: 'Il y a 1 jour',
  },
];

export const SUBMISSIONS_MOCK = [
  {
    id: 1,
    teamName: 'AgriTech Innovators',
    status: 'Soumis',
    projectName: 'AgriSense',
    description: "AgriSense est une plateforme IoT complète permettant aux petits agriculteurs de surveiller l'humidité du sol et de prédire les besoins en eau grâce à des modèles de machine learning locaux, réduisant la consommation d'eau de 30%.",
    tags: ['Python', 'React', 'IoT'],
    repoLink: '#',
    demoLink: '#',
    score: null,
  },
  {
    id: 2,
    teamName: 'CodeMakers',
    status: 'Évalué',
    projectName: 'EcoTrade App',
    description: "Une place de marché mobile permettant d'échanger des crédits carbone générés par des initiatives de reboisement locales. Application construite en React Native avec backend Node.js.",
    tags: ['React Native', 'Node.js', 'MongoDB'],
    repoLink: '#',
    demoLink: '#',
    score: 34,
  },
];

export const TEAMS_MOCK = [
  {
    id: 1,
    name: 'AgriTech Innovators',
    memberCount: 4,
    description: "Solution IoT pour optimisation d'irrigation",
    members: [
      'https://i.pravatar.cc/150?u=a042581f4e29026704e',
      'https://i.pravatar.cc/150?u=a042581f4e29026705e',
      'https://i.pravatar.cc/150?u=a042581f4e29026706e',
      'https://i.pravatar.cc/150?u=a042581f4e29026707e',
    ],
    mentor: {
      name: 'Dr. Ousmane Diop',
      avatar: 'https://ui-avatars.com/api/?name=Dr+Ousmane+Diop&background=random',
    },
    status: 'Soumis',
  },
  {
    id: 2,
    name: 'Green Data Squad',
    memberCount: 3,
    description: "Analyse de données climatiques API",
    members: [
      'https://i.pravatar.cc/150?u=a042581f4e29026708e',
      'https://i.pravatar.cc/150?u=a042581f4e29026709e',
      'https://i.pravatar.cc/150?u=a042581f4e29026710e',
    ],
    mentor: null,
    status: 'Brouillon',
  },
];

export const ANNOUNCEMENTS_MOCK = [
  {
    id: 1,
    title: 'Rappel : Plus que 3 jours !',
    status: 'Envoyée',
    statusBg: 'bg-blue-100',
    statusText: 'text-blue-800',
    to: 'Toutes les équipes',
    date: 'Envoyé hier à 14h30 via Email et In-app',
    isDraft: false,
  },
  {
    id: 2,
    title: 'Cérémonie de clôture',
    status: 'Brouillon',
    statusBg: 'bg-slate-100',
    statusText: 'text-slate-800',
    to: 'Tous les participants',
    date: 'Modifié il y a 2 jours',
    isDraft: true,
  }
];

export const LEADERBOARD_MOCK = [
  {
    id: 1,
    rank: 1,
    team: 'AgriTech Innovators',
    project: 'AgriSense IoT',
    score: 94,
    status: 'Générés',
  },
  {
    id: 2,
    rank: 2,
    team: 'CodeMakers',
    project: 'EcoTrade App',
    score: 85,
    status: 'En attente',
  },
  {
    id: 3,
    rank: 3,
    team: 'Data Rangers',
    project: 'ClimaStats Dashboard',
    score: 81,
    status: 'En attente',
  },
  {
    id: 4,
    rank: 4,
    team: 'Green Data Squad',
    project: '- (Pas de soumission finale)',
    score: '-',
    status: 'En attente (Participation)',
  },
];

export const ORGANIZER_NOTIFICATIONS_MOCK = [
  {
    id: 'registration',
    title: 'Nouvelle inscription participant',
    time: 'Il y a 10 min',
    description: (
      <>
        <strong>Fatou Ndiaye</strong> vient de s'inscrire au hackathon <span className="font-medium">"Fintech Builders Challenge"</span>. Son profil est en attente de validation.
      </>
    ),
    icon: <UserPlus className="h-5 w-5 text-blue-600" />,
    iconBg: 'bg-blue-100',
    unread: true,
    actions: [
      { label: 'Voir le profil', variant: 'secondary', to: '/organizer/members/1' },
      { label: 'Approuver', variant: 'primary' },
    ],
  },
  {
    id: 'mentor-accepted',
    title: 'Invitation Mentor acceptée',
    time: 'Il y a 1 heure',
    description: (
      <>
        <strong>Dr. Ousmane Diop</strong> a accepté votre invitation pour être mentor sur le hackathon <span className="font-medium">"AI for Climate Africa"</span>.
      </>
    ),
    icon: <UserCheck className="h-5 w-5 text-green-600" />,
    iconBg: 'bg-green-100',
    unread: true,
  },
  {
    id: 'team-created',
    title: 'Nouvelle équipe formée',
    time: 'Il y a 3 heures',
    description: (
      <>
        L'équipe <strong>"AgriTech Innovators"</strong> (4 membres) vient d'être créée pour le hackathon <span className="font-medium">"AI for Climate Africa"</span>.
      </>
    ),
    icon: <Users className="h-5 w-5 text-purple-600" />,
    iconBg: 'bg-purple-100',
    unread: true,
    actions: [{ label: "Voir l'équipe", variant: 'secondary', to: '/organizer/hackathons/1/teams/1' }],
  },
  {
    id: 'submission',
    title: 'Nouvelle soumission de projet',
    time: 'Hier',
    description: (
      <>
        L'équipe <strong>"CodeMakers"</strong> a soumis son projet <em>"EcoTrade App"</em>. Il est prêt à être évalué.
      </>
    ),
    icon: <FileText className="h-5 w-5 text-slate-500" />,
    iconBg: 'bg-slate-100',
    unread: false,
  },
  {
    id: 'reminder',
    title: 'Rappel événementiel',
    time: 'Il y a 2 jours',
    description: (
      <>
        Le hackathon <strong>"AI for Climate Africa"</strong> se termine dans 48 heures. Pensez à envoyer une annonce de rappel aux participants.
      </>
    ),
    icon: <Bell className="h-5 w-5 text-slate-500" />,
    iconBg: 'bg-slate-100',
    unread: false,
  },
];

export const ORGANIZER_TABS_MOCK = [
  { id: 'participants', label: 'Participants' },
  { id: 'mentors', label: 'Mentors' },
  { id: 'membres', label: 'Membres' },
];

export const ORGANIZER_CHATS_MOCK = [
  {
    id: 'equipe_fintech',
    name: 'Groupe : FinTech Innovators',
    role: 'Équipe • Hackathon Fintech',
    isGroup: true,
    avatar: 'FI',
    avatarBgColor: 'bg-emerald-100',
    avatarTextColor: 'text-emerald-600',
    avatarBorderColor: 'border-emerald-200',
    status: 'online',
    category: 'participants',
    unread: 1,
    lastTime: '10:42',
    lastMessage: 'Moussa : Bonjour, nous sommes bloqués...',
    messages: [
      { id: 1, sender: 'them', text: "Bonjour l'équipe d'organisation !", time: '10:41', senderName: 'Aisha Fall' },
      { id: 2, sender: 'them', text: "Notre équipe rencontre un problème avec l'API fournie pour le challenge paiement mobile. Elle renvoie une erreur 500 depuis ce matin. Pouvez-vous vérifier ?", time: '10:41', senderName: 'Moussa Diop' },
      { id: 3, sender: 'me', text: "Bonjour l'équipe, je remonte ça à notre équipe technique tout de suite.", time: '10:43' },
      { id: 4, sender: 'them', text: 'Super, merci beaucoup ! 🙏', time: '10:44', senderName: 'Moussa Diop' },
    ],
  },
  {
    id: 'moussa',
    name: 'Moussa Diop',
    role: "Participant • Équipe 'FinTech Innovators'",
    avatar: 'https://ui-avatars.com/api/?name=Moussa+Diop&background=random',
    status: 'online',
    category: 'participants',
    unread: 1,
    lastTime: '10:42',
    lastMessage: 'Bonjour, nous sommes bloqués...',
    messages: [
      { id: 1, sender: 'them', text: "Bonjour l'équipe d'organisation !", time: '10:41', senderName: 'Moussa Diop' },
      { id: 2, sender: 'them', text: "Notre équipe rencontre un problème avec l'API fournie pour le challenge paiement mobile.", time: '10:41', senderName: 'Moussa Diop' },
      { id: 3, sender: 'me', text: "Bonjour Moussa, je remonte ça à l'équipe technique tout de suite.", time: '10:43' },
      { id: 4, sender: 'them', text: 'Super, merci beaucoup ! 🙏', time: '10:44', senderName: 'Moussa Diop' },
    ],
  },
  {
    id: 'aisha',
    name: 'Aisha Fall',
    role: 'Participant • Solo',
    avatar: 'https://ui-avatars.com/api/?name=Aisha+Fall&background=random',
    status: 'offline',
    category: 'participants',
    unread: 0,
    lastTime: 'Hier',
    lastMessage: 'Merci beaucoup pour le retour !',
    messages: [
      { id: 1, sender: 'them', text: 'Merci beaucoup pour le retour !', time: 'Hier', senderName: 'Aisha Fall' },
    ],
  },
  {
    id: 'ousmane',
    name: 'Dr. Ousmane Ba',
    role: 'Mentor • Expert IA',
    avatar: 'https://ui-avatars.com/api/?name=Dr+Ousmane+Ba&background=random',
    status: 'busy',
    category: 'mentors',
    unread: 1,
    lastTime: '09:15',
    lastMessage: 'Je suis dispo pour la team 3.',
    messages: [
      { id: 1, sender: 'them', text: 'Je suis dispo pour la team 3.', time: '09:15', senderName: 'Dr. Ousmane Ba' },
      { id: 2, sender: 'me', text: 'Parfait, je leur dis de vous contacter.', time: '09:16' },
    ],
  },
  {
    id: 'mod',
    name: 'Modérateurs (Groupe)',
    role: "Équipe d'organisation",
    isGroup: true,
    avatar: 'Mod',
    avatarBgColor: 'bg-blue-100',
    avatarTextColor: 'text-blue-600',
    avatarBorderColor: 'border-transparent',
    status: 'offline',
    category: 'membres',
    unread: 0,
    lastTime: 'Lun',
    lastMessage: "Fatou: J'ai validé les 10 projets.",
    messages: [
      { id: 1, sender: 'them', text: "Fatou: J'ai validé les 10 projets.", time: 'Lun', senderName: 'Fatou' },
    ],
  },
];

export const ACCEPTED_MENTORS_MOCK = [
  {
    id: 1,
    name: 'Dr. Ousmane Diop',
    avatar: 'https://i.pravatar.cc/150?u=mentor1',
    role: 'Expert Data Science & AI',
    status: 'Assigné à 2 équipes',
  },
  {
    id: 2,
    name: 'Marie Koné',
    avatar: 'https://i.pravatar.cc/150?u=mentor2',
    role: 'UX/UI Designer Lead',
    status: 'Non assigné',
  },
];

export const PENDING_MENTORS_MOCK = [
  {
    id: 3,
    email: 'amadiop@example.com',
    initial: 'A',
    role: 'Invitation envoyée hier',
    status: 'En attente de réponse',
  },
  {
    id: 4,
    name: 'Paul Martin',
    avatar: 'https://i.pravatar.cc/150?u=mentor3',
    role: 'Invité depuis la plateforme',
    status: 'En attente de réponse',
  },
];

export const NETWORK_MENTORS_MOCK = [
  {
    id: 5,
    name: 'Sarah Connor',
    avatar: 'https://i.pravatar.cc/150?u=mentor_net1',
    role: 'CTO @ TechCorp',
    rating: '4.9/5 (12 participations)',
  },
  {
    id: 6,
    name: 'David G.',
    avatar: 'https://i.pravatar.cc/150?u=mentor_net2',
    role: 'Lead Dev Blockchain',
    rating: '4.5/5 (4 participations)',
  },
];

export const HACKATHONS_DATA_MOCK = [
  {
    id: 1,
    title: 'AI for Climate Africa',
    type: 'Hybride',
    location: 'Dakar',
    status: 'publie',
    participants: 89,
    teams: 14,
    submissions: '-',
    deadline: 'Dans 12 jours',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    iconColor: 'text-brand-700',
    iconBg: 'bg-brand-100',
  },
  {
    id: 2,
    title: 'Fintech Builders Challenge',
    type: 'En ligne',
    location: '',
    status: 'brouillon',
    participants: '-',
    teams: '-',
    submissions: '-',
    deadline: 'Pas de date',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconColor: 'text-slate-500',
    iconBg: 'bg-slate-100',
  },
  {
    id: 3,
    title: 'AgriTech Youth Hack',
    type: 'Hybride',
    location: 'Abidjan',
    status: 'attente',
    participants: 12,
    teams: 2,
    submissions: '-',
    deadline: 'Dans 3 jours',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconColor: 'text-amber-700',
    iconBg: 'bg-amber-100',
  },
  {
    id: 4,
    title: 'HealthTech Dakar 2025',
    type: 'Présentiel',
    location: 'Dakar',
    status: 'termine',
    participants: 146,
    teams: 22,
    submissions: 18,
    deadline: 'Passée',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    iconColor: 'text-blue-700',
    iconBg: 'bg-blue-100',
  },
];
