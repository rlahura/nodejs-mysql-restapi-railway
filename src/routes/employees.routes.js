import { Router } from 'express';
import {
 getEmployees,
 getEmployee,
 createEmployees,
 updateEmployee,
 deleteEmployee,
 getLogin,
} from '../controllers/employees.controllers.js';

const router = Router();

router.get('/employees', getEmployees);
//cuando me pasen esta ruta tambien deben pasarme
//el /:id y asi poder ejecutar la funcion
router.get('/employees/:id', getEmployee);

router.get('/login', getLogin);

router.post('/employees', createEmployees);

router.patch('/employees/:id', updateEmployee);

router.delete('/employees/:id', deleteEmployee);

export default router;
