import { pool } from './db.js';

export const dailyLog = () => {
 setInterval(async () => {
  const time = new Date().toLocaleTimeString();

  const [rows] = await pool.query('INSERT INTO logs(time) VALUES (?)', [time]);

  console.log(rows.affectedRows);
  //lo quiero registrar cada 30 minutos
 }, 1800000);
};
