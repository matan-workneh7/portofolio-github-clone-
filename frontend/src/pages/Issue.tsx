import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import issueService, { type Issue } from '@/services/issueService'

export function IssuePage() {
    const { id, issueId } = useParams<{ id: string; issueId: string }>()
    const [issue, setIssue] = useState<Issue | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchIssue = async () => {
            if (!id || !issueId) return

            try {
                setLoading(true)
                const data = await issueService.getById(parseInt(id), parseInt(issueId))
                setIssue(data)
            } catch (err) {
                setError('Failed to load issue')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchIssue()
    }, [id, issueId])

    const handleStatusToggle = async () => {
        if (!issue || !id) return

        try {
            const newStatus = issue.status === 'open' ? 'closed' : 'open'
            const updated = await issueService.update(parseInt(id), issue.id, { status: newStatus })
            setIssue(updated)
        } catch (err) {
            console.error('Failed to update issue:', err)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        )
    }

    if (error || !issue) {
        return (
            <div className="text-center py-12">
                <p className="text-red-400">{error || 'Issue not found'}</p>
            </div>
        )
    }

    const creatorUsername = issue.creator?.username || 'Unknown'
    const initials = creatorUsername.slice(0, 2).toUpperCase()

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            {/* Breadcrumb */}
            <div className="text-sm text-zinc-400 mb-4">
                <Link to={`/repos/${id}`} className="hover:text-blue-400">Repository</Link>
                <span className="mx-2">/</span>
                <span>Issues</span>
                <span className="mx-2">/</span>
                <span className="text-white">#{issue.id}</span>
            </div>

            {/* Issue Header */}
            <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                    <h1 className="text-3xl font-bold text-white">{issue.title}</h1>
                    <Button
                        variant="outline"
                        className={issue.status === 'open'
                            ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10'
                            : 'border-green-500 text-green-400 hover:bg-green-500/10'
                        }
                        onClick={handleStatusToggle}
                    >
                        {issue.status === 'open' ? 'Close issue' : 'Reopen issue'}
                    </Button>
                </div>

                <div className="flex items-center gap-3">
                    <Badge
                        className={issue.status === 'open' ? 'bg-green-600' : 'bg-purple-600'}
                    >
                        {issue.status === 'open' ? '● Open' : '● Closed'}
                    </Badge>
                    <span className="text-zinc-400">
                        <span className="text-blue-400">{creatorUsername}</span> opened this issue on {formatDate(issue.created_at)}
                    </span>
                </div>
            </div>

            <Separator className="bg-zinc-800 mb-6" />

            {/* Issue Body */}
            <div className="flex gap-4">
                <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={issue.creator?.avatar_url || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        {initials}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                    <div className="bg-zinc-800/50 px-4 py-3 border-b border-zinc-800">
                        <span className="font-medium text-blue-400">{creatorUsername}</span>
                        <span className="text-zinc-400 text-sm ml-2">commented {formatDate(issue.created_at)}</span>
                    </div>
                    <div className="p-4">
                        {issue.description ? (
                            <p className="text-zinc-300 whitespace-pre-wrap">{issue.description}</p>
                        ) : (
                            <p className="text-zinc-500 italic">No description provided.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IssuePage
