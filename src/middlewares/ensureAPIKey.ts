import { URLEnv } from '@src/types/urls';
import { createError } from '@src/utils/error';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { MiddlewareHandler } from 'hono';

export function ensureAPIKey(): MiddlewareHandler<URLEnv> {
  return async function (c, next) {
    const apiKey = c.req.header('Authorization');

    if (!apiKey) {
      throw createError('invalid bearer token', {
        res: c.res,
      });
    }

    // should fires ensureFirebaseApp middleware first
    if (!c.var.firebaseApp) {
      throw createError(`firebase won't initialize`);
    }

    const db = getFirestore(c.var.firebaseApp);
    const ref = doc(db, 'api_keys', apiKey);

    const apiKeyDoc = await getDoc(ref);
    if (!apiKeyDoc.exists) {
      throw createError('invalid bearer token', {
        res: c.res,
      });
    }

    c.set('apiKey', apiKey);

    return next();
  };
}
