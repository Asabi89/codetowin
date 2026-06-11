import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Trophy, Medal, Award, CheckCircle } from 'lucide-react';
import { Badge } from '../../../components/common/Badge';

const LEADERBOARD_MOCK = [
  {
    id: 1,
    rank: 1,
    team: 'AgriTech Innovators',
    project: 'AgriSense IoT',
    score: 94,
    status: 'Générés',
  },
  {
    id: 2,
    rank: 2,
    team: 'CodeMakers',
    project: 'EcoTrade App',
    score: 85,
    status: 'En attente',
  },
  {
    id: 3,
    rank: 3,
    team: 'Data Rangers',
    project: 'ClimaStats Dashboard',
    score: 81,
    status: 'En attente',
  },
  {
    id: 4,
    rank: 4,
    team: 'Green Data Squad',
    project: '- (Pas de soumission finale)',
    score: '-',
    status: 'En attente (Participation)',
  },
];

export default function OrganizerResults() {
  const { id } = useParams();
  const [leaderboard, setLeaderboard] = useState(LEADERBOARD_MOCK);
  const [isPublished, setIsPublished] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);

  const handleGenerateSingle = (id) => {
    setLeaderboard(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'Générés' } : item
    ));
  };

  const handleGenerateAll = () => {
    setLeaderboard(prev => prev.map(item => ({ ...item, status: 'Générés' })));
    setIsGeneratingAll(true);
  };

  const confirmPublish = () => {
    setIsPublished(true);
    setIsPublishModalOpen(false);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center space-x-2 text-sm">
          <Link to={`/organizer/hackathons`} className="font-medium text-slate-500 hover:text-slate-900">AI for Climate Africa</Link>
          <span className="text-slate-400">/</span>
          <span className="font-medium text-slate-900">Résultats & Certificats</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            type="button" 
            onClick={handleGenerateAll}
            disabled={isGeneratingAll}
            className={`inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium shadow-sm focus:outline-none ${isGeneratingAll ? 'bg-slate-50 text-slate-400 opacity-50 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
          >
            {isGeneratingAll ? 'Certificats à jour' : 'Générer les certificats'}
          </button>
          <button 
            type="button" 
            onClick={() => !isPublished && setIsPublishModalOpen(true)}
            disabled={isPublished}
            className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none ${isPublished ? 'bg-slate-400 cursor-not-allowed opacity-50' : 'bg-brand-700 hover:bg-brand-800'}`}
          >
            {isPublished ? 'Résultats publiés' : 'Publier les résultats'}
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div className="sm:flex-auto">
            <h1 className="font-display text-2xl font-bold text-slate-900">Résultats Finaux</h1>
            <p className="mt-2 text-sm text-slate-700">
              Le classement est basé sur les évaluations des mentors et organisateurs. Les résultats sont actuellement {isPublished ? <strong className="text-brand-600">publiés</strong> : <strong>brouillons</strong>}.
            </p>
          </div>
        </div>

        {/* Podium Section */}
        <div className="mt-8 mb-12">
          <h2 className="text-lg font-medium text-slate-900 mb-6 text-center">Les Gagnants</h2>
          <div className="flex flex-col sm:flex-row items-end justify-center gap-4 sm:gap-6 px-4">
            
            {/* 2nd Place */}
            <div className="flex flex-col items-center order-2 sm:order-1 w-full sm:w-64">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border-4 border-silver-400 mb-4 shadow-lg z-10 relative">
                <span className="text-2xl font-bold text-silver-500">2</span>
              </div>
              <div className="w-full bg-white border-t-4 border-silver-400 rounded-t-xl rounded-b-md shadow-md p-4 text-center pb-8 pt-8 -mt-8">
                <h3 className="font-bold text-slate-900 text-lg">CodeMakers</h3>
                <p className="text-sm text-slate-500 mt-1">EcoTrade App</p>
                <div className="mt-3 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-sm font-medium text-slate-800">
                  85 pts
                </div>
              </div>
              <div className="w-full h-24 bg-gradient-to-b from-silver-400/20 to-transparent rounded-b-xl -mt-2"></div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center order-1 sm:order-2 w-full sm:w-72">
              <div className="relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <Trophy className="h-8 w-8 text-gold-400 drop-shadow fill-current" />
                </div>
                <div className="w-20 h-20 rounded-full bg-gold-400/10 flex items-center justify-center border-4 border-gold-400 mb-4 shadow-xl z-10 relative">
                  <span className="text-3xl font-bold text-gold-500">1</span>
                </div>
              </div>
              <div className="w-full bg-white border-t-4 border-gold-400 rounded-t-xl rounded-b-md shadow-lg p-5 text-center pb-12 pt-10 -mt-10">
                <h3 className="font-bold text-slate-900 text-xl">AgriTech Innovators</h3>
                <p className="text-sm text-slate-500 mt-1">AgriSense IoT</p>
                <div className="mt-4 inline-flex items-center rounded-full bg-gold-400/20 px-3 py-1 text-sm font-bold text-gold-500">
                  94 pts
                </div>
              </div>
              <div className="w-full h-32 bg-gradient-to-b from-gold-400/20 to-transparent rounded-b-xl -mt-2"></div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center order-3 sm:order-3 w-full sm:w-64">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border-4 border-bronze-400 mb-4 shadow-md z-10 relative">
                <span className="text-2xl font-bold text-bronze-500">3</span>
              </div>
              <div className="w-full bg-white border-t-4 border-bronze-400 rounded-t-xl rounded-b-md shadow-sm p-4 text-center pb-6 pt-8 -mt-8">
                <h3 className="font-bold text-slate-900 text-lg">Data Rangers</h3>
                <p className="text-sm text-slate-500 mt-1">ClimaStats Dashboard</p>
                <div className="mt-3 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-sm font-medium text-slate-800">
                  81 pts
                </div>
              </div>
              <div className="w-full h-16 bg-gradient-to-b from-bronze-400/20 to-transparent rounded-b-xl -mt-2"></div>
            </div>

          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="mt-8">
          <div className="sm:flex sm:items-center sm:justify-between mb-4">
            <h2 className="text-lg font-medium text-slate-900">Classement Complet & Certificats</h2>
            <div className="mt-4 sm:mt-0 flex gap-2">
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input type="text" className="block w-full rounded-md border-slate-300 pl-10 focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 border" placeholder="Rechercher une équipe..." />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                  <table className="min-w-full divide-y divide-slate-200 bg-white">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-slate-900 sm:pl-6 w-16">Rang</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Équipe</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Projet</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Score</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Certificats</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {leaderboard.map((item) => (
                        <tr key={item.id} className={item.rank === 1 ? 'bg-gold-400/5' : item.rank === 2 ? 'bg-silver-400/5' : item.rank === 3 ? 'bg-bronze-400/5' : ''}>
                          <td className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold sm:pl-6 text-center ${item.rank === 1 ? 'text-gold-500' : item.rank === 2 ? 'text-silver-500' : item.rank === 3 ? 'text-bronze-500' : 'text-slate-500'}`}>
                            {item.rank <= 3 ? `#${item.rank}` : item.rank}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-slate-900">
                            {item.team}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                            {item.project}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm font-bold text-slate-900">
                            {item.score}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                            {item.status === 'Générés' ? (
                              <Badge variant="success">4 Générés</Badge>
                            ) : (
                              <Badge variant="secondary">{item.status}</Badge>
                            )}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            {item.status === 'Générés' ? (
                              <Link to="#" className="text-brand-600 hover:text-brand-900 font-semibold">Voir</Link>
                            ) : (
                              <button onClick={() => handleGenerateSingle(item.id)} className="text-brand-600 hover:text-brand-900">Générer</button>
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
        </div>

      </main>

      {/* Publish Confirmation Modal */}
      {isPublishModalOpen && (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-slate-900/75 transition-opacity" onClick={() => setIsPublishModalOpen(false)}></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 sm:mx-0 sm:h-10 sm:w-10">
                    <CheckCircle className="h-6 w-6 text-brand-600" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-slate-900" id="modal-title">Publier les résultats finaux</h3>
                    <div className="mt-2">
                      <p className="text-sm text-slate-500">Êtes-vous sûr de vouloir publier le classement ? Cette action est irréversible. Tous les participants recevront une notification et les certificats générés seront mis à disposition dans leurs profils.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button type="button" onClick={confirmPublish} className="inline-flex w-full justify-center rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 sm:ml-3 sm:w-auto">Publier définitivement</button>
                  <button type="button" onClick={() => setIsPublishModalOpen(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto">Annuler</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
