import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Participant from './pages/Participant';
import Hackathons from './pages/Hackathons';
import HackathonDetail from './pages/HackathonDetail';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth routes without global layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Standard routes with MainLayout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />
        <Route
          path="/participant"
          element={
            <MainLayout>
              <Participant />
            </MainLayout>
          }
        />
        <Route
          path="/hackathons"
          element={
            <MainLayout>
              <Hackathons />
            </MainLayout>
          }
        />
        <Route
          path="/hackathons/:id"
          element={
            <MainLayout>
              <HackathonDetail />
            </MainLayout>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
