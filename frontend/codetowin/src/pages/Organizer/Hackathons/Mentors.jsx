import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ACCEPTED_MENTORS = [
  {
    id: 1,
    name: 'Dr. Ousmane Diop',
    avatar: 'https://i.pravatar.cc/150?u=mentor1',
    role: 'Expert Data Science & AI',
    status: 'Assigné à 2 équipes',
  },
  {
    id: 2,
    name: 'Marie Koné',
    avatar: 'https://i.pravatar.cc/150?u=mentor2',
    role: 'UX/UI Designer Lead',
    status: 'Non assigné',
  },
];

const PENDING_MENTORS = [
  {
    id: 3,
    email: 'amadiop@example.com',
    initial: 'A',
    role: 'Invitation envoyée hier',
    status: 'En attente de réponse',
  },
  {
    id: 4,
    name: 'Paul Martin',
    avatar: 'https://i.pravatar.cc/150?u=mentor3',
    role: 'Invité depuis la plateforme',
    status: 'En attente de réponse',
  },
];

const NETWORK_MENTORS = [
  {
    id: 5,
    name: 'Sarah Connor',
    avatar: 'https://i.pravatar.cc/150?u=mentor_net1',
    role: 'CTO @ TechCorp',
    rating: '4.9/5 (12 participations)',
  },
  {
    id: 6,
    name: 'David G.',
    avatar: 'https://i.pravatar.cc/150?u=mentor_net2',
    role: 'Lead Dev Blockchain',
    rating: '4.5/5 (4 participations)',
  },
];

