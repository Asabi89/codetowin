import React, { createContext, useState, useEffect } from 'react';

export const ParticipantContext = createContext();

const STORAGE_KEY = 'codetowin_participant_state';

// Mocked initial state
const initialDefaultState = {
  hackathons: [
    { id: 'google-cloud-rapid-agent', title: 'CodeToWin Africa AI Sprint', status: 'Inscrit', location: 'En ligne', date: 'Juin 2026', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80', description: 'Le plus grand sprint IA pour les développeurs africains.' },
    { id: 'product-design-hack-weekend', title: 'Product Design Hack Weekend', status: 'Terminé (Finaliste)', location: 'Dakar, Sénégal', date: 'Févr 2026', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80', description: 'Conception de produits innovants pour la Fintech.' },
    { id: 'healthtech-challenge', title: 'HealthTech Challenge', status: 'Terminé (Participant)', location: 'Abidjan, CI', date: 'Nov 2025', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80', description: 'Améliorer la santé grâce à la technologie.' }
  ],
  projects: [
    { 
      id: 'proj-1', 
      title: 'EcoTrack AI', 
      description: 'Une plateforme d\'intelligence artificielle pour optimiser la consommation énergétique des bâtiments publics.', 
      image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80',
      tags: ['React', 'Python', 'Machine Learning'],
      hackathonName: 'CodeToWin Africa AI Sprint',
      hackathonId: '1',
      likes: 42,
      comments: 12
    },
    { 
      id: 'proj-2', 
      title: 'Bantu Design System', 
      description: 'Un système de design open-source intégrant des motifs de l\'art africain pour React et Figma.', 
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80',
      tags: ['Design System', 'Figma', 'CSS'],
      hackathonName: 'Product Design Hack Weekend',
      hackathonId: '2',
      likes: 85,
      comments: 34
    }
  ],
  activity: [
    { id: '1', type: 'registration', text: "Inscrit au Google Cloud Rapid Agent Hackathon", date: new Date().toISOString() },
    { id: '2', type: 'profile_completed', text: "Profil de builder complété", date: new Date(Date.now() - 86400000).toISOString() },
    { id: '3', type: 'account_created', text: "Compte créé sur CodeToWin", date: new Date(Date.now() - 172800000).toISOString() }
  ]
};

export const ParticipantProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing participant state', e);
      }
    }
    return initialDefaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const joinHackathon = (hackathon) => {
    setState(prev => ({
      ...prev,
      hackathons: [{...hackathon, status: 'Inscrit'}, ...prev.hackathons],
      activity: [{ id: Date.now().toString(), type: 'registration', text: `Inscrit à ${hackathon.title}`, date: new Date().toISOString() }, ...prev.activity]
    }));
  };

  return (
    <ParticipantContext.Provider value={{
      ...state,
      joinHackathon
    }}>
      {children}
    </ParticipantContext.Provider>
  );
};
