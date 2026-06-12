import { apiClient } from './client';

export const mentorsApi = {
  /**
   * Récupère la liste de tous les mentors (filtrable par expertise, pays, dispo)
   * @param {object} params
   */
  getMentors: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/mentors?${query}`);
  },

  /**
   * Récupère les détails d'un mentor par son ID
   * @param {string|number} id
   */
  getMentorById: (id) => apiClient.get(`/mentors/${id}`),

  /**
   * Met à jour le profil professionnel du mentor connecté
   * @param {object} mentorData
   */
  updateMentorProfile: (mentorData) => apiClient.patch('/mentors/me', mentorData),

  /**
   * Récupère la liste des équipes assignées au mentor connecté
   */
  getMyTeams: () => apiClient.get('/mentors/me/teams'),

  /**
   * Récupère les invitations de mentorat du mentor connecté
   */
  getMyInvitations: () => apiClient.get('/mentor-invitations/me'),

  /**
   * Envoie une invitation de mentorat à un mentor pour un hackathon (Organisateur uniquement)
   */
  inviteMentorToHackathon: (hackathonId, data) => apiClient.post(`/hackathons/${hackathonId}/invite-mentor`, data),

  /**
   * Accepte une invitation de participation à un hackathon (Mentor uniquement)
   */
  acceptInvitation: (invitationId) => apiClient.post(`/mentor-invitations/${invitationId}/accept`),

  /**
   * Refuse une invitation de participation à un hackathon (Mentor uniquement)
   */
  declineInvitation: (invitationId) => apiClient.post(`/mentor-invitations/${invitationId}/decline`),

  /**
   * Soumet une évaluation ou un commentaire pour une équipe assignée (Mentor uniquement)
   * @param {string|number} teamId
   * @param {object} feedbackData { problem_clarity_score, design_score, impact_score, public_comment, private_note, etc. }
   */
  submitTeamFeedback: (teamId, feedbackData) => apiClient.post(`/teams/${teamId}/feedback`, feedbackData),
};
