import React, { createContext, useState, useEffect } from 'react';
import { authApi } from '../api/auth';

export const AuthContext = createContext();

const STORAGE_KEY = 'hack_agent_workspace_state';
const TOKEN_KEY = 'token';

const initialDefaultState = {
  registered: false,
  profile: null,
  role: 'participant',
  // Keep the workspace fields for UI forms
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

  const [loading, setLoading] = useState(true);

  // Fetch real user session on mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        try {
          const user = await authApi.getMe();
          setState(prev => ({
            ...prev,
            registered: true,
            profile: {
               ...user,
               firstName: user.display_name || user.first_name || '',
               lastName: user.last_name || '',
               email: user.email,
               avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.display_name || user.username || 'User')}&background=047857&color=fff`
            },
            role: user.role ? user.role.toLowerCase() : 'participant'
          }));
        } catch (err) {
          console.error("Failed to fetch user session", err);
          localStorage.removeItem(TOKEN_KEY);
          setState(prev => ({ ...prev, registered: false, profile: null }));
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const login = async (email, password) => {
    try {
      const response = await authApi.login({ email, password: password || 'default' });
      const token = response.access || response.token;
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      }
      
      // Fetch profile
      const user = await authApi.getMe();
      
      setState(prev => ({
        ...prev,
        registered: true,
        profile: {
           ...user,
           firstName: user.display_name || user.first_name || '',
           lastName: user.last_name || '',
           email: user.email,
           avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.display_name || user.username || 'User')}&background=047857&color=fff`
        },
        role: user.role ? user.role.toLowerCase() : 'participant'
      }));
      return true;
    } catch (err) {
      console.error("Login failed", err);
      throw err;
    }
  };

  const registerUser = async (profileData) => {
    try {
      // Map frontend fields to backend fields
      const payload = {
        email: profileData.email,
        username: profileData.firstName || profileData.email,
        password: profileData.password || 'default123',
        full_name: `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim(),
        role: (profileData.role || 'PARTICIPANT').toUpperCase()
      };
      
      if (profileData.country !== undefined) {
        payload.country = profileData.country;
      }
      
      const response = await authApi.register(payload);
      
      // After successful registration, log them in
      await login(profileData.email, payload.password);
      return true;
    } catch (err) {
      console.error("Registration failed", err);
      throw err;
    }
  };

  const updateProfileContext = (updatedData) => {
    setState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...updatedData
      }
    }));
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(STORAGE_KEY);
    setState(initialDefaultState);
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
      role: prev.role
    }));
  };

  return (
    <AuthContext.Provider value={{
      workspaceState: state,
      registered: state.registered,
      profile: state.profile,
      role: state.role,
      loading,
      login,
      registerUser,
      updateProfileContext,
      logout,
      updateWorkspaceState,
      resetWorkspace
    }}>
      {children}
    </AuthContext.Provider>
  );
};
