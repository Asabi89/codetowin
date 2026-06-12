import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TeamDetailsView from '../../../components/features/teams/TeamDetailsView';

export default function OrganizerTeamDetails() {
  const { id } = useParams();

  const actions = (
    <>
      <Link to={`/organizer/hackathons/${id}/evaluation`} className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
        <svg className="-ml-1 mr-2 h-5 w-5 text-brand-100" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Évaluer
      </Link>
      <Link to="/organizer/messages" className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
        <svg className="-ml-1 mr-2 h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2c-5.523 0-10 4.029-10 9s4.477 9 10 9c1.558 0 3.033-.327 4.364-.906l3.328 1.11a1 1 0 001.264-1.265l-1.11-3.328C19.327 14.633 20 12.89 20 11c0-4.971-4.477-9-10-9zm0 5a1 1 0 000 2h.01a1 1 0 100-2H10zm-4 0a1 1 0 000 2h.01a1 1 0 100-2H6zm8 0a1 1 0 000 2h.01a1 1 0 100-2H14z" clipRule="evenodd" />
        </svg>
        Contacter l'équipe
      </Link>
      <button type="button" className="inline-flex items-center justify-center rounded-md bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 shadow-sm hover:bg-red-100">
        Disqualifier
      </button>
    </>
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <TeamDetailsView 
        role="organizer" 
        actions={actions}
      />
    </div>
  );
}

