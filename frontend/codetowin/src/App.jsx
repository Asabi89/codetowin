import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { MentorProvider } from './context/MentorContext';
import { OrganizerProvider } from './context/OrganizerContext';
import { ParticipantProvider } from './context/ParticipantContext';
import { ToastProvider } from './context/ToastContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <AuthProvider>
      <OrganizerProvider>
        <MentorProvider>
          <ParticipantProvider>
            <ToastProvider>
              <AppRoutes />
            </ToastProvider>
          </ParticipantProvider>
        </MentorProvider>
      </OrganizerProvider>
    </AuthProvider>
  );
}
