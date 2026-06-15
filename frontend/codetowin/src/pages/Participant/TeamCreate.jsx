import React, { useState, useEffect } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import PageHeader from "../../components/common/PageHeader";
import { useToast } from "../../context/ToastContext";
import { teamsApi } from "../../api/teams";

export default function TeamCreate() {
  const { showToast } = useToast();
  const [openTeams, setOpenTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teamName, setTeamName] = useState("");
  const [teamSkills, setTeamSkills] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        // Using 'current' as placeholder for the current hackathon ID
        const response = await teamsApi.getTeamsByHackathon('current');
        setOpenTeams(response.data || response);
      } catch (error) {
        showToast("Erreur lors du chargement des équipes ouvertes", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, [showToast]);

  const handleCreateTeam = async () => {
    if (!teamName) {
      showToast("Veuillez entrer un nom d'équipe.", "error");
      return;
    }
    try {
      setIsSubmitting(true);
      await teamsApi.createTeam('current', { name: teamName, needed_skills: teamSkills });
      showToast("Équipe créée avec succès.", "success");
      setTeamName("");
      setTeamSkills("");
    } catch (error) {
      showToast("Erreur lors de la création de l'équipe", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJoinTeam = async (team) => {
    try {
      await teamsApi.joinTeam(team.id);
      showToast(`Demande envoyée à ${team.name}.`, "success");
    } catch (error) {
      showToast(`Erreur lors de l'envoi de la demande à ${team.name}`, "error");
    }
  };

  return (
    <div className="dashboard-content">
      <PageHeader
        title="Créer ou rejoindre une équipe"
        description="Déclare tes compétences, crée ton équipe ou rejoins une équipe ouverte."
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-bold text-slate-900">Créer une équipe</h2>
          <div className="mt-5 space-y-4">
            <input 
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" 
              placeholder="Nom de l’équipe" 
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <textarea 
              className="min-h-28 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" 
              placeholder="Compétences recherchées" 
              value={teamSkills}
              onChange={(e) => setTeamSkills(e.target.value)}
            />
            <Button onClick={handleCreateTeam} disabled={isSubmitting}>
              {isSubmitting ? "Création..." : "Créer l’équipe"}
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-slate-900">Équipes ouvertes</h2>
          {loading ? (
            <div className="flex h-32 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {openTeams.map((team) => (
                <div key={team.id} className="rounded-xl border border-slate-100 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{team.name}</p>
                      <p className="text-sm text-slate-500">{team.hackathon}</p>
                      <p className="mt-2 text-sm text-slate-600">Recherche : {team.lookingFor}</p>
                    </div>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      {team.seats} place{team.seats > 1 ? "s" : ""}
                    </span>
                  </div>
                  <Button className="mt-4" size="sm" variant="outline" onClick={() => handleJoinTeam(team)}>
                    Demander à rejoindre
                  </Button>
                </div>
              ))}
              {openTeams.length === 0 && (
                <p className="text-sm text-slate-500">Aucune équipe ouverte pour le moment.</p>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
