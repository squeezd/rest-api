import { HTTPException } from 'hono/http-exception';
import { ServerErrorStatusCode, StatusCode } from 'hono/utils/http-status';

type CreateErrorMap = <
  const T extends Record<
    string,
    | readonly [Omit<StatusCode, ServerErrorStatusCode>, string]
    | ServerErrorStatusCode
  >
>(
  errorMap: T
) => T;

const createErrorMap: CreateErrorMap = (errorMap) => errorMap;

const errors = createErrorMap({
  'example error': [400, 'example error description'],
  'invalid bearer token': [401, 'invalid bearer token'],
  'internal server error': 500,
  "firebase won't initialize": 500,
});

type ErrorKinds = keyof typeof errors;
type ExceptionOptions = ConstructorParameters<typeof HTTPException>[1];
type CreateError = (
  error: ErrorKinds,
  options?: ExceptionOptions
) => HTTPException;

export const createError: CreateError = (error, options) => {
  const e = errors[error];

  if (e === 500) {
    return new HTTPException(500, options);
  }

  const opts: ExceptionOptions = {
    message: e[1],
    ...options,
  };
  return new HTTPException(e[0], opts);
};
