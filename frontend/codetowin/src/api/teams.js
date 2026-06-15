import { apiClient } from './client';
import { openTeams, participantTeam } from '../mockdata/participant';

export const teamsApi = {
  /**
   * Récupère la liste des équipes d'un hackathon
   * @param {string} hackathonId
   */
  getTeamsByHackathon: async (hackathonId) => {
    try {
      return await apiClient.get(`/hackathons/${hackathonId}/teams`);
    } catch (error) {
      console.warn("API unavailable, mocking getTeamsByHackathon", error);
      return { data: openTeams };
    }
  },

  /**
   * Crée une équipe pour un hackathon donné
   * @param {string} hackathonId
   * @param {object} teamData { name, description, max_members, needed_skills }
   */
  createTeam: async (hackathonId, teamData) => {
    try {
      return await apiClient.post(`/hackathons/${hackathonId}/teams`, teamData);
    } catch (error) {
      console.warn("API unavailable, mocking createTeam", error);
      return { success: true, teamId: "new_team_123" };
    }
  },

  /**
   * Récupère les détails d'une équipe spécifique
   * @param {string|number} teamId
   */
  getTeamById: async (teamId) => {
    try {
      return await apiClient.get(`/teams/${teamId}`);
    } catch (error) {
      console.warn("API unavailable, mocking getTeamById", error);
      return { data: participantTeam };
    }
  },

  /**
   * Modifie les informations d'une équipe (Leader uniquement)
   * @param {string|number} teamId
   * @param {object} teamData
   */
  updateTeam: async (teamId, teamData) => {
    try {
      return await apiClient.patch(`/teams/${teamId}`, teamData);
    } catch (error) {
      console.warn("API unavailable, mocking updateTeam", error);
      return { success: true };
    }
  },

  /**
   * Demander à rejoindre une équipe
   * @param {string|number} teamId
   */
  joinTeam: async (teamId) => {
    try {
      return await apiClient.post(`/teams/${teamId}/join`);
    } catch (error) {
      console.warn("API unavailable, mocking joinTeam", error);
      return { success: true };
    }
  },

  /**
   * Inviter un utilisateur à rejoindre une équipe
   * @param {string|number} teamId
   * @param {object} data { user_id, role_in_team }
   */
  inviteMember: async (teamId, data) => {
    try {
      return await apiClient.post(`/teams/${teamId}/invite`, data);
    } catch (error) {
      console.warn("API unavailable, mocking inviteMember", error);
      return { success: true };
    }
  },

  /**
   * Assigne un mentor à une équipe (Organisateur uniquement)
   * @param {string|number} teamId
   * @param {object} data { mentor_id }
   */
  assignMentor: async (teamId, data) => {
    try {
      return await apiClient.post(`/teams/${teamId}/assign-mentor`, data);
    } catch (error) {
      console.warn("API unavailable, mocking assignMentor", error);
      return { success: true };
    }
  },
};
