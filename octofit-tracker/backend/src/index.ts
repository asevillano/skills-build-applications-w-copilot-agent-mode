import express from 'express';
import mongoose from 'mongoose';

const PORT = 8000;
const MONGODB_URI =
  process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-${PORT}.app.github.dev`
  : `http://localhost:${PORT}`;

const app = express();

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

async function startServer(): Promise<void> {
  await mongoose.connect(MONGODB_URI);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API running at ${baseUrl}/api`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Failed to start OctoFit Tracker API:', error);
  process.exit(1);
});
