const redis = require('redis');
const { promisify } = require('util');

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const client = redis.createClient(redisUrl);

client.on('connect', () => console.log('Redis connected'));
client.on('error', (err) => console.error('Redis error', err));

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const incrAsync = promisify(client.incr).bind(client);

module.exports = { client, getAsync, setAsync, incrAsync };
