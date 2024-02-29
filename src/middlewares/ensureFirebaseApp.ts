import { initFirebaseApp } from '@src/services/firebase';
import { MiddlewareHandler } from 'hono';

export function ensureFirebaseApp(): MiddlewareHandler {
  return async function ({ env }, next) {
    const firebaseConfig = env.FIREBASE_CONFIG as string;
    initFirebaseApp(firebaseConfig);

    return next();
  };
}
