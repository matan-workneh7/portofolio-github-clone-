import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IssueCreate, IssueStatus } from '@/services/issueService';

interface IssueFormProps {
  onSubmit: (issue: IssueCreate) => void;
  initialData?: Partial<IssueCreate>;
  repositoryId: number;
}

export default function IssueForm({ onSubmit, initialData, repositoryId }: IssueFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState<IssueStatus>(initialData?.status || 'open');
  const [creatorId, setCreatorId] = useState(initialData?.creator_id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      repository_id: repositoryId,
      creator_id: parseInt(creatorId),
      title,
      description: description || undefined,
      status,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Issue' : 'Create Issue'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Creator ID</label>
            <Input
              type="number"
              value={creatorId}
              onChange={(e) => setCreatorId(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as IssueStatus)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <Button type="submit">{initialData ? 'Update' : 'Create'}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
