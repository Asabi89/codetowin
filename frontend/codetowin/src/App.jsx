import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { MentorProvider } from './context/MentorContext';
import { OrganizerProvider } from './context/OrganizerContext';
import { ToastProvider } from './context/ToastContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <AuthProvider>
      <OrganizerProvider>
        <MentorProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </MentorProvider>
      </OrganizerProvider>
    </AuthProvider>
  );
}
