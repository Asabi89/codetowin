import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }

  const {
    workspaceState,
    registered,
    profile,
    role,
    login,
    registerUser,
    logout,
    updateWorkspaceState,
    resetWorkspace
  } = context;

  const hasRole = (allowedRoles) => {
    if (!registered || !profile) return false;
    return allowedRoles.includes(role);
  };

  return {
    workspaceState,
    registered,
    profile,
    role,
    login,
    registerUser,
    logout,
    updateWorkspaceState,
    resetWorkspace,
    hasRole
  };
}
