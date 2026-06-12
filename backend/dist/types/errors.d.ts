import type { ZodError } from 'zod';
export type FieldErrors = Record<string, string[]>;
export declare class ConfigValidationError extends Error {
    readonly fieldErrors: FieldErrors;
    constructor(fieldErrors: FieldErrors, message?: string);
    static fromZodError(error: ZodError): ConfigValidationError;
}
//# sourceMappingURL=errors.d.ts.map