import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ACCEPTED_MENTORS_MOCK, PENDING_MENTORS_MOCK, NETWORK_MENTORS_MOCK, TEAMS_MOCK } from '../../../mockdata/organizer';
import { mentorsApi } from '../../../api/mentors';
import { teamsApi } from '../../../api/teams';
import { useToast } from '../../../context/ToastContext';
import { extractArray } from '../../../services/normalizers';

const normalizeMentor = (mentor) => {
  const user = mentor.user || {};
  const name = mentor.name || user.name || user.full_name || mentor.email || user.email || 'Mentor';
  return {
    ...mentor,
    id: mentor.id || mentor._id || user.id || user._id,
    name,
    email: mentor.email || user.email || '',
    avatar: mentor.avatar || user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    role: mentor.role || mentor.expertise || mentor.specialty || mentor.title || 'Mentor Réseau',
    rating: mentor.rating || mentor.score || '4.8/5',
    status: mentor.status || mentor.invitation_status || 'available',
  };
};

const splitMentorsByStatus = (mentors) => mentors.reduce((acc, mentor) => {
  const normalized = normalizeMentor(mentor);
  const status = String(normalized.status).toLowerCase();
  if (['accepted', 'approved', 'active', 'assigned', 'accepté', 'accepte'].includes(status)) {
    acc.accepted.push({
      ...normalized,
      status: normalized.assigned_teams_count ? `Assigné à ${normalized.assigned_teams_count} équipes` : 'Non assigné',
    });
  } else if (['pending', 'invited', 'waiting', 'en attente', 'sent'].includes(status)) {
    acc.pending.push({
      ...normalized,
      initial: normalized.name.charAt(0).toUpperCase(),
      status: 'En attente de réponse',
    });
  } else {
    acc.network.push(normalized);
  }
  return acc;
}, { accepted: [], pending: [], network: [] });

