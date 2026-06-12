import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { submissionsApi } from "../../api/submissions";
import { MENTOR_SUBMISSIONS_MOCK } from "../../mockdata/mentor";

export default function MentorSubmissionDetails() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissionDetails = async () => {
      try {
        setLoading(true);
        const data = await submissionsApi.getSubmissionById(id);
        if (data) {
          setSubmission({
            id: data.id,
            teamName: data.teamName || data.team?.name || 'EcoPay Solutions',
            projectName: data.projectName || data.title || 'Application EcoTrade App',
            status: data.status,
            hackathonName: data.hackathonName || data.hackathon?.title || 'Fintech Builders Challenge',
            description: data.description || "EcoTrade App est une plateforme mobile de transfert d'argent et de micro-prêts dédiée aux petits commerçants du secteur informel.",
            tags: data.tags || ['React Native', 'Node.js', 'PostgreSQL'],
            githubUrl: data.githubUrl || data.repoLink || 'https://github.com/ecopay/app-v1',
            demoUrl: data.demoUrl || data.demoLink || 'https://youtu.be/dQw4w9WgXcQ',
            figmaUrl: data.figmaUrl || data.prototypeLink || 'https://figma.com/file/.../ecotrade',
            submittedAt: data.submittedAt || '15 Juin 2026 à 23:45',
            score: data.score,
            teamId: data.teamId || data.team?.id || 1
          });
        } else {
          const fallback = MENTOR_SUBMISSIONS_MOCK.find(s => String(s.id) === String(id)) || MENTOR_SUBMISSIONS_MOCK[0];
          setSubmission({
            ...fallback,
            hackathonName: 'Fintech Builders Challenge',
            figmaUrl: 'https://figma.com/file/.../ecotrade',
            submittedAt: '15 Juin 2026 à 23:45',
            githubUrl: fallback.githubUrl || 'https://github.com/ecopay/app-v1',
            demoUrl: fallback.demoUrl || 'https://youtu.be/dQw4w9WgXcQ',
            teamId: fallback.id || 1
          });
        }
      } catch (err) {
        console.warn('API error, using mock data for submission details', err);
        const fallback = MENTOR_SUBMISSIONS_MOCK.find(s => String(s.id) === String(id)) || MENTOR_SUBMISSIONS_MOCK[0];
        setSubmission({
          ...fallback,
          hackathonName: 'Fintech Builders Challenge',
          figmaUrl: 'https://figma.com/file/.../ecotrade',
          submittedAt: '15 Juin 2026 à 23:45',
          githubUrl: fallback.githubUrl || 'https://github.com/ecopay/app-v1',
          demoUrl: fallback.demoUrl || 'https://youtu.be/dQw4w9WgXcQ',
          teamId: fallback.id || 1
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissionDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement des détails de la soumission...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="mb-4">
        <Link to="/mentor/submissions" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700">
          <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour aux soumissions
        </Link>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-slate-200 rounded-xl overflow-hidden mb-8">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 border-b border-slate-100 pb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {submission.projectName}
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-1">
                Soumis par{" "}
                <span className="text-brand-600 font-semibold">
                  {submission.teamName}
                </span>{" "}
                • {submission.hackathonName}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
              {submission.tags?.map((tag, idx) => (
                <span key={idx} className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Description du projet
              </h3>
              <div className="prose prose-sm max-w-none text-slate-600">
                <p>{submission.description}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Liens et Ressources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={submission.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors"
                >
                  <svg
                    className="h-8 w-8 text-slate-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-900">
                      Dépôt GitHub
                    </p>
                    <p className="text-xs text-brand-600 mt-0.5 break-all">
                      {submission.githubUrl}
                    </p>
                  </div>
                </a>
                <a
                  href={submission.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors"
                >
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-900">
                      Vidéo de démo
                    </p>
                    <p className="text-xs text-brand-600 mt-0.5 break-all">
                      {submission.demoUrl}
                    </p>
                  </div>
                </a>
                <a
                  href={submission.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors"
                >
                  <svg
                    className="h-8 w-8 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-900">
                      Lien du prototype
                    </p>
                    <p className="text-xs text-brand-600 mt-0.5 break-all">
                      {submission.figmaUrl}
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Captures d'écran
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <img
                  src="https://placehold.co/400x300/e2e8f0/64748b?text=App+Login"
                  alt="Capture d'écran 1"
                  className="rounded-lg border border-slate-200 object-cover w-full h-32 hover:opacity-90 cursor-pointer"
                />
                <img
                  src="https://placehold.co/400x300/e2e8f0/64748b?text=Dashboard"
                  alt="Capture d'écran 2"
                  className="rounded-lg border border-slate-200 object-cover w-full h-32 hover:opacity-90 cursor-pointer"
                />
                <img
                  src="https://placehold.co/400x300/e2e8f0/64748b?text=Transfert"
                  alt="Capture d'écran 3"
                  className="rounded-lg border border-slate-200 object-cover w-full h-32 hover:opacity-90 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Soumis le {submission.submittedAt}
          </span>
          <div className="flex gap-3">
            <Link
              to={`/mentor/teams/${submission.teamId}/feedback`}
              className="inline-flex justify-center rounded-md border border-transparent bg-brand-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              {submission.score !== undefined ? 'Modifier la note' : "Passer à l'évaluation"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

