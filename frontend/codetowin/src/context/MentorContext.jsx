import React, { createContext, useState, useEffect } from 'react';

export const MentorContext = createContext();

const STORAGE_KEY = 'codetowin_mentor_state';

// Mocked initial state
const initialDefaultState = {
  teams: [
    {
      id: 1,
      name: "EcoPay Solutions",
      hackathon: "Fintech Builders Challenge",
      avatar: "https://ui-avatars.com/api/?name=EcoPay+Solutions&background=10b981&color=fff",
      progress: 60,
      nextMeeting: "Aujourd'hui, 15:00",
      status: "Actif"
    },
    {
      id: 2,
      name: "CryptoFarm",
      hackathon: "Agrotech Africa",
      avatar: "https://ui-avatars.com/api/?name=CryptoFarm&background=f59e0b&color=fff",
      progress: 85,
      nextMeeting: "Demain, 10:00",
      status: "En attente"
    }
  ],
  invitations: [
    {
      id: 1,
      hackathonName: "AI for Climate Africa 2026",
      organizer: "TechHub Sénégal",
      logo: "https://ui-avatars.com/api/?name=TechHub+Senegal&background=0F172A&color=fff",
      dates: "12 - 14 Août 2026",
      teamCount: 3,
      status: "pending"
    },
    {
      id: 2,
      hackathonName: "Fintech Builders Challenge",
      organizer: "Banque Atlantique",
      logo: "https://ui-avatars.com/api/?name=Finbank&background=0F172A&color=fff",
      dates: "01 - 03 Septembre 2026",
      teamCount: 2,
      status: "pending"
    }
  ],
  notifications: [
    { id: 1, type: "team_assigned", title: "Nouvelle équipe assignée", message: "L'équipe EcoPay Solutions vous a été assignée.", time: "Il y a 10 min", read: false },
    { id: 2, type: "new_message", title: "Nouveau message", message: "Moussa Diop (EcoPay Solutions) a envoyé un message.", time: "Il y a 1 heure", read: false },
    { id: 3, type: "submission", title: "Soumission de projet requise", message: "L'équipe CryptoFarm a soumis son projet.", time: "Hier", read: true }
  ],
  stats: {
    totalTeams: 2,
    activeHackathons: 1,
    pendingSubmissions: 3,
    avgRating: 4.8
  }
};

export const MentorProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing mentor state', e);
      }
    }
    return initialDefaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const acceptInvitation = (id) => {
    setState(prev => ({
      ...prev,
      invitations: prev.invitations.map(inv => inv.id === id ? { ...inv, status: 'accepted' } : inv)
    }));
  };

  const declineInvitation = (id) => {
    setState(prev => ({
      ...prev,
      invitations: prev.invitations.map(inv => inv.id === id ? { ...inv, status: 'declined' } : inv)
    }));
  };

  const markNotificationAsRead = (id) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    }));
  };

  const markAllNotificationsAsRead = () => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(notif => ({ ...notif, read: true }))
    }));
  };

  const submitFeedback = (teamId, feedback) => {
    console.log(`Feedback submitted for team ${teamId}:`, feedback);
    // Mimic API call logic here
  };

  return (
    <MentorContext.Provider value={{
      ...state,
      acceptInvitation,
      declineInvitation,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      submitFeedback
    }}>
      {children}
    </MentorContext.Provider>
  );
};
