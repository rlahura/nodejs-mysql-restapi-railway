//cuando importo modulos de 3ers
//no es necesario en ".js"
import express from 'express';
import employeesRoutes from './routes/employees.routes.js';
import ping from './routes/index.routes.js';
import { dailyLog } from './dailyLog.js';

const app = express();
//**IMPORTANTE **/
//Para poder interpretar valores JSON entrantes
app.use(express.json());

//86400000 es un dia
dailyLog();

app.use(ping);
//'/api' es un prefijo para todas estas rutas
app.use('/api', employeesRoutes);

//middleware para mejorar endpoint no encontradas
//(404 not found)
app.use((req, res, next) => {
 res.status(404).json({
  message: 'Endpoint not found',
 });
});

//api login
app.use('/login', (req, res) => {
 res.send({
  token: 'test123',
 });
});

export default app;
