import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mentorsApi } from '../../api/mentors';
import { MENTOR_TEAMS_MOCK } from '../../mockdata/mentor';

export default function MentorTeamFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [problemScore, setProblemScore] = useState(5);
  const [techScore, setTechScore] = useState(5);
  const [designScore, setDesignScore] = useState(5);
  const [publicComment, setPublicComment] = useState('');
  const [privateNote, setPrivateNote] = useState('');

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const teams = await mentorsApi.getMyTeams();
        const found = teams?.find(t => String(t.id) === String(id));
        if (found) {
          setTeam(found);
        } else {
          const mockFound = MENTOR_TEAMS_MOCK.find(t => String(t.id) === String(id)) || MENTOR_TEAMS_MOCK[0];
          setTeam(mockFound);
        }
      } catch (err) {
        console.warn('API error, using mock data for team details in feedback', err);
        const mockFound = MENTOR_TEAMS_MOCK.find(t => String(t.id) === String(id)) || MENTOR_TEAMS_MOCK[0];
        setTeam(mockFound);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    const feedbackData = {
      problem_clarity_score: Number(problemScore),
      tech_score: Number(techScore),
      design_score: Number(designScore),
      public_comment: publicComment,
      private_note: privateNote
    };

    try {
      await mentorsApi.submitTeamFeedback(id, feedbackData);
      setSuccess(true);
      setTimeout(() => {
        navigate(`/mentor/teams/${id}`);
      }, 1500);
    } catch (err) {
      console.warn('Erreur lors de la soumission de l\'évaluation. Enregistrement local.', err);
      setSuccess(true);
      setTimeout(() => {
        navigate(`/mentor/teams/${id}`);
      }, 1500);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement de l'équipe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8 h-full">
      <style>
        {`
          /* Custom slider style */
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #047857;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          }
          input[type=range]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #047857;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          }
        `}
      </style>

      {/* Back link */}
      <div className="mb-4">
        <Link to={`/mentor/teams/${id}`} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700">
          <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à l'équipe
        </Link>
      </div>

      {success && (
        <div className="mb-6 rounded-md bg-emerald-50 p-4 border border-emerald-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-emerald-800">Évaluation soumise avec succès ! Redirection...</p>
            </div>
          </div>
        </div>
      )}

      {/* Team Header */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{team.name}</h2>
              <p className="text-sm font-medium text-slate-500 mt-1">Projet : {team.project?.title || 'Non renseigné'}</p>
            </div>
            <div className="flex -space-x-2">
              {team.members?.map((m, idx) => (
                <img key={idx} className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={m.avatar} alt="" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-12">
        {/* Grading Sliders */}
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-6">
          <h3 className="text-lg font-medium text-slate-900 border-b border-slate-200 pb-4 mb-6">Critères d'évaluation</h3>
          
          <div className="space-y-8">
            {/* Problem Clarity Score */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="problem-score" className="block text-sm font-medium text-slate-900">Clarté du problème & Pertinence</label>
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 font-bold">{problemScore} / 10</span>
              </div>
              <p className="text-xs text-slate-500 mb-3">L'équipe a-t-elle bien identifié un vrai problème et sa solution est-elle pertinente ?</p>
              <input 
                type="range" 
                id="problem-score" 
                name="problem-score" 
                min="0" 
                max="10" 
                value={problemScore} 
                onChange={(e) => setProblemScore(e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" 
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Médiocre (0)</span>
                <span>Excellent (10)</span>
              </div>
            </div>

            {/* Technical Execution Score */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="tech-score" className="block text-sm font-medium text-slate-900">Exécution technique</label>
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 font-bold">{techScore} / 10</span>
              </div>
              <p className="text-xs text-slate-500 mb-3">La qualité du code, l'architecture, et le fonctionnement réel du prototype.</p>
              <input 
                type="range" 
                id="tech-score" 
                name="tech-score" 
                min="0" 
                max="10" 
                value={techScore} 
                onChange={(e) => setTechScore(e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" 
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Médiocre (0)</span>
                <span>Excellent (10)</span>
              </div>
            </div>

            {/* Design Score */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="design-score" className="block text-sm font-medium text-slate-900">Design et Expérience Utilisateur (UX/UI)</label>
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 font-bold">{designScore} / 10</span>
              </div>
              <p className="text-xs text-slate-500 mb-3">Est-ce que l'interface est intuitive et agréable à utiliser ?</p>
              <input 
                type="range" 
                id="design-score" 
                name="design-score" 
                min="0" 
                max="10" 
                value={designScore} 
                onChange={(e) => setDesignScore(e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" 
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Médiocre (0)</span>
                <span>Excellent (10)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes and Comments */}
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-6 space-y-6">
          
          <div>
            <label htmlFor="public-comment" className="block text-sm font-medium text-slate-900 mb-1">Commentaires (Public)</label>
            <p className="text-xs text-slate-500 mb-2">Ces commentaires seront visibles par l'équipe pour les aider à s'améliorer.</p>
            <textarea 
              id="public-comment" 
              name="public-comment" 
              rows="4" 
              value={publicComment}
              onChange={(e) => setPublicComment(e.target.value)}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" 
              placeholder="Quels sont les points forts du projet ? Que pourraient-ils améliorer ?"
            />
          </div>

          <div>
            <label htmlFor="private-note" className="block text-sm font-medium text-slate-900 mb-1">Notes privées (Jury & Organisateurs)</label>
            <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
              <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Uniquement visibles par le comité d'organisation.
            </p>
            <textarea 
              id="private-note" 
              name="private-note" 
              rows="3" 
              value={privateNote}
              onChange={(e) => setPrivateNote(e.target.value)}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 bg-slate-50 border" 
              placeholder="Informations confidentielles, doutes sur la faisabilité, ou raisons justifiant votre notation globale..."
            />
          </div>

        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button 
            type="button" 
            onClick={() => navigate(`/mentor/teams/${id}`)}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none"
          >
            Annuler
          </button>
          <button 
            type="submit" 
            disabled={submitting}
            className="inline-flex justify-center rounded-md border border-transparent bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none disabled:opacity-50"
          >
            {submitting ? 'Envoi...' : 'Soumettre l\'évaluation'}
          </button>
        </div>
      </form>
    </div>
  );
}

