import { useEffect, useState } from 'react';
import { fetchList, getApiUrl, isCodespaceUrl } from '../lib/api';

type LeaderboardEntry = {
  _id?: string;
  rank?: number;
  points?: number;
  user?: { name?: string } | string;
};

function getUserName(user?: LeaderboardEntry['user']) {
  if (!user) return 'Unknown';
  return typeof user === 'string' ? user : user.name ?? 'Unknown';
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchList<LeaderboardEntry>('leaderboard')
      .then(setEntries)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <p className="text-muted">Endpoint: <code>{getApiUrl('leaderboard')}</code></p>
      {!isCodespaceUrl && (
        <div className="alert alert-warning">Using local fallback because <code>VITE_CODESPACE_NAME</code> is not defined.</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div>Loading leaderboard...</div>}
      {!loading && entries.length === 0 && <div>No leaderboard entries found.</div>}
      {entries.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id ?? `${entry.rank}-${entry.user}`}>
                  <td>{entry.rank ?? '-'}</td>
                  <td>{getUserName(entry.user)}</td>
                  <td>{entry.points ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
