import api from './api'

export type IssueStatus = 'open' | 'closed'

export interface CreatorInfo {
    id: number
    username: string
    avatar_url: string | null
}

export interface Issue {
    id: number
    repository_id: number
    creator_id: number
    creator: CreatorInfo | null
    title: string
    description: string | null
    status: IssueStatus
    created_at: string
    updated_at: string
}

export interface IssueCreate {
    creator_id: number
    title: string
    description?: string
}

export interface IssueUpdate {
    title?: string
    description?: string
    status?: IssueStatus
}

export interface IssueList {
    issues: Issue[]
    total: number
}

export const issueService = {
    async getByRepository(
        repoId: number,
        status?: IssueStatus,
        skip = 0,
        limit = 100
    ): Promise<IssueList> {
        const response = await api.get<IssueList>(`/repos/${repoId}/issues`, {
            params: { status, skip, limit },
        })
        return response.data
    },

    async getById(repoId: number, issueId: number): Promise<Issue> {
        const response = await api.get<Issue>(`/repos/${repoId}/issues/${issueId}`)
        return response.data
    },

    async create(repoId: number, data: IssueCreate): Promise<Issue> {
        const response = await api.post<Issue>(`/repos/${repoId}/issues`, data)
        return response.data
    },

    async update(repoId: number, issueId: number, data: IssueUpdate): Promise<Issue> {
        const response = await api.put<Issue>(`/repos/${repoId}/issues/${issueId}`, data)
        return response.data
    },

    async delete(repoId: number, issueId: number): Promise<void> {
        await api.delete(`/repos/${repoId}/issues/${issueId}`)
    },
}

export default issueService
