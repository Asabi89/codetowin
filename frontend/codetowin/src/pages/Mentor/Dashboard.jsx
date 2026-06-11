import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Mail, CheckSquare, ArrowRight } from 'lucide-react';

export default function MentorDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto bg-slate-50">
      {/* Welcome Banner */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-brand-800 to-brand-700 p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">Bonjour, Seydou ! 👋</h2>
            <p className="mt-2 text-brand-100 max-w-2xl text-sm sm:text-base">Merci pour votre implication ! Vous avez de nouvelles invitations en attente et 2 équipes qui comptent sur vous cette semaine.</p>
          </div>
          <div className="mt-6 sm:mt-0">
            <Link to="/mentor/teams" className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 shadow-sm hover:bg-brand-50 transition-colors">
              Voir mes équipes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
        {/* Decorative element */}
        <svg className="absolute right-0 top-0 h-full w-48 text-white opacity-10 transform translate-x-1/3 -translate-y-1/4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/>
        </svg>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex items-center">
          <div className="rounded-lg bg-brand-50 p-3">
            <Users className="h-6 w-6 text-brand-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-slate-500">Équipes actives</p>
            <p className="text-2xl font-bold text-slate-900">4</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm relative overflow-hidden flex items-center">
          <div className="rounded-lg bg-blue-50 p-3">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-slate-500">Invitations en attente</p>
            <p className="text-2xl font-bold text-slate-900">2</p>
          </div>
          <Link to="/mentor/invitations" className="absolute inset-0 z-10" aria-label="Voir les invitations"></Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex items-center">
          <div className="rounded-lg bg-amber-50 p-3">
            <CheckSquare className="h-6 w-6 text-amber-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-slate-500">Feedbacks requis</p>
            <p className="text-2xl font-bold text-slate-900">1</p>
          </div>
        </div>
      </div>

      {/* Recent Activity / Action Needed */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming Sessions / Teams */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4 flex justify-between items-center">
            <h3 className="text-lg font-medium text-slate-900">Vos équipes à suivre</h3>
            <Link to="/mentor/teams" className="text-sm font-medium text-brand-600 hover:text-brand-500">Voir tout</Link>
          </div>
          <ul className="divide-y divide-slate-200">
            <li className="px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">EcoPay Solutions</p>
                  <p className="text-xs text-slate-500 mt-1">Hackathon: Fintech Builders Challenge</p>
                </div>
                <Link to="/mentor/teams/1/feedback" className="inline-flex items-center rounded bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
                  Noter
                </Link>
              </div>
            </li>
            <li className="px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">CryptoFarm</p>
                  <p className="text-xs text-slate-500 mt-1">Hackathon: Agrotech Africa</p>
                </div>
                <Link to="/mentor/teams/2/feedback" className="inline-flex items-center rounded bg-brand-50 px-2.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-inset ring-brand-300 hover:bg-brand-100">
                  Voir progrès
                </Link>
              </div>
            </li>
          </ul>
        </div>

        {/* Pending Invitations Snippet */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4 flex justify-between items-center">
            <h3 className="text-lg font-medium text-slate-900">Nouvelles Invitations</h3>
            <Link to="/mentor/invitations" className="text-sm font-medium text-brand-600 hover:text-brand-500">Voir les 2</Link>
          </div>
          <div className="p-6">
            <div className="rounded-lg border border-slate-200 p-4 bg-slate-50">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">AI for Climate Africa 2026</h4>
                  <p className="text-xs text-slate-500 mt-1">Par TechHub Sénégal</p>
                </div>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Nouveau</span>
              </div>
              <p className="text-xs text-slate-600 mt-3 line-clamp-2">Nous recherchons un expert en Machine Learning pour encadrer 3 équipes lors de ce hackathon intensif de 48h.</p>
              <div className="mt-4 flex gap-2">
                <button type="button" className="flex-1 rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-500">Accepter</button>
                <Link to="/mentor/invitations" className="flex-1 rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-center text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">Détails</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
