import React, { useState, useEffect } from 'react';
import { apiClient, API_BASE_URL } from '../api';
import '../styles/Components.css';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'cardio',
    duration: '',
    calories: '',
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/api/activities');
      const data = response.data || response;
      setActivities(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(`Failed to fetch activities: ${err.message}`);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.type || !formData.duration) {
      setError('Please fill in required fields');
      return;
    }

    try {
      setError(null);
      const response = await apiClient.post('/api/activities', formData);
      const newActivity = response.data;
      setActivities([...activities, newActivity]);
      setFormData({ name: '', type: 'cardio', duration: '', calories: '' });
    } catch (err) {
      setError(`Failed to create activity: ${err.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="component-container">
      <h2>Activities</h2>
      <p className="api-info">API Base URL: {API_BASE_URL}</p>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Activity Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Morning Run"
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange}>
            <option value="cardio">Cardio</option>
            <option value="strength">Strength</option>
            <option value="flexibility">Flexibility</option>
            <option value="sports">Sports</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (minutes)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="30"
          />
        </div>
        <div className="form-group">
          <label htmlFor="calories">Calories (optional)</label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            placeholder="320"
          />
        </div>
        <button type="submit" className="button">
          Add Activity
        </button>
      </form>

      {loading ? (
        <div className="loading">Loading activities...</div>
      ) : activities.length === 0 ? (
        <div className="loading">No activities found</div>
      ) : (
        <div className="list-container">
          {activities.map((activity) => (
            <div key={activity.id} className="card">
              <h3>{activity.name}</h3>
              <p>
                <span className="label">Type:</span> {activity.type}
              </p>
              <p>
                <span className="label">Duration:</span> {activity.duration} min
              </p>
              <p>
                <span className="label">Calories:</span> {activity.calories}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Activities;
