import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SubmissionCard from '../../../components/features/submissions/SubmissionCard';
import { SUBMISSIONS_MOCK } from '../../../mockdata/organizer';
import { submissionsApi } from '../../../api/submissions';

const extractArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.submissions)) return data.submissions;
  return [];
};

const normalizeStatus = (status = '') => {
  const value = String(status).toLowerCase();
  if (['evaluated', 'évalué', 'evalue', 'reviewed'].includes(value)) return 'Évalué';
  return 'Soumis';
};

const normalizeSubmission = (submission) => {
  const team = submission.team || {};
  const project = submission.project || {};
  return {
    ...submission,
    id: submission.id || submission._id,
    teamName: submission.teamName || submission.team_name || team.name || 'Équipe',
    projectName: submission.projectName || submission.project_name || submission.title || project.name || 'Projet sans titre',
    description: submission.description || project.description || 'Pas de description fournie.',
    tags: submission.tags || submission.technologies || project.tags || [],
    repoLink: submission.repoLink || submission.repository_url || submission.github_url || submission.githubUrl || '#',
    demoLink: submission.demoLink || submission.demo_url || submission.demoUrl || submission.video_url || '#',
    status: normalizeStatus(submission.status),
    score: submission.score ?? submission.total_score ?? submission.final_score ?? null,
  };
};

export default function OrganizerSubmissions() {
  const { id } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous les statuts');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const data = await submissionsApi.getSubmissionsByHackathon(id);
        const apiSubmissions = extractArray(data);
        if (apiSubmissions.length > 0) {
          setSubmissions(apiSubmissions.map(normalizeSubmission));
        } else {
          setSubmissions(SUBMISSIONS_MOCK);
        }
      } catch (err) {
        console.warn("Erreur lors de la récupération des soumissions, utilisation du fallback mocké.", err);
        setSubmissions(SUBMISSIONS_MOCK);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [id]);

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = sub.projectName.toLowerCase().includes(searchQuery.toLowerCase()) || sub.teamName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'Tous les statuts' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8 flex-1">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement des soumissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="font-display text-2xl font-bold text-slate-900">Soumissions ({filteredSubmissions.length})</h1>
            <p className="mt-2 text-sm text-slate-700">Évaluez les projets soumis par les équipes.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative rounded-md shadow-sm w-full sm:w-64">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-slate-300 pl-10 focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 border" 
              placeholder="Chercher un projet, une équipe..." 
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full sm:w-auto rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm border"
          >
            <option>Tous les statuts</option>
            <option>Soumis</option>
            <option>Évalué</option>
          </select>
          <button type="button" className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ml-auto">
            <svg className="-ml-1 mr-2 h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Exporter les notes
          </button>
        </div>

        {/* Grid of Submissions */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSubmissions.map((sub) => (
            <SubmissionCard 
              key={sub.id} 
              submission={{ 
                ...sub, 
                feedbackPath: `/organizer/hackathons/${id}/evaluation?submissionId=${sub.id}` 
              }} 
            />
          ))}
          {filteredSubmissions.length === 0 && (
            <div className="col-span-full py-8 text-center text-sm text-slate-500">
              Aucune soumission trouvée.
            </div>
          )}
        </div>

    </div>
  );
}
