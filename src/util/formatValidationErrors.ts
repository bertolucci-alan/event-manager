import { IFormatValidationError } from '@src/shared/interfaces/IFormatValidationError';
import { ValidationError } from 'class-validator';
import { getReasonPhrase } from 'http-status-codes';

export const formatValidationError = (
  errors: ValidationError[],
  statusCode: number
): IFormatValidationError => {
  return {
    name: getReasonPhrase(statusCode),
    status: statusCode,
    message: 'Validation failed',
    errors: errors,
  };
};
