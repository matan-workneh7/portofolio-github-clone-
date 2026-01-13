import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Repository } from '@/services/repositoryService';

interface RepositoryCardProps {
  repository: Repository;
}

export default function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <Link to={`/repositories/${repository.id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{repository.name}</CardTitle>
            {repository.is_public ? (
              <Badge variant="outline">Public</Badge>
            ) : (
              <Badge variant="secondary">Private</Badge>
            )}
          </div>
          {repository.owner && (
            <CardDescription>
              by {repository.owner.username}
            </CardDescription>
          )}
        </CardHeader>
        {repository.description && (
          <CardContent>
            <p className="text-sm text-muted-foreground">{repository.description}</p>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
