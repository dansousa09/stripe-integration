import Redis from 'ioredis';
import { env } from '../../schemas/env.schema';

const redis = new Redis({
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
}).once('connect', () => {
  console.log(` 🚀 Redis connected successfully on port ${env.REDIS_PORT}`);
});

export default redis;
