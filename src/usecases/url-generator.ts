import { z } from '@hono/zod-openapi';

const CreateURLInputPayloadDTO = z.object({
  url: z.string().url(),
  uid: z.string(),
});

const CreateURLOutputPayloadDTO = z.string().url();

export const usecase = {
  async createURL(
    payload: z.infer<typeof CreateURLInputPayloadDTO>
  ): Promise<z.infer<typeof CreateURLOutputPayloadDTO>> {
    return '';
  },
};
