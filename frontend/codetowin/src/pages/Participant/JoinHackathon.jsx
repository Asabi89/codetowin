import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import PageHeader from "../../components/common/PageHeader";
import StepProgress from "../../components/common/StepProgress";
import { participantHackathons } from "../../mockdata/participant";
import { useToast } from "../../context/ToastContext";

const steps = ["Confirmation", "Équipe", "Compétences", "Résumé"];

export default function JoinHackathon() {
  const { id } = useParams();
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const hackathon = useMemo(
    () => participantHackathons.find((item) => item.id === id) || participantHackathons[0],
    [id],
  );

  const nextStep = () => {
    if (step < steps.length) {
      setStep((value) => value + 1);
      return;
    }
    showToast("Inscription au hackathon confirmée. Ton espace participant est prêt.", "success");
  };

  return (
    <div className="dashboard-content">
      <PageHeader
        title="Rejoindre un hackathon"
        description="Wizard en 4 étapes pour confirmer ta participation, ton équipe et tes compétences."
      />
      <Card className="mt-6">
        <StepProgress steps={steps} currentStep={step} />
        <div className="mt-8 rounded-xl bg-slate-50 p-6">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900">Confirme ta participation</h2>
              <p className="mt-2 text-slate-600">
                Tu rejoins <strong>{hackathon.title}</strong>. Vérifie la deadline : {hackathon.deadline}.
              </p>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900">Choisis ton équipe</h2>
              <p className="mt-2 text-slate-600">Crée une équipe ou rejoins une équipe ouverte selon tes compétences.</p>
              <Link to="/participant/team/create" className="mt-4 inline-block text-sm font-semibold text-brand-700">
                Voir les équipes ouvertes →
              </Link>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900">Ajoute tes compétences clés</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["React", "Node.js", "UI/UX", "Pitch", "Data"].map((skill) => (
                  <span key={skill} className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900">Résumé</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <p className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-brand-600" /> Hackathon confirmé</p>
                <p className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-brand-600" /> Équipe prête à être créée ou rejointe</p>
                <p className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-brand-600" /> Compétences ajoutées au profil</p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-between">
          <Button variant="outline" disabled={step === 1} onClick={() => setStep((value) => Math.max(1, value - 1))}>
            Retour
          </Button>
          <Button onClick={nextStep}>{step === steps.length ? "Confirmer" : "Continuer"}</Button>
        </div>
      </Card>
    </div>
  );
}
