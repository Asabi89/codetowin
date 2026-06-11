import React, { useState } from 'react';
import { UserPlus, Star, Link as LinkIcon, FileText, CheckCircle, Clock, XCircle, UserCheck } from 'lucide-react';
import { Badge } from '../../../components/common/Badge';
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
    <div className="flex-1 overflow-y-auto bg-slate-50">
      
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
        <div className="flex items-center space-x-2 text-sm">
          <Link to="/organizer/hackathons" className="font-medium text-slate-500 hover:text-slate-900">AI for Climate Africa</Link>
          <span className="text-slate-400">/</span>
          <span className="font-medium text-slate-900">Mentors</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsInviteNewModalOpen(true)}
            className="inline-flex items-center rounded-md border border-transparent bg-brand-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-800"
          >
            <UserPlus className="-ml-1 mr-2 h-5 w-5" />
            Inviter un mentor
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
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
                    <button onClick={() => openAssignModal(mentor)} className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-xl border border-transparent py-4 text-sm font-medium text-slate-700 hover:text-slate-500">
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
                      <Star className="mr-1 h-4 w-4 text-gold-400 fill-current" /> {mentor.rating}
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
                      Inviter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

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
                        <UserPlus className="h-6 w-6 text-brand-600" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <h3 className="text-lg font-semibold leading-6 text-slate-900" id="modal-title">Inviter un nouveau mentor</h3>
                        <div className="mt-4 space-y-5">
                          <div>
                            <label className="block text-sm font-medium leading-6 text-slate-900">Adresse e-mail <span className="text-red-500">*</span></label>
                            <input type="email" className="mt-2 block w-full rounded-md border border-slate-300 py-1.5 text-slate-900 shadow-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 sm:text-sm px-3" placeholder="mentor@exemple.com" required />
                          </div>
                          <div>
                            <label className="block text-sm font-medium leading-6 text-slate-900">Domaine d'expertise</label>
                            <input type="text" className="mt-2 block w-full rounded-md border border-slate-300 py-1.5 text-slate-900 shadow-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 sm:text-sm px-3" placeholder="ex: Data Science, UX/UI, Marketing..." />
                          </div>
                          <div>
                            <label className="block text-sm font-medium leading-6 text-slate-900">Message personnalisé (Optionnel)</label>
                            <textarea rows="3" className="mt-2 block w-full rounded-md border border-slate-300 py-1.5 text-slate-900 shadow-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 sm:text-sm px-3" placeholder="Bonjour, j'aimerais vous inviter..."></textarea>
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
                        <UserCheck className="h-6 w-6 text-brand-600" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <h3 className="text-lg font-semibold leading-6 text-slate-900">Assigner <span className="text-brand-600">{selectedMentor?.name}</span></h3>
                        <div className="mt-4 space-y-5">
                          <div>
                            <label className="block text-sm font-medium leading-6 text-slate-900">Sélectionner les équipes à assigner</label>
                            <div className="mt-2 space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                              <div className="flex items-start">
                                <div className="flex h-6 items-center">
                                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
                                </div>
                                <div className="ml-3 text-sm leading-6">
                                  <label className="font-medium text-slate-900 cursor-pointer">AgriTech Innovators</label>
                                  <p className="text-slate-500">4 membres</p>
                                </div>
                              </div>
                              <div className="flex items-start">
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
