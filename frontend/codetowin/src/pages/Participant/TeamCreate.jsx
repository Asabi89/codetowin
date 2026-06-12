import React from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import PageHeader from "../../components/common/PageHeader";
import { openTeams } from "../../mockdata/participant";
import { useToast } from "../../context/ToastContext";

export default function TeamCreate() {
  const { showToast } = useToast();

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
            <input className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" placeholder="Nom de l’équipe" />
            <textarea className="min-h-28 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" placeholder="Compétences recherchées" />
            <Button onClick={() => showToast("Équipe créée avec succès.", "success")}>Créer l’équipe</Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-slate-900">Équipes ouvertes</h2>
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
                <Button className="mt-4" size="sm" variant="outline" onClick={() => showToast(`Demande envoyée à ${team.name}.`, "success")}>
                  Demander à rejoindre
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
