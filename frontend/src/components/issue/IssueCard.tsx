import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Issue } from '@/services/issueService';

interface IssueCardProps {
  issue: Issue;
}

export default function IssueCard({ issue }: IssueCardProps) {
  return (
    <Link to={`/repositories/${issue.repository_id}/issues/${issue.id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{issue.title}</CardTitle>
            <Badge variant={issue.status === 'open' ? 'default' : 'secondary'}>
              {issue.status}
            </Badge>
          </div>
          {issue.creator && (
            <CardDescription>
              by {issue.creator.username}
            </CardDescription>
          )}
        </CardHeader>
        {issue.description && (
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">{issue.description}</p>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
