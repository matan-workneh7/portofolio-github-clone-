import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Issue } from '@/services/issueService'

interface IssueCardProps {
    issue: Issue
    repoId: number
}

export function IssueCard({ issue, repoId }: IssueCardProps) {
    const creatorUsername = issue.creator?.username || 'Unknown'
    const initials = creatorUsername.slice(0, 2).toUpperCase()

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
    }

    return (
        <div className="flex items-start gap-4 p-4 border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
            <div className={`w-2 h-2 rounded-full mt-2 ${issue.status === 'open' ? 'bg-green-500' : 'bg-purple-500'}`} />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <Link
                        to={`/repos/${repoId}/issues/${issue.id}`}
                        className="text-white font-medium hover:text-blue-400 transition-colors"
                    >
                        {issue.title}
                    </Link>
                    <Badge
                        variant={issue.status === 'open' ? 'default' : 'secondary'}
                        className={issue.status === 'open' ? 'bg-green-600' : 'bg-purple-600'}
                    >
                        {issue.status}
                    </Badge>
                </div>
                {issue.description && (
                    <p className="text-zinc-400 text-sm line-clamp-2 mb-2">{issue.description}</p>
                )}
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span>#{issue.id} opened {formatDate(issue.created_at)} by</span>
                    <div className="flex items-center gap-1">
                        <Avatar className="h-4 w-4">
                            <AvatarImage src={issue.creator?.avatar_url || undefined} />
                            <AvatarFallback className="bg-zinc-700 text-[8px] text-zinc-300">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-blue-400 hover:underline cursor-pointer">
                            {creatorUsername}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IssueCard
