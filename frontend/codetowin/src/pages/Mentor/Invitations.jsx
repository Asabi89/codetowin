import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import InvitationCard from '../../components/features/mentor/InvitationCard';
import { MENTOR_INVITATIONS_MOCK } from '../../mockdata/mentor';
import { mentorsApi } from '../../api/mentors';
import { extractArray } from '../../services/normalizers';

const normalizeInvitation = (invitation) => {
  const hackathon = invitation.hackathon || {};
  const organizer = invitation.organizer || hackathon.organizer || {};
  return {
    id: invitation.id || invitation._id,
    hackathonName: invitation.hackathonName || hackathon.title || hackathon.name || 'Hackathon',
    organizer: invitation.organizerName || organizer.name || organizer.full_name || 'Organisateur',
    logo: invitation.logo || organizer.logo || hackathon.logo || 'https://ui-avatars.com/api/?name=CT&background=0F172A&color=fff',
    dates: invitation.dates || [hackathon.start_date, hackathon.end_date].filter(Boolean).join(' - ') || 'Dates à confirmer',
    teamCount: invitation.teamCount ?? invitation.team_count ?? invitation.teams_count ?? 0,
    isNew: invitation.isNew ?? invitation.is_new ?? true,
    message: invitation.message || invitation.note || '',
  };
};

export default function MentorInvitations() {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        setLoading(true);
        const data = await mentorsApi.getMyInvitations();
        const apiInvitations = extractArray(data);
        if (apiInvitations.length > 0) {
          setInvitations(apiInvitations.map(normalizeInvitation));
        } else {
          setInvitations(MENTOR_INVITATIONS_MOCK);
        }
      } catch (err) {
        console.warn('Erreur de chargement des invitations depuis l\'API, utilisation du fallback.', err);
        setInvitations(MENTOR_INVITATIONS_MOCK);
      } finally {
        setLoading(false);
      }
    };
    fetchInvitations();
  }, []);

  const handleAccept = async (id) => {
    try {
      await mentorsApi.acceptInvitation(id);
      setInvitations(prev => prev.filter(inv => inv.id !== id));
    } catch (err) {
      console.warn('API error, simulating accept locally', err);
      setInvitations(prev => prev.filter(inv => inv.id !== id));
    }
  };

  const handleDecline = async (id) => {
    try {
      await mentorsApi.declineInvitation(id);
      setInvitations(prev => prev.filter(inv => inv.id !== id));
    } catch (err) {
      console.warn('API error, simulating decline locally', err);
      setInvitations(prev => prev.filter(inv => inv.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement des invitations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full">
      <PageHeader
        title={`Demandes de mentorat (${invitations.length})`}
        description="Ces organisateurs souhaitent que vous accompagniez des équipes lors de leurs hackathons."
        as="h2"
      />

      <div className="mt-8 space-y-6">
        {invitations.map((invitation) => (
          <InvitationCard 
            key={invitation.id} 
            invitation={invitation} 
            onAccept={() => handleAccept(invitation.id)}
            onDecline={() => handleDecline(invitation.id)}
          />
        ))}
        {invitations.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-slate-900">Aucune invitation</h3>
            <p className="mt-1 text-sm text-slate-500">Vous n'avez pas de demandes de mentorat en attente pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

