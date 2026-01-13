import api from './api';
import { User } from './userService';

export interface Repository {
  id: number;
  name: string;
  description?: string;
  owner_id: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  owner?: User;
}

export interface RepositoryCreate {
  name: string;
  description?: string;
  owner_id: number;
  is_public?: boolean;
}

export interface RepositoryUpdate {
  name?: string;
  description?: string;
  is_public?: boolean;
}

export const repositoryService = {
  getAll: async (skip = 0, limit = 100, ownerId?: number): Promise<Repository[]> => {
    const params: any = { skip, limit };
    if (ownerId) params.owner_id = ownerId;
    const response = await api.get('/repositories', { params });
    return response.data;
  },

  getById: async (id: number): Promise<Repository> => {
    const response = await api.get(`/repositories/${id}`);
    return response.data;
  },

  create: async (repo: RepositoryCreate): Promise<Repository> => {
    const response = await api.post('/repositories', repo);
    return response.data;
  },

  update: async (id: number, repo: RepositoryUpdate): Promise<Repository> => {
    const response = await api.put(`/repositories/${id}`, repo);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/repositories/${id}`);
  },
};
