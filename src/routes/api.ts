import { Hono } from 'hono';
import type { Env } from '../index';

const router = new Hono<{ Bindings: Env }>();

// System Health Check (Crucial for monitoring)
router.get('/health', (c) => {
  return c.json({
    status: 'operational',
    edge_location: c.req.raw.cf?.colo || 'local',
    timestamp: new Date().toISOString(),
  });
});

// Example Data Route
router.get('/metrics', (c) => {
  return c.json({
    active_users: 1420,
    requests_per_second: 345,
    average_latency_ms: 12,
  });
});

export default router;