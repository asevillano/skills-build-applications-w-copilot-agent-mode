import { app } from './app.js';
import { connectDatabase } from './config/database.js';

const PORT = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-${PORT}.app.github.dev`
  : `http://localhost:${PORT}`;

async function startServer(): Promise<void> {
  await connectDatabase();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API running at ${baseUrl}/api`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Failed to start OctoFit Tracker API:', error);
  process.exit(1);
});
