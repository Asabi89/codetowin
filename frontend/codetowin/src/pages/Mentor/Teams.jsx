import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import SearchFilterBar from '../../components/common/SearchFilterBar';
import TeamCard from '../../components/features/mentor/TeamCard';
import { mentorsApi } from '../../api/mentors';
import { MENTOR_TEAMS_MOCK } from '../../mockdata/mentor';

const extractArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.teams)) return data.teams;
  return [];
};

const normalizeTeam = (team) => ({
  ...team,
  id: team.id || team._id,
  name: team.name || 'Équipe',
  description: team.description || 'Pas de description fournie.',
  memberCount: team.memberCount ?? team.member_count ?? team.members?.length ?? 0,
  detailPath: team.detailPath || `/mentor/teams/${team.id || team._id}`,
  members: (team.members || []).map((member, index) => (
    typeof member === 'string'
      ? { avatar: member }
      : { ...member, avatar: member.avatar || member.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || `M${index + 1}`)}&background=random` }
  )),
  mentor: team.mentor || { name: 'Vous', avatar: 'https://ui-avatars.com/api/?name=Vous&background=047857&color=fff' },
  status: team.status || (team.submission ? 'Soumission en cours' : 'Pas encore de projet'),
  statusTone: team.statusTone || (team.submission ? 'amber' : 'slate'),
});

export default function MentorTeams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const data = await mentorsApi.getMyTeams();
        const apiTeams = extractArray(data);
        if (apiTeams.length > 0) {
          setTeams(apiTeams.map(normalizeTeam));
        } else {
          setTeams(MENTOR_TEAMS_MOCK);
        }
      } catch (err) {
        console.warn('Erreur lors du chargement des équipes depuis l\'API, utilisation du fallback.', err);
        setTeams(MENTOR_TEAMS_MOCK);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement de vos équipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full">
      <PageHeader title={`Mes Équipes (${teams.length})`} description="Consultez vos équipes assignées." />

      <SearchFilterBar
        searchPlaceholder="Chercher une équipe..."
        filters={[{ label: 'Mentor', options: ['Tous les mentors', 'Sans mentor', 'Vous', 'Marie Koné'] }]}
      />

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}
