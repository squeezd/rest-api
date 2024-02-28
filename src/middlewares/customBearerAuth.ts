import { MiddlewareHandler } from 'hono';

export const customBearerAuth: () => MiddlewareHandler = () =>
  async function (c, next) {
    const bearer = c.req.header('Authorization');
    if (!bearer) {
      return c.status(401);
    }

    const splitted = bearer.trim().split(' ');
    if (splitted.length != 2) {
      return c.status(401);
    }

    const apiKey = splitted.at(1)!;
    c.set('api_key', apiKey);

    next();
  };
