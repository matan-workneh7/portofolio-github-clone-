import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import type { User } from '@/services/userService'

interface ProfileHeaderProps {
    user: User
    repoCount?: number
}

export function ProfileHeader({ user, repoCount = 0 }: ProfileHeaderProps) {
    const initials = user.username.slice(0, 2).toUpperCase()

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
        })
    }

    return (
        <div className="w-full">
            <div className="relative h-32 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-t-lg" />
            <div className="px-6 pb-6">
                <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16">
                    <Avatar className="h-32 w-32 border-4 border-zinc-900 shadow-xl">
                        <AvatarImage src={user.avatar_url || undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-3xl text-white font-bold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 pt-4 md:pt-0">
                        <h1 className="text-2xl font-bold text-white">{user.username}</h1>
                        <p className="text-zinc-400">{user.email}</p>
                    </div>
                </div>

                {user.bio && (
                    <p className="mt-4 text-zinc-300">{user.bio}</p>
                )}

                <Separator className="my-4 bg-zinc-800" />

                <div className="flex items-center gap-6 text-sm text-zinc-400">
                    <div className="flex items-center gap-2">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        <span><strong className="text-white">{repoCount}</strong> repositories</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Joined {formatDate(user.created_at)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
