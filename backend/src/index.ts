import 'dotenv/config';
import express from 'express';
import { loadEnv } from './config/env.js';

try {
  const env = loadEnv();

  const app = express();
  app.listen(env.PORT, () => {
    console.log(`Listening on port ${env.PORT}`);
  });
} catch (error) {
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