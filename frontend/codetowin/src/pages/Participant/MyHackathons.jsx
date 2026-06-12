import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, CalendarDays } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import PageHeader from "../../components/common/PageHeader";
import { participantHackathons } from "../../mockdata/participant";

const tabs = [
  { key: "active", label: "Actifs" },
  { key: "upcoming", label: "À venir" },
  { key: "completed", label: "Terminés" },
  { key: "saved", label: "Sauvegardés" },
];

export default function MyHackathons() {
  const [activeTab, setActiveTab] = useState("active");
  const filteredHackathons = useMemo(() => {
    if (activeTab === "saved") {
      return participantHackathons.filter((item) => item.saved);
    }
    return participantHackathons.filter((item) => item.status === activeTab);
  }, [activeTab]);

  return (
    <div className="dashboard-content">
      <PageHeader
        title="Mes Hackathons"
        description="Retrouve les hackathons actifs, à venir, terminés et sauvegardés."
        actions={
          <Link to="/hackathons">
            <Button variant="primary">Explorer</Button>
          </Link>
        }
      />

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              activeTab === tab.key
                ? "bg-brand-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {filteredHackathons.map((hackathon) => (
          <Card key={hackathon.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{hackathon.phase}</p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">{hackathon.title}</h2>
                <p className="mt-2 text-sm text-slate-600">
                  {hackathon.team} · {hackathon.role}
                </p>
              </div>
              <Bookmark className={`h-5 w-5 ${hackathon.saved ? "fill-brand-600 text-brand-600" : "text-slate-300"}`} />
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
              <CalendarDays className="h-4 w-4" />
              {hackathon.deadline}
            </div>
            <div className="mt-5 h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-brand-600" style={{ width: `${hackathon.progress}%` }} />
            </div>
            <div className="mt-5 flex gap-3">
              <Link to={`/hackathons/${hackathon.id}`}>
                <Button variant="outline" size="sm">Voir détail</Button>
              </Link>
              {hackathon.status !== "completed" && (
                <Link to={`/participant/join/${hackathon.id}`}>
                  <Button variant="secondary" size="sm">Reprendre</Button>
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
