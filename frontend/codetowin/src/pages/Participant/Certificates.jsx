import React from "react";
import { Download, ExternalLink } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import PageHeader from "../../components/common/PageHeader";
import { participantCertificates } from "../../mockdata/participant";
import { useToast } from "../../context/ToastContext";

export default function Certificates() {
  const { showToast } = useToast();

  return (
    <div className="dashboard-content">
      <PageHeader
        title="Mes Certificats"
        description="Télécharge tes certificats ou partage-les sur LinkedIn avec un identifiant vérifiable."
      />
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {participantCertificates.map((certificate) => (
          <Card key={certificate.id}>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{certificate.type}</p>
            <h2 className="mt-1 text-lg font-bold text-slate-900">{certificate.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{certificate.hackathon}</p>
            <p className="mt-1 text-sm text-slate-500">Émis le {certificate.issuedAt}</p>
            <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 font-mono text-xs text-slate-600">{certificate.id}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button size="sm" icon={Download} onClick={() => showToast("Téléchargement PDF simulé.", "success")}>
                Télécharger
              </Button>
              <Button size="sm" variant="outline" icon={ExternalLink} onClick={() => showToast("Lien LinkedIn préparé.", "success")}>
                Partager
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
