import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '@/components/search/SearchBar';
import RepositoryCard from '@/components/repository/RepositoryCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { searchService } from '@/services/searchService';
import { Repository } from '@/services/repositoryService';
import { User } from '@/services/userService';

export default function Search() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setLoading(true);
    try {
      const [repoResults, userResults] = await Promise.all([
        searchService.searchRepositories(searchQuery),
        searchService.searchUsers(searchQuery),
      ]);
      setRepositories(repoResults);
      setUsers(userResults);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Search</h1>
      <SearchBar onSearch={handleSearch} placeholder="Search repositories and users..." />

      {loading && <div>Searching...</div>}

      {query && !loading && (
        <>
          <div>
            <h2 className="text-2xl font-bold mb-4">Repositories</h2>
            {repositories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repositories.map((repo) => (
                  <RepositoryCard key={repo.id} repository={repo} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No repositories found</p>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            {users.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                  <Link key={user.id} to={`/users/${user.username}`}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>{user.username}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        {user.bio && (
                          <p className="text-sm mt-2">{user.bio}</p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No users found</p>
            )}
          </div>
        </>
      )}

      {!query && (
        <p className="text-muted-foreground text-center py-12">
          Enter a search query to find repositories and users
        </p>
      )}
    </div>
  );
}
