import { CreateEnvType } from '@src/types/util';

export type URLEnv = CreateEnvType<{
  Variables: {
    apiKey: string;
  };
}>;
