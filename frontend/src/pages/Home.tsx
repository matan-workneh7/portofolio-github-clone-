import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RepositoryCard from '@/components/repository/RepositoryCard';
import RepositoryForm from '@/components/repository/RepositoryForm';
import { Button } from '@/components/ui/button';
import { repositoryService, Repository, RepositoryCreate } from '@/services/repositoryService';

export default function Home() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadRepositories();
  }, []);

  const loadRepositories = async () => {
    try {
      setLoading(true);
      const data = await repositoryService.getAll();
      setRepositories(data);
    } catch (error) {
      console.error('Error loading repositories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (repo: RepositoryCreate) => {
    try {
      await repositoryService.create(repo);
      setShowForm(false);
      loadRepositories();
    } catch (error) {
      console.error('Error creating repository:', error);
      alert('Failed to create repository');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Repositories</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'New Repository'}
        </Button>
      </div>

      {showForm && (
        <RepositoryForm onSubmit={handleCreate} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repositories.map((repo) => (
          <RepositoryCard key={repo.id} repository={repo} />
        ))}
      </div>

      {repositories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No repositories yet. Create one to get started!</p>
        </div>
      )}
    </div>
  );
}
