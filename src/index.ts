import { Hono } from 'hono';
import { secureHeaders } from 'hono/secureHeaders';
import { logger } from 'hono/logger';
import apiRouter from './routes/api';

export interface Env {
  // Cloudflare bindings (D1, KV, R2, Environment variables)
  ENVIRONMENT: string;
}

const app = new Hono<{ Bindings: Env }>();

// Global Middleware
app.use('*', logger());
app.use('*', secureHeaders());

// Mount the API router
app.route('/api', apiRouter);

// Fallback for missing API routes (prevents bleeding into static assets)
app.all('/api/*', (c) => c.json({ error: 'Endpoint Not Found', code: 404 }, 404));

export default app;