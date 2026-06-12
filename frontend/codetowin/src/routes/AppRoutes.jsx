import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import {
  Navigate,
  Routes,
  Route,
  useLocation,
  useParams,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ParticipantLayout from "../layouts/ParticipantLayout";
import ProtectedRoute from "./ProtectedRoute";
import useAuth from "../hooks/useAuth";
import LoadingSpinner, { SpinnerIcon } from "../components/common/LoadingSpinner";
import ScrollToTop from "../components/common/ScrollToTop";
import EmbeddedPublicView from "../components/common/EmbeddedPublicView";

const Home = lazy(() => import("../pages/PublicSite/Home"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Signup = lazy(() => import("../pages/Auth/Signup"));
const ForgotPassword = lazy(() => import("../pages/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/Auth/ResetPassword"));
const ChooseRole = lazy(() => import("../pages/Auth/ChooseRole"));
const VerifyEmail = lazy(() => import("../pages/Auth/VerifyEmail"));
const Profile = lazy(() => import("../pages/Participant/Profile"));
const ParticipantProfile = lazy(() => import("../pages/Participant/index"));
const ParticipantDashboard = lazy(() => import("../pages/Participant/Dashboard"));
const ParticipantHackathons = lazy(() => import("../pages/Participant/MyHackathons"));
const ParticipantJoinHackathon = lazy(() => import("../pages/Participant/JoinHackathon"));
const ParticipantTeam = lazy(() => import("../pages/Participant/Team"));
const ParticipantTeamCreate = lazy(() => import("../pages/Participant/TeamCreate"));
const ParticipantSubmission = lazy(() => import("../pages/Participant/Submission"));
const ParticipantCertificates = lazy(() => import("../pages/Participant/Certificates"));
const ParticipantNotifications = lazy(() => import("../pages/Participant/Notifications"));
const ParticipantSettings = lazy(() => import("../pages/Participant/Settings"));
const ParticipantMessages = lazy(() => import("../pages/Participant/Messages"));
const Hackathons = lazy(() => import("../pages/PublicSite/Hackathons"));
const HackathonDetail = lazy(
  () => import("../pages/PublicSite/HackathonDetail"),
);
const About = lazy(() => import("../pages/PublicSite/About"));
const Contact = lazy(() => import("../pages/PublicSite/Contact"));
const CertificateVerification = lazy(
  () => import("../pages/PublicSite/CertificateVerification"),
);
const Talents = lazy(() => import("../pages/PublicSite/Talents"));
const TalentProfile = lazy(() => import("../pages/PublicSite/TalentProfile"));
const PublicProfile = lazy(() => import("../pages/PublicSite/PublicProfile"));
const Conditions = lazy(() => import("../pages/PublicSite/Conditions"));
const Politique = lazy(() => import("../pages/PublicSite/Politique"));
const Aide = lazy(() => import("../pages/PublicSite/Aide"));
const Participate = lazy(() => import("../pages/PublicSite/Participate"));
const Organize = lazy(() => import("../pages/PublicSite/Organize"));
const NotFound = lazy(() => import("../pages/Error/NotFound"));
const Forbidden = lazy(() => import("../pages/Error/Forbidden"));
const ServerError = lazy(() => import("../pages/Error/ServerError"));

const OrganizerDashboard = lazy(() => import("../pages/Organizer/Dashboard"));
const OrganizerHackathons = lazy(() => import("../pages/Organizer/Hackathons"));
const OrganizerCreateHackathon = lazy(
  () => import("../pages/Organizer/Hackathons/Create"),
);
const OrganizerEditHackathon = lazy(
  () => import("../pages/Organizer/Hackathons/Edit"),
);
const OrganizerParticipants = lazy(
  () => import("../pages/Organizer/Hackathons/Participants"),
);
const OrganizerTeams = lazy(
  () => import("../pages/Organizer/Hackathons/Teams"),
);
const OrganizerMentors = lazy(
  () => import("../pages/Organizer/Hackathons/Mentors"),
);
const OrganizerSubmissions = lazy(
  () => import("../pages/Organizer/Hackathons/Submissions"),
);
const OrganizerTeamDetails = lazy(
  () => import("../pages/Organizer/Hackathons/TeamDetails"),
);
const OrganizerEvaluation = lazy(
  () => import("../pages/Organizer/Hackathons/Evaluation"),
);
const OrganizerResults = lazy(
  () => import("../pages/Organizer/Hackathons/Results"),
);
const OrganizerMembers = lazy(() => import("../pages/Organizer/Members"));
const OrganizerMessages = lazy(() => import("../pages/Organizer/Messages"));
const OrganizerNotifications = lazy(
  () => import("../pages/Organizer/Notifications"),
);
const OrganizerAnnouncements = lazy(
  () => import("../pages/Organizer/Hackathons/Announcements"),
);
const OrganizerNewAnnouncement = lazy(
  () => import("../pages/Organizer/Hackathons/NewAnnouncement"),
);
const OrganizerAnnouncementDetails = lazy(
  () => import("../pages/Organizer/Hackathons/AnnouncementDetails"),
);
const OrganizerCertificate = lazy(
  () => import("../pages/Organizer/Hackathons/Certificate"),
);
const OrganizerUserProfile = lazy(
  () => import("../pages/Organizer/UserProfile"),
);
const OrganizerSettings = lazy(() => import("../pages/Organizer/Settings"));

const MentorDashboard = lazy(() => import("../pages/Mentor/Dashboard"));
const MentorInvitations = lazy(() => import("../pages/Mentor/Invitations"));
const MentorHackathonDetails = lazy(
  () => import("../pages/Mentor/HackathonDetails"),
);
const MentorTeams = lazy(() => import("../pages/Mentor/Teams"));
const MentorTeamDetails = lazy(() => import("../pages/Mentor/TeamDetails"));
const MentorTeamFeedback = lazy(() => import("../pages/Mentor/TeamFeedback"));
const MentorSubmissions = lazy(() => import("../pages/Mentor/Submissions"));
const MentorHackathonSubmissions = lazy(
  () => import("../pages/Mentor/HackathonSubmissions"),
);
const MentorSubmissionDetails = lazy(
  () => import("../pages/Mentor/SubmissionDetails"),
);
const MentorNotifications = lazy(() => import("../pages/Mentor/Notifications"));
const MentorProfile = lazy(() => import("../pages/Mentor/Profile"));
const MentorSettings = lazy(() => import("../pages/Mentor/Settings"));
const MentorMessages = lazy(() => import("../pages/Mentor/Messages"));

function RouteFallback() {
  return <LoadingSpinner message="Chargement..." />;
}

function RouteChangeSpinner() {
  const location = useLocation();
  const didMount = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return undefined;
    }

    setVisible(true);
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 450);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search, location.hash]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed left-1/2 top-4 z-[90] -translate-x-1/2 rounded-full border border-slate-200 bg-white/95 px-4 py-2 text-sm font-semibold text-slate-600 shadow-lg backdrop-blur">
      <div className="flex items-center gap-2">
        <SpinnerIcon size="sm" />
        <span>Chargement...</span>
      </div>
    </div>
  );
}

