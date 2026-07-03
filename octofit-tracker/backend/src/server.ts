import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';

/**
 * Creates and configures an Express server with CORS middleware
 * @param allowedOrigins - Array of allowed origins for CORS
 * @returns Configured Express application
 */
export function createServer(allowedOrigins: string[]): Express {
  const app = express();

  // Middleware
  app.use(express.json());

  // CORS configuration
  const corsOptions: CorsOptions = {
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (typeof origin === 'string' && allowedOrigins.includes(origin)) {
        return cb(null, true);
      }
      return cb(new Error('Not allowed by CORS'));
    },
  };

  app.use(cors(corsOptions));

  return app;
}

/**
 * Starts the Express server and logs connection information
 * @param app - Express application instance
 * @param port - Port number to listen on
 */
export function startServer(app: Express, port: number): void {
  const codespaceName = process.env.CODESPACE_NAME;
  const codespaceApiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : undefined;

  app.listen(port, () => {
    console.log(`Octofit Tracker API listening on port ${port}`);
    console.log(`Local: http://localhost:${port}`);
    if (codespaceApiUrl) console.log(`Codespace URL: ${codespaceApiUrl}`);
  });
}
