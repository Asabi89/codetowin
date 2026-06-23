import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Briefcase, GraduationCap, Trophy } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import useAuth from "../../hooks/useAuth";
import { useToast } from "../../context/ToastContext";
import { authApi } from "../../api/auth";
import "../../styles/pages/auth/login.css";

const roles = [
  {
    key: "participant",
    title: "Participant",
    description: "Explorer les hackathons, rejoindre une équipe et soumettre des projets.",
    image: "/assets/roles/dev_participant_role.png",
    action: "/participant",
    label: "Continuer comme participant",
  },
  {
    key: "organizer",
    title: "Organisateur",
    description: "Créer un hackathon et gérer participants, mentors, équipes et résultats.",
    image: "/assets/roles/organiser.png",
    action: "/organizer/hackathons/create",
    label: "Continuer comme organisateur",
  },
  {
    key: "mentor",
    title: "Mentor",
    description: "Accompagner les équipes, évaluer les soumissions et donner du feedback.",
    image: "/assets/roles/mentor_role.png",
    action: "/mentor",
    label: "Continuer comme mentor",
  },
];

export default function ChooseRole() {
  const navigate = useNavigate();
  const location = useLocation();
  const { registered, profile, updateWorkspaceState } = useAuth();
  const { showToast } = useToast();
  const isCompletingSignup = registered || location.state?.fromSignup;

  const handleChooseRole = (selectedRole) => {
    if (!isCompletingSignup) {
      navigate(`/signup?role=${selectedRole.key}`);
      return;
    }

    const otpCode = location.state?.otpCode || Math.floor(100000 + Math.random() * 900000).toString();
    const email = location.state?.email || 'user@codetowin.com';

    if (!location.state?.otpCode) {
      // Log newly generated OTP
      authApi.logOtp(email, otpCode).catch(console.error);
    }

    navigate('/verify-email', {
      state: {
        email: email,
        username: location.state?.username || 'User',
        password: location.state?.password || '',
        otpCode: otpCode,
        role: selectedRole.key,
        hasExplicitRole: true
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <Link to="/" className="text-2xl font-extrabold text-brand-700">CodeToWin</Link>
          <h1 className="mt-6 font-display text-3xl font-bold text-slate-900">
            {isCompletingSignup ? "Finalise ton inscription" : "Choisir le bon espace"}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            {isCompletingSignup
              ? "Choisis l’espace dans lequel tu veux commencer. Tu pourras évoluer ensuite selon tes activités sur CodeToWin."
              : "Choisis un parcours, puis crée ton compte avec le rôle adapté."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <Card key={role.title} className="relative text-center transition hover:-translate-y-1 hover:shadow-md">
              <div className="mx-auto flex h-32 w-32 items-center justify-center mb-4">
                <img src={role.image} alt={role.title} className="h-full w-full object-contain" />
              </div>
              <h2 className="mt-5 text-xl font-bold text-slate-900">{role.title}</h2>
              <p className="mt-3 text-sm text-slate-600">{role.description}</p>
              <div className="mt-6 block">
                <Button className="w-full">{role.label}</Button>
              </div>
              <button
                type="button"
                aria-label={role.label}
                onClick={() => handleChooseRole(role)}
                className="absolute inset-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
