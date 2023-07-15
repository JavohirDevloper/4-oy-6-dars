export class BadRequestError extends Error {
  constructor(msg) {
    super(msg);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }
  }
}

export class NotFoundError extends Error {
  constructor(msg) {
    super(msg);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
  }
}

export class UnauthorizedError extends Error {
  constructor(msg) {
    super(msg);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError);
    }
  }
}

export class ForbiddedError extends Error {
  constructor(msg) {
    super(msg);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddedError);
    }
  }
}

/**
 * Error middleware function
 * @param {Express.Error} err
 * @param {Express.Response} res
 */

export const errorMiddlewareFunc = (err, req, res, next) => {
  let status = 500;

  if (err instanceof BadRequestError) status = 400;
  if (err instanceof UnauthorizedError) status = 401;
  if (err instanceof ForbiddedError) status = 403;
  if (err instanceof NotFoundError) status = 404;

  res.status(status).json({
    error: err.message,
  });
};
