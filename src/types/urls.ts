import { CreateEnvType } from '@src/types/util';
import { FirebaseApp } from 'firebase/app';

export type URLEnv = CreateEnvType<{
  Variables: {
    apiKey: string;
    firebaseApp: FirebaseApp | undefined;
    FIREBASE_CONFIG: string | string;
  };
}>;
