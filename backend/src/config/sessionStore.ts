/* eslint-disable @typescript-eslint/no-var-requires */
import RedisStore from "connect-redis";
import logger from './logger';
import redisClient from './redisClient';

const store = new RedisStore({ client: redisClient });

store.on('error', (error: any) => {
  logger.info(error);
});

export default store;
