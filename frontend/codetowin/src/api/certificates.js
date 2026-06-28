import { apiClient } from './client';
export const certificatesApi = {
  /**
   * Récupère la liste des certificats obtenus par l'utilisateur connecté
   */
  getMyCertificates: async () => {
    return await apiClient.get('/certificates/me');
  },

  /**
   * Récupère les métadonnées d'un certificat spécifique
   * @param {string|number} id
   */
  getCertificateById: (id) => apiClient.get(`/certificates/${id}`),

  /**
   * Génère les certificats pour tous les participants d'un hackathon donné (Organisateur uniquement)
   * @param {string} hackathonId
   */
  generateCertificates: (hackathonId) => apiClient.post(`/hackathons/${hackathonId}/certificates/generate`),

  /**
   * Révoque un certificat (Admin uniquement)
   */
  revokeCertificate: (id, data) => apiClient.post(`/certificates/${id}/revoke`, data),

  /**
   * Régénère un certificat (Admin uniquement)
   */
  regenerateCertificate: (id) => apiClient.post(`/certificates/${id}/regenerate`),

  /**
   * Vérifie publiquement la validité d'un certificat par son code unique
   * @param {string} code
   */
  verifyCertificate: (code) => apiClient.get(`/certificates/verify/${code}`),

  /**
   * Simule le téléchargement d'un certificat au format PDF
   * @param {string} id
   */
  downloadCertificateAsPdf: async (id) => {
    return await apiClient.get(`/certificates/${id}/download`);
  },

  /**
   * Simule la génération d'un lien pour partager sur LinkedIn
   * @param {string} id
   */
  shareToLinkedIn: async (id) => {
    return await apiClient.post(`/certificates/${id}/share/linkedin`);
  },
};
