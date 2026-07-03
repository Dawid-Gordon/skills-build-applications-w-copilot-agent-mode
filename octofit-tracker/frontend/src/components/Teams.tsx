import { useEffect, useState } from 'react';
import { fetchList, getApiUrl, isCodespaceUrl } from '../lib/api';

type TeamMember = { _id?: string; name?: string } | string;
type Team = {
  _id?: string;
  name?: string;
  members?: TeamMember[];
};

function getMemberNames(members?: TeamMember[]) {
  if (!Array.isArray(members) || members.length === 0) return 'None';
  return members
    .map((member) => (typeof member === 'string' ? member : member.name ?? 'Unknown'))
    .join(', ');
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchList<Team>('teams')
      .then(setTeams)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <p className="text-muted">Endpoint: <code>{getApiUrl('teams')}</code></p>
      {!isCodespaceUrl && (
        <div className="alert alert-warning">Using local fallback because <code>VITE_CODESPACE_NAME</code> is not defined.</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div>Loading teams...</div>}
      {!loading && teams.length === 0 && <div>No teams found.</div>}
      {teams.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id ?? team.name ?? Math.random().toString(36).slice(2)}>
                  <td>{team.name ?? 'Unnamed'}</td>
                  <td>{getMemberNames(team.members)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
