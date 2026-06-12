import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useAuth from '../hooks/useAuth';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { registered, role, updateWorkspaceState } = useAuth();
  const location = useLocation();
  const shouldSwitchMockRole = (
    import.meta.env.DEV &&
    registered &&
    allowedRoles?.length === 1 &&
    !allowedRoles.includes(role)
  );

  useEffect(() => {
    if (shouldSwitchMockRole) {
      updateWorkspaceState({ role: allowedRoles[0] });
    }
  }, [allowedRoles, shouldSwitchMockRole, updateWorkspaceState]);

  if (!registered) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (shouldSwitchMockRole) {
    return (
      <LoadingSpinner message="Ouverture de votre espace..." />
    );
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // If authenticated but wrong role, redirect to profile or dashboard based on role
    if (role === 'organizer') return <Navigate to="/organizer" replace />;
    if (role === 'mentor') return <Navigate to="/mentor" replace />;
    return <Navigate to="/participant" replace />;
  }

  return children;
}
