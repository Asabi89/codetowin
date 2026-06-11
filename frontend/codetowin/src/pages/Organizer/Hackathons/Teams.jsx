import React, { useState } from 'react';
import { Search, Mail, Eye } from 'lucide-react';
import { Badge } from '../../../components/common/Badge';
import { Link } from 'react-router-dom';

const TEAMS_MOCK = [
  {
    id: 1,
    name: 'AgriTech Innovators',
    memberCount: 4,
    description: "Solution IoT pour optimisation d'irrigation",
    members: [
      'https://i.pravatar.cc/150?u=a042581f4e29026704e',
      'https://i.pravatar.cc/150?u=a042581f4e29026705e',
      'https://i.pravatar.cc/150?u=a042581f4e29026706e',
      'https://i.pravatar.cc/150?u=a042581f4e29026707e',
    ],
    mentor: {
      name: 'Dr. Ousmane Diop',
      avatar: 'https://i.pravatar.cc/150?u=mentor1',
    },
    status: 'Soumission en cours',
  },
  {
    id: 2,
    name: 'Green Data Squad',
    memberCount: 3,
    description: "Analyse de données climatiques API",
    members: [
      'https://i.pravatar.cc/150?u=a042581f4e29026708e',
      'https://i.pravatar.cc/150?u=a042581f4e29026709e',
      'https://i.pravatar.cc/150?u=a042581f4e29026710e',
    ],
    mentor: null,
    status: 'Pas encore de projet',
  },
];

export default function OrganizerTeams() {
  const [teams, setTeams] = useState(TEAMS_MOCK);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const openAssignModal = (team) => {
    setSelectedTeam(team);
    setIsAssignModalOpen(true);
  };

  const handleAssign = () => {
    alert('Assignation enregistrée avec succès !');
    setIsAssignModalOpen(false);
  };

  const getStatusBadge = (status) => {
    if (status === 'Soumission en cours') return <Badge variant="warning">Soumission en cours</Badge>;
    if (status === 'Pas encore de projet') return <Badge variant="neutral">Pas encore de projet</Badge>;
    return <Badge variant="neutral">{status}</Badge>;
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      
      {/* Page specific Header equivalent */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
        <div className="flex items-center space-x-2 text-sm">
          <Link to="/organizer/hackathons" className="font-medium text-slate-500 hover:text-slate-900">AI for Climate Africa</Link>
          <span className="text-slate-400">/</span>
          <span className="font-medium text-slate-900">Équipes</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="font-display text-2xl font-bold text-slate-900">Équipes formées ({teams.length})</h1>
            <p className="mt-2 text-sm text-slate-700">Consultez les équipes, attribuez des mentors et vérifiez les soumissions de projets.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative rounded-md shadow-sm w-full sm:w-64">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input type="text" className="block w-full rounded-md border-slate-300 pl-10 focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 border" placeholder="Chercher une équipe..." />
          </div>
          <select className="block w-full sm:w-auto rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm border">
            <option>Tous les mentors</option>
            <option>Sans mentor</option>
            <option>Dr. Ousmane Diop</option>
            <option>Marie Koné</option>
          </select>
        </div>

        {/* Grid of Teams */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <div key={team.id} className="col-span-1 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <Link to="#" className="hover:underline"><h3 className="truncate text-lg font-medium text-slate-900">{team.name}</h3></Link>
                    <span className="inline-block flex-shrink-0 rounded-full bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-800">{team.memberCount} membres</span>
                  </div>
                  <p className="mt-1 truncate text-sm text-slate-500">{team.description}</p>
                  <div className="mt-4">
                    <div className="flex -space-x-2 overflow-hidden">
                      {team.members.map((member, idx) => (
                        <img key={idx} className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={member} alt="" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 px-6 py-3">
                <div className="flex items-center justify-between">
                  {team.mentor ? (
                    <div className="flex items-center">
                      <img className="h-6 w-6 rounded-full border border-slate-200" src={team.mentor.avatar} alt="" />
                      <span className="ml-2 text-sm text-slate-600 font-medium">{team.mentor.name}</span>
                    </div>
                  ) : (
                    <button onClick={() => openAssignModal(team)} className="text-sm font-medium text-brand-600 hover:text-brand-800 focus:outline-none">
                      + Assigner un mentor
                    </button>
                  )}
                  <div>
                    {getStatusBadge(team.status)}
                  </div>
                </div>
              </div>

              <div className="-mt-px flex divide-x divide-slate-200">
                <div className="flex w-0 flex-1">
                  <button className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-xl border border-transparent py-3 text-sm font-medium text-slate-700 hover:text-slate-500">
                    <Mail className="h-5 w-5 text-slate-400 mr-2" />
                    Contacter
                  </button>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <Link to="#" className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-xl border border-transparent py-3 text-sm font-medium text-slate-700 hover:text-slate-500">
                    <Eye className="h-5 w-5 text-slate-400 mr-2" />
                    Détails
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Assigner Mentor */}
      {isAssignModalOpen && (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" onClick={() => setIsAssignModalOpen(false)}></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg font-semibold leading-6 text-slate-900" id="modal-title">
                        Assigner un mentor à <span className="text-brand-600">{selectedTeam?.name}</span>
                      </h3>
                      <div className="mt-4 space-y-5">
                        <div>
                          <label htmlFor="mentor-select" className="block text-sm font-medium leading-6 text-slate-900">Sélectionner un mentor disponible</label>
                          <select id="mentor-select" defaultValue="" className="mt-2 block w-full rounded-md border border-slate-300 py-2 pl-3 pr-10 text-slate-900 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 sm:text-sm">
                            <option value="" disabled>Choisissez un expert...</option>
                            <option value="ousmane">Dr. Ousmane Diop (Expert IA)</option>
                            <option value="marie">Marie Koné (UX/UI Designer)</option>
                            <option value="jean">Jean Dupont (DevOps)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" onClick={handleAssign} className="inline-flex w-full justify-center rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 sm:ml-3 sm:w-auto focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2">Enregistrer</button>
                  <button type="button" onClick={() => setIsAssignModalOpen(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto focus:outline-none">Annuler</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
