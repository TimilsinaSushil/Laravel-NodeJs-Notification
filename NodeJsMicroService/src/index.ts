import Fastify from 'fastify';
import dotenv from 'dotenv';
import notificationsRoutes from './api/notification';
import { startConsumer } from './consumers/notificationConsumer';

dotenv.config();

const fastify = Fastify({ logger: true });

// Registering API routes
fastify.register(notificationsRoutes);

// Starting consumer
startConsumer();

// Start Fastify server
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});
