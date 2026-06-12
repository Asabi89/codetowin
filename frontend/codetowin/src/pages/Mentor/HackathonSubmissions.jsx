import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import SearchFilterBar from '../../components/common/SearchFilterBar';
import SubmissionCard from '../../components/features/submissions/SubmissionCard';
import { submissionsApi } from '../../api/submissions';
import { MENTOR_SUBMISSIONS_MOCK } from '../../mockdata/mentor';
import { extractArray, normalizeSubmission } from '../../services/normalizers';
import { useExportCSV } from '../../hooks/useExportCSV';

const exportCsv = (rows, filename) => {
  const csvRows = [
    ['Projet', 'Équipe', 'Statut', 'Score'],
    ...rows.map(row => [row.projectName, row.teamName, row.statusLabel || row.status, row.score ?? '']),
  ];
  const csv = csvRows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

function ExportGradesButton({ submissions }) {
  return (
    <button type="button" onClick={() => exportCSV(submissions, 'mentor-notes-soumissions.csv')} className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
      <svg className="-ml-1 mr-2 h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      Exporter les notes
    </button>
  );
}

export default function MentorHackathonSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { exportCSV } = useExportCSV();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const data = await submissionsApi.getSubmissionsByHackathon('me');
        const apiSubmissions = extractArray(data);
        if (apiSubmissions.length > 0) {
          setSubmissions(apiSubmissions.map(normalizeSubmission));
        } else {
          setSubmissions(MENTOR_SUBMISSIONS_MOCK);
        }
      } catch (err) {
        console.warn('Erreur lors du chargement des soumissions depuis l\'API, utilisation du fallback.', err);
        setSubmissions(MENTOR_SUBMISSIONS_MOCK);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement de vos soumissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full">
      <div className="mb-4">
        <Link to="/mentor/submissions" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700">
          <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour aux hackathons
        </Link>
      </div>

      <PageHeader title={`Soumissions (${submissions.length})`} description="Évaluez les projets soumis par les équipes." />

      <SearchFilterBar
        searchPlaceholder="Chercher un projet, une équipe..."
        filters={[{ label: 'Statut', options: ['Tous les statuts', 'Soumis', 'Évalué'] }]}
        actions={<ExportGradesButton submissions={submissions} />}
      />

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {submissions.map((submission) => (
          <SubmissionCard key={submission.id} submission={submission} />
        ))}
      </div>
    </div>
  );
}
