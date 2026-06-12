import React, { useState, useEffect } from 'react';
import { Mail, Eye, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import SearchFilterBar from '../../../components/common/SearchFilterBar';
import { TEAMS_MOCK } from '../../../mockdata/organizer';
import { teamsApi } from '../../../api/teams';
import { mentorsApi } from '../../../api/mentors';
import { useToast } from '../../../context/ToastContext';

export default function OrganizerTeams() {
  const { id } = useParams();
  const { showToast } = useToast();
  const [teams, setTeams] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedMentorId, setSelectedMentorId] = useState('');

  useEffect(() => {
    const fetchTeamsAndMentors = async () => {
      try {
        setLoading(true);
        const [teamsData, mentorsData] = await Promise.all([
          teamsApi.getTeamsByHackathon(id),
          mentorsApi.getMentors()
        ]);
        
        if (Array.isArray(teamsData) && teamsData.length > 0) {
          setTeams(teamsData);
        } else {
          setTeams(TEAMS_MOCK);
        }

        if (Array.isArray(mentorsData)) {
          setMentors(mentorsData);
        }
      } catch (err) {
        console.warn("Erreur lors de la récupération des équipes / mentors depuis l'API, utilisation du fallback mocké.", err);
        setTeams(TEAMS_MOCK);
        setMentors([
          { id: 'ousmane', name: 'Dr. Ousmane Diop', role: 'Expert IA', avatar: 'https://i.pravatar.cc/150?u=mentor_net1' },
          { id: 'marie', name: 'Marie Koné', role: 'UX/UI Designer', avatar: 'https://i.pravatar.cc/150?u=mentor_net2' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamsAndMentors();
  }, [id]);

  const openAssignModal = (team) => {
    setSelectedTeam(team);
    setSelectedMentorId(team.mentor?.id || '');
    setIsAssignModalOpen(true);
  };

  const handleAssign = async () => {
    if (!selectedMentorId) {
      showToast("Veuillez sélectionner un mentor.", "warning");
      return;
    }
    const mentorObj = mentors.find(m => String(m.id) === String(selectedMentorId));
    try {
      await teamsApi.assignMentor(selectedTeam.id, { mentor_id: selectedMentorId });
      setTeams(prev => prev.map(t => t.id === selectedTeam.id ? { ...t, mentor: mentorObj } : t));
      showToast('Assignation enregistrée avec succès !', 'success');
      setIsAssignModalOpen(false);
    } catch (err) {
      console.warn("Erreur lors de l'assignation du mentor via l'API, simulation locale.", err);
      setTeams(prev => prev.map(t => t.id === selectedTeam.id ? { ...t, mentor: mentorObj } : t));
      showToast('Assignation enregistrée (simulation locale) !', 'success');
      setIsAssignModalOpen(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'Soumis') {
      return (
        <Badge variant="green">
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
          Projet soumis
        </Badge>
      );
    }
    return (
      <Badge variant="slate">
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-slate-400" />
        Pas de projet
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8 flex-1">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement des équipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">

        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">Équipes formées ({teams.length})</h1>
            <p className="mt-1 text-sm text-slate-500">Consultez les équipes, attribuez des mentors et vérifiez les soumissions de projets.</p>
          </div>
        </div>

        <SearchFilterBar
          searchPlaceholder="Chercher une équipe..."
          filters={[{ label: 'Mentors', options: ['Tous les mentors', 'Sans mentor', 'Dr. Ousmane Diop', 'Marie Koné'] }]}
        />

        {/* Grid of Teams */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {teams.map((team) => (
            <div key={team.id} className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <Link to={`/organizer/hackathons/${id || 1}/teams/${team.id}`} className="text-lg font-semibold text-slate-900 hover:text-brand-600 truncate">
                    {team.name}
                  </Link>
                  <Badge variant="brand">
                    {team.members?.length || team.memberCount || 0} membres
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                  {team.description || 'Pas de description fournie.'}
                </p>
                <div className="mt-4 flex flex-1 items-end">
                  <div className="flex -space-x-2 overflow-hidden">
                    {team.members?.map((member, idx) => (
                      <img
                        key={idx}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                        src={member.avatar || member}
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-b border-slate-200 bg-slate-50 px-6 py-3">
                <div className="flex items-center">
                  {team.mentor ? (
                    <div className="flex items-center">
                      <img className="h-6 w-6 rounded-full object-cover" src={team.mentor.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(team.mentor.name)}`} alt="" />
                      <span className="ml-2 text-sm font-medium text-slate-700 truncate max-w-[100px] sm:max-w-[120px]">{team.mentor.name}</span>
                      <button onClick={() => openAssignModal(team)} className="ml-2 text-xs text-brand-600 hover:underline">Modifier</button>
                    </div>
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
                        value={selectedMentorId}
                        onChange={(e) => setSelectedMentorId(e.target.value)}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-brand-600 sm:text-sm sm:leading-6"
                      >
                        <option value="" disabled>Choisissez un expert...</option>
                        {mentors.map(m => (
                          <option key={m.id} value={m.id}>{m.name} ({m.role || m.specialty || 'Mentor'})</option>
                        ))}
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
