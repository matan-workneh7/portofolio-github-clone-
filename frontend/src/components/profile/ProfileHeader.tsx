import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { User } from '@/services/userService';

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          {user.avatar_url && (
            <img
              src={user.avatar_url}
              alt={user.username}
              className="w-24 h-24 rounded-full"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </CardHeader>
      {user.bio && (
        <CardContent>
          <p>{user.bio}</p>
        </CardContent>
      )}
    </Card>
  );
}
