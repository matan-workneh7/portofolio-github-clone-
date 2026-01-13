import api from './api';
import { User } from './userService';
import { Repository } from './repositoryService';

export const searchService = {
  searchUsers: async (query: string, skip = 0, limit = 20): Promise<User[]> => {
    const response = await api.get('/search/users', {
      params: { q: query, skip, limit },
    });
    return response.data;
  },

  searchRepositories: async (query: string, skip = 0, limit = 20): Promise<Repository[]> => {
    const response = await api.get('/search/repositories', {
      params: { q: query, skip, limit },
    });
    return response.data;
  },
};
