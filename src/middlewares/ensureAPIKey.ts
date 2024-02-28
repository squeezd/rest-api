import { MiddlewareHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { URLEnv } from '../types/urls';

export function ensureAPIKey(): MiddlewareHandler<URLEnv> {
  return async function (c, next) {
    const apiKey = c.req.header('Authorization');

    if (!apiKey) {
      throw new HTTPException(401, {
        message: 'invalid bearer token',
        res: c.res,
      });
    }

    // const db = getFirestore();
    // const ref = doc(db, 'api_keys', apiKey);

    // const apiKeyDoc = await getDoc(ref);
    // if (!apiKeyDoc.exists) {
    //   throw new HTTPException(401, {
    //     message: 'invalid bearer token',
    //     res: c.res,
    //   });
    // }

    c.set('apiKey', apiKey);

    return next();
  };
}
