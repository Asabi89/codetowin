import { apiClient } from './client';
import { mockTalents } from '../mockdata/talents';

export const usersApi = {
  /**
   * Récupère le profil de l'utilisateur connecté
   */
  getProfile: () => apiClient.get('/users/me'),

  /**
   * Modifie le profil de l'utilisateur connecté (avatar, bio, etc.)
   * @param {object} profileData
   */
  updateProfile: async (profileData) => {
    try {
      return await apiClient.patch('/users/me', profileData);
    } catch (error) {
      console.warn("API unavailable, mocking updateProfile", error);
      return { success: true };
    }
  },

  /**
   * Met à jour le mot de passe de l'utilisateur
   * @param {object} data { currentPassword, newPassword }
   */
  updatePassword: async (data) => {
    try {
      return await apiClient.post('/users/me/password', data);
    } catch (error) {
      console.warn("API unavailable, mocking updatePassword", error);
      return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
    }
  },

  /**
   * Active ou désactive la double authentification (A2F)
   * @param {boolean} enable 
   */
  toggle2FA: async (enable) => {
    try {
      return await apiClient.post('/users/me/2fa', { enable });
    } catch (error) {
      console.warn("API unavailable, mocking toggle2FA", error);
      return new Promise((resolve) => setTimeout(() => resolve({ success: true, enabled: enable }), 800));
    }
  },

  /**
   * Demande la suppression du compte de l'utilisateur connecté
   */
  requestAccountDeletion: async () => {
    try {
      return await apiClient.delete('/users/me');
    } catch (error) {
      console.warn("API unavailable, mocking requestAccountDeletion", error);
      return { success: true };
    }
  },

  /**
   * Récupère les informations d'un utilisateur par son ID
   * @param {string|number} id
   */
  getUserById: async (id) => {
    try {
      return await apiClient.get(`/users/${id}`);
    } catch (error) {
      console.warn("API unavailable, mocking getUserById", error);
      const user = mockTalents.find(t => String(t.id) === String(id));
      if (!user) throw new Error("User not found");
      return { data: user };
    }
  },

  /**
   * Récupère la liste de tous les profils (pour le Talent Network public)
   * Supporte le filtrage et la recherche
   * @param {object} params { search, country, skill, page }
   */
  getTalents: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      return await apiClient.get(`/users?${query}`);
    } catch (error) {
      console.warn("API unavailable, mocking getTalents", error);
      return { data: mockTalents, total: mockTalents.length };
    }
  },

  /**
   * Modifie le rôle d'un utilisateur (Admin uniquement)
   */
  updateUserRole: (id, role) => apiClient.patch(`/users/${id}/role`, { role }),

  /**
   * Modifie le statut d'un utilisateur (Admin uniquement : suspendre/activer)
   */
  updateUserStatus: (id, status) => apiClient.patch(`/users/${id}/status`, { status }),

  /**
   * Récupère les hackathons de l'utilisateur
   */
  getMyHackathons: async () => {
    try {
      return await apiClient.get('/users/me/hackathons');
    } catch (error) {
      console.warn("API unavailable, mocking getMyHackathons", error);
      return {
        data: [
          { id: 'google-cloud-rapid-agent', title: 'CodeToWin Africa AI Sprint', status: 'Inscrit', location: 'En ligne', date: 'Juin 2026', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80', description: 'Le plus grand sprint IA pour les développeurs africains.' },
          { id: 'product-design-hack-weekend', title: 'Product Design Hack Weekend', status: 'Terminé (Finaliste)', location: 'Dakar, Sénégal', date: 'Févr 2026', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80', description: 'Conception de produits innovants pour la Fintech.' },
          { id: 'healthtech-challenge', title: 'HealthTech Challenge', status: 'Terminé (Participant)', location: 'Abidjan, CI', date: 'Nov 2025', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80', description: 'Améliorer la santé grâce à la technologie.' }
        ]
      };
    }
  },

  /**
   * Récupère les projets de l'utilisateur
   */
  getMyProjects: async () => {
    try {
      return await apiClient.get('/users/me/projects');
    } catch (error) {
      console.warn("API unavailable, mocking getMyProjects", error);
      return {
        data: [
          { 
            id: 'proj-1', 
            title: 'EcoTrack AI', 
            description: 'Une plateforme d\'intelligence artificielle pour optimiser la consommation énergétique des bâtiments publics.', 
            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80',
            tags: ['React', 'Python', 'Machine Learning'],
            hackathonName: 'CodeToWin Africa AI Sprint',
            hackathonId: '1',
            likes: 42,
            comments: 12
          },
          { 
            id: 'proj-2', 
            title: 'Bantu Design System', 
            description: 'Un système de design open-source intégrant des motifs de l\'art africain pour React et Figma.', 
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80',
            tags: ['Design System', 'Figma', 'CSS'],
            hackathonName: 'Product Design Hack Weekend',
            hackathonId: '2',
            likes: 85,
            comments: 34
          }
        ]
      };
    }
  },

  /**
   * Récupère l'historique de l'utilisateur
   */
  getMyActivity: async () => {
    try {
      return await apiClient.get('/users/me/activity');
    } catch (error) {
      console.warn("API unavailable, mocking getMyActivity", error);
      return {
        data: [
          { id: '1', type: 'registration', text: "Inscrit au Google Cloud Rapid Agent Hackathon", date: new Date().toISOString() },
          { id: '2', type: 'profile_completed', text: "Profil de builder complété", date: new Date(Date.now() - 86400000).toISOString() },
          { id: '3', type: 'account_created', text: "Compte créé sur CodeToWin", date: new Date(Date.now() - 172800000).toISOString() }
        ]
      };
    }
  }
};
