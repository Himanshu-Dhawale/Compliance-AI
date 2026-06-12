import { ConfigValidationError } from '../types/errors.js';
import { z } from 'zod';
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().int().positive().default(3000),
    // add vars from your .env.example / ticket
});
export function loadEnv() {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
        throw ConfigValidationError.fromZodError(result.error);
    }
    return result.data;
}
//# sourceMappingURL=env.js.map