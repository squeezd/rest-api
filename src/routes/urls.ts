import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

export const router = new OpenAPIHono();

const createURLRoute = createRoute({
  method: 'post',
  path: '/urls',
  tags: ['URLs'],
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: z.object({
            url: z
              .string({
                description: 'The URL to be shortened',
              })
              .url(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Returns shortened URL',
      content: {
        'application/json': {
          schema: z.object({
            data: z.object({
              url: z
                .string({
                  description: 'shortened url',
                })
                .url(),
            }),
          }),
        },
      },
    },
  },
});

router.openapi(createURLRoute, async function (c) {
  return {
    format: 'json',
    data: {
      data: {
        url: '',
      },
    },
  };
});
