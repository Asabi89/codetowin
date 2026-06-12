import { apiClient } from './client';

export const usersApi = {
  /**
   * Récupère le profil de l'utilisateur connecté
   */
  getProfile: () => apiClient.get('/users/me'),

  /**
   * Modifie le profil de l'utilisateur connecté (avatar, bio, etc.)
   * @param {object} profileData
   */
  updateProfile: (profileData) => apiClient.patch('/users/me', profileData),

  /**
   * Récupère les informations d'un utilisateur par son ID
   * @param {string|number} id
   */
  getUserById: (id) => apiClient.get(`/users/${id}`),

  /**
   * Récupère la liste de tous les profils (pour le Talent Network public)
   * Supporte le filtrage et la recherche
   * @param {object} params { search, country, skill, page }
   */
  getTalents: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/users?${query}`);
  },

  /**
   * Modifie le rôle d'un utilisateur (Admin uniquement)
   */
  updateUserRole: (id, role) => apiClient.patch(`/users/${id}/role`, { role }),

  /**
   * Modifie le statut d'un utilisateur (Admin uniquement : suspendre/activer)
   */
  updateUserStatus: (id, status) => apiClient.patch(`/users/${id}/status`, { status }),
};
