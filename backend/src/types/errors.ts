import type { ZodError } from 'zod';

export type FieldErrors = Record<string, string[]>;

export class ConfigValidationError extends Error {
  readonly fieldErrors: FieldErrors;

  constructor(fieldErrors: FieldErrors, message = 'Configuration validation failed') {
    super(message);
    this.name = 'ConfigValidationError';
    this.fieldErrors = fieldErrors;

    // Required when extending Error in TS/ESM
    Object.setPrototypeOf(this, ConfigValidationError.prototype);
  }

  static fromZodError(error: ZodError): ConfigValidationError {
    const flattened = error.flatten().fieldErrors;

    // Zod returns string[] | undefined per field; normalize to string[]
    const fieldErrors: FieldErrors = {};
    for (const [field, messages] of Object.entries(flattened)) {
      if (Array.isArray(messages)) {
        fieldErrors[field] = messages;
      }
    }

    return new ConfigValidationError(fieldErrors);
  }
}