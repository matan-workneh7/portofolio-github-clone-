import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import IssueForm from '@/components/issue/IssueForm';
import { issueService, Issue, IssueUpdate } from '@/services/issueService';

export default function Issue() {
  const { issueId } = useParams<{ issueId: string }>();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    if (issueId) {
      loadIssue();
    }
  }, [issueId]);

  const loadIssue = async () => {
    if (!issueId) return;
    try {
      const data = await issueService.getById(parseInt(issueId));
      setIssue(data);
    } catch (error) {
      console.error('Error loading issue:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (issue: IssueCreate) => {
    if (!issueId) return;
    try {
      // Convert IssueCreate to IssueUpdate (exclude repository_id and creator_id)
      const updateData: IssueUpdate = {
        title: issue.title,
        description: issue.description,
        status: issue.status,
      };
      await issueService.update(parseInt(issueId), updateData);
      setShowEditForm(false);
      loadIssue();
    } catch (error) {
      console.error('Error updating issue:', error);
      alert('Failed to update issue');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!issue) {
    return <div>Issue not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{issue.title}</h1>
          <p className="text-muted-foreground">
            in{' '}
            <Link to={`/repositories/${issue.repository_id}`} className="hover:underline">
              Repository #{issue.repository_id}
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={issue.status === 'open' ? 'default' : 'secondary'}>
            {issue.status}
          </Badge>
          <Button variant="outline" onClick={() => setShowEditForm(!showEditForm)}>
            {showEditForm ? 'Cancel' : 'Edit'}
          </Button>
        </div>
      </div>

      {showEditForm && (
        <IssueForm
          onSubmit={handleUpdate}
          repositoryId={issue.repository_id}
          initialData={{
            title: issue.title,
            description: issue.description,
            status: issue.status,
            creator_id: issue.creator_id,
          }}
        />
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Description</CardTitle>
            {issue.creator && (
              <p className="text-sm text-muted-foreground">
                Created by {issue.creator.username}
              </p>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {issue.description ? (
            <p className="whitespace-pre-wrap">{issue.description}</p>
          ) : (
            <p className="text-muted-foreground">No description provided</p>
          )}
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Created: {new Date(issue.created_at).toLocaleString()}</p>
            <p>Updated: {new Date(issue.updated_at).toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
