import { getApp, getApps, initializeApp } from 'firebase/app';

export function initFirebaseApp(stringifiedFirebaseOption: string) {
  if (getApps().length === 0) {
    return initializeApp(JSON.parse(stringifiedFirebaseOption));
  }

  return getApp();
}
