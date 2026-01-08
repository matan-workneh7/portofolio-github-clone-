import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Repository } from '@/services/repositoryService'

interface RepositoryCardProps {
    repository: Repository
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
    const ownerUsername = repository.owner?.username || 'Unknown'
    const ownerInitials = ownerUsername.slice(0, 2).toUpperCase()

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
    }

    return (
        <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-600 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={repository.owner?.avatar_url || undefined} />
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
                                {ownerInitials}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <Link
                                to={`/users/${ownerUsername}`}
                                className="text-sm text-zinc-400 hover:text-blue-400 transition-colors"
                            >
                                {ownerUsername}
                            </Link>
                            <span className="text-zinc-600 mx-1">/</span>
                            <Link
                                to={`/repos/${repository.id}`}
                                className="text-lg font-semibold text-blue-400 hover:underline"
                            >
                                {repository.name}
                            </Link>
                        </div>
                    </div>
                    <Badge variant={repository.is_public ? 'secondary' : 'outline'} className="text-xs">
                        {repository.is_public ? 'Public' : 'Private'}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                {repository.description && (
                    <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                        {repository.description}
                    </p>
                )}
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <div className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                        </svg>
                        <span>{repository.stars_count}</span>
                    </div>
                    <span>Updated {formatDate(repository.updated_at)}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default RepositoryCard
