import api from './api'
import type { User } from './userService'
import type { Repository } from './repositoryService'

export type SearchType = 'all' | 'users' | 'repositories'

export interface SearchResults {
    users: User[]
    users_total: number
    repositories: Repository[]
    repositories_total: number
}

export const searchService = {
    async search(
        query: string,
        type: SearchType = 'all',
        skip = 0,
        limit = 20
    ): Promise<SearchResults> {
        const response = await api.get<SearchResults>('/search', {
            params: { q: query, type, skip, limit },
        })
        return response.data
    },
}

export default searchService
