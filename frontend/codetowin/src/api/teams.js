import { apiClient } from './client';
export const teamsApi = {
  /**
   * Récupère la liste des équipes d'un hackathon
   * @param {string} hackathonId
   */
  getTeamsByHackathon: async (hackathonId) => {
    return await apiClient.get(`/hackathons/${hackathonId}/teams`);
  },

  /**
   * Crée une équipe pour un hackathon donné
   * @param {string} hackathonId
   * @param {object} teamData { name, description, max_members, needed_skills }
   */
  createTeam: async (hackathonId, teamData) => {
    return await apiClient.post(`/hackathons/${hackathonId}/teams`, teamData);
  },

  /**
   * Récupère les détails d'une équipe spécifique
   * @param {string|number} teamId
   */
  getTeamById: async (teamId) => {
    return await apiClient.get(`/teams/${teamId}`);
  },

  /**
   * Modifie les informations d'une équipe (Leader uniquement)
   * @param {string|number} teamId
   * @param {object} teamData
   */
  updateTeam: async (teamId, teamData) => {
    return await apiClient.patch(`/teams/${teamId}`, teamData);
  },

  /**
   * Demander à rejoindre une équipe
   * @param {string|number} teamId
   */
  joinTeam: async (teamId) => {
    return await apiClient.post(`/teams/${teamId}/join`);
  },

  /**
   * Rejoindre une équipe par lien d'invitation
   * @param {string} token
   */
  joinTeamByToken: async (token) => {
    return await apiClient.post(`/teams/join-by-token/`, { token });
  },

  /**
   * Inviter un utilisateur à rejoindre une équipe
   * @param {string|number} teamId
   * @param {object} data { user_id, role_in_team }
   */
  inviteMember: async (teamId, data) => {
    return await apiClient.post(`/teams/${teamId}/invite`, data);
  },

  /**
   * Assigne un mentor à une équipe (Organisateur uniquement)
   * @param {string|number} teamId
   * @param {object} data { mentor_id }
   */
  assignMentor: async (teamId, data) => {
    return await apiClient.post(`/teams/${teamId}/assign-mentor`, data);
  },
};
