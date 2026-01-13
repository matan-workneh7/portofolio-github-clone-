import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProfileHeader from '@/components/profile/ProfileHeader';
import RepositoryCard from '@/components/repository/RepositoryCard';
import { userService, User } from '@/services/userService';
import { repositoryService, Repository } from '@/services/repositoryService';

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      loadUser();
    }
  }, [username]);

  const loadUser = async () => {
    if (!username) return;
    try {
      const data = await userService.getByUsername(username);
      setUser(data);
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRepositories = async () => {
    if (!user) return;
    try {
      const data = await repositoryService.getAll(0, 100, user.id);
      setRepositories(data);
    } catch (error) {
      console.error('Error loading repositories:', error);
    }
  };

  useEffect(() => {
    if (user) {
      loadRepositories();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="space-y-6">
      <ProfileHeader user={user} />

      <div>
        <h2 className="text-2xl font-bold mb-4">Repositories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repositories.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </div>
        {repositories.length === 0 && (
          <p className="text-muted-foreground">No repositories yet</p>
        )}
      </div>
    </div>
  );
}
