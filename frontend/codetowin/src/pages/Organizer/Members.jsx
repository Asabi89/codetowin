import React, { useState } from 'react';
import { Badge } from '../../components/common/Badge';

const MEMBERS_MOCK = [
  {
    id: 1,
    name: 'Emmanuel D.',
    email: 'emmanuel@techhub.com',
    avatar: 'https://ui-avatars.com/api/?name=Emmanuel+D&background=047857&color=fff',
    role: 'Propriétaire',
    status: 'Actif',
  },
  {
    id: 2,
    name: 'Aïssatou S.',
    email: 'aissatou@techhub.com',
    avatar: 'https://ui-avatars.com/api/?name=Aissatou+S&background=cbd5e1&color=334155',
    role: 'Éditeur',
    status: 'Actif',
  },
  {
    id: 3,
    name: 'Moussa K.',
    email: 'moussa@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=M&background=e2e8f0&color=475569',
    role: 'Administrateur',
    status: 'Invitation en attente',
  },
];

export default function OrganizerMembers() {
  const [members, setMembers] = useState(MEMBERS_MOCK);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('editor');

  const handleInvite = (e) => {
    e.preventDefault();
    if (inviteEmail) {
      alert(`Invitation envoyée à ${inviteEmail} !`);
      setIsInviteModalOpen(false);
      setInviteEmail('');
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'Actif') return <Badge variant="success">Actif</Badge>;
    if (status === 'Invitation en attente') return <Badge variant="warning">Invitation en attente</Badge>;
    return <Badge variant="neutral">{status}</Badge>;
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        
        <div className="mt-8 space-y-6">
          <div className="bg-white shadow sm:rounded-xl">
            <div className="px-4 py-6 sm:p-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-slate-900">Membres de l'équipe</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">Gérez qui a accès à l'administration de vos hackathons.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    onClick={() => setIsInviteModalOpen(true)}
                    className="block rounded-md bg-brand-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    Inviter un membre
                  </button>
                </div>
              </div>

              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-slate-300">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-0">Nom</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Rôle</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Statut</th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {members.map((member) => (
                          <tr key={member.id}>
                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img className="h-10 w-10 rounded-full" src={member.avatar} alt="" />
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-slate-900">{member.name}</div>
                                  <div className="mt-1 text-slate-500">{member.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-5 text-sm text-slate-500">
                              {member.role === 'Propriétaire' ? (
                                <div className="text-slate-900">Propriétaire</div>
                              ) : (
                                <select 
                                  defaultValue={member.role}
                                  className="rounded-md border-0 py-1.5 pl-3 pr-8 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-brand-600 sm:text-sm sm:leading-6"
                                >
                                  <option>Administrateur</option>
                                  <option>Éditeur</option>
                                  <option>Évaluateur</option>
                                </select>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-3 py-5 text-sm text-slate-500">
                              {getStatusBadge(member.status)}
                            </td>
                            <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              {member.role !== 'Propriétaire' && (
                                <>
                                  {member.status === 'Invitation en attente' ? (
                                    <>
                                      <button className="text-brand-600 hover:text-brand-900">Renvoyer</button>
                                      <span className="mx-2 text-slate-300">|</span>
                                      <button className="text-red-600 hover:text-red-900">Annuler</button>
                                    </>
                                  ) : (
                                    <button className="text-red-600 hover:text-red-900">Retirer</button>
                                  )}
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Inviter Membre Équipe */}
        {isInviteModalOpen && (
          <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" onClick={() => setIsInviteModalOpen(false)}></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form onSubmit={handleInvite}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                          <h3 className="text-lg font-semibold leading-6 text-slate-900" id="modal-title">Inviter un membre d'équipe</h3>
                          <div className="mt-4 space-y-5">
                            <div>
                              <label htmlFor="member-email" className="block text-sm font-medium leading-6 text-slate-900">Adresse e-mail <span className="text-red-500">*</span></label>
                              <div className="mt-2">
                                <input 
                                  type="email" 
                                  id="member-email" 
                                  value={inviteEmail}
                                  onChange={e => setInviteEmail(e.target.value)}
                                  className="block w-full rounded-md border border-slate-300 py-1.5 text-slate-900 shadow-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 sm:text-sm px-3" 
                                  placeholder="collegue@techhub.com" 
                                  required 
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="member-role" className="block text-sm font-medium leading-6 text-slate-900">Rôle <span className="text-red-500">*</span></label>
                              <select 
                                id="member-role" 
                                value={inviteRole}
                                onChange={e => setInviteRole(e.target.value)}
                                className="mt-2 block w-full rounded-md border border-slate-300 py-2 pl-3 pr-10 text-slate-900 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 sm:text-sm"
                              >
                                <option value="admin">Administrateur (Accès total)</option>
                                <option value="editor">Éditeur (Peut créer/modifier des hackathons)</option>
                                <option value="viewer">Évaluateur (Peut voir et noter les soumissions)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button type="submit" className="inline-flex w-full justify-center rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 sm:ml-3 sm:w-auto focus:outline-none">Envoyer l'invitation</button>
                      <button type="button" onClick={() => setIsInviteModalOpen(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto focus:outline-none">Annuler</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
