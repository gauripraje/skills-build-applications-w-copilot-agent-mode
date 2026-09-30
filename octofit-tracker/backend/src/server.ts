import express from 'express';
import cors from 'cors';

// Environment detection
const codespaceName = process.env.CODESPACE_NAME;
const isCodespace = !!codespaceName && codespaceName !== '';

// API base URL construction
const apiBaseUrl = isCodespace
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const frontendOrigin = isCodespace
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173';

// Express app initialization
const app = express();

// CORS configuration
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      frontendOrigin,
    ].filter(Boolean),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

export { app, apiBaseUrl, frontendOrigin, codespaceName, isCodespace };
