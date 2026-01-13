import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RepositoryCreate } from '@/services/repositoryService';

interface RepositoryFormProps {
  onSubmit: (repo: RepositoryCreate) => void;
  initialData?: Partial<RepositoryCreate>;
}

export default function RepositoryForm({ onSubmit, initialData }: RepositoryFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [isPublic, setIsPublic] = useState(initialData?.is_public ?? true);
  const [ownerId, setOwnerId] = useState(initialData?.owner_id?.toString() || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: RepositoryCreate = {
      name,
      description: description || undefined,
      owner_id: parseInt(ownerId),
      is_public: isPublic,
    };
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Repository' : 'Create Repository'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Owner ID</label>
            <Input
              type="number"
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Repository Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="public"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="public" className="text-sm font-medium">
              Public repository
            </label>
          </div>
          <Button type="submit">{initialData ? 'Update' : 'Create'}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
