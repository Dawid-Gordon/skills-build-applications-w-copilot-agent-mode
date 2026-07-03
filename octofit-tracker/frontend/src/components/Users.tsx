import { useEffect, useState } from 'react';
import { fetchList, getApiUrl, isCodespaceUrl } from '../lib/api';

type User = {
  _id?: string;
  name?: string;
  email?: string;
  points?: number;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchList<User>('users')
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <p className="text-muted">Endpoint: <code>{getApiUrl('users')}</code></p>
      {!isCodespaceUrl && (
        <div className="alert alert-warning">Using local fallback because <code>VITE_CODESPACE_NAME</code> is not defined.</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div>Loading users...</div>}
      {!loading && users.length === 0 && <div>No users found.</div>}
      {users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? user.name ?? Math.random().toString(36).slice(2)}>
                  <td>{user.name ?? 'Unknown'}</td>
                  <td>{user.email ?? '-'}</td>
                  <td>{user.points ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
