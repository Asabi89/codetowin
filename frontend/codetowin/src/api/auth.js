import { apiClient } from './client';

export const authApi = {
  /**
   * Connexion utilisateur
   * @param {object} credentials { email, password }
   */
  login: (credentials) => apiClient.post('/auth/login', credentials),

  /**
   * Inscription d'un utilisateur
   * @param {object} userData { full_name, email, password, role, country }
   */
  register: (userData) => apiClient.post('/auth/register', userData),

  /**
   * Déconnexion de l'utilisateur
   */
  logout: () => apiClient.post('/auth/logout'),

  /**
   * Demande de réinitialisation de mot de passe (envoi email)
   * @param {string} email
   */
  forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email }),

  /**
   * Réinitialisation effective du mot de passe
   * @param {object} data { token, password }
   */
  resetPassword: (data) => apiClient.post('/auth/reset-password', data),

  /**
   * Récupérer les détails de la session actuelle
   */
  getMe: () => apiClient.get('/auth/me'),
};
