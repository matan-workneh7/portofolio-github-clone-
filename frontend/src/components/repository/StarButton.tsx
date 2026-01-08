import { useState } from 'react'
import { Button } from '@/components/ui/button'
import repositoryService from '@/services/repositoryService'

interface StarButtonProps {
    repoId: number
    userId: number
    initialCount: number
    initialStarred?: boolean
}

export function StarButton({ repoId, userId, initialCount, initialStarred = false }: StarButtonProps) {
    const [isStarred, setIsStarred] = useState(initialStarred)
    const [starCount, setStarCount] = useState(initialCount)
    const [isLoading, setIsLoading] = useState(false)

    const handleStar = async () => {
        if (isLoading) return

        setIsLoading(true)
        try {
            if (isStarred) {
                await repositoryService.unstar(repoId, userId)
                setStarCount((prev) => prev - 1)
                setIsStarred(false)
            } else {
                await repositoryService.star(repoId, userId)
                setStarCount((prev) => prev + 1)
                setIsStarred(true)
            }
        } catch (error) {
            console.error('Failed to star/unstar repository:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleStar}
            disabled={isLoading}
            className={`border-zinc-700 ${isStarred ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400' : 'hover:bg-zinc-800'}`}
        >
            <svg
                className={`h-4 w-4 mr-1 ${isStarred ? 'fill-yellow-400' : 'fill-none'}`}
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
            </svg>
            {isStarred ? 'Starred' : 'Star'} {starCount}
        </Button>
    )
}

export default StarButton