function PublicProfileRoute({ type }) {
  const { id } = useParams();
  const { registered, role } = useAuth();

  if (registered && ["participant", "mentor", "organizer"].includes(role)) {
    return <Navigate to={`/${role}/public/${type}/${id}`} replace />;
  }

  return (
    <MainLayout>
      <PublicProfile profileType={type} />
    </MainLayout>
  );
}

function PublicTalentRoute() {
  const { id } = useParams();
  const { registered, role } = useAuth();

  if (registered && ["participant", "mentor", "organizer"].includes(role)) {
    return <Navigate to={`/${role}/public/talents/${id}`} replace />;
  }

  return (
    <MainLayout>
      <TalentProfile />
    </MainLayout>
  );
}

function HomeRoute() {
  const { hash } = useLocation();
  const page = hash.replace("#", "");

  if (page === "conditions") {
    return <Conditions />;
  }

  if (page === "politique") {
    return <Politique />;
  }

  if (page === "aide") {
    return <Aide />;
  }

  return <Home />;
}

function EmbeddedTalentProfile({ backTo, backLabel }) {
  return (
    <EmbeddedPublicView embedded backTo={backTo} backLabel={backLabel} maxWidth="max-w-6xl">
      <TalentProfile embedded showBackLink={false} />
    </EmbeddedPublicView>
  );
}

