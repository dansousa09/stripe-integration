import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  REDIS_HOST: z
    .string({
      description: 'The host of the Redis server',
    })
    .default('localhost'),
  REDIS_PORT: z
    .string({
      description: 'The port of the Redis server',
    })
    .default('6379'),
  MONGODB_URL: z
    .string({
      description: 'The URL of the MongoDB server',
    })
    .url()
    .default('mongodb://localhost:27017'),
  STRIPE_SECRET_KEY: z.string({
    description: 'The secret key of the Stripe API',
    required_error: 'The secret key of the Stripe API is required',
  }),
});

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
  throw new Error(
    `❌ Invalid environment variables: ${JSON.stringify(
      envParsed.error.format(),
      null,
      4,
    )}`,
  );
}

export const env = envParsed.data;
