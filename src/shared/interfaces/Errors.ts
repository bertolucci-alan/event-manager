import { ValidationError } from 'class-validator';

export type Errors = {
  httpCode: number;
  errors?: ValidationError[];
} & Error;
