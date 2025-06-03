import amqp from 'amqplib';
import dotenv from 'dotenv';
import { markNotificationAsProcessed } from '../services/notificationServices';

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL ?? 'amqp://localhost';

export async function startConsumer() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  const queue = 'notifications';

  await channel.assertQueue(queue, { durable: true });

  console.log(`Waiting for messages in ${queue}`);

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const content = msg.content.toString();
      console.log(`[x] Received: ${content}`);

      try {
        // Notification sending simulation
        console.log(`Sending notification: ${content}`);

        // update DB
        await markNotificationAsProcessed(JSON.parse(content));

        channel.ack(msg);
      } catch (error) {
        console.error(`Error processing message: ${error}`);
        // Optional: retry logic here
        channel.nack(msg, false, true);
      }
    }
  });
}