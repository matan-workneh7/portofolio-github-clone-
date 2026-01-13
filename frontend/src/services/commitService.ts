import api from './api';
import { User } from './userService';

export interface Commit {
  id: number;
  repository_id: number;
  author_id: number;
  message: string;
  hash: string;
  created_at: string;
  author?: User;
}

export interface CommitCreate {
  repository_id: number;
  author_id: number;
  message: string;
}

export const commitService = {
  getById: async (id: number): Promise<Commit> => {
    const response = await api.get(`/commits/${id}`);
    return response.data;
  },

  getByRepository: async (repoId: number, skip = 0, limit = 100): Promise<Commit[]> => {
    const response = await api.get(`/repositories/${repoId}/commits`, {
      params: { skip, limit },
    });
    return response.data;
  },

  create: async (commit: CommitCreate): Promise<Commit> => {
    const response = await api.post('/commits', commit);
    return response.data;
  },
};
