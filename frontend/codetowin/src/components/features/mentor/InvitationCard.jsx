import React from 'react';

function MetaItem({ iconPath, children }) {
  return (
    <div className="flex items-center">
      <svg className="mr-2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
      </svg>
      {children}
    </div>
  );
}

export default function InvitationCard({ invitation, onAccept, onDecline }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:items-start gap-4">
            <div className="h-14 w-14 flex-shrink-0 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden">
              <img src={invitation.logo} alt="Logo" className="h-full w-full object-cover" />
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-slate-900">{invitation.hackathonName}</h3>
                {invitation.isNew && (
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Nouveau</span>
                )}
              </div>
              <p className="text-sm font-medium text-slate-600 mt-1">
                Organisé par <span className="text-slate-900">{invitation.organizer}</span>
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-500">
                <MetaItem iconPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                  {invitation.dates}
                </MetaItem>
                <MetaItem iconPath="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                  Suivi estimé : {invitation.teamCount} équipes
                </MetaItem>
              </div>

              {invitation.message && (
                <div className="mt-4 bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Message de l'organisateur</h4>
                  <p className="text-sm text-slate-600 italic">"{invitation.message}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-slate-200">
        <button 
          type="button" 
          onClick={onDecline}
          className="inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-100"
        >
          Décliner
        </button>
        <button 
          type="button" 
          onClick={onAccept}
          className="inline-flex justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500"
        >
          Accepter l'invitation
        </button>
      </div>
    </div>
  );
}

