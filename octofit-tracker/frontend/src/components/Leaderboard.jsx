import React, { useState, useEffect } from 'react';
import { apiClient, API_BASE_URL } from '../api';
import '../styles/Components.css';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/api/leaderboard');
      const data = response.data || response;
      setLeaderboard(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(`Failed to fetch leaderboard: ${err.message}`);
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component-container">
      <h2>Leaderboard</h2>
      <p className="api-info">API Base URL: {API_BASE_URL}</p>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">Loading leaderboard...</div>
      ) : leaderboard.length === 0 ? (
        <div className="loading">No leaderboard data found</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leaderboard;
