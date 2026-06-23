import { apiClient } from './client';
import { initialHackathons } from '../mockdata/hackathons';

export const hackathonsApi = {
  /**
   * Récupère la liste de tous les hackathons avec filtres optionnels
   * @param {object} params { search, country, status, theme, page }
   */
  getHackathons: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await apiClient.get(`/hackathons?${query}`);
  },

  /**
   * Récupère les détails d'un hackathon par son ID ou slug
   * @param {string} id
   */
  getHackathonById: async (id) => {
    return await apiClient.get(`/hackathons/${id}`);
  },

  /**
   * Crée un nouveau hackathon (Organisateur uniquement)
   * @param {object} data
   */
  createHackathon: (data) => apiClient.post('/hackathons', data),

  /**
   * Modifie un hackathon (Organisateur uniquement)
   * @param {string} id
   * @param {object} data
   */
  updateHackathon: (id, data) => apiClient.patch(`/hackathons/${id}`, data),

  /**
   * Supprime un hackathon (Organisateur/Admin uniquement)
   * @param {string} id
   */
  deleteHackathon: (id) => apiClient.delete(`/hackathons/${id}`),

  /**
   * Soumet un hackathon pour validation par l'admin
   * @param {string} id
   */
  submitForApproval: (id) => apiClient.post(`/hackathons/${id}/submit-for-approval`),

  /**
   * Inscrit l'utilisateur connecté à un hackathon
   * @param {string} id
   * @param {object} registrationData
   */
  register: (id, registrationData = {}) => apiClient.post(`/hackathons/${id}/register`, registrationData),

  /**
   * Récupère toutes les inscriptions à un hackathon (Organisateur/Participant public)
   * @param {string} id
   */
  getRegistrations: async (id) => {
    return await apiClient.get(`/hackathons/${id}/registrations`);
  },

  getAnnouncements: async (id) => {
    return await apiClient.get(`/hackathons/${id}/announcements`);
  },

  createAnnouncement: async (id, data) => {
    return await apiClient.post(`/hackathons/${id}/announcements/`, data);
  },

  getDiscussions: async (id) => {
    return await apiClient.get(`/hackathons/${id}/discussions`);
  },

  createDiscussion: async (id, data) => {
    return await apiClient.post(`/hackathons/${id}/discussions/`, data);
  },

  /**
   * Récupère les équipes d'un hackathon
   */
  getTeams: async (id) => {
    return await apiClient.get(`/hackathons/${id}/teams`);
  },

  /**
   * Récupère les soumissions d'un hackathon
   */
  getSubmissions: async (id) => {
    return await apiClient.get(`/hackathons/${id}/submissions`);
  },

  /**
   * Récupère les mentors assignés à un hackathon
   */
  getMentors: async (id) => {
    return await apiClient.get(`/hackathons/${id}/mentors`);
  },

  /**
   * Approuve l'inscription d'un participant (Organisateur uniquement)
   */
  approveRegistration: (regId) => apiClient.patch(`/registrations/${regId}/approve`),

  /**
   * Rejette l'inscription d'un participant (Organisateur uniquement)
   */
  rejectRegistration: (regId) => apiClient.patch(`/registrations/${regId}/reject`),
};
