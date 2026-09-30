import React, { useState, useEffect } from 'react';
import { apiClient, API_BASE_URL } from '../api';
import '../styles/Components.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/api/users');
      const data = response.data || response;
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(`Failed to fetch users: ${err.message}`);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError(null);
      const response = await apiClient.post('/api/users', formData);
      const newUser = response.data;
      setUsers([...users, newUser]);
      setFormData({ name: '', email: '' });
    } catch (err) {
      setError(`Failed to create user: ${err.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="component-container">
      <h2>Users</h2>
      <p className="api-info">API Base URL: {API_BASE_URL}</p>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter user name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter user email"
          />
        </div>
        <button type="submit" className="button">
          Add User
        </button>
      </form>

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="loading">No users found</div>
      ) : (
        <div className="list-container">
          {users.map((user) => (
            <div key={user.id} className="card">
              <h3>{user.name}</h3>
              <p>
                <span className="label">Email:</span> {user.email}
              </p>
              <p>
                <span className="label">ID:</span> {user.id}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
