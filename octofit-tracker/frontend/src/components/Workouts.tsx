import { useEffect, useState } from 'react';
import { fetchList, getApiUrl, isCodespaceUrl } from '../lib/api';

type Workout = {
  _id?: string;
  name?: string;
  durationMin?: number;
  notes?: string;
  date?: string;
  user?: { name?: string } | string;
};

function formatDate(value?: string) {
  if (!value) return 'Unknown';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function getUserName(user?: Workout['user']) {
  if (!user) return 'Unknown';
  return typeof user === 'string' ? user : user.name ?? 'Unknown';
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchList<Workout>('workouts')
      .then(setWorkouts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <p className="text-muted">Endpoint: <code>{getApiUrl('workouts')}</code></p>
      {!isCodespaceUrl && (
        <div className="alert alert-warning">Using local fallback because <code>VITE_CODESPACE_NAME</code> is not defined.</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div>Loading workouts...</div>}
      {!loading && workouts.length === 0 && <div>No workouts found.</div>}
      {workouts.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>User</th>
                <th>Duration (min)</th>
                <th>Notes</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id ?? `${workout.name}-${workout.date}`}>
                  <td>{workout.name ?? 'Unknown'}</td>
                  <td>{getUserName(workout.user)}</td>
                  <td>{workout.durationMin ?? '-'}</td>
                  <td>{workout.notes ?? '-'}</td>
                  <td>{formatDate(workout.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
