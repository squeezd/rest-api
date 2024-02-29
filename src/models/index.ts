import { z } from '@hono/zod-openapi';

export const APIKeyModel = z.object({
  user_id: z.string(),
  type: z.literal('custom').default('custom'),
});

export const ShortenedURLModel = z.object({
  user_id: z.string(),
  url: z.string().url(),
});
