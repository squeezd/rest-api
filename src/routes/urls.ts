import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { ensureAPIKey, ensureFirebaseApp } from '@src/middlewares';
import { URLEnv } from '@src/types/urls';

export const router = new OpenAPIHono<URLEnv>();

router.use(ensureFirebaseApp());
router.use(ensureAPIKey());

const createURLRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['URLs'],
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
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
  const apiKey = c.var.apiKey;
  console.log(apiKey);

  return c.json(
    {
      data: {
        url: '',
      },
    },
    200
  );
});
