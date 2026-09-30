import React, { useState, useEffect } from 'react';
import { apiClient, API_BASE_URL } from '../api';
import '../styles/Components.css';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/api/workouts/');
      const data = response.data || response;
      setWorkouts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(`Failed to fetch workouts: ${err.message}`);
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component-container">
      <h2>Workouts</h2>
      <p className="api-info">API Base URL: {API_BASE_URL}</p>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">Loading workouts...</div>
      ) : workouts.length === 0 ? (
        <div className="loading">No workouts found. Start by creating activities!</div>
      ) : (
        <div className="list-container">
          {workouts.map((workout) => (
            <div key={workout.id} className="card">
              <h3>{workout.name || 'Workout'}</h3>
              <p>
                <span className="label">Type:</span> {workout.type}
              </p>
              <p>
                <span className="label">Duration:</span> {workout.duration} min
              </p>
              <p>
                <span className="label">Calories:</span> {workout.calories}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
