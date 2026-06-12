import { apiClient } from './client';

export const hackathonsApi = {
  /**
   * Récupère la liste de tous les hackathons avec filtres optionnels
   * @param {object} params { search, country, status, theme, page }
   */
  getHackathons: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/hackathons?${query}`);
  },

  /**
   * Récupère les détails d'un hackathon par son ID ou slug
   * @param {string} id
   */
  getHackathonById: (id) => apiClient.get(`/hackathons/${id}`),

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
   * Récupère toutes les inscriptions à un hackathon (Organisateur uniquement)
   * @param {string} id
   */
  getRegistrations: (id) => apiClient.get(`/hackathons/${id}/registrations`),

  /**
   * Approuve l'inscription d'un participant (Organisateur uniquement)
   */
  approveRegistration: (regId) => apiClient.patch(`/registrations/${regId}/approve`),

  /**
   * Rejette l'inscription d'un participant (Organisateur uniquement)
   */
  rejectRegistration: (regId) => apiClient.patch(`/registrations/${regId}/reject`),
};
