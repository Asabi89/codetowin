import { apiClient } from './client';
import { initialHackathons } from '../mockdata/hackathons';

export const hackathonsApi = {
  /**
   * Récupère la liste de tous les hackathons avec filtres optionnels
   * @param {object} params { search, country, status, theme, page }
   */
  getHackathons: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      return await apiClient.get(`/hackathons?${query}`);
    } catch (error) {
      console.warn("API unavailable, returning mock hackathons", error);
      return { data: initialHackathons, total: initialHackathons.length };
    }
  },

  /**
   * Récupère les détails d'un hackathon par son ID ou slug
   * @param {string} id
   */
  getHackathonById: async (id) => {
    try {
      return await apiClient.get(`/hackathons/${id}`);
    } catch (error) {
      console.warn("API unavailable, mocking getHackathonById", error);
      const hackathon = initialHackathons.find(h => String(h.id) === String(id));
      if (!hackathon) throw new Error("Hackathon not found", { cause: error });
      return { data: hackathon };
    }
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
    try {
      return await apiClient.get(`/hackathons/${id}/registrations`);
    } catch (error) {
      console.warn("API unavailable, mocking getRegistrations", error);
      // We import mockTalents lazily to avoid circular dependencies if any, 
      // or we can just return a basic mock list.
      return { 
        data: [
          { id: '1', user: { name: 'Sarah Chen', role: 'AI Developer', skills: ['Python', 'Gemini API'] } },
          { id: '2', user: { name: 'Marcus Vance', role: 'Product Designer', skills: ['Figma', 'UX'] } },
        ] 
      };
    }
  },

  /**
   * Récupère les actualités d'un hackathon
   */
  getAnnouncements: async (id) => {
    try {
      return await apiClient.get(`/hackathons/${id}/announcements`);
    } catch (error) {
      console.warn("API unavailable, mocking getAnnouncements", error);
      return {
        data: [
          { id: 'a1', title: 'Coup d\'envoi !', content: 'Le hackathon est officiellement lancé !', date: new Date().toISOString() },
          { id: 'a2', title: 'Nouveau prix ajouté', content: 'Le sponsor X vient de rajouter 5000$ au prize pool.', date: new Date().toISOString() }
        ]
      };
    }
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
