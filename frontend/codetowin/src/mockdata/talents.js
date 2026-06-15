export const mockTalents = [
  {
    id: 'seydou-kane',
    fullName: 'Seydou Kane',
    title: 'Développeur Fullstack React & Node.js',
    country: 'Sénégal',
    city: 'Dakar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    skills: ['React.js', 'Node.js', 'PostgreSQL', 'Docker'],
    wins: 2,
    certificatesCount: 3,
    available: true,
    visibility: 'public'
  },
  {
    id: 'aminata-diop',
    fullName: 'Aminata Diop',
    title: 'UI/UX & Product Designer',
    country: 'Sénégal',
    city: 'Saint-Louis',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    skills: ['Figma', 'Product Design', 'HTML/CSS', 'User Research'],
    wins: 1,
    certificatesCount: 2,
    available: true,
    visibility: 'public'
  },
  {
    id: 'emeka-okafor',
    fullName: 'Emeka Okafor',
    title: 'Data Scientist & ML Engineer',
    country: 'Nigeria',
    city: 'Lagos',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    skills: ['Python', 'TensorFlow', 'SQL', 'Data Analytics'],
    wins: 3,
    certificatesCount: 4,
    available: false,
    visibility: 'public'
  },
  {
    id: 'kwame-mensah',
    fullName: 'Kwame Mensah',
    title: 'Cloud Architect & DevOps Specialist',
    country: 'Ghana',
    city: 'Accra',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
    wins: 0,
    certificatesCount: 1,
    available: true,
    visibility: 'public'
  },
  {
    id: 'fatou-sow',
    fullName: 'Fatou Sow',
    title: 'Développeur Backend Python & FastAPI',
    country: 'Sénégal',
    city: 'Dakar',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    skills: ['FastAPI', 'Python', 'MongoDB', 'Redis'],
    wins: 1,
    certificatesCount: 2,
    available: true,
    visibility: 'public'
  }
];

export const mockTalentsDetails = {
  'seydou-kane': {
    fullName: 'Seydou Kane',
    title: 'Développeur Fullstack React & Node.js',
    country: 'Sénégal',
    city: 'Dakar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    bio: 'Passionné par la résolution de problèmes réels à travers le code. J’ai 3 ans d’expérience dans le développement web moderne, spécialisé en architectures de microservices et interfaces réactives.',
    github: 'https://github.com/seydou-kane',
    linkedin: 'https://linkedin.com/in/seydoukane',
    website: 'https://seydou.dev',
    skills: ['React.js', 'Node.js', 'PostgreSQL', 'Docker', 'FastAPI', 'GraphQL'],
    available: true,
    visibility: 'public',
    hackathons: [
      {
        id: 'google-cloud-rapid-agent',
        title: 'CodeToWin Africa AI Sprint',
        role: 'Participant & Chef d’équipe',
        project: 'EcoTrack AI',
        status: 'Terminé',
        certificateCode: 'VALID-PARTICIPANT-101'
      },
      {
        id: 'product-design-hack-weekend',
        title: 'Product Design Hack Weekend',
        role: 'Développeur Backend',
        project: 'Bantu Design System',
        status: 'Terminé',
        certificateCode: 'VALID-FINALIST-202'
      }
    ],
    portfolio: [
      {
        id: 'ecotrack-ai',
        title: 'EcoTrack AI',
        description: 'Une plateforme d\'intelligence artificielle pour analyser et réduire l\'empreinte carbone des entreprises industrielles africaines en temps réel.',
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80',
        tags: ['React', 'Python', 'Machine Learning'],
        hackathon: 'CodeToWin Africa AI Sprint',
        link: '/hackathons/google-cloud-rapid-agent?tab=projects'
      },
      {
        id: 'bantu-design',
        title: 'Bantu Design System',
        description: 'Un système de design open-source intégrant des motifs et éléments de l\'art africain, prêt à être utilisé dans des applications React et Figma.',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80',
        tags: ['Design System', 'React', 'CSS'],
        hackathon: 'Product Design Hack Weekend',
        link: '/hackathons/product-design-hack-weekend?tab=projects'
      }
    ]
  },
  'aminata-diop': {
    fullName: 'Aminata Diop',
    title: 'UI/UX & Product Designer',
    country: 'Sénégal',
    city: 'Saint-Louis',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    bio: 'Créer des expériences numériques mémorables, esthétiques et intuitives. Spécialisée dans la recherche utilisateur et le prototypage interactif rapide.',
    github: 'https://github.com/aminata-diop',
    linkedin: 'https://linkedin.com/in/aminatadiop',
    website: 'https://aminatadesign.com',
    skills: ['Figma', 'Product Design', 'HTML/CSS', 'User Research', 'Design Systems', 'Webflow'],
    available: true,
    visibility: 'public',
    hackathons: [
      {
        id: 'google-cloud-rapid-agent',
        title: 'CodeToWin Africa AI Sprint',
        role: 'UI/UX Designer',
        project: 'EcoTrack AI',
        status: 'Terminé',
        certificateCode: 'VALID-FINALIST-202'
      }
    ],
    portfolio: [
      {
        id: 'ecotrack-ai-design',
        title: 'EcoTrack AI (UI/UX)',
        description: 'Conception complète de l\'interface utilisateur pour la plateforme EcoTrack AI. Création du prototype Figma et des interactions utilisateur.',
        image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=600&q=80',
        tags: ['Figma', 'Prototyping', 'User Research'],
        hackathon: 'CodeToWin Africa AI Sprint',
        link: '/hackathons/google-cloud-rapid-agent?tab=projects'
      }
    ]
  }
};
