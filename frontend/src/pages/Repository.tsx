import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RepositoryForm from '@/components/repository/RepositoryForm';
import CommitCard from '@/components/commit/CommitCard';
import IssueCard from '@/components/issue/IssueCard';
import IssueForm from '@/components/issue/IssueForm';
import StarButton from '@/components/repository/StarButton';
import { repositoryService, Repository, RepositoryUpdate, RepositoryCreate } from '@/services/repositoryService';
import { commitService, Commit } from '@/services/commitService';
import { issueService, Issue } from '@/services/issueService';

export default function Repository() {
  const { id } = useParams<{ id: string }>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      loadRepository();
      loadCommits();
      loadIssues();
    }
  }, [id]);

  const loadRepository = async () => {
    if (!id) return;
    try {
      const data = await repositoryService.getById(parseInt(id));
      setRepository(data);
      if (data.owner_id) {
        setSelectedUserId(data.owner_id);
      }
    } catch (error) {
      console.error('Error loading repository:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCommits = async () => {
    if (!id) return;
    try {
      const data = await commitService.getByRepository(parseInt(id));
      setCommits(data);
    } catch (error) {
      console.error('Error loading commits:', error);
    }
  };

  const loadIssues = async () => {
    if (!id) return;
    try {
      const data = await issueService.getByRepository(parseInt(id));
      setIssues(data);
    } catch (error) {
      console.error('Error loading issues:', error);
    }
  };

  const handleUpdate = async (repo: RepositoryCreate) => {
    if (!id) return;
    try {
      // Convert RepositoryCreate to RepositoryUpdate (exclude owner_id)
      const updateData: RepositoryUpdate = {
        name: repo.name,
        description: repo.description,
        is_public: repo.is_public,
      };
      await repositoryService.update(parseInt(id), updateData);
      setShowEditForm(false);
      loadRepository();
    } catch (error) {
      console.error('Error updating repository:', error);
      alert('Failed to update repository');
    }
  };

  const handleCreateIssue = async (issue: any) => {
    try {
      await issueService.create(issue);
      setShowIssueForm(false);
      loadIssues();
    } catch (error) {
      console.error('Error creating issue:', error);
      alert('Failed to create issue');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!repository) {
    return <div>Repository not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{repository.name}</h1>
          {repository.owner && (
            <p className="text-muted-foreground">
              by{' '}
              <Link to={`/users/${repository.owner.username}`} className="hover:underline">
                {repository.owner.username}
              </Link>
            </p>
          )}
        </div>
        <div className="flex gap-2">
          {selectedUserId && (
            <StarButton userId={selectedUserId} repositoryId={repository.id} />
          )}
          <Button variant="outline" onClick={() => setShowEditForm(!showEditForm)}>
            {showEditForm ? 'Cancel' : 'Edit'}
          </Button>
        </div>
      </div>

      {repository.description && (
        <Card>
          <CardContent className="pt-6">
            <p>{repository.description}</p>
          </CardContent>
        </Card>
      )}

      {showEditForm && (
        <RepositoryForm
          onSubmit={handleUpdate}
          initialData={{
            name: repository.name,
            description: repository.description,
            is_public: repository.is_public,
            owner_id: repository.owner_id,
          }}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Commits</h2>
          </div>
          <div className="space-y-2">
            {commits.map((commit) => (
              <CommitCard key={commit.id} commit={commit} />
            ))}
          </div>
          {commits.length === 0 && (
            <p className="text-muted-foreground">No commits yet</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Issues</h2>
            <Button onClick={() => setShowIssueForm(!showIssueForm)}>
              {showIssueForm ? 'Cancel' : 'New Issue'}
            </Button>
          </div>

          {showIssueForm && selectedUserId && (
            <IssueForm
              onSubmit={handleCreateIssue}
              repositoryId={repository.id}
              initialData={{ creator_id: selectedUserId }}
            />
          )}

          <div className="space-y-2">
            {issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
          {issues.length === 0 && (
            <p className="text-muted-foreground">No issues yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
