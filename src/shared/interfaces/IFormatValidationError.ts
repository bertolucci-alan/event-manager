import { ValidationError } from 'class-validator';

export interface IFormatValidationError {
  name: string;
  status: number;
  message: string;
  errors: ValidationError[];
}
