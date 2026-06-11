import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, trend, trendLabel, subtitle }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center">
        <div className="flex-shrink-0 rounded-md bg-brand-50 p-3">
          <Icon className="h-6 w-6 text-brand-700" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="truncate text-sm font-medium text-slate-500">{title}</dt>
            <dd>
              <div className="text-2xl font-bold text-slate-900">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
      <div className="mt-4 border-t border-slate-100 pt-4">
        <p className="text-sm text-slate-500">
          {trend && (
            <span className={`font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'} mr-2`}>
              {trend}
            </span>
          )}
          <span>{trendLabel || subtitle}</span>
        </p>
      </div>
    </div>
  );
};

const OrganizerDashboard = () => {
  const stats = [
    { title: 'Participants totaux', value: '247', icon: Users, trend: '+12%', trendLabel: 'depuis la semaine dernière' },
    { title: 'Équipes formées', value: '38', icon: Users, trend: '+5%', trendLabel: 'depuis la semaine dernière' },
    { title: 'Soumissions', value: '29', icon: PlusSquare, trend: '+8%', trendLabel: 'depuis la semaine dernière' },
    { title: 'Hackathons actifs', value: '3', icon: Calendar, subtitle: 'En cours de publication / brouillons' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Welcome banner */}
      <div className="mb-8 rounded-xl bg-brand-800 p-6 text-white sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Bonjour, TechHub Sénégal 👋</h2>
          <p className="mt-1 text-brand-100">Voici un aperçu de vos hackathons en cours et de leur activité.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/organizer/hackathons/create"
            className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-brand-800 shadow-sm hover:bg-brand-50"
          >
            Nouveau hackathon
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Alert */}
      <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-amber-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800">Attention requise</h3>
            <div className="mt-2 text-sm text-amber-700">
              <p>La date limite de soumission pour <strong>AgriTech Youth Hack</strong> est dans 3 jours. Pensez à envoyer une annonce aux participants.</p>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="rounded-md bg-amber-50 px-2 py-1.5 text-sm font-medium text-amber-800 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 focus:ring-offset-amber-50"
              >
                Envoyer une annonce
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Hackathons Table */}
      <div className="mt-8">
        <div className="flex items-center justify-between sm:mb-4">
          <h2 className="text-lg font-medium text-slate-900">Hackathons récents</h2>
          <Link to="/organizer/hackathons" className="text-sm font-medium text-brand-700 hover:text-brand-800">
            Voir tout
          </Link>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 bg-white">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">Titre</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Statut</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Dates</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Participants</th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6">
                        AI for Climate Africa
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Publié</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                        24–26 Mai 2026
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                        89 inscrits
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link to="/organizer/hackathons/1/participants" className="text-brand-600 hover:text-brand-900">Gérer</Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6">
                        Fintech Builders Challenge
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                        <span className="inline-flex rounded-full bg-slate-100 px-2 text-xs font-semibold leading-5 text-slate-800">Brouillon</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                        7–9 Juin 2026
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                        -
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link to="/organizer/hackathons/edit/2" className="text-brand-600 hover:text-brand-900">Éditer</Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
