export const participantHackathons = [
  {
    id: "google-cloud-rapid-agent",
    title: "CodeToWin Africa AI Sprint",
    status: "active",
    deadline: "12 juin 2026 · 23:59",
    phase: "Soumission finale",
    progress: 72,
    team: "Team Baobab",
    role: "Lead frontend",
    saved: true,
  },
  {
    id: "cloud-security-open-hack",
    title: "Cloud & Security Open Hack",
    status: "upcoming",
    deadline: "18 juin 2026 · 09:00",
    phase: "Ouverture bientôt",
    progress: 18,
    team: "À rejoindre",
    role: "Participant",
    saved: true,
  },
  {
    id: "data-for-impact-challenge",
    title: "Data for Impact Challenge",
    status: "completed",
    deadline: "20 mai 2026",
    phase: "Certificat disponible",
    progress: 100,
    team: "Impact Labs",
    role: "Full-stack",
    saved: false,
  },
];

export const participantTeam = {
  name: "Team Baobab",
  inviteLink: "https://codetowin.app/team/baobab-invite",
  mentor: "Seydou Kane",
  skillsNeeded: ["Data storytelling", "Pitch deck", "QA"],
  members: [
    {
      name: "Aminata Diop",
      role: "Team Lead",
      status: "En ligne",
      avatar: "https://ui-avatars.com/api/?name=Aminata+Diop&background=047857&color=fff",
    },
    {
      name: "Emmanuel Kouassi",
      role: "Frontend",
      status: "Actif",
      avatar: "https://ui-avatars.com/api/?name=Emmanuel+Kouassi&background=0f172a&color=fff",
    },
    {
      name: "Fatou Ndao",
      role: "Data",
      status: "Invitation envoyée",
      avatar: "https://ui-avatars.com/api/?name=Fatou+Ndao&background=f59e0b&color=fff",
    },
  ],
  tasks: [
    { title: "Finaliser la démo", owner: "Emmanuel", status: "En cours" },
    { title: "Nettoyer le README GitHub", owner: "Aminata", status: "À faire" },
    { title: "Préparer le pitch deck", owner: "Fatou", status: "Bloqué" },
  ],
};

export const openTeams = [
  {
    id: "impact-labs",
    name: "Impact Labs",
    hackathon: "Data for Impact Challenge",
    lookingFor: "Frontend React, UX Research",
    seats: 2,
  },
  {
    id: "green-api",
    name: "Green API",
    hackathon: "AI for Climate Africa",
    lookingFor: "Backend, Data analyst",
    seats: 1,
  },
];

export const participantCertificates = [
  {
    id: "VALID-PARTICIPANT-101",
    title: "Certificat de participation",
    hackathon: "CodeToWin Africa AI Sprint",
    issuedAt: "12 juin 2026",
    type: "Participation",
  },
  {
    id: "VALID-FINALIST-202",
    title: "Certificat finaliste",
    hackathon: "Data for Impact Challenge",
    issuedAt: "20 mai 2026",
    type: "Finaliste",
  },
];

export const participantNotifications = [
  {
    id: 1,
    type: "deadline",
    title: "Deadline de soumission dans 8 heures",
    body: "Ajoutez votre lien GitHub, démo et pitch deck avant la clôture.",
    time: "Aujourd’hui · 15:30",
    unread: true,
  },
  {
    id: 2,
    type: "feedback",
    title: "Nouveau feedback mentor",
    body: "Seydou Kane a laissé 3 recommandations sur votre prototype.",
    time: "Hier · 18:05",
    unread: true,
  },
  {
    id: 3,
    type: "certificate",
    title: "Certificat disponible",
    body: "Votre certificat Data for Impact Challenge peut être téléchargé.",
    time: "20 mai 2026",
    unread: false,
  },
];