export default function OrganizerMentors() {
  const [activeTab, setActiveTab] = useState('accepted');
  const [isInviteNewModalOpen, setIsInviteNewModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const openAssignModal = (mentor) => {
    setSelectedMentor(mentor);
    setIsAssignModalOpen(true);
  };

  const handleAssign = (e) => {
    e.preventDefault();
    alert('Assignation enregistrée avec succès !');
    setIsAssignModalOpen(false);
  };

  const handleInviteNew = (e) => {
    e.preventDefault();
    alert('Invitation envoyée !');
    setIsInviteNewModalOpen(false);
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Topbar equivalent for Mentors page */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/organizer/hackathons" className="font-medium text-slate-500 hover:text-slate-900">AI for Climate Africa</Link>
            <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-slate-900">Mentors</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsInviteNewModalOpen(true)}
            className="inline-flex items-center rounded-md border border-transparent bg-brand-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
            Inviter un mentor
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="font-display text-2xl font-bold text-slate-900">Mentors</h1>
            <p className="mt-2 text-sm text-slate-700">Invitez des experts pour accompagner les équipes et donnez-leur accès aux soumissions pour l'évaluation.</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b border-slate-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('accepted')}
              className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'accepted' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}
            >
              Acceptés (2)
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'pending' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}
            >
              En attente (3)
            </button>
            <button
              onClick={() => setActiveTab('network')}
              className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'network' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}
            >
              Disponibles dans le réseau
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          
          {activeTab === 'accepted' && ACCEPTED_MENTORS.map((mentor) => (
            <div key={mentor.id} className="col-span-1 flex flex-col divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white text-center shadow-sm">
              <div className="flex flex-1 flex-col p-8">
                <img className="mx-auto h-24 w-24 flex-shrink-0 rounded-full" src={mentor.avatar} alt="" />
                <h3 className="mt-6 text-sm font-medium text-slate-900">{mentor.name}</h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                  <dd className="text-sm text-slate-500">{mentor.role}</dd>
                  <dd className="mt-3">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 ${mentor.status.includes('Non') ? 'bg-slate-100 text-slate-600' : 'bg-green-100 text-green-800'}`}>
                      {mentor.status}
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-slate-200">
                  <div className="flex w-0 flex-1">
                    <Link to="#" className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-xl border border-transparent py-4 text-sm font-medium text-slate-700 hover:text-slate-500">
                      Profil
                    </Link>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <button onClick={() => openAssignModal(mentor)} className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-xl border border-transparent py-4 text-sm font-medium text-slate-700 hover:text-slate-500 focus:outline-none">
                      Assigner
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {activeTab === 'pending' && PENDING_MENTORS.map((mentor) => (
            <div key={mentor.id} className="col-span-1 flex flex-col divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white text-center shadow-sm">
              <div className="flex flex-1 flex-col p-8">
                {mentor.avatar ? (
                  <img className="mx-auto h-24 w-24 flex-shrink-0 rounded-full" src={mentor.avatar} alt="" />
                ) : (
                  <div className="mx-auto flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <span className="text-xl font-bold">{mentor.initial}</span>
                  </div>
                )}
                <h3 className="mt-6 text-sm font-medium text-slate-900">{mentor.name || mentor.email}</h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                  <dd className="text-sm text-slate-500">{mentor.role}</dd>
                  <dd className="mt-3">
                    <span className="inline-flex rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold leading-5 text-amber-800">
                      {mentor.status}
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-slate-200">
                  <div className="flex w-0 flex-1">
                    <button className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-xl border border-transparent py-4 text-sm font-medium text-slate-700 hover:text-slate-500">
                      Relancer
                    </button>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <button className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-xl border border-transparent py-4 text-sm font-medium text-red-600 hover:text-red-500">
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {activeTab === 'network' && NETWORK_MENTORS.map((mentor) => (
            <div key={mentor.id} className="col-span-1 flex flex-col divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white text-center shadow-sm">
              <div className="flex flex-1 flex-col p-8">
                <img className="mx-auto h-24 w-24 flex-shrink-0 rounded-full" src={mentor.avatar} alt="" />
                <h3 className="mt-6 text-sm font-medium text-slate-900">{mentor.name}</h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                  <dd className="text-sm text-slate-500">{mentor.role}</dd>
                  <dd className="mt-3">
                    <span className="inline-flex items-center text-xs text-slate-500">
                      <svg className="mr-1 h-4 w-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg> 
                      {mentor.rating}
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-slate-200">
                  <div className="flex w-0 flex-1">
                    <Link to="#" className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-xl border border-transparent py-4 text-sm font-medium text-slate-700 hover:text-slate-500">
                      Profil
                    </Link>
                  </div>
                  <div className="-ml-px flex w-0 flex-1 bg-brand-50 rounded-br-xl hover:bg-brand-100">
                    <button onClick={() => alert('Invitation envoyée !')} className="relative inline-flex w-0 flex-1 items-center justify-center border border-transparent py-4 text-sm font-medium text-brand-700">
                      <svg className="mr-2 h-5 w-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                      Inviter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </main>

      {/* Modal Inviter Nouveau Mentor */}
      {isInviteNewModalOpen && (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" onClick={() => setIsInviteNewModalOpen(false)}></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form onSubmit={handleInviteNew}>
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <h3 className="text-lg font-semibold leading-6 text-slate-900" id="modal-title">Inviter un nouveau mentor</h3>
                        <div className="mt-4 space-y-5">
                          <div>
                            <label className="block text-sm font-medium leading-6 text-slate-900">Adresse e-mail <span className="text-red-500">*</span></label>
                            <input type="email" className="block w-full mt-2 rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-brand-600 sm:text-sm px-3" placeholder="mentor@exemple.com" required />
                          </div>
                          <div>
                            <label className="block text-sm font-medium leading-6 text-slate-900">Domaine d'expertise</label>
                            <input type="text" className="block w-full mt-2 rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-brand-600 sm:text-sm px-3" placeholder="ex: Data Science, UX/UI, Marketing..." />
                          </div>
                          <div>
                            <label className="block text-sm font-medium leading-6 text-slate-900">Message personnalisé (Optionnel)</label>
                            <textarea rows="3" className="block w-full mt-2 rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-brand-600 sm:text-sm px-3" placeholder="Bonjour, j'aimerais vous inviter..."></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="submit" className="inline-flex w-full justify-center rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 sm:ml-3 sm:w-auto focus:outline-none">Envoyer l'invitation</button>
                    <button type="button" onClick={() => setIsInviteNewModalOpen(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto focus:outline-none">Annuler</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Assigner Mentor */}
      {isAssignModalOpen && (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" onClick={() => setIsAssignModalOpen(false)}></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form onSubmit={handleAssign}>
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <h3 className="text-lg font-semibold leading-6 text-slate-900">Assigner <span className="text-brand-600">{selectedMentor?.name}</span></h3>
                        <div className="mt-4 space-y-5">
                          <div>
                            <label className="block text-sm font-medium leading-6 text-slate-900">Sélectionner les équipes à assigner</label>
                            <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-3 max-h-48 overflow-y-auto">
                              <div className="relative flex items-start">
                                <div className="flex h-6 items-center">
                                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
                                </div>
                                <div className="ml-3 text-sm leading-6">
                                  <label className="font-medium text-slate-900 cursor-pointer">AgriTech Innovators</label>
                                  <p className="text-slate-500">4 membres</p>
                                </div>
                              </div>
                              <div className="relative flex items-start">
                                <div className="flex h-6 items-center">
                                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
                                </div>
                                <div className="ml-3 text-sm leading-6">
                                  <label className="font-medium text-slate-900 cursor-pointer">Green Data Squad</label>
                                  <p className="text-slate-500">3 membres</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="submit" className="inline-flex w-full justify-center rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 sm:ml-3 sm:w-auto focus:outline-none">Enregistrer l'assignation</button>
                    <button type="button" onClick={() => setIsAssignModalOpen(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto focus:outline-none">Annuler</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
