import { useEffect, useState } from 'react'
import { RepositoryCard } from '@/components/repository/RepositoryCard'
import { Button } from '@/components/ui/button'
import type { Repository } from '@/services/repositoryService'
import repositoryService from '@/services/repositoryService'

export function Home() {
    const [repositories, setRepositories] = useState<Repository[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                setLoading(true)
                const data = await repositoryService.getAll(0, 20)
                setRepositories(data.repositories)
            } catch (err) {
                setError('Failed to load repositories')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchRepositories()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-400 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <section className="text-center py-16 px-4">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                    Explore Repositories
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                    Discover amazing projects from developers around the world.
                    Star your favorites and contribute to open source.
                </p>
            </section>

            {/* Repository Grid */}
            <section className="px-4 pb-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-white">Public Repositories</h2>
                    <span className="text-zinc-400">{repositories.length} total</span>
                </div>

                {repositories.length === 0 ? (
                    <div className="text-center py-16 bg-zinc-900 rounded-lg border border-zinc-800">
                        <svg className="h-16 w-16 mx-auto text-zinc-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        <h3 className="text-xl font-medium text-zinc-400 mb-2">No repositories yet</h3>
                        <p className="text-zinc-500 mb-6">Create your first repository to get started!</p>
                        <Button asChild className="bg-green-600 hover:bg-green-700">
                            <a href="/new">Create Repository</a>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {repositories.map((repo) => (
                            <RepositoryCard key={repo.id} repository={repo} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Home
