import { apiClient } from './client';

export const submissionsApi = {
  /**
   * Récupère la liste de toutes les soumissions d'un hackathon
   * @param {string} hackathonId
   */
  getSubmissionsByHackathon: async (hackathonId) => {
    return await apiClient.get(`/hackathons/${hackathonId}/submissions`);
  },

  /**
   * Crée un projet (soumission en brouillon) pour une équipe
   * @param {string|number} teamId
   * @param {object} submissionData
   */
  createSubmission: async (teamId, submissionData) => {
    return await apiClient.post(`/submissions`, { team: teamId, ...submissionData });
  },

  /**
   * Récupère les détails d'une soumission spécifique
   * @param {string|number} submissionId
   */
  getSubmissionById: async (submissionId) => {
    return await apiClient.get(`/submissions/${submissionId}`);
  },

  /**
   * Modifie une soumission de projet
   * @param {string|number} submissionId
   * @param {object} submissionData
   */
  updateSubmission: async (submissionId, submissionData) => {
    return await apiClient.patch(`/submissions/${submissionId}`, submissionData);
  },

  /**
   * Soumet définitivement le projet pour notation
   * @param {string|number} submissionId
   */
  submitProject: async (submissionId) => {
    return await apiClient.patch(`/submissions/${submissionId}`, { status: 'Soumis' });
  },

  /**
   * Modifie le statut ou valide une soumission (Organisateur/Admin uniquement)
   */
  updateSubmissionStatus: async (submissionId, status) => {
    return await apiClient.patch(`/submissions/${submissionId}/status`, { status });
  },

  /**
   * Vote pour un projet
   */
  voteSubmission: async (submissionId) => {
    return await apiClient.post(`/submissions/${submissionId}/vote`);
  },

  /**
   * Ajoute un commentaire sur un projet
   */
  addComment: async (submissionId, text) => {
    return await apiClient.post(`/submissions/${submissionId}/comments`, { text });
  }
};
