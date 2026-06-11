import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Participant from './pages/Participant';
import Hackathons from './pages/Hackathons';
import HackathonDetail from './pages/HackathonDetail';
import VerifyEmail from './pages/VerifyEmail';

// Organizer Pages
import OrganizerDashboard from './pages/Organizer/Dashboard';
import OrganizerHackathons from './pages/Organizer/Hackathons';
import OrganizerCreateHackathon from './pages/Organizer/Hackathons/Create';
import OrganizerEditHackathon from './pages/Organizer/Hackathons/Edit';
import OrganizerParticipants from './pages/Organizer/Hackathons/Participants';
import OrganizerTeams from './pages/Organizer/Hackathons/Teams';
import OrganizerMentors from './pages/Organizer/Hackathons/Mentors';
import OrganizerSubmissions from './pages/Organizer/Hackathons/Submissions';
import OrganizerTeamDetails from './pages/Organizer/Hackathons/TeamDetails';
import OrganizerEvaluation from './pages/Organizer/Hackathons/Evaluation';
import OrganizerResults from './pages/Organizer/Hackathons/Results';
import OrganizerMembers from './pages/Organizer/Members';
import OrganizerMessages from './pages/Organizer/Messages';
import OrganizerNotifications from './pages/Organizer/Notifications';
import OrganizerAnnouncements from './pages/Organizer/Hackathons/Announcements';
import OrganizerNewAnnouncement from './pages/Organizer/Hackathons/NewAnnouncement';
import OrganizerAnnouncementDetails from './pages/Organizer/Hackathons/AnnouncementDetails';
import OrganizerCertificate from './pages/Organizer/Hackathons/Certificate';
import OrganizerUserProfile from './pages/Organizer/UserProfile';
import OrganizerSettings from './pages/Organizer/Settings';

// Mentor Pages
import MentorDashboard from './pages/Mentor/Dashboard';
import MentorInvitations from './pages/Mentor/Invitations';
import MentorHackathonDetails from './pages/Mentor/HackathonDetails';
import MentorTeams from './pages/Mentor/Teams';
import MentorTeamDetails from './pages/Mentor/TeamDetails';
import MentorTeamFeedback from './pages/Mentor/TeamFeedback';
import MentorSubmissions from './pages/Mentor/Submissions';
import MentorHackathonSubmissions from './pages/Mentor/HackathonSubmissions';
import MentorSubmissionDetails from './pages/Mentor/SubmissionDetails';
import MentorNotifications from './pages/Mentor/Notifications';
import MentorProfile from './pages/Mentor/Profile';
import MentorSettings from './pages/Mentor/Settings';
import MentorMessages from './pages/Mentor/Messages';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth routes without global layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

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

        {/* Organizer Routes */}
        <Route path="/organizer" element={<DashboardLayout role="organizer" />}>
          <Route index element={<OrganizerDashboard />} />
          <Route path="hackathons" element={<OrganizerHackathons />} />
          <Route path="hackathons/create" element={<OrganizerCreateHackathon />} />
          <Route path="hackathons/edit/:id" element={<OrganizerEditHackathon />} />
          <Route path="hackathons/:id/participants" element={<OrganizerParticipants />} />
          <Route path="hackathons/:id/teams" element={<OrganizerTeams />} />
          <Route path="hackathons/:id/teams/:teamId" element={<OrganizerTeamDetails />} />
          <Route path="hackathons/:id/mentors" element={<OrganizerMentors />} />
          <Route path="hackathons/:id/submissions" element={<OrganizerSubmissions />} />
          <Route path="hackathons/:id/evaluation" element={<OrganizerEvaluation />} />
          <Route path="hackathons/:id/results" element={<OrganizerResults />} />
          <Route path="hackathons/:id/certificate" element={<OrganizerCertificate />} />
          <Route path="hackathons/:id/announcements" element={<OrganizerAnnouncements />} />
          <Route path="hackathons/:id/announcements/new" element={<OrganizerNewAnnouncement />} />
          <Route path="hackathons/:id/announcements/:announcementId" element={<OrganizerAnnouncementDetails />} />
          <Route path="members" element={<OrganizerMembers />} />
          <Route path="members/:id" element={<OrganizerUserProfile />} />
          <Route path="messages" element={<OrganizerMessages />} />
          <Route path="notifications" element={<OrganizerNotifications />} />
          <Route path="settings" element={<OrganizerSettings />} />
        </Route>
        
        {/* Mentor Routes */}
        <Route path="/mentor" element={<DashboardLayout role="mentor" />}>
          <Route index element={<MentorDashboard />} />
          <Route path="invitations" element={<MentorInvitations />} />
          <Route path="hackathons/:id" element={<MentorHackathonDetails />} />
          <Route path="teams" element={<MentorTeams />} />
          <Route path="teams/:id" element={<MentorTeamDetails />} />
          <Route path="teams/:id/feedback" element={<MentorTeamFeedback />} />
          <Route path="submissions" element={<MentorSubmissions />} />
          <Route path="hackathons/:id/submissions" element={<MentorHackathonSubmissions />} />
          <Route path="submissions/:id" element={<MentorSubmissionDetails />} />
          <Route path="messages" element={<MentorMessages />} />
          <Route path="profile" element={<MentorProfile />} />
          <Route path="settings" element={<MentorSettings />} />
          <Route path="notifications" element={<MentorNotifications />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
