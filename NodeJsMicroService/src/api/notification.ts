import { FastifyPluginAsync } from 'fastify';
import { getRecentNotifications, getNotificationSummary } from '../services/notificationServices';

const notificationsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/notifications/recent', async () => {
    return getRecentNotifications();
  });

  fastify.get('/notifications/summary', async () => {
    return getNotificationSummary();
  });
};

export default notificationsRoutes;
