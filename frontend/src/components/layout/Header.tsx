import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Header() {
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <svg
                        viewBox="0 0 16 16"
                        className="h-8 w-8 fill-white"
                        aria-hidden="true"
                    >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    <span className="text-lg font-semibold text-white">GitClone</span>
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
                    <Input
                        type="search"
                        placeholder="Search repositories, users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
                    />
                </form>

                {/* Navigation */}
                <nav className="flex items-center gap-4">
                    <Link to="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
                        Explore
                    </Link>
                    <Link to="/new" className="text-sm text-zinc-400 hover:text-white transition-colors">
                        <Button variant="outline" size="sm" className="border-zinc-700 hover:bg-zinc-800">
                            New Repository
                        </Button>
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header
