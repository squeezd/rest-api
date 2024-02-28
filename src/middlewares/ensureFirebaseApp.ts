import { MiddlewareHandler } from 'hono';
import { initFirebaseApp } from '../../services/firebase';

export function ensureFirebaseApp(): MiddlewareHandler {
  return async function ({ env }, next) {
    const firebaseConfig = env.FIREBASE_CONFIG as string;
    initFirebaseApp(firebaseConfig);

    return next();
  };
}
