import React, { createContext, useState, useEffect } from 'react';
import { getDemoAccount } from '../mockdata/demoAccounts';

export const AuthContext = createContext();

const STORAGE_KEY = 'hack_agent_workspace_state';

const initialDefaultState = {
  registered: false,
  profile: null,
  role: 'participant',
  currentStep: 1,
  projectName: "",
  projectPitch: "",
  thumbnailUrl: "",
  teammates: [],
  detailsAbout: "",
  detailsBuiltWith: "",
  detailsRepo: "",
  detailsDemo: "",
  detailsVideo: "",
  questionMcp: "",
  questionSecurity: "",
  submitted: false,
  previewActive: false
};

const inferRole = (value = '', fallback = 'participant') => {
  const text = String(value).toLowerCase();
  const demoAccount = getDemoAccount(text);
  if (demoAccount?.role) return demoAccount.role;
  if (text.includes('mentor')) return 'mentor';
  if (
    text.includes('organizer') ||
    text.includes('organisateur') ||
    text.includes('admin') ||
    text.includes('org@') ||
    text.startsWith('org')
  ) {
    return 'organizer';
  }
  return fallback;
};

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing stored workspace state', e);
      }
    }
    return initialDefaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const login = (email, options = {}) => {
    // Mimic login by registering a mock user if profile doesn't exist
    setState(prev => {
      const loginEmail = email || 'participant@codetowin.com';
      const demoAccount = getDemoAccount(loginEmail);
      const mockProfile = demoAccount?.profile || {
        firstName: loginEmail.split('@')[0],
        lastName: '',
        email: loginEmail,
        title: 'Developer',
        about: '',
        bio: '',
        skills: 'React, Tailwind',
        interests: 'Hackathons',
        city: '',
        country: '',
        github: '',
        linkedin: '',
        website: '',
        visibility: 'public',
        isPublic: true,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80'
      };
      
      const newTeammates = (prev.teammates && prev.teammates.length > 0) ? prev.teammates : [
        {
          name: `${mockProfile.firstName} ${mockProfile.lastName}`.trim(),
          avatar: mockProfile.avatar,
          role: "Team Leader",
          status: "joined"
        },
        {
          name: "Elena Rostova",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80",
          role: "Developer",
          status: "pending"
        }
      ];

      const assignedRole = options.role || demoAccount?.role || inferRole(loginEmail, prev.role || 'participant');

      return {
        ...prev,
        registered: true,
        profile: mockProfile,
        role: assignedRole,
        memberRole: demoAccount?.memberRole || null,
        teammates: newTeammates
      };
    });
  };

  const registerUser = (profileData) => {
    setState(prev => {
      const leaderName = `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim() || 'User';
      const updatedTeammates = [...(prev.teammates || [])];
      const leaderIndex = updatedTeammates.findIndex(t => t.role === "Team Leader");
      
      const leaderObj = {
        name: leaderName,
        avatar: profileData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
        role: "Team Leader",
        status: "joined"
      };

      if (leaderIndex > -1) {
        updatedTeammates[leaderIndex] = leaderObj;
      } else {
        updatedTeammates.unshift(leaderObj);
      }

      // Add mock teammate if missing
      if (updatedTeammates.length < 2) {
        updatedTeammates.push({
          name: "Elena Rostova",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80",
          role: "Developer",
          status: "pending"
        });
      }

      return {
        ...prev,
        registered: true,
        profile: profileData,
        role: profileData.role || inferRole(profileData.email, prev.role || 'participant'),
        teammates: updatedTeammates
      };
    });
  };

  const logout = () => {
    setState(initialDefaultState);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateWorkspaceState = (updates) => {
    setState(prev => ({
      ...prev,
      ...updates
    }));
  };

  const resetWorkspace = () => {
    setState(prev => ({
      ...initialDefaultState,
      registered: prev.registered, // Keep logged in status
      profile: prev.profile,
      teammates: prev.profile ? [{
        name: `${prev.profile.firstName} ${prev.profile.lastName}`.trim(),
        avatar: prev.profile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80",
        role: "Team Leader",
        status: "joined"
      }] : []
    }));
  };

  return (
    <AuthContext.Provider value={{
      workspaceState: state,
      registered: state.registered,
      profile: state.profile,
      role: state.role,
      login,
      registerUser,
      logout,
      updateWorkspaceState,
      resetWorkspace
    }}>
      {children}
    </AuthContext.Provider>
  );
};
