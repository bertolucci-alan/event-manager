import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase } from 'http-status-codes';
import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from 'routing-controllers';
import { AppError } from '../errors/app-error';
import { IFormatValidationError } from '../interfaces/IFormatValidationError';
import { formatValidationError } from '@src/util/formatValidationErrors';
import { Errors } from '../interfaces/Errors';

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(err: Errors, _: Request, res: Response, __: NextFunction): Response {
    if (
      err?.errors?.every((error: unknown) => error instanceof ValidationError)
    ) {
      const parsedError = err?.errors?.map((error: ValidationError) => {
        return this.parseValidationError(error);
      });
      const validationError: IFormatValidationError = formatValidationError(
        parsedError,
        err.httpCode
      );

      return res.status(err.httpCode).json(validationError);
    }
    if (err instanceof AppError) {
      const parsedAppError = this.parseAppError(err);
      return res.status(err.statusCode).json(parsedAppError);
    }
    const internalError = this.internalServerError(err);
    return res.status(500).json(internalError);
  }

  public parseValidationError(error: ValidationError) {
    return {
      property: error.property,
      receivedValue: error?.value,
      validationOptions: Object.values(error?.constraints || {}),
    };
  }

  public parseAppError(error: AppError) {
    return {
      name: getReasonPhrase(error.statusCode),
      status: error.statusCode,
      message: error.message,
    };
  }

  public internalServerError(error: Error) {
    return {
      name: getReasonPhrase(500),
      status: 500,
      message: error.message,
    };
  }
}
