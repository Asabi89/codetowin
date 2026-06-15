import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Copy, UserPlus } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import PageHeader from "../../components/common/PageHeader";
import { useToast } from "../../context/ToastContext";
import { teamsApi } from "../../api/teams";

export default function Team() {
  const { showToast } = useToast();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        // Using 'me' as placeholder for the current user's team ID
        const response = await teamsApi.getTeamById('me');
        setTeam(response.data || response);
      } catch (error) {
        showToast("Erreur lors du chargement de l'équipe", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [showToast]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement de l'équipe...</p>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-500">
        <p>Aucune équipe trouvée.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <PageHeader
        title="Mon Équipe"
        description="Gère les membres, le lien d’invitation, les tâches et le mentor assigné."
        actions={
          <Link to="/participant/team/create">
            <Button icon={UserPlus}>Créer / rejoindre</Button>
          </Link>
        }
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900">{team.name}</h2>
          <p className="mt-1 text-sm text-slate-600">Mentor assigné : {team.mentor}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {team.members?.map((member) => (
              <div key={member.name} className="flex items-center gap-3 rounded-xl border border-slate-100 p-4">
                <img src={member.avatar} alt="" className="h-11 w-11 rounded-full" />
                <div>
                  <p className="font-semibold text-slate-900">{member.name}</p>
                  <p className="text-sm text-slate-500">{member.role} · {member.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-slate-900">Invitation</h2>
          <p className="mt-2 break-all rounded-lg bg-slate-50 p-3 text-sm text-slate-600">{team.inviteLink}</p>
          <Button
            className="mt-4 w-full"
            variant="outline"
            icon={Copy}
            onClick={() => showToast("Lien d’invitation copié.", "success")}
          >
            Copier le lien
          </Button>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="text-lg font-bold text-slate-900">Tâches d’équipe</h2>
        <div className="mt-4 divide-y divide-slate-100">
          {team.tasks?.map((task) => (
            <div key={task.title} className="flex items-center justify-between py-4">
              <div>
                <p className="font-semibold text-slate-900">{task.title}</p>
                <p className="text-sm text-slate-500">Responsable : {task.owner}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{task.status}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
