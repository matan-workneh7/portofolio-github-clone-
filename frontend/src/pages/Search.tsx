import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchBar } from '@/components/search/SearchBar'
import { RepositoryCard } from '@/components/repository/RepositoryCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import searchService, { type SearchResults } from '@/services/searchService'

export function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get('q') || '')
    const [type, setType] = useState(searchParams.get('type') || 'all')
    const [results, setResults] = useState<SearchResults | null>(null)
    const [loading, setLoading] = useState(false)

    const performSearch = async () => {
        if (!query.trim()) return

        setLoading(true)
        setSearchParams({ q: query, type })

        try {
            const data = await searchService.search(query, type as 'all' | 'users' | 'repositories')
            setResults(data)
        } catch (err) {
            console.error('Search failed:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const q = searchParams.get('q')
        if (q) {
            setQuery(q)
            performSearch()
        }
    }, [])

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-white mb-6">Search</h1>

            <SearchBar
                query={query}
                type={type}
                onQueryChange={setQuery}
                onTypeChange={setType}
                onSearch={performSearch}
            />

            {loading && (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            )}

            {results && !loading && (
                <div className="space-y-8">
                    {/* Users Section */}
                    {(type === 'all' || type === 'users') && results.users.length > 0 && (
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">
                                Users ({results.users_total})
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {results.users.map((user) => (
                                    <Card key={user.id} className="bg-zinc-900 border-zinc-800 hover:border-zinc-600 transition-colors">
                                        <CardContent className="flex items-center gap-4 p-4">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={user.avatar_url || undefined} />
                                                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                                                    {user.username.slice(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <Link
                                                    to={`/users/${user.username}`}
                                                    className="font-semibold text-blue-400 hover:underline"
                                                >
                                                    {user.username}
                                                </Link>
                                                {user.bio && (
                                                    <p className="text-sm text-zinc-400 line-clamp-1">{user.bio}</p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Repositories Section */}
                    {(type === 'all' || type === 'repositories') && results.repositories.length > 0 && (
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">
                                Repositories ({results.repositories_total})
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {results.repositories.map((repo) => (
                                    <RepositoryCard key={repo.id} repository={repo} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* No Results */}
                    {results.users.length === 0 && results.repositories.length === 0 && (
                        <div className="text-center py-12 text-zinc-400">
                            <svg className="h-16 w-16 mx-auto text-zinc-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <p className="text-lg mb-2">No results found</p>
                            <p className="text-sm">Try searching with different keywords</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Search
