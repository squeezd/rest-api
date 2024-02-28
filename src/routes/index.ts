import { OpenAPIHono } from '@hono/zod-openapi';
import { router as urlRouter } from './urls';

const router = new OpenAPIHono();

router.route('/urls', urlRouter);
