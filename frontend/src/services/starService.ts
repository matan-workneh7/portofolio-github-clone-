import api from './api';
import { Repository } from './repositoryService';

export const starService = {
  star: async (userId: number, repositoryId: number): Promise<void> => {
    await api.post(`/users/${userId}/stars/${repositoryId}`);
  },

  unstar: async (userId: number, repositoryId: number): Promise<void> => {
    await api.delete(`/users/${userId}/stars/${repositoryId}`);
  },

  getStarred: async (userId: number, skip = 0, limit = 100): Promise<Repository[]> => {
    const response = await api.get(`/users/${userId}/stars`, {
      params: { skip, limit },
    });
    return response.data;
  },

  getStarsCount: async (repositoryId: number): Promise<number> => {
    const response = await api.get(`/repositories/${repositoryId}/stars/count`);
    return response.data.stars_count;
  },

  isStarred: async (userId: number, repositoryId: number): Promise<boolean> => {
    const response = await api.get(`/users/${userId}/stars/${repositoryId}/check`);
    return response.data.is_starred;
  },
};
