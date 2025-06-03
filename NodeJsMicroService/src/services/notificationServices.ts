import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

export async function markNotificationAsProcessed(notification: any) {
  const conn = await pool.getConnection();
  await conn.query(
    `UPDATE notifications SET status = 'processed' WHERE id = ?`,
    [notification.id]
  );
  conn.release();
}

export async function getRecentNotifications() {
  const [rows] = await pool.query('SELECT * FROM notifications ORDER BY created_at DESC LIMIT 10');
  return rows;
}

export async function getNotificationSummary() {
  const [rows] = await pool.query('SELECT status, COUNT(*) as count FROM notifications GROUP BY status');
  return rows;
}
