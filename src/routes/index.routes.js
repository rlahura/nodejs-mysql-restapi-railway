import { Router } from 'express';
//cuando importamos nuestros propios
//modulos si es necesario colocar ".js"
import { ping } from '../controllers/index.controller.js';

const router = Router();

router.get('/ping', ping);

export default router;
