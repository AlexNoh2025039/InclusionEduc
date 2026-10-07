import { Router } from 'express';
import { EscuelaController } from '../controllers/escuela.controller.js';
import { verificarTokenMiddleware } from '../middlewares/auth.middleware.js';
import { permitirRoles } from '../middlewares/roles.middleware.js';

const router = Router();

router.get('/', verificarTokenMiddleware, EscuelaController.obtenerTodas);
router.get('/:id', verificarTokenMiddleware, permitirRoles([1]), EscuelaController.obtenerPorId);
router.post('/', verificarTokenMiddleware, permitirRoles([1]), EscuelaController.crear);
router.patch('/:id', verificarTokenMiddleware, permitirRoles([1]), EscuelaController.actualizar);
router.delete('/:id', verificarTokenMiddleware, permitirRoles([1]), EscuelaController.eliminar);

export default router;