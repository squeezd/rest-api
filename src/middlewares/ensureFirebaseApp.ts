import { initFirebaseApp } from '@src/services/firebase';
import { URLEnv } from '@src/types/urls';
import { createError } from '@src/utils/error';
import { MiddlewareHandler } from 'hono';

export function ensureFirebaseApp(): MiddlewareHandler<URLEnv> {
  return async function (c, next) {
    const firebaseConfig = c.var.FIREBASE_CONFIG;

    try {
      const app = initFirebaseApp(firebaseConfig);
      c.set('firebaseApp', app);
    } catch (e) {
      throw createError(`firebase won't initialize`);
    }

    return next();
  };
}
