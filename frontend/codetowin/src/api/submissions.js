import { apiClient } from './client';

export const submissionsApi = {
  /**
   * Récupère la liste de toutes les soumissions d'un hackathon
   * @param {string} hackathonId
   */
  getSubmissionsByHackathon: (hackathonId) => apiClient.get(`/hackathons/${hackathonId}/submissions`),

  /**
   * Crée un projet (soumission en brouillon) pour une équipe
   * @param {string|number} teamId
   * @param {object} submissionData
   */
  createSubmission: (teamId, submissionData) => apiClient.post(`/teams/${teamId}/submissions`, submissionData),

  /**
   * Récupère les détails d'une soumission spécifique
   * @param {string|number} submissionId
   */
  getSubmissionById: (submissionId) => apiClient.get(`/submissions/${submissionId}`),

  /**
   * Modifie une soumission de projet
   * @param {string|number} submissionId
   * @param {object} submissionData
   */
  updateSubmission: (submissionId, submissionData) => apiClient.patch(`/submissions/${submissionId}`, submissionData),

  /**
   * Soumet définitivement le projet pour notation
   * @param {string|number} submissionId
   */
  submitProject: (submissionId) => apiClient.post(`/submissions/${submissionId}/submit`),

  /**
   * Modifie le statut ou valide une soumission (Organisateur/Admin uniquement)
   */
  updateSubmissionStatus: (submissionId, status) => apiClient.patch(`/submissions/${submissionId}/status`, { status }),
};
