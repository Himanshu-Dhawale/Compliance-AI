import 'dotenv/config';
import express from 'express';
import { loadEnv } from './config/env.js';
import { ConfigValidationError } from './types/errors.js';
try {
    const env = loadEnv();
    const app = express();
    const server = app.listen(env.PORT);
    server.on('error', (error) => {
        console.error('Failed to start server', {
            code: error.code,
            message: error.message,
            port: env.PORT,
        });
        process.exit(1);
    });
    server.on('listening', () => {
        console.log(`Listening on port ${env.PORT}`);
    });
}
catch (error) {
    if (error instanceof ConfigValidationError) {
        console.error(error.message);
        for (const [field, messages] of Object.entries(error.fieldErrors)) {
            for (const msg of messages) {
                console.error(`  ${field}: ${msg}`);
            }
        }
        process.exit(1);
    }
    throw error;
}
//# sourceMappingURL=index.js.map