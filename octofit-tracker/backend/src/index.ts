import express from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), 'src', '.env') });

import './config/database';

import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();

app.use(express.json());

const port = Number(process.env.PORT || 8000);

// Codespaces-aware API URL support
const codespaceName = process.env.CODESPACE_NAME;
// Use the Codespaces preview domain when available; fallback to localhost when not.
// The app.github.dev pattern exposes the forwarded port (8000) as <CODESPACE_NAME>-8000.app.github.dev
const codespaceApiUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : undefined;

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];
if (codespaceApiUrl) allowedOrigins.push(codespaceApiUrl);

const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (typeof origin === 'string' && allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
};

app.use(cors(corsOptions));

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Octofit Tracker API listening on port ${port}`);
  console.log(`Local: http://localhost:${port}`);
  if (codespaceApiUrl) console.log(`Codespace URL: ${codespaceApiUrl}`);
});

export default app;
