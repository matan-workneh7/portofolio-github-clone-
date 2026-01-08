import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Commit } from '@/services/commitService'

interface CommitCardProps {
    commit: Commit
}

export function CommitCard({ commit }: CommitCardProps) {
    const authorUsername = commit.author?.username || 'Unknown'
    const initials = authorUsername.slice(0, 2).toUpperCase()

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

        if (diffDays === 0) return 'today'
        if (diffDays === 1) return 'yesterday'
        if (diffDays < 7) return `${diffDays} days ago`
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    return (
        <div className="flex items-start gap-4 p-4 border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
            <Avatar className="h-10 w-10">
                <AvatarImage src={commit.author?.avatar_url || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-500 text-white text-xs">
                    {initials}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{commit.message}</p>
                <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                    <span className="text-blue-400 hover:underline cursor-pointer">
                        {authorUsername}
                    </span>
                    <span>committed {formatDate(commit.created_at)}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <code className="text-xs bg-zinc-800 text-blue-400 px-2 py-1 rounded font-mono">
                    {commit.hash.slice(0, 7)}
                </code>
            </div>
        </div>
    )
}

export default CommitCard
