import { useEffect, useState } from 'react';
import { fetchList, getApiUrl, isCodespaceUrl } from '../lib/api';

type Activity = {
  _id?: string;
  type?: string;
  distanceKm?: number;
  durationMin?: number;
  date?: string;
  user?: { name?: string } | string;
};

function formatDate(value?: string) {
  if (!value) return 'Unknown';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function getUserName(user?: Activity['user']) {
  if (!user) return 'Unknown';
  return typeof user === 'string' ? user : user.name ?? 'Unknown';
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchList<Activity>('activities')
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <p className="text-muted">Endpoint: <code>{getApiUrl('activities')}</code></p>
      {!isCodespaceUrl && (
        <div className="alert alert-warning">Using local fallback because <code>VITE_CODESPACE_NAME</code> is not defined.</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div>Loading activities...</div>}
      {!loading && activities.length === 0 && <div>No activities found.</div>}
      {activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Distance (km)</th>
                <th>Duration (min)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.type}-${activity.date}`}>
                  <td>{activity.type ?? 'Unknown'}</td>
                  <td>{getUserName(activity.user)}</td>
                  <td>{activity.distanceKm ?? '-'}</td>
                  <td>{activity.durationMin ?? '-'}</td>
                  <td>{formatDate(activity.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
