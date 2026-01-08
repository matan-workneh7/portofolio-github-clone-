import api from './api'

export interface AuthorInfo {
    id: number
    username: string
    avatar_url: string | null
}

export interface Commit {
    id: number
    repository_id: number
    author_id: number
    author: AuthorInfo | null
    message: string
    hash: string
    created_at: string
}

export interface CommitCreate {
    author_id: number
    message: string
    hash?: string
}

export interface CommitList {
    commits: Commit[]
    total: number
}

export const commitService = {
    async getByRepository(repoId: number, skip = 0, limit = 100): Promise<CommitList> {
        const response = await api.get<CommitList>(`/repos/${repoId}/commits`, {
            params: { skip, limit },
        })
        return response.data
    },

    async getById(repoId: number, commitId: number): Promise<Commit> {
        const response = await api.get<Commit>(`/repos/${repoId}/commits/${commitId}`)
        return response.data
    },

    async create(repoId: number, data: CommitCreate): Promise<Commit> {
        const response = await api.post<Commit>(`/repos/${repoId}/commits`, data)
        return response.data
    },
}

export default commitService