function ParticipantEmbeddedProfileRoute({ type }) {
  const { id } = useParams();
  const { registered, role } = useAuth();

  if (!registered) {
    return <Navigate to={`/${type}/${id}`} replace />;
  }

  if (role !== "participant") {
    return <Navigate to={`/${role}/public/${type}/${id}`} replace />;
  }

  return (
    <MainLayout>
      <PublicProfile
        profileType={type}
        embedded
        backTo="/participant"
        backLabel="Retour à mon espace participant"
      />
    </MainLayout>
  );
}

function ParticipantEmbeddedTalentRoute() {
  const { id } = useParams();
  const { registered, role } = useAuth();

  if (!registered) {
    return <Navigate to={`/talents/${id}`} replace />;
  }

  if (role !== "participant") {
    return <Navigate to={`/${role}/public/talents/${id}`} replace />;
  }

  return (
    <MainLayout>
      <EmbeddedTalentProfile
        backTo="/participant"
        backLabel="Retour à mon espace participant"
      />
    </MainLayout>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <ScrollToTop />
      <RouteChangeSpinner />
      <Routes>
        {/* Auth routes without global layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/choose-role" element={<ChooseRole />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Standard routes with MainLayout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomeRoute />
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
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
        <Route
          path="/conditions"
          element={
            <MainLayout>
              <Conditions />
            </MainLayout>
          }
        />
        <Route
          path="/politique"
          element={
            <MainLayout>
              <Politique />
            </MainLayout>
          }
        />
        <Route
          path="/participer"
          element={
            <MainLayout>
              <Participate />
            </MainLayout>
          }
        />
        <Route
          path="/organiser"
          element={
            <MainLayout>
              <Organize />
            </MainLayout>
          }
        />
        <Route
          path="/aide"
          element={
            <MainLayout>
              <Aide />
            </MainLayout>
          }
        />
        <Route
          path="/certificates/verify"
          element={
            <MainLayout>
              <CertificateVerification />
            </MainLayout>
          }
        />
        <Route
          path="/talents"
          element={
            <MainLayout>
              <Talents />
            </MainLayout>
          }
        />
        <Route path="/talents/:id" element={<PublicTalentRoute />} />
        <Route
          path="/organizers/:id"
          element={<PublicProfileRoute type="organizers" />}
        />
        <Route
          path="/mentors/:id"
          element={<PublicProfileRoute type="mentors" />}
        />

        {/* Participant Routes */}
        <Route
          path="/participant"
          element={
            <ProtectedRoute allowedRoles={["participant"]}>
              <ParticipantLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ParticipantDashboard />} />
          <Route path="dashboard" element={<ParticipantDashboard />} />
          <Route path="hackathons" element={<ParticipantHackathons />} />
          <Route path="join/:id" element={<ParticipantJoinHackathon />} />
          <Route path="team" element={<ParticipantTeam />} />
          <Route path="team/create" element={<ParticipantTeamCreate />} />
          <Route path="submission" element={<ParticipantSubmission />} />
          <Route path="messages" element={<ParticipantMessages />} />
          <Route path="certificates" element={<ParticipantCertificates />} />
          <Route path="profile" element={<ParticipantProfile />} />
          <Route path="settings" element={<ParticipantSettings />} />
          <Route path="notifications" element={<ParticipantNotifications />} />
          <Route
            path="public/organizers/:id"
            element={<ParticipantEmbeddedProfileRoute type="organizers" />}
          />
          <Route
            path="public/mentors/:id"
            element={<ParticipantEmbeddedProfileRoute type="mentors" />}
          />
          <Route
            path="public/talents/:id"
            element={<ParticipantEmbeddedTalentRoute />}
          />
        </Route>

        {/* Organizer Routes */}
        <Route
          path="/organizer"
          element={
            <ProtectedRoute allowedRoles={["organizer"]}>
              <DashboardLayout role="organizer" />
            </ProtectedRoute>
          }
        >
          <Route index element={<OrganizerDashboard />} />
          <Route path="hackathons" element={<OrganizerHackathons />} />
          <Route
            path="hackathons/create"
            element={<OrganizerCreateHackathon />}
          />
          <Route
            path="hackathons/edit/:id"
            element={<OrganizerEditHackathon />}
          />
          <Route
            path="hackathons/:id/participants"
            element={<OrganizerParticipants />}
          />
          <Route path="hackathons/:id/teams" element={<OrganizerTeams />} />
          <Route
            path="hackathons/:id/teams/:teamId"
            element={<OrganizerTeamDetails />}
          />
          <Route path="hackathons/:id/mentors" element={<OrganizerMentors />} />
          <Route
            path="hackathons/:id/submissions"
            element={<OrganizerSubmissions />}
          />
          <Route
            path="hackathons/:id/evaluation"
            element={<OrganizerEvaluation />}
          />
          <Route path="hackathons/:id/results" element={<OrganizerResults />} />
          <Route
            path="hackathons/:id/certificate"
            element={<OrganizerCertificate />}
          />
          <Route
            path="hackathons/:id/announcements"
            element={<OrganizerAnnouncements />}
          />
          <Route
            path="hackathons/:id/announcements/new"
            element={<OrganizerNewAnnouncement />}
          />
          <Route
            path="hackathons/:id/announcements/:announcementId"
            element={<OrganizerAnnouncementDetails />}
          />
          <Route path="members" element={<OrganizerMembers />} />
          <Route path="members/:id" element={<OrganizerUserProfile />} />
          <Route path="messages" element={<OrganizerMessages />} />
          <Route path="notifications" element={<OrganizerNotifications />} />
          <Route path="settings" element={<OrganizerSettings />} />
          <Route
            path="public/organizers/:id"
            element={
              <PublicProfile
                profileType="organizers"
                embedded
                backTo="/organizer"
                backLabel="Retour à mon espace organisateur"
              />
            }
          />
          <Route
            path="public/mentors/:id"
            element={
              <PublicProfile
                profileType="mentors"
                embedded
                backTo="/organizer/hackathons"
                backLabel="Retour à mes hackathons"
              />
            }
          />
          <Route
            path="public/talents/:id"
            element={
              <EmbeddedTalentProfile
                backTo="/organizer/hackathons"
                backLabel="Retour à mon espace organisateur"
              />
            }
          />
        </Route>

        {/* Mentor Routes */}
        <Route
          path="/mentor"
          element={
            <ProtectedRoute allowedRoles={["mentor"]}>
              <DashboardLayout role="mentor" />
            </ProtectedRoute>
          }
        >
          <Route index element={<MentorDashboard />} />
          <Route path="invitations" element={<MentorInvitations />} />
          <Route path="hackathons/:id" element={<MentorHackathonDetails />} />
          <Route path="teams" element={<MentorTeams />} />
          <Route path="teams/:id" element={<MentorTeamDetails />} />
          <Route path="teams/:id/feedback" element={<MentorTeamFeedback />} />
          <Route path="submissions" element={<MentorSubmissions />} />
          <Route
            path="hackathons/:id/submissions"
            element={<MentorHackathonSubmissions />}
          />
          <Route path="submissions/:id" element={<MentorSubmissionDetails />} />
          <Route path="messages" element={<MentorMessages />} />
          <Route path="profile" element={<MentorProfile />} />
          <Route path="settings" element={<MentorSettings />} />
          <Route path="notifications" element={<MentorNotifications />} />
          <Route
            path="public/organizers/:id"
            element={
              <PublicProfile
                profileType="organizers"
                embedded
                backTo="/mentor/submissions"
                backLabel="Retour à mon espace mentor"
              />
            }
          />
          <Route
            path="public/mentors/:id"
            element={
              <PublicProfile
                profileType="mentors"
                embedded
                backTo="/mentor"
                backLabel="Retour à mon espace mentor"
              />
            }
          />
          <Route
            path="public/talents/:id"
            element={
              <EmbeddedTalentProfile
                backTo="/mentor/teams"
                backLabel="Retour à mon espace mentor"
              />
            }
          />
        </Route>

        {/* Test Error Routes */}
        <Route
          path="/404"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
        <Route
          path="/403"
          element={
            <MainLayout>
              <Forbidden />
            </MainLayout>
          }
        />
        <Route
          path="/500"
          element={
            <MainLayout>
              <ServerError />
            </MainLayout>
          }
        />

        {/* Catch-all Route for 404 */}
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
      </Routes>
    </Suspense>
  );
}
