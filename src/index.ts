import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { logger } from 'hono/logger';
import { errorHandler, notFoundHandler, urlRouter } from './routes';

const app = new OpenAPIHono();

/**
 * logger
 */
app.use(logger());

app.notFound(notFoundHandler);
app.onError(errorHandler);

app.openAPIRegistry.registerComponent('securitySchemes', 'ApiKeyAuth', {
  type: 'apiKey',
  in: 'header',
  name: 'Authorization',
});

/**
 * OpenAPI doc
 */
app.doc('/json', {
  openapi: '3.0.0',
  info: {
    title: 'Sqzd REST API',
    version: '0.0.1',
  },
});

/**
 * register swagger ui
 */
app.get(
  '/swagger',
  swaggerUI({
    url: '/json',
  })
);

/**
 * register app routers
 */
app.route('/urls', urlRouter);

export default app;
