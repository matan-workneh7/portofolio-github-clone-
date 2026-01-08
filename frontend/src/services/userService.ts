import api from './api'

export interface User {
    id: number
    username: string
    email: string
    bio: string | null
    avatar_url: string | null
    created_at: string
}

export interface UserCreate {
    username: string
    email: string
    bio?: string
    avatar_url?: string
}

export interface UserUpdate {
    username?: string
    email?: string
    bio?: string
    avatar_url?: string
}

export interface UserList {
    users: User[]
    total: number
}

export const userService = {
    async getAll(skip = 0, limit = 100): Promise<UserList> {
        const response = await api.get<UserList>('/users', {
            params: { skip, limit },
        })
        return response.data
    },

    async getById(id: number): Promise<User> {
        const response = await api.get<User>(`/users/${id}`)
        return response.data
    },

    async getByUsername(username: string): Promise<User> {
        const response = await api.get<User>(`/users/username/${username}`)
        return response.data
    },

    async create(data: UserCreate): Promise<User> {
        const response = await api.post<User>('/users', data)
        return response.data
    },

    async update(id: number, data: UserUpdate): Promise<User> {
        const response = await api.put<User>(`/users/${id}`, data)
        return response.data
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/users/${id}`)
    },
}

export default userService