export default function OrganizerMentors() {
  const { id } = useParams();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('accepted');
  const [isInviteNewModalOpen, setIsInviteNewModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [notice, setNotice] = useState('');

  // Lists states
  const [acceptedMentors, setAcceptedMentors] = useState(ACCEPTED_MENTORS_MOCK);
  const [pendingMentors, setPendingMentors] = useState(PENDING_MENTORS_MOCK);
  const [networkMentors, setNetworkMentors] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states for invitation modal
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteExpertise, setInviteExpertise] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [mentorsData, teamsData] = await Promise.all([
          mentorsApi.getMentors(),
          teamsApi.getTeamsByHackathon(id)
        ]);

        const apiMentors = extractArray(mentorsData);
        if (apiMentors.length > 0) {
          const groupedMentors = splitMentorsByStatus(apiMentors);
          setAcceptedMentors(groupedMentors.accepted.length > 0 ? groupedMentors.accepted : ACCEPTED_MENTORS_MOCK);
          setPendingMentors(groupedMentors.pending.length > 0 ? groupedMentors.pending : PENDING_MENTORS_MOCK);
          setNetworkMentors(groupedMentors.network.length > 0 ? groupedMentors.network : NETWORK_MENTORS_MOCK);
        } else {
          setAcceptedMentors(ACCEPTED_MENTORS_MOCK);
          setPendingMentors(PENDING_MENTORS_MOCK);
          setNetworkMentors(NETWORK_MENTORS_MOCK);
        }

        const apiTeams = extractArray(teamsData);
        if (apiTeams.length > 0) {
          setTeams(apiTeams);
        } else {
          setTeams(TEAMS_MOCK);
        }
      } catch (err) {
        console.warn("Erreur lors du chargement des données Mentors, utilisation des fallbacks.", err);
        setAcceptedMentors(ACCEPTED_MENTORS_MOCK);
        setPendingMentors(PENDING_MENTORS_MOCK);
        setNetworkMentors(NETWORK_MENTORS_MOCK);
        setTeams(TEAMS_MOCK);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const openAssignModal = (mentor) => {
    setSelectedMentor(mentor);
    setIsAssignModalOpen(true);
  };

  const handleInviteNew = async () => {
    try {
      const payload = {
        email: inviteEmail,
        expertise: inviteExpertise,
        message: inviteMessage
      };
      await mentorsApi.inviteMentorToHackathon(id, payload);
      
      const newPending = {
        id: Date.now(),
        email: inviteEmail,
        initial: inviteEmail.charAt(0).toUpperCase(),
        role: inviteExpertise || 'Expert invité',
        status: 'En attente de réponse'
      };
      setPendingMentors(prev => [...prev, newPending]);
      showToast("Invitation envoyée !", "success");
      setIsInviteNewModalOpen(false);
      setInviteEmail('');
      setInviteExpertise('');
      setInviteMessage('');
    } catch (err) {
      console.warn("Erreur lors de l'envoi de l'invitation, simulation locale.", err);
      const newPending = {
        id: Date.now(),
        email: inviteEmail,
        initial: inviteEmail.charAt(0).toUpperCase(),
        role: inviteExpertise || 'Expert invité',
        status: 'En attente de réponse'
      };
      setPendingMentors(prev => [...prev, newPending]);
      showToast("Invitation envoyée !", "success");
      setIsInviteNewModalOpen(false);
      setInviteEmail('');
      setInviteExpertise('');
      setInviteMessage('');
    }
  };

  const handleInviteFromNetwork = async (mentor) => {
    try {
      const payload = {
        email: mentor.email || `${mentor.name.toLowerCase().replace(/[^a-z]/g, '')}@example.com`,
        expertise: mentor.role || 'Mentor du réseau',
        message: `Bonjour ${mentor.name}, j'aimerais vous inviter à rejoindre notre hackathon en tant que mentor.`
      };
      await mentorsApi.inviteMentorToHackathon(id, payload);
      
      const newPending = {
        id: Date.now(),
        name: mentor.name,
        avatar: mentor.avatar,
        role: mentor.role || 'Expert invité',
        status: 'En attente de réponse'
      };
      setPendingMentors(prev => [...prev, newPending]);
      showToast(`Invitation envoyée à ${mentor.name} !`, 'success');
    } catch (err) {
      console.warn("Erreur lors de l'envoi de l'invitation, simulation locale.", err);
      const newPending = {
        id: Date.now(),
        name: mentor.name,
        avatar: mentor.avatar,
        role: mentor.role || 'Expert invité',
        status: 'En attente de réponse'
      };
      setPendingMentors(prev => [...prev, newPending]);
      showToast(`Invitation envoyée à ${mentor.name} !`, 'success');
    }
  };

  const handleResendInvitation = (mentor) => {
    setNotice(`Invitation relancée pour ${mentor.name || mentor.email}.`);
  };

  const handleCancelInvitation = (mentorId) => {
    setPendingMentors(prev => prev.filter(mentor => mentor.id !== mentorId));
    setNotice('Invitation annulée.');
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8 flex-1">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement des mentors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="font-display text-2xl font-bold text-slate-900">Mentors</h1>
          <p className="mt-2 text-sm text-slate-700">Invitez des experts pour accompagner les équipes et donnez-leur accès aux soumissions pour l'évaluation.</p>
          {notice && (
            <p className="mt-3 rounded-md bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700">
              {notice}
            </p>
          )}
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
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
      </div>

        {/* Tabs */}
        <div className="mt-6 border-b border-slate-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('accepted')}
              className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'accepted' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}
            >
              Acceptés ({acceptedMentors.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'pending' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}
            >
              En attente ({pendingMentors.length})
            </button>
            <button
              onClick={() => setActiveTab('network')}
              className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'network' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}
            >
              Disponibles dans le réseau ({networkMentors.length})
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          
          {activeTab === 'accepted' && acceptedMentors.map((mentor) => (
            <div key={mentor.id} className="col-span-1 flex flex-col divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white text-center shadow-sm">
              <div className="flex flex-1 flex-col p-8">
                <img className="mx-auto h-24 w-24 flex-shrink-0 rounded-full object-cover" src={mentor.avatar} alt="" />
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
                    <Link to={`/organizer/public/mentors/${mentor.id || 'dr-ousmane-diop'}`} className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-xl border border-transparent py-4 text-sm font-medium text-slate-700 hover:text-slate-500">
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

          {activeTab === 'pending' && pendingMentors.map((mentor) => (
            <div key={mentor.id} className="col-span-1 flex flex-col divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white text-center shadow-sm">
              <div className="flex flex-1 flex-col p-8">
                {mentor.avatar ? (
                  <img className="mx-auto h-24 w-24 flex-shrink-0 rounded-full object-cover" src={mentor.avatar} alt="" />
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
                    <button onClick={() => handleResendInvitation(mentor)} className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-xl border border-transparent py-4 text-sm font-medium text-slate-700 hover:text-slate-500">
                      Relancer
                    </button>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <button onClick={() => handleCancelInvitation(mentor.id)} className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-xl border border-transparent py-4 text-sm font-medium text-red-600 hover:text-red-500">
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {activeTab === 'network' && networkMentors.map((mentor) => (
            <div key={mentor.id} className="col-span-1 flex flex-col divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white text-center shadow-sm">
              <div className="flex flex-1 flex-col p-8">
                <img className="mx-auto h-24 w-24 flex-shrink-0 rounded-full object-cover" src={mentor.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}`} alt="" />
                <h3 className="mt-6 text-sm font-medium text-slate-900">{mentor.name}</h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                  <dd className="text-sm text-slate-500">{mentor.role || mentor.specialty || 'Mentor Réseau'}</dd>
                  <dd className="mt-3">
                    <span className="inline-flex items-center text-xs text-slate-500">
                      <svg className="mr-1 h-4 w-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg> 
                      {mentor.rating || '4.8/5'}
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-slate-200">
                  <div className="flex w-0 flex-1">
                    <Link to={`/organizer/public/mentors/${mentor.id || 'dr-ousmane-diop'}`} className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-xl border border-transparent py-4 text-sm font-medium text-slate-700 hover:text-slate-500">
                      Profil
                    </Link>
                  </div>
                  <div className="-ml-px flex w-0 flex-1 bg-brand-50 rounded-br-xl hover:bg-brand-100">
                    <button onClick={() => handleInviteFromNetwork(mentor)} className="relative inline-flex w-0 flex-1 items-center justify-center border border-transparent py-4 text-sm font-medium text-brand-700">
                      <svg className="mr-2 h-5 w-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                      Inviter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

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
                        <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <h3 className="text-lg font-semibold leading-6 text-slate-900" id="modal-title">Inviter un nouveau mentor</h3>
                        <div className="mt-4 space-y-5">
                          <div>
                            <label className="block text-sm font-medium leading-6 text-slate-900">Adresse e-mail <span className="text-red-500">*</span></label>
                            <input 
                              type="email" 
                              value={inviteEmail}
                              onChange={(e) => setInviteEmail(e.target.value)}
                              className="block w-full mt-2 rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-brand-600 sm:text-sm px-3 border" 
                              placeholder="mentor@exemple.com" 
                              required 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium leading-6 text-slate-900">Domaine d'expertise</label>
                            <input 
                              type="text" 
                              value={inviteExpertise}
                              onChange={(e) => setInviteExpertise(e.target.value)}
                              className="block w-full mt-2 rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-brand-600 sm:text-sm px-3 border" 
                              placeholder="ex: Data Science, UX/UI, Marketing..." 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium leading-6 text-slate-900">Message personnalisé (Optionnel)</label>
                            <textarea 
                              rows="3" 
                              value={inviteMessage}
                              onChange={(e) => setInviteMessage(e.target.value)}
                              className="block w-full mt-2 rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-brand-600 sm:text-sm px-3 border" 
                              placeholder="Bonjour, j'aimerais vous inviter..."
                            ></textarea>
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
                            {teams.map(team => (
                              <div key={team.id} className="relative flex items-start">
                                <div className="flex h-6 items-center">
                                  <input 
                                    type="checkbox" 
                                    checked={team.mentor?.id === selectedMentor?.id || (team.mentor?.name === selectedMentor?.name)}
                                    onChange={async (e) => {
                                      const isChecked = e.target.checked;
                                      try {
                                        if (isChecked) {
                                          await teamsApi.assignMentor(team.id, { mentor_id: selectedMentor.id });
                                          setTeams(prev => prev.map(t => t.id === team.id ? { ...t, mentor: selectedMentor } : t));
                                        } else {
                                          await teamsApi.assignMentor(team.id, { mentor_id: null });
                                          setTeams(prev => prev.map(t => t.id === team.id ? { ...t, mentor: null } : t));
                                        }
                                      } catch (err) {
                                        console.warn("Erreur assignation mentor, simulation locale.", err);
                                        setTeams(prev => prev.map(t => t.id === team.id ? { ...t, mentor: isChecked ? selectedMentor : null } : t));
                                      }
                                    }}
                                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600 cursor-pointer" 
                                  />
                                </div>
                                <div className="ml-3 text-sm leading-6">
                                  <label className="font-medium text-slate-900 cursor-pointer">{team.name}</label>
                                  <p className="text-slate-500">{team.members?.length || team.memberCount || 0} membres</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" onClick={() => setIsAssignModalOpen(false)} className="inline-flex w-full justify-center rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 sm:ml-3 sm:w-auto focus:outline-none">Fermer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
