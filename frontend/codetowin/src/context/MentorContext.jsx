import React, { createContext, useState, useEffect, useCallback } from 'react';
import { mentorsApi } from '../api/mentors';
import useAuth from '../hooks/useAuth';

export const MentorContext = createContext();

const mockNotifications = [
  { id: 1, type: "system", title: "Bienvenue !", message: "Votre espace mentor a été initialisé avec succès.", time: "À l'instant", read: false }
];

const initialDefaultState = {
  teams: [],
  invitations: [],
  notifications: mockNotifications,
  stats: {
    totalTeams: 0,
    activeHackathons: 0,
    pendingSubmissions: 0,
    avgRating: 0
  }
};

export const MentorProvider = ({ children }) => {
  const { isAuthenticated, profile } = useAuth();
  const [state, setState] = useState(initialDefaultState);

  const loadMentorData = useCallback(async () => {
    try {
      const [teamsRes, invRes] = await Promise.all([
        mentorsApi.getMyTeams(),
        mentorsApi.getMyInvitations()
      ]);
      
      const rawTeams = teamsRes.data || teamsRes;
      const rawInvs = invRes.data || invRes;

      const formattedTeams = rawTeams.map(t => ({
        id: t.id,
        name: t.name || t.team_name || `Equipe ${t.id}`,
        hackathon: t.hackathon_title || 'Hackathon Inconnu',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name || t.team_name || 'Team')}&background=random`,
        progress: t.submissions?.length > 0 ? 100 : 0,
        nextMeeting: "Non planifié",
        status: t.submissions?.length > 0 ? "Soumission en cours" : "En développement",
        detailPath: `/mentor/teams/${t.id}`
      }));

      const formattedInvs = rawInvs.map(inv => ({
        id: inv.id,
        hackathonName: inv.hackathon_title,
        organizer: inv.organizer_name,
        logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(inv.hackathon_title || 'H')}&background=random`,
        dates: "Bientôt",
        teamCount: 0,
        status: inv.status.toLowerCase()
      }));

      setState(prev => ({
        ...prev,
        teams: formattedTeams,
        invitations: formattedInvs,
        stats: {
          ...prev.stats,
          totalTeams: formattedTeams.length,
          activeHackathons: new Set(formattedTeams.map(t => t.hackathon)).size
        }
      }));
    } catch (err) {
      console.error("Failed to load mentor data:", err);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && profile?.role === 'mentor') {
      loadMentorData();
    }
  }, [isAuthenticated, profile, loadMentorData]);

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
