import React, { createContext, useState, useEffect } from 'react';

export const OrganizerContext = createContext();

const STORAGE_KEY = 'codetowin_organizer_state';

// Mocked initial state
const initialDefaultState = {
  hackathons: [
    {
      id: 1,
      title: "AI for Climate Africa 2026",
      status: "Actif",
      date: "12 - 14 Août 2026",
      participants: 120,
      teams: 24,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      title: "Fintech Innovation Week",
      status: "Brouillon",
      date: "05 - 10 Nov 2026",
      participants: 0,
      teams: 0,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"
    }
  ],
  members: [
    { id: 1, name: "Alioune Fall", email: "alioune@example.com", role: "Organisateur", status: "Actif", avatar: "https://ui-avatars.com/api/?name=Alioune+Fall" },
    { id: 2, name: "Sophie Mendez", email: "sophie@example.com", role: "Évaluateur", status: "Invitation envoyée", avatar: "https://ui-avatars.com/api/?name=Sophie+Mendez" }
  ],
  announcements: [
    { id: 1, title: "Lancement officiel", date: "Il y a 2 jours", content: "Le hackathon commence demain !" }
  ],
  stats: {
    totalParticipants: 120,
    activeProjects: 24,
    evaluators: 5,
    budgetSpent: "45%"
  }
};

export const OrganizerProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing organizer state', e);
      }
    }
    return initialDefaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addHackathon = (hackathonData) => {
    setState(prev => ({
      ...prev,
      hackathons: [...prev.hackathons, { ...hackathonData, id: Date.now() }]
    }));
  };

  const inviteMember = (memberData) => {
    setState(prev => ({
      ...prev,
      members: [...prev.members, { ...memberData, id: Date.now(), status: "Invitation envoyée", avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(memberData.name)}` }]
    }));
  };

  const createAnnouncement = (announcement) => {
    setState(prev => ({
      ...prev,
      announcements: [{ ...announcement, id: Date.now(), date: "À l'instant" }, ...prev.announcements]
    }));
  };

  return (
    <OrganizerContext.Provider value={{
      ...state,
      addHackathon,
      inviteMember,
      createAnnouncement
    }}>
      {children}
    </OrganizerContext.Provider>
  );
};
