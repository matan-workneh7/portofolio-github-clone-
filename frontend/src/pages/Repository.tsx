import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CommitCard } from '@/components/repository/CommitCard'
import { IssueCard } from '@/components/issue/IssueCard'
import { StarButton } from '@/components/repository/StarButton'
import repositoryService, { type Repository } from '@/services/repositoryService'
import commitService, { type Commit } from '@/services/commitService'
import issueService, { type Issue } from '@/services/issueService'

export function RepositoryPage() {
    const { id } = useParams<{ id: string }>()
    const [repository, setRepository] = useState<Repository | null>(null)
    const [commits, setCommits] = useState<Commit[]>([])
    const [issues, setIssues] = useState<Issue[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return

            try {
                setLoading(true)
                const repoId = parseInt(id)

                const [repoData, commitsData, issuesData] = await Promise.all([
                    repositoryService.getById(repoId),
                    commitService.getByRepository(repoId),
                    issueService.getByRepository(repoId),
                ])

                setRepository(repoData)
                setCommits(commitsData.commits)
                setIssues(issuesData.issues)
            } catch (err) {
                setError('Failed to load repository')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        )
    }

    if (error || !repository) {
        return (
            <div className="text-center py-12">
                <p className="text-red-400">{error || 'Repository not found'}</p>
            </div>
        )
    }

    const ownerUsername = repository.owner?.username || 'Unknown'
    const openIssues = issues.filter(i => i.status === 'open').length

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <div className="flex items-center gap-2 text-lg mb-2">
                        <Link to={`/users/${ownerUsername}`} className="text-blue-400 hover:underline">
                            {ownerUsername}
                        </Link>
                        <span className="text-zinc-600">/</span>
                        <span className="font-semibold text-white">{repository.name}</span>
                        <Badge variant={repository.is_public ? 'secondary' : 'outline'} className="ml-2">
                            {repository.is_public ? 'Public' : 'Private'}
                        </Badge>
                    </div>
                    {repository.description && (
                        <p className="text-zinc-400 max-w-2xl">{repository.description}</p>
                    )}
                </div>
                <StarButton
                    repoId={repository.id}
                    userId={1}
                    initialCount={repository.stars_count}
                />
            </div>

            <Separator className="bg-zinc-800 mb-6" />

            {/* Tabs */}
            <Tabs defaultValue="code" className="w-full">
                <TabsList className="bg-zinc-900 border border-zinc-800">
                    <TabsTrigger value="code" className="data-[state=active]:bg-zinc-800">
                        Code
                    </TabsTrigger>
                    <TabsTrigger value="commits" className="data-[state=active]:bg-zinc-800">
                        Commits ({commits.length})
                    </TabsTrigger>
                    <TabsTrigger value="issues" className="data-[state=active]:bg-zinc-800">
                        Issues ({issues.length})
                        {openIssues > 0 && (
                            <span className="ml-2 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                                {openIssues}
                            </span>
                        )}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="code" className="mt-6">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center">
                        <svg className="h-16 w-16 mx-auto text-zinc-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <h3 className="text-xl font-medium text-zinc-400 mb-2">Repository Code</h3>
                        <p className="text-zinc-500">
                            This is a portfolio demo. Actual file browsing would be implemented here.
                        </p>
                    </div>
                </TabsContent>

                <TabsContent value="commits" className="mt-6">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                        {commits.length === 0 ? (
                            <div className="p-8 text-center text-zinc-400">
                                No commits yet
                            </div>
                        ) : (
                            commits.map((commit) => (
                                <CommitCard key={commit.id} commit={commit} />
                            ))
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="issues" className="mt-6">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                        {issues.length === 0 ? (
                            <div className="p-8 text-center text-zinc-400">
                                No issues yet
                            </div>
                        ) : (
                            issues.map((issue) => (
                                <IssueCard key={issue.id} issue={issue} repoId={repository.id} />
                            ))
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default RepositoryPage
