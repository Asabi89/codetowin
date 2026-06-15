import { apiClient } from './client';

export const submissionsApi = {
  /**
   * Récupère la liste de toutes les soumissions d'un hackathon
   * @param {string} hackathonId
   */
  getSubmissionsByHackathon: async (hackathonId) => {
    try {
      return await apiClient.get(`/hackathons/${hackathonId}/submissions`);
    } catch (error) {
      console.warn("API unavailable, mocking getSubmissionsByHackathon", error);
      return { data: [] };
    }
  },

  /**
   * Crée un projet (soumission en brouillon) pour une équipe
   * @param {string|number} teamId
   * @param {object} submissionData
   */
  createSubmission: async (teamId, submissionData) => {
    try {
      return await apiClient.post(`/teams/${teamId}/submissions`, submissionData);
    } catch (error) {
      console.warn("API unavailable, mocking createSubmission", error);
      return { success: true, submissionId: "sub_" + Date.now() };
    }
  },

  /**
   * Récupère les détails d'une soumission spécifique
   * @param {string|number} submissionId
   */
  getSubmissionById: async (submissionId) => {
    try {
      return await apiClient.get(`/submissions/${submissionId}`);
    } catch (error) {
      console.warn("API unavailable, mocking getSubmissionById", error);
      return { data: { id: submissionId, title: "Mock Project" } };
    }
  },

  /**
   * Modifie une soumission de projet
   * @param {string|number} submissionId
   * @param {object} submissionData
   */
  updateSubmission: async (submissionId, submissionData) => {
    try {
      return await apiClient.patch(`/submissions/${submissionId}`, submissionData);
    } catch (error) {
      console.warn("API unavailable, mocking updateSubmission", error);
      return { success: true };
    }
  },

  /**
   * Soumet définitivement le projet pour notation
   * @param {string|number} submissionId
   */
  submitProject: async (submissionId) => {
    try {
      return await apiClient.post(`/submissions/${submissionId}/submit`);
    } catch (error) {
      console.warn("API unavailable, mocking submitProject", error);
      return { success: true };
    }
  },

  /**
   * Modifie le statut ou valide une soumission (Organisateur/Admin uniquement)
   */
  updateSubmissionStatus: async (submissionId, status) => {
    try {
      return await apiClient.patch(`/submissions/${submissionId}/status`, { status });
    } catch (error) {
      console.warn("API unavailable, mocking updateSubmissionStatus", error);
      return { success: true };
    }
  },

  /**
   * Vote pour un projet
   */
  voteSubmission: async (submissionId) => {
    try {
      return await apiClient.post(`/submissions/${submissionId}/vote`);
    } catch (error) {
      console.warn("API unavailable, mocking voteSubmission", error);
      return { success: true };
    }
  },

  /**
   * Ajoute un commentaire sur un projet
   */
  addComment: async (submissionId, text) => {
    try {
      return await apiClient.post(`/submissions/${submissionId}/comments`, { text });
    } catch (error) {
      console.warn("API unavailable, mocking addComment", error);
      return { success: true };
    }
  }
};
