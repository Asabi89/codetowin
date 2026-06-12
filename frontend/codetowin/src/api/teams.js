import { apiClient } from './client';

export const teamsApi = {
  /**
   * Récupère la liste des équipes d'un hackathon
   * @param {string} hackathonId
   */
  getTeamsByHackathon: (hackathonId) => apiClient.get(`/hackathons/${hackathonId}/teams`),

  /**
   * Crée une équipe pour un hackathon donné
   * @param {string} hackathonId
   * @param {object} teamData { name, description, max_members, needed_skills }
   */
  createTeam: (hackathonId, teamData) => apiClient.post(`/hackathons/${hackathonId}/teams`, teamData),

  /**
   * Récupère les détails d'une équipe spécifique
   * @param {string|number} teamId
   */
  getTeamById: (teamId) => apiClient.get(`/teams/${teamId}`),

  /**
   * Modifie les informations d'une équipe (Leader uniquement)
   * @param {string|number} teamId
   * @param {object} teamData
   */
  updateTeam: (teamId, teamData) => apiClient.patch(`/teams/${teamId}`, teamData),

  /**
   * Demander à rejoindre une équipe
   * @param {string|number} teamId
   */
  joinTeam: (teamId) => apiClient.post(`/teams/${teamId}/join`),

  /**
   * Inviter un utilisateur à rejoindre une équipe
   * @param {string|number} teamId
   * @param {object} data { user_id, role_in_team }
   */
  inviteMember: (teamId, data) => apiClient.post(`/teams/${teamId}/invite`, data),

  /**
   * Assigne un mentor à une équipe (Organisateur uniquement)
   * @param {string|number} teamId
   * @param {object} data { mentor_id }
   */
  assignMentor: (teamId, data) => apiClient.post(`/teams/${teamId}/assign-mentor`, data),
};
