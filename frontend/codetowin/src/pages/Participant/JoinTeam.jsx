import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { teamsApi } from "../../api/teams";
import Button from "../../components/common/Button";
import { UserPlus, ArrowRight, Loader2, Home } from "lucide-react";
import { useToast } from "../../context/ToastContext";

export default function JoinTeam() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { registered, role } = useAuth();
  const { showToast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If user is not logged in, we save the token and redirect to login
    if (!registered) {
      sessionStorage.setItem("pending_invite_token", token);
      showToast("Veuillez vous connecter pour rejoindre l'équipe", "info");
      navigate("/login/participant", { replace: true });
      return;
    }

    if (role !== "participant") {
      setError("Seuls les participants peuvent rejoindre une équipe via ce lien.");
    }
  }, [registered, role, navigate, token, showToast]);

  const handleJoin = async () => {
    setLoading(true);
    setError(null);
    try {
      await teamsApi.joinTeamByToken(token);
      showToast("Vous avez rejoint l'équipe avec succès !", "success");
      // Redirect to team profile or participant dashboard
      navigate("/participant/profile", { replace: true });
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || "Une erreur est survenue lors de la tentative de rejoindre l'équipe.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!registered) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl border border-slate-100">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <UserPlus size={32} />
        </div>
        
        <h1 className="mb-2 text-2xl font-bold text-slate-900">
          Invitation d'équipe
        </h1>
        
        <p className="mb-8 text-slate-600">
          Vous avez été invité à rejoindre une équipe. Cliquez ci-dessous pour accepter l'invitation.
        </p>

        {error ? (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
            {error}
          </div>
        ) : null}

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleJoin}
            disabled={loading || !!error}
            className="w-full"
            icon={loading ? Loader2 : ArrowRight}
          >
            {loading ? "Rejoindre..." : "Accepter l'invitation"}
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="w-full"
            icon={Home}
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
}
