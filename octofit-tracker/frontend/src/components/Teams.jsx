import React, { useState, useEffect } from 'react';
import { apiClient, API_BASE_URL } from '../api';
import '../styles/Components.css';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/api/teams/');
      const data = response.data || response;
      setTeams(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(`Failed to fetch teams: ${err.message}`);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component-container">
      <h2>Teams</h2>
      <p className="api-info">API Base URL: {API_BASE_URL}</p>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">Loading teams...</div>
      ) : teams.length === 0 ? (
        <div className="loading">No teams found</div>
      ) : (
        <div className="list-container">
          {teams.map((team) => (
            <div key={team.id} className="card">
              <h3>{team.name}</h3>
              <p>
                <span className="label">Members:</span> {team.members}
              </p>
              <p>
                <span className="label">Leader:</span> {team.leader}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
