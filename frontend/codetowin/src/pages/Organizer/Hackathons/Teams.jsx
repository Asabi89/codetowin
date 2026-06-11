import React, { useState } from 'react';
import { Search, Mail, Eye, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

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
      avatar: 'https://ui-avatars.com/api/?name=Dr+Ousmane+Diop&background=random',
    },
    status: 'Soumis',
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
    status: 'Brouillon',
  },
];

export default function OrganizerTeams() {
  const { id } = useParams();
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
    if (status === 'Soumis') {
      return (
        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-600" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" /></svg>
          Projet soumis
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
        <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-slate-500" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" /></svg>
        Pas de projet
      </span>
    );
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Topbar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center">
          <button className="text-slate-500 focus:outline-none sm:hidden">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <nav className="hidden sm:flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <div className="flex">
                  <Link to={`/organizer/hackathons/${id || 1}/overview`} className="text-sm font-medium text-slate-500 hover:text-slate-700">AI for Climate Africa</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 flex-shrink-0 text-slate-400" aria-hidden="true" />
                  <span className="ml-4 text-sm font-medium text-slate-900" aria-current="page">Équipes</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* Main scrollable area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">Équipes formées ({teams.length})</h1>
            <p className="mt-1 text-sm text-slate-500">Consultez les équipes, attribuez des mentors et vérifiez les soumissions de projets.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative max-w-sm flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
              placeholder="Chercher une équipe..."
            />
          </div>
          <div className="sm:ml-4">
            <select
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-brand-600 sm:text-sm sm:leading-6"
            >
              <option>Tous les mentors</option>
              <option>Sans mentor</option>
              <option>Dr. Ousmane Diop</option>
              <option>Marie Koné</option>
            </select>
          </div>
        </div>

        {/* Grid of Teams */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <div key={team.id} className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <Link to={`/organizer/hackathons/${id || 1}/teams/${team.id}`} className="text-lg font-semibold text-slate-900 hover:text-brand-600 truncate">
                    {team.name}
                  </Link>
                  <span className="inline-flex items-center rounded-full bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-600/20">
                    {team.memberCount} membres
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                  {team.description}
                </p>
                <div className="mt-4 flex flex-1 items-end">
                  <div className="flex -space-x-2 overflow-hidden">
                    {team.members.map((member, idx) => (
                      <img
                        key={idx}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                        src={member}
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-b border-slate-200 bg-slate-50 px-6 py-3">
                <div className="flex items-center">
                  {team.mentor ? (
                    <>
                      <img className="h-6 w-6 rounded-full" src={team.mentor.avatar} alt="" />
                      <span className="ml-2 text-sm font-medium text-slate-700 truncate max-w-[100px] sm:max-w-[120px]">{team.mentor.name}</span>
                    </>
                  ) : (
                    <button onClick={() => openAssignModal(team)} className="text-sm font-medium text-brand-600 hover:text-brand-500">
                      + Assigner un mentor
                    </button>
                  )}
                </div>
                <div>
                  {getStatusBadge(team.status)}
                </div>
              </div>

              <div className="flex divide-x divide-slate-200">
                <button className="flex flex-1 items-center justify-center gap-x-2 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
                  Contacter
                </button>
                <Link to={`/organizer/hackathons/${id || 1}/teams/${team.id}`} className="flex flex-1 items-center justify-center gap-x-2 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  <Eye className="h-5 w-5 text-slate-400" aria-hidden="true" />
                  Détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal Assigner Mentor */}
      {isAssignModalOpen && (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
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
                    <div className="mt-4">
                      <label htmlFor="mentor-select" className="block text-sm font-medium leading-6 text-slate-900">
                        Sélectionner un mentor disponible
                      </label>
                      <select
                        id="mentor-select"
                        defaultValue=""
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-brand-600 sm:text-sm sm:leading-6"
                      >
                        <option value="" disabled>Choisissez un expert...</option>
                        <option value="ousmane">Dr. Ousmane Diop (Expert IA)</option>
                        <option value="marie">Marie Koné (UX/UI Designer)</option>
                        <option value="jean">Jean Dupont (DevOps)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={handleAssign}
                    className="inline-flex w-full justify-center rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:col-start-2"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAssignModalOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:col-start-1 sm:mt-0"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
