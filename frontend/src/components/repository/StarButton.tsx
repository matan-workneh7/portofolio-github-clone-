import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { starService } from '@/services/starService';

interface StarButtonProps {
  userId: number;
  repositoryId: number;
}

export default function StarButton({ userId, repositoryId }: StarButtonProps) {
  const [isStarred, setIsStarred] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStarred = async () => {
      try {
        const starred = await starService.isStarred(userId, repositoryId);
        setIsStarred(starred);
      } catch (error) {
        console.error('Error checking star status:', error);
      } finally {
        setLoading(false);
      }
    };
    checkStarred();
  }, [userId, repositoryId]);

  const handleToggle = async () => {
    try {
      if (isStarred) {
        await starService.unstar(userId, repositoryId);
        setIsStarred(false);
      } else {
        await starService.star(userId, repositoryId);
        setIsStarred(true);
      }
    } catch (error) {
      console.error('Error toggling star:', error);
    }
  };

  if (loading) {
    return <Button variant="outline" disabled>Loading...</Button>;
  }

  return (
    <Button
      variant={isStarred ? "default" : "outline"}
      onClick={handleToggle}
    >
      <Star className={`w-4 h-4 mr-2 ${isStarred ? 'fill-current' : ''}`} />
      {isStarred ? 'Starred' : 'Star'}
    </Button>
  );
}
