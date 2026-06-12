import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../common/Badge';

export default function TeamCard({ team }) {
  return (
    <div className="col-span-1 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <Link to={team.detailPath} className="hover:underline">
              <h3 className="truncate text-lg font-medium text-slate-900">{team.name}</h3>
            </Link>
            <Badge variant="brand">
              {team.memberCount} membres
            </Badge>
          </div>
          <p className="mt-1 truncate text-sm text-slate-500">{team.description}</p>
          <div className="mt-4">
            <div className="flex -space-x-2 overflow-hidden">
              {team.members.map((member) => (
                <img key={member.avatar} className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={member.avatar} alt={member.name || ''} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 px-6 py-3">
        <div className="flex items-center justify-between">
          <div>
            {team.mentor && (
              <div className="flex items-center">
                <img className="h-6 w-6 rounded-full border border-slate-200" src={team.mentor.avatar} alt="" />
                <span className="ml-2 text-sm text-slate-600 font-medium">{team.mentor.name}</span>
              </div>
            )}
          </div>
          <Badge variant={team.statusTone}>{team.status}</Badge>
        </div>
      </div>
      <div className="-mt-px flex divide-x divide-slate-200">
        <div className="flex w-0 flex-1">
          <Link to="/mentor/messages" className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-xl border border-transparent py-3 text-sm font-medium text-slate-700 hover:text-slate-500">
            <svg className="h-5 w-5 text-slate-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contacter
          </Link>
        </div>
        <div className="-ml-px flex w-0 flex-1">
          <Link to={team.detailPath} className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-xl border border-transparent py-3 text-sm font-medium text-slate-700 hover:text-slate-500">
            <svg className="h-5 w-5 text-slate-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Détails
          </Link>
        </div>
      </div>
    </div>
  );
}
