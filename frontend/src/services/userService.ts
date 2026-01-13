import api from './api';

export interface User {
  id: number;
  username: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
}

export interface UserCreate {
  username: string;
  email: string;
  bio?: string;
  avatar_url?: string;
}

export interface UserUpdate {
  username?: string;
  email?: string;
  bio?: string;
  avatar_url?: string;
}

export const userService = {
  getAll: async (skip = 0, limit = 100): Promise<User[]> => {
    const response = await api.get('/users', { params: { skip, limit } });
    return response.data;
  },

  getById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  getByUsername: async (username: string): Promise<User> => {
    const response = await api.get(`/users/username/${username}`);
    return response.data;
  },

  create: async (user: UserCreate): Promise<User> => {
    const response = await api.post('/users', user);
    return response.data;
  },

  update: async (id: number, user: UserUpdate): Promise<User> => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
