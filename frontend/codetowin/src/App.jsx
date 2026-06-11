import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { MentorProvider } from './context/MentorContext';
import { OrganizerProvider } from './context/OrganizerContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <AuthProvider>
      <OrganizerProvider>
        <MentorProvider>
          <AppRoutes />
        </MentorProvider>
      </OrganizerProvider>
    </AuthProvider>
  );
}
