import { Env, ErrorHandler, NotFoundHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';

export const notFoundHandler: NotFoundHandler<Env> = async function (c) {
  return c.json(
    {
      message: 'resource not found',
    },
    404
  );
};

export const errorHandler: ErrorHandler<Env> = async function (err, c) {
  if (err instanceof HTTPException) {
    let message = err.message;

    if (err.status === 500) {
      message = 'internal server error';
    }

    return c.json(
      {
        message,
      },
      err.status
    );
  }

  return c.newResponse(null, 500);
};
