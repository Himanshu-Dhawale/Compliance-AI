export class ConfigValidationError extends Error {
    fieldErrors;
    constructor(fieldErrors, message = 'Configuration validation failed') {
        super(message);
        this.name = 'ConfigValidationError';
        this.fieldErrors = fieldErrors;
        // Required when extending Error in TS/ESM
        Object.setPrototypeOf(this, ConfigValidationError.prototype);
    }
    static fromZodError(error) {
        const flattened = error.flatten().fieldErrors;
        // Zod returns string[] | undefined per field; normalize to string[]
        const fieldErrors = {};
        for (const [field, messages] of Object.entries(flattened)) {
            if (Array.isArray(messages)) {
                fieldErrors[field] = messages;
            }
        }
        return new ConfigValidationError(fieldErrors);
    }
}
//# sourceMappingURL=errors.js.map