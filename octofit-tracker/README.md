# OctoFit Tracker

A modern multi-tier fitness tracking application built with React 19, Node.js/Express, TypeScript, and MongoDB.

## Architecture

```
octofit-tracker/
├── frontend/          # React 19 + Vite
│   └── Port: 5173
├── backend/           # Node.js + Express + TypeScript
│   └── Port: 8000
└── MongoDB
    └── Port: 27017
```

## Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud instance)
- npm or yarn

## Frontend Setup

```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`

## Backend Setup

```bash
cd octofit-tracker/backend
npm install
cp .env.example .env
npm run dev
```

Backend API will be available at `http://localhost:8000`

## API Endpoints

- `GET /api/health` - Health check endpoint

## Environment Variables (Backend)

Create a `.env` file in the backend directory:

```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
NODE_ENV=development
```

## Building for Production

### Frontend
```bash
cd octofit-tracker/frontend
npm run build
```

### Backend
```bash
cd octofit-tracker/backend
npm run build
npm start
```
