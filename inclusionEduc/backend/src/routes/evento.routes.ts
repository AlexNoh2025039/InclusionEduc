import { Router } from 'express';
import { EventoController } from '../controllers/evento.controller.js';
import { verificarTokenMiddleware } from '../middlewares/auth.middleware.js';
import { permitirRoles } from '../middlewares/roles.middleware.js';

const router = Router();

router.get('/', verificarTokenMiddleware, EventoController.obtenerTodos);
router.post('/', verificarTokenMiddleware, permitirRoles([1]), EventoController.crear);
router.patch('/:id', verificarTokenMiddleware, permitirRoles([1]), EventoController.actualizar);
router.delete('/:id', verificarTokenMiddleware, permitirRoles([1]), EventoController.eliminar);

export default router;