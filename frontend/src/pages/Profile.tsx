import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { RepositoryCard } from '@/components/repository/RepositoryCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import userService, { type User } from '@/services/userService'
import repositoryService, { type Repository } from '@/services/repositoryService'

export function Profile() {
    const { username } = useParams<{ username: string }>()
    const [user, setUser] = useState<User | null>(null)
    const [repositories, setRepositories] = useState<Repository[]>([])
    const [starredRepos, setStarredRepos] = useState<Repository[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            if (!username) return

            try {
                setLoading(true)
                const userData = await userService.getByUsername(username)
                setUser(userData)

                const [reposData, starredData] = await Promise.all([
                    repositoryService.getByUser(userData.id),
                    repositoryService.getStarredByUser(userData.id),
                ])

                setRepositories(reposData.repositories)
                setStarredRepos(starredData.repositories)
            } catch (err) {
                setError('Failed to load profile')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [username])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        )
    }

    if (error || !user) {
        return (
            <div className="text-center py-12">
                <p className="text-red-400">{error || 'User not found'}</p>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden mb-8">
                <ProfileHeader user={user} repoCount={repositories.length} />
            </div>

            <Tabs defaultValue="repositories" className="w-full">
                <TabsList className="bg-zinc-900 border border-zinc-800">
                    <TabsTrigger value="repositories" className="data-[state=active]:bg-zinc-800">
                        Repositories ({repositories.length})
                    </TabsTrigger>
                    <TabsTrigger value="starred" className="data-[state=active]:bg-zinc-800">
                        Stars ({starredRepos.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="repositories" className="mt-6">
                    {repositories.length === 0 ? (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center text-zinc-400">
                            No repositories yet
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {repositories.map((repo) => (
                                <RepositoryCard key={repo.id} repository={repo} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="starred" className="mt-6">
                    {starredRepos.length === 0 ? (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center text-zinc-400">
                            No starred repositories yet
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {starredRepos.map((repo) => (
                                <RepositoryCard key={repo.id} repository={repo} />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Profile
