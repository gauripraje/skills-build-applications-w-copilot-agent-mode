import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app, apiBaseUrl, frontendOrigin, codespaceName, isCodespace } from './server';

dotenv.config();

const PORT = Number(process.env.PORT || 8000);
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// In-memory storage for demo API
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
];

const activities = [
  { id: 1, name: 'Morning Run', type: 'cardio', duration: 30, calories: 320 },
  { id: 2, name: 'Strength Training', type: 'strength', duration: 45, calories: 420 },
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    environment: isCodespace ? 'codespace' : 'localhost',
    baseUrl: apiBaseUrl,
    timestamp: new Date().toISOString(),
    codespaceName: codespaceName || 'not set',
  });
});

app.get('/api/users', (req, res) => {
  res.json({ success: true, count: users.length, data: users });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required',
    });
  }

  const user = { id: Date.now(), name, email };
  users.push(user);

  return res.status(201).json({ success: true, data: user });
});

app.get('/api/activities', (req, res) => {
  res.json({ success: true, count: activities.length, data: activities });
});

app.post('/api/activities', (req, res) => {
  const { name, type, duration, calories } = req.body || {};

  if (!name || !type || !duration) {
    return res.status(400).json({
      success: false,
      message: 'Name, type, and duration are required',
    });
  }

  const activity = {
    id: Date.now(),
    name,
    type,
    duration,
    calories: calories || 0,
  };

  activities.push(activity);

  return res.status(201).json({ success: true, data: activity });
});

// Start Server
app.listen(PORT, () => {
  console.log(`OctoFit Tracker API running on port ${PORT}`);
  console.log(`Environment: ${isCodespace ? 'Codespaces' : 'Localhost'}`);
  console.log(`API base URL: ${apiBaseUrl}`);
  console.log(`Frontend origin: ${frontendOrigin}`);
  console.log(`MongoDB: ${MONGODB_URI}`);
});
