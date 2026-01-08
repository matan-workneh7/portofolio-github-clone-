import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import repositoryService from '@/services/repositoryService'

export function NewRepository() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        owner_id: '1', // Default to user ID 1 for demo
        is_public: true,
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name.trim()) {
            setError('Repository name is required')
            return
        }

        setLoading(true)
        setError(null)

        try {
            const newRepo = await repositoryService.create({
                name: formData.name,
                description: formData.description || undefined,
                owner_id: parseInt(formData.owner_id),
                is_public: formData.is_public,
            })

            navigate(`/repos/${newRepo.id}`)
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to create repository')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-2xl text-white">Create a new repository</CardTitle>
                    <CardDescription className="text-zinc-400">
                        A repository contains all project files, including the revision history.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-white">Repository name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="my-awesome-project"
                                className="bg-zinc-800 border-zinc-700 text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-white">Description (optional)</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="A short description of your project"
                                className="bg-zinc-800 border-zinc-700 text-white resize-none"
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-white">Visibility</Label>
                            <Select
                                value={formData.is_public ? 'public' : 'private'}
                                onValueChange={(value) => setFormData({ ...formData, is_public: value === 'public' })}
                            >
                                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-800 border-zinc-700">
                                    <SelectItem value="public">Public</SelectItem>
                                    <SelectItem value="private">Private</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-zinc-500">
                                {formData.is_public
                                    ? 'Anyone on the internet can see this repository.'
                                    : 'You choose who can see and commit to this repository.'}
                            </p>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="border-zinc-700 hover:bg-zinc-800"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                {loading ? 'Creating...' : 'Create repository'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default NewRepository
