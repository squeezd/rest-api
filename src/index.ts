import { swaggerUI } from '@hono/swagger-ui';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { router } from './routes/urls';

const app = new Hono();

/**
 * logger
 */
app.use(logger());

/**
 * OpenAPI doc
 */
router.doc('/doc', {
  openapi: '3.0.0',
  info: {
    title: 'Sqzd REST API',
    version: '0.0.1',
  },
});

app.route('/', router);

/**
 * register swagger ui
 */
app.get(
  '/swagger',
  swaggerUI({
    url: '/doc',
  })
);

export default app;
