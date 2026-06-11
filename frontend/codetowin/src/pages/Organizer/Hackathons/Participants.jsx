import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, X, Mail, Download, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PARTICIPANTS_MOCK = [
  {
    id: 1,
    name: 'Amadou Diallo',
    email: 'amadou.d@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    country: 'Sénégal',
    team: null,
    status: 'En attente',
    date: 'Il y a 2 heures',
  },
  {
    id: 2,
    name: 'Sarah Kone',
    email: 'sarah.kone@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    country: "Côte d'Ivoire",
    team: 'AgriTech Innovators',
    status: 'Approuvé',
    date: 'Il y a 1 jour',
  },
];

export default function OrganizerParticipants() {
  const [participants, setParticipants] = useState(PARTICIPANTS_MOCK);
  const [isBulkDropdownOpen, setIsBulkDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Handlers for outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsBulkDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approuvé':
        return <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Approuvé</span>;
      case 'En attente':
        return <span className="inline-flex rounded-full bg-amber-100 px-2 text-xs font-semibold leading-5 text-amber-800">En attente</span>;
      case 'Rejeté':
        return <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">Rejeté</span>;
      default:
        return <span className="inline-flex rounded-full bg-slate-100 px-2 text-xs font-semibold leading-5 text-slate-800">{status}</span>;
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      
      {/* Topbar equivalent is handled by Layout, but let's assume we add page-specific header content or actions here */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center">
          <button className="text-slate-500 focus:outline-none sm:hidden">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="ml-4 flex items-center space-x-2 text-sm sm:ml-0">
            <Link to="/organizer/hackathons" className="font-medium text-slate-500 hover:text-slate-900">AI for Climate Africa</Link>
            <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-slate-900">Participants</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
            <Download className="-ml-1 mr-2 h-5 w-5 text-slate-400" />
            Exporter CSV
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="font-display text-2xl font-bold text-slate-900">Participants ({participants.length})</h1>
            <p className="mt-2 text-sm text-slate-700">Gérez les inscriptions à votre hackathon "AI for Climate Africa".</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex gap-2">
            <div className="relative rounded-md shadow-sm w-full sm:w-64">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input type="text" className="block w-full rounded-md border-slate-300 pl-10 focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 border" placeholder="Chercher un nom, email..." />
            </div>
            <select className="block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm border">
              <option>Tous les statuts</option>
              <option>Approuvé</option>
              <option>En attente</option>
              <option>Rejeté</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2 relative" ref={dropdownRef}>
            <button 
              type="button" 
              onClick={() => setIsBulkDropdownOpen(!isBulkDropdownOpen)}
              className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              Action groupée
              <ChevronDown className="-mr-1 ml-2 h-5 w-5 text-slate-400" />
            </button>
            
            {/* Dropdown menu */}
            {isBulkDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1">
                  <button className="text-slate-700 block w-full text-left px-4 py-2 text-sm hover:bg-slate-100 hover:text-slate-900">
                    <span className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-brand-600" />
                      Approuver la sélection
                    </span>
                  </button>
                  <button className="text-slate-700 block w-full text-left px-4 py-2 text-sm hover:bg-slate-100 hover:text-slate-900">
                    <span className="flex items-center">
                      <XCircle className="mr-2 h-4 w-4 text-red-600" />
                      Rejeter la sélection
                    </span>
                  </button>
                  <button className="text-slate-700 block w-full text-left px-4 py-2 text-sm hover:bg-slate-100 hover:text-slate-900">
                    <span className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-blue-600" />
                      Envoyer un message
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden rounded-xl shadow ring-1 ring-black ring-opacity-5">
                <table className="min-w-full divide-y divide-slate-300 bg-white">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                        <input type="checkbox" className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                      </th>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900">Participant</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Pays</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Équipe</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Statut</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Date d'inscription</th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {participants.map((participant) => (
                      <tr key={participant.id}>
                        <td className="relative px-7 sm:w-12 sm:px-6">
                          <input type="checkbox" className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full" src={participant.avatar} alt="" />
                            </div>
                            <div className="ml-4">
                              <Link to="#" className="font-medium text-slate-900 hover:text-brand-600">{participant.name}</Link>
                              <div className="text-sm text-slate-500">{participant.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{participant.country}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                          {participant.team ? (
                            <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-sm font-medium text-slate-800">{participant.team}</span>
                          ) : (
                            <span className="text-slate-400 italic">Sans équipe</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          {getStatusBadge(participant.status)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{participant.date}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-2">
                          {participant.status === 'En attente' && (
                            <>
                              <button className="text-brand-600 hover:text-brand-900" title="Approuver">
                                <Check className="h-5 w-5" />
                              </button>
                              <button className="text-red-600 hover:text-red-900" title="Rejeter">
                                <X className="h-5 w-5" />
                              </button>
                            </>
                          )}
                          {participant.status === 'Approuvé' && (
                            <button className="text-slate-400 hover:text-slate-500" title="Contacter">
                              <Mail className="h-5 w-5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
