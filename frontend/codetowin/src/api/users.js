import { apiClient } from './client';

export const usersApi = {
  getProfile: () => apiClient.get('/auth/me'),
  updateProfile: (profileData) => apiClient.patch('/auth/me', profileData),
  updatePassword: (data) => apiClient.post('/auth/me/password', data),
  toggle2FA: (enable) => apiClient.post('/auth/me/2fa', { enable }),
  requestAccountDeletion: () => apiClient.delete('/auth/me'),
  getUserById: (id) => apiClient.get(`/users/${id}`),
  getTalents: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/users?${query}`);
  },
  updateUserRole: (id, role) => apiClient.patch(`/users/${id}/role`, { role }),
  updateUserStatus: (id, status) => apiClient.patch(`/users/${id}/status`, { status }),
  getMyHackathons: () => apiClient.get('/users/me/hackathons'),
  getMyProjects: () => apiClient.get('/users/me/projects'),
  getMyActivity: () => apiClient.get('/users/me/activity')
};
