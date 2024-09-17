import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost',
  port: 6379,
}).once('connect', () => {
  console.log(' 🚀 Redis connected successfully on port 6379');
});

export default redis;
