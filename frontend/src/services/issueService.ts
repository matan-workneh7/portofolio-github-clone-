import api from './api';
import { User } from './userService';

export type IssueStatus = 'open' | 'closed';

export interface Issue {
  id: number;
  repository_id: number;
  creator_id: number;
  title: string;
  description?: string;
  status: IssueStatus;
  created_at: string;
  updated_at: string;
  creator?: User;
}

export interface IssueCreate {
  repository_id: number;
  creator_id: number;
  title: string;
  description?: string;
  status?: IssueStatus;
}

export interface IssueUpdate {
  title?: string;
  description?: string;
  status?: IssueStatus;
}

export const issueService = {
  getById: async (id: number): Promise<Issue> => {
    const response = await api.get(`/issues/${id}`);
    return response.data;
  },

  getByRepository: async (repoId: number, skip = 0, limit = 100, status?: IssueStatus): Promise<Issue[]> => {
    const params: any = { skip, limit };
    if (status) params.status = status;
    const response = await api.get(`/repositories/${repoId}/issues`, { params });
    return response.data;
  },

  create: async (issue: IssueCreate): Promise<Issue> => {
    const response = await api.post('/issues', issue);
    return response.data;
  },

  update: async (id: number, issue: IssueUpdate): Promise<Issue> => {
    const response = await api.put(`/issues/${id}`, issue);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/issues/${id}`);
  },
};
