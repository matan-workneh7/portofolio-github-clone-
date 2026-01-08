import api from './api'

export interface OwnerInfo {
    id: number
    username: string
    avatar_url: string | null
}

export interface Repository {
    id: number
    name: string
    description: string | null
    owner_id: number
    owner: OwnerInfo | null
    is_public: boolean
    created_at: string
    updated_at: string
    stars_count: number
}

export interface RepositoryCreate {
    name: string
    description?: string
    owner_id: number
    is_public?: boolean
}

export interface RepositoryUpdate {
    name?: string
    description?: string
    is_public?: boolean
}

export interface RepositoryList {
    repositories: Repository[]
    total: number
}

export const repositoryService = {
    async getAll(skip = 0, limit = 100): Promise<RepositoryList> {
        const response = await api.get<RepositoryList>('/repos', {
            params: { skip, limit },
        })
        return response.data
    },

    async getById(id: number): Promise<Repository> {
        const response = await api.get<Repository>(`/repos/${id}`)
        return response.data
    },

    async getByUser(userId: number, skip = 0, limit = 100): Promise<RepositoryList> {
        const response = await api.get<RepositoryList>(`/repos/user/${userId}`, {
            params: { skip, limit },
        })
        return response.data
    },

    async create(data: RepositoryCreate): Promise<Repository> {
        const response = await api.post<Repository>('/repos', data)
        return response.data
    },

    async update(id: number, data: RepositoryUpdate): Promise<Repository> {
        const response = await api.put<Repository>(`/repos/${id}`, data)
        return response.data
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/repos/${id}`)
    },

    async star(repoId: number, userId: number): Promise<void> {
        await api.post(`/repos/${repoId}/star`, null, {
            params: { user_id: userId },
        })
    },

    async unstar(repoId: number, userId: number): Promise<void> {
        await api.delete(`/repos/${repoId}/star`, {
            params: { user_id: userId },
        })
    },

    async getStarredByUser(userId: number, skip = 0, limit = 100): Promise<RepositoryList> {
        const response = await api.get<RepositoryList>(`/repos/user/${userId}/starred`, {
            params: { skip, limit },
        })
        return response.data
    },
}

export default repositoryService
