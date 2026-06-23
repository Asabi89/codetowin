import { apiClient } from './client';

export const organizerApi = {
  getMe: () => apiClient.get('/organizer/me'),
  updateMe: (data) => apiClient.patch('/organizer/me', data),
  
  getTeamMembers: () => apiClient.get('/organizer/team-members'),
  inviteTeamMember: (data) => apiClient.post('/organizer/team-members', data),
  updateTeamMember: (id, data) => apiClient.patch(`/organizer/team-members/${id}`, data),
  removeTeamMember: (id) => apiClient.delete(`/organizer/team-members/${id}`),
};
