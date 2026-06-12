import React from 'react';
import { CheckCircle, MessageSquare, Users } from 'lucide-react';

export const MENTOR_NOTIFICATIONS_MOCK = [
  {
    id: 'team-assigned',
    title: 'Nouvelle équipe assignée',
    time: 'Il y a 10 min',
    description: (
      <>
        L'organisateur vient de vous assigner l'équipe <strong>"EcoPay Solutions"</strong> pour le hackathon <span className="font-medium">"Fintech Builders Challenge"</span>.
      </>
    ),
    icon: <Users className="h-5 w-5 text-blue-600" />,
    iconBg: 'bg-blue-100',
    unread: true,
    actions: [{ label: "Contacter l'équipe", variant: 'secondary', to: '/mentor/messages' }],
  },
  {
    id: 'new-message',
    title: 'Nouveau message',
    time: 'Il y a 1 heure',
    description: (
      <>
        Vous avez reçu un nouveau message de <strong>Moussa Diop</strong> dans le groupe <span className="font-medium">"EcoPay Solutions"</span>.
      </>
    ),
    icon: <MessageSquare className="h-5 w-5 text-green-600" />,
    iconBg: 'bg-green-100',
    unread: true,
  },
  {
    id: 'submission-required',
    title: 'Soumission de projet requise',
    time: 'Hier',
    description: (
      <>
        L'équipe <strong>"CryptoFarm"</strong> a soumis son projet final. Vous pouvez maintenant consulter les détails et procéder à l'évaluation.
      </>
    ),
    icon: <CheckCircle className="h-5 w-5 text-slate-500" />,
    iconBg: 'bg-slate-100',
    unread: false,
    actions: [{ label: 'Voir la soumission', variant: 'secondary', to: '/mentor/submissions/1' }],
  },
];

export const MENTOR_TEAMS_MOCK = [
  {
    id: 1,
    name: 'AgriTech Innovators',
    description: "Solution IoT pour optimisation d'irrigation",
    memberCount: 4,
    detailPath: '/mentor/teams/1',
    members: [
      { id: '1', name: 'Moussa Diop', isLeader: true, avatar: 'https://ui-avatars.com/api/?name=Moussa+Diop&background=random', title: 'Développeur Fullstack • Sénégal' },
      { id: '2', name: 'Aisha Fall', isLeader: false, avatar: 'https://ui-avatars.com/api/?name=Aisha+Fall&background=random', title: "UX/UI Designer • Côte d'Ivoire" },
      { id: '3', name: 'Kofi Mensah', isLeader: false, avatar: 'https://ui-avatars.com/api/?name=Kofi+Mensah&background=random', title: 'Data Engineer • Ghana' },
      { id: '4', name: 'Amadou Diallo', isLeader: false, avatar: 'https://ui-avatars.com/api/?name=Amadou+Diallo&background=random', title: 'Développeur Mobile • Sénégal' }
    ],
    mentor: {
      name: 'Vous',
      avatar: 'https://ui-avatars.com/api/?name=Seydou+Kane&background=047857&color=fff',
    },
    status: 'Projet soumis',
    statusTone: 'green',
    project: {
      title: "AgriSense : Système intelligent d'irrigation IoT",
      description: "AgriSense est une solution IoT complète permettant aux petits agriculteurs de surveiller l'humidité du sol en temps réel et d'optimiser la consommation d'eau via des capteurs connectés et une application mobile.",
      technologies: ['Python', 'React Native', 'IoT', 'LoRaWAN']
    },
    resources: [
      { label: 'Dépôt GitHub', value: 'github.com/agritech/agrisense', type: 'github', url: '#' },
      { label: 'Démo en ligne', value: 'agrisense-demo.com', type: 'demo', url: '#' }
    ],
    activities: [
      { id: 1, type: 'success', label: 'Projet soumis pour évaluation', date: 'Hier' },
      { id: 2, type: 'info', label: 'Mentor assigné', date: '2 Juin' },
      { id: 3, type: 'default', label: "Création de l'équipe", date: '28 Mai' }
    ]
  },
  {
    id: 2,
    name: 'Green Data Squad',
    description: 'Analyse de données climatiques API',
    memberCount: 3,
    detailPath: '/mentor/teams/2',
    members: [
      { id: '5', name: 'Sarah Kone', isLeader: true, avatar: 'https://ui-avatars.com/api/?name=Sarah+Kone&background=random', title: 'Data Scientist • Côte d\'Ivoire' },
      { id: '6', name: 'Jean Dupont', isLeader: false, avatar: 'https://ui-avatars.com/api/?name=Jean+Dupont&background=random', title: 'Développeur Frontend • Sénégal' },
      { id: '7', name: 'Fatou Ndiaye', isLeader: false, avatar: 'https://ui-avatars.com/api/?name=Fatou+Ndiaye&background=random', title: 'Product Manager • Sénégal' }
    ],
    status: 'Projet soumis',
    statusTone: 'green',
    project: {
      title: "ClimData : API d'analyse de données climatiques",
      description: "ClimData fournit des API temps réel et des modèles prédictifs d'analyse climatique pour aider les organisations agricoles à anticiper les variations extrêmes de température en Afrique de l'Ouest.",
      technologies: ['Python', 'FastAPI', 'Pandas', 'Docker']
    },
    resources: [
      { label: 'Dépôt GitHub', value: 'github.com/greendata/climdata', type: 'github', url: '#' },
      { label: 'Documentation API', value: 'api.climdata.com/docs', type: 'demo', url: '#' }
    ],
    activities: [
      { id: 1, type: 'success', label: 'Projet soumis pour évaluation', date: 'Hier' },
      { id: 2, type: 'info', label: 'Mentor assigné', date: '5 Juin' },
      { id: 3, type: 'default', label: "Création de l'équipe", date: '30 Mai' }
    ]
  },
];

