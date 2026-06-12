import React, { useContext, useState } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import PageHeader from "../../components/common/PageHeader";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export default function Submission() {
  const { workspaceState, updateWorkspaceState } = useContext(AuthContext);
  const { showToast } = useToast();
  const [form, setForm] = useState({
    projectName: workspaceState.projectName || "",
    projectPitch: workspaceState.projectPitch || "",
    detailsRepo: workspaceState.detailsRepo || "",
    detailsDemo: workspaceState.detailsDemo || "",
    detailsVideo: workspaceState.detailsVideo || "",
    detailsBuiltWith: workspaceState.detailsBuiltWith || "",
  });

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const saveSubmission = (submitted = false) => {
    updateWorkspaceState({ ...form, submitted });
    showToast(submitted ? "Projet soumis avec succès." : "Brouillon de soumission sauvegardé.", "success");
  };

  return (
    <div className="dashboard-content">
      <PageHeader
        title="Soumission du projet"
        description="Ajoute les informations nécessaires pour l’évaluation : GitHub, démo, pitch deck et stack technique."
      />

      <Card className="mt-6">
        <div className="grid gap-5 lg:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Titre du projet</span>
            <input name="projectName" value={form.projectName} onChange={updateField} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Stack technique</span>
            <input name="detailsBuiltWith" value={form.detailsBuiltWith} onChange={updateField} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" placeholder="React, Node.js, PostgreSQL..." />
          </label>
          <label className="block lg:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Description / pitch</span>
            <textarea name="projectPitch" value={form.projectPitch} onChange={updateField} className="mt-2 min-h-32 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Lien GitHub</span>
            <input name="detailsRepo" value={form.detailsRepo} onChange={updateField} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Lien démo</span>
            <input name="detailsDemo" value={form.detailsDemo} onChange={updateField} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" />
          </label>
          <label className="block lg:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Pitch deck ou vidéo</span>
            <input name="detailsVideo" value={form.detailsVideo} onChange={updateField} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm" />
          </label>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => saveSubmission(false)}>Sauvegarder brouillon</Button>
          <Button onClick={() => saveSubmission(true)}>Soumettre le projet</Button>
        </div>
      </Card>
    </div>
  );
}
