import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface SearchBarProps {
    query: string
    type: string
    onQueryChange: (query: string) => void
    onTypeChange: (type: string) => void
    onSearch: () => void
}

export function SearchBar({ query, type, onQueryChange, onTypeChange, onSearch }: SearchBarProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch()
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
            <Input
                type="search"
                placeholder="Search repositories, users..."
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                className="flex-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
            />
            <Select value={type} onValueChange={onTypeChange}>
                <SelectTrigger className="w-40 bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="repositories">Repositories</SelectItem>
                    <SelectItem value="users">Users</SelectItem>
                </SelectContent>
            </Select>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Search
            </Button>
        </form>
    )
}

export default SearchBar
