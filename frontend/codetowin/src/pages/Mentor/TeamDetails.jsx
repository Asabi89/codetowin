import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import TeamDetailsView from '../../components/features/teams/TeamDetailsView';
import { mentorsApi } from '../../api/mentors';
import { MENTOR_TEAMS_MOCK } from '../../mockdata/mentor';

export default function MentorTeamDetails() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        setLoading(true);
        const teams = await mentorsApi.getMyTeams();
        const found = teams?.find(t => String(t.id) === String(id));
        if (found) {
          setTeam(found);
        } else {
          // Si non trouvé ou API échoue, chercher dans mock
          const mockFound = MENTOR_TEAMS_MOCK.find(t => String(t.id) === String(id)) || MENTOR_TEAMS_MOCK[0];
          setTeam(mockFound);
        }
      } catch (err) {
        console.warn('API error, using mock data for team details', err);
        const mockFound = MENTOR_TEAMS_MOCK.find(t => String(t.id) === String(id)) || MENTOR_TEAMS_MOCK[0];
        setTeam(mockFound);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement des détails de l'équipe...</p>
        </div>
      </div>
    );
  }

  const actions = (
    <>
      <Link to={`/mentor/teams/${id}/feedback`} className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
        <svg className="-ml-1 mr-2 h-5 w-5 text-brand-100" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Évaluer
      </Link>
      <Link to="/mentor/messages" className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
        <svg className="-ml-1 mr-2 h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2c-5.523 0-10 4.029-10 9s4.477 9 10 9c1.558 0 3.033-.327 4.364-.906l3.328 1.11a1 1 0 001.264-1.265l-1.11-3.328C19.327 14.633 20 12.89 20 11c0-4.971-4.477-9-10-9zm0 5a1 1 0 000 2h.01a1 1 0 100-2H10zm-4 0a1 1 0 000 2h.01a1 1 0 100-2H6zm8 0a1 1 0 000 2h.01a1 1 0 100-2H14z" clipRule="evenodd" />
        </svg>
        Contacter l'équipe
      </Link>
    </>
  );

  return (
    <TeamDetailsView 
      role="mentor" 
      team={team}
      actions={actions}
    />
  );
}