export const MENTOR_TABS_MOCK = [
  { id: 'equipes', label: 'Équipes' },
  { id: 'organisation', label: 'Organisateurs' },
];

export const MENTOR_CHATS_MOCK = [
  {
    id: 'ecopay',
    name: 'Groupe : EcoPay Solutions',
    headerName: 'EcoPay Solutions',
    role: 'Équipe • Fintech Builders Challenge',
    category: 'equipes',
    isGroup: true,
    avatar: 'ES',
    avatarBgColor: 'bg-emerald-100',
    avatarTextColor: 'text-emerald-600',
    avatarBorderColor: 'border-emerald-200',
    status: 'online',
    unread: 1,
    lastTime: '10:42',
    lastMessage: "Moussa : On est bloqués sur l'API...",
    messages: [
      { id: 1, sender: 'me', text: "Bonjour l'équipe ! Je suis Seydou, votre mentor pour ce hackathon. Comment avance le projet ?", time: 'Hier 14:00', senderName: 'Moi' },
      { id: 2, sender: 'them', text: "Bonjour Seydou ! L'idée est claire, mais notre développeur backend a une question sur la base de données.", time: 'Hier 14:15', senderName: 'Omar Fall' },
      { id: 3, sender: 'them', text: "Moussa : On est bloqués sur l'API de paiement qui renvoie une erreur 500.", time: '10:42', senderName: 'Moussa Diop' },
    ],
  },
  {
    id: 'retailsync',
    name: 'Paul (Privé)',
    role: 'Participant • Fintech Builders Challenge',
    category: 'equipes',
    avatar: 'RS',
    avatarBgColor: 'bg-blue-100',
    avatarTextColor: 'text-blue-600',
    avatarBorderColor: 'border-blue-200',
    status: 'offline',
    unread: 0,
    lastTime: 'Hier',
    lastMessage: 'Paul : Merci pour le retour !',
    messages: [
      { id: 1, sender: 'them', text: 'Merci pour le retour !', time: 'Hier', senderName: 'Paul' },
    ],
  },
  {
    id: 'techhub',
    name: 'TechHub Sénégal',
    role: 'Organisateur',
    category: 'organisation',
    avatar: 'https://ui-avatars.com/api/?name=TechHub+Senegal&background=047857&color=fff',
    unread: 0,
    lastTime: 'Lun.',
    lastMessage: "Bienvenue dans l'équipe des mentors !",
    messages: [
      { id: 1, sender: 'them', text: "Bienvenue dans l'équipe des mentors !", time: 'Lun.', senderName: 'TechHub Sénégal' },
    ],
  },
];

export const MENTOR_SUBMISSIONS_MOCK = [
  {
    id: 1,
    teamName: 'AgriTech Innovators',
    projectName: 'AgriSense',
    status: 'submitted',
    statusLabel: 'Soumis',
    description: "AgriSense est une plateforme IoT complète permettant aux petits agriculteurs de surveiller l'humidité du sol et de prédire les besoins en eau grâce à des modèles de machine learning locaux, réduisant la consommation d'eau de 30%.",
    tags: ['Python', 'React', 'IoT'],
    demoLabel: 'Voir la vidéo',
    feedbackPath: '/mentor/teams/1/feedback',
    actionLabel: 'Évaluer',
  },
  {
    id: 2,
    teamName: 'CodeMakers',
    projectName: 'EcoTrade App',
    status: 'evaluated',
    statusLabel: 'Évalué',
    description: "Une place de marché mobile permettant d'échanger des crédits carbone générés par des initiatives de reboisement locales. Application construite en React Native avec backend Node.js.",
    tags: ['React Native', 'Node.js', 'MongoDB'],
    demoLabel: 'Lien direct',
    score: 34,
    feedbackPath: '/mentor/teams/2/feedback',
    actionLabel: 'Modifier note',
  },
];

export const MENTOR_INVITATIONS_MOCK = [
  {
    id: 1,
    hackathonName: 'AI for Climate Africa 2026',
    organizer: 'TechHub Sénégal',
    logo: 'https://ui-avatars.com/api/?name=TechHub+Senegal&background=0F172A&color=fff',
    dates: '12 - 14 Août 2026',
    teamCount: 3,
    isNew: true,
    message: "Bonjour Seydou, vu votre expertise en Machine Learning, nous adorerions vous avoir parmi nos mentors pour orienter les équipes qui travaillent sur l'analyse de données satellites. Êtes-vous disponible ?",
  },
  {
    id: 2,
    hackathonName: 'Fintech Builders Challenge',
    organizer: 'Banque Atlantique',
    logo: 'https://ui-avatars.com/api/?name=Finbank&background=0F172A&color=fff',
    dates: '01 - 03 Septembre 2026',
    teamCount: 2,
  },
];
