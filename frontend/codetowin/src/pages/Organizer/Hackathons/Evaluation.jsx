import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Code, ExternalLink, Activity } from 'lucide-react';

export default function OrganizerEvaluation() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [scores, setScores] = useState({
    innovation: 0,
    faisabilite: 0,
    impact: 0,
    ux: 0,
  });
  
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Parse query params if any
    const params = new URLSearchParams(location.search);
    const newScores = { ...scores };
    let hasParams = false;

    Object.keys(scores).forEach(key => {
      if (params.has(key)) {
        newScores[key] = parseFloat(params.get(key));
        hasParams = true;
      }
    });

    if (hasParams) {
      setScores(newScores);
    }
  }, [location]);

  const handleScoreChange = (key, value) => {
    setScores(prev => ({
      ...prev,
      [key]: parseFloat(value),
    }));
  };

  const totalScore = Object.values(scores).reduce((acc, curr) => acc + curr, 0);
  const percentage = Math.round((totalScore / 40) * 100);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("L'évaluation a été enregistrée avec succès !");
    navigate(`/organizer/hackathons/${id}/submissions`);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
      <div className="mx-auto max-w-5xl">
        
        {/* Navigation retour */}
        <div className="mb-6">
          <Link
            to={`/organizer/hackathons/${id}/submissions`}
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            <ChevronLeft className="mr-1 h-5 w-5" />
            Retour aux soumissions
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Evaluation Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h2 className="text-lg font-bold text-slate-900">Grille d'évaluation</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Notez chaque critère sur 10. Le score final sera calculé automatiquement.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-8">
                {/* Criterion 1 */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-bold text-slate-900">Innovation & Originalité</label>
                    <span className="text-sm font-medium text-brand-600">{scores.innovation} / 10</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Le projet propose-t-il une solution nouvelle au problème ? Se démarque-t-il des solutions existantes ?
                  </p>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={scores.innovation}
                    onChange={(e) => handleScoreChange('innovation', e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                </div>

                {/* Criterion 2 */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-bold text-slate-900">Faisabilité technique</label>
                    <span className="text-sm font-medium text-brand-600">{scores.faisabilite} / 10</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Le prototype est-il fonctionnel ? L'architecture technique est-elle robuste et scalable ?
                  </p>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={scores.faisabilite}
                    onChange={(e) => handleScoreChange('faisabilite', e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                </div>

                {/* Criterion 3 */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-bold text-slate-900">Impact potentiel</label>
                    <span className="text-sm font-medium text-brand-600">{scores.impact} / 10</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Le projet répond-il de manière efficace à l'enjeu posé ? Quel est son impact métier ou sociétal ?
                  </p>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={scores.impact}
                    onChange={(e) => handleScoreChange('impact', e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                </div>

                {/* Criterion 4 */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-bold text-slate-900">Design & UX</label>
                    <span className="text-sm font-medium text-brand-600">{scores.ux} / 10</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    L'interface est-elle intuitive ? L'expérience utilisateur est-elle bien pensée ?
                  </p>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={scores.ux}
                    onChange={(e) => handleScoreChange('ux', e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                </div>

                <hr className="border-slate-200" />

                {/* General Feedback */}
                <div>
                  <label className="block text-sm font-bold text-slate-900">Commentaire général</label>
                  <p className="text-xs text-slate-500 mb-2">
                    Partagez vos impressions avec l'équipe. Ces retours leur seront précieux.
                  </p>
                  <textarea
                    rows="4"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="block w-full rounded-md border-0 py-2 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <Link
                    to={`/organizer/hackathons/${id}/submissions`}
                    className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                  >
                    Annuler
                  </Link>
                  <button
                    type="submit"
                    className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    Enregistrer l'évaluation
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Project Summary & Score */}
          <div className="space-y-6">
            
            {/* Live Score Card */}
            <div className="rounded-xl border border-brand-200 bg-brand-50 p-6 text-center shadow-sm">
              <h3 className="text-sm font-medium uppercase tracking-wider text-brand-800">
                Score Total
              </h3>
              <div className="mt-2 flex items-baseline justify-center">
                <span className="text-5xl font-extrabold tracking-tight text-brand-700">
                  {totalScore}
                </span>
                <span className="ml-1 text-xl font-medium text-brand-600">/ 40</span>
              </div>
              <p className="mt-2 text-xs text-brand-600">
                (soit {percentage}%)
              </p>
            </div>

            {/* Project Summary Card */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h3 className="font-medium text-slate-900">Résumé du projet</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">AgriSense</h4>
                    <p className="text-xs font-medium text-slate-500">Par AgriTech Innovators</p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-6">
                  AgriSense est une plateforme IoT complète permettant aux petits agriculteurs de surveiller l'humidité du sol et de prédire les besoins en eau grâce à des modèles de machine learning locaux, réduisant la consommation d'eau de 30%.
                </p>

                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center justify-center w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
                  >
                    <Code className="mr-2 h-5 w-5" />
                    Voir le code (GitHub)
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-brand-600 shadow-sm ring-1 ring-inset ring-brand-300 hover:bg-brand-50"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Voir la démonstration
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
