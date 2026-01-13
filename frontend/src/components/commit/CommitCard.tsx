import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Commit } from '@/services/commitService';

interface CommitCardProps {
  commit: Commit;
}

export default function CommitCard({ commit }: CommitCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-mono">{commit.hash.substring(0, 7)}</CardTitle>
        {commit.author && (
          <CardDescription>
            by {commit.author.username}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm">{commit.message}</p>
        <p className="text-xs text-muted-foreground mt-2">
          {new Date(commit.created_at).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
