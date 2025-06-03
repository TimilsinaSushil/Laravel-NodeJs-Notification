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
            const parsed = JSON.parse(content);

            // 🔥 Read retries from message headers 
            let retries = parseInt(msg.properties?.headers?.['x-retries'] ?? '0', 10);

            try {
                console.log(`Message Received: ${content}`)
                await markNotificationAsProcessed(parsed);
                channel.ack(msg);

            } catch (error) {

                console.error(`Error processing message: ${error}`);

                if (retries >= 5) {
                    console.warn(`Dropping message after ${retries} retries: ${content}`);
                    channel.ack(msg);
                } else {
                    retries++;
                    console.log(`Retrying message (${retries}/5): ${content}`);

                    channel.sendToQueue(queue, Buffer.from(content), {
                        headers: { 'x-retries': retries }
                    });
                    channel.ack(msg);
                    console.log(`Requeued message for retry (${retries}/5)`);
                }
            }
        }
    });
}