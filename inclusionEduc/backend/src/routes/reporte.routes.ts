import { Router } from 'express';
import { ReporteController } from '../controllers/reporte.controller.js';
import { verificarTokenMiddleware } from '../middlewares/auth.middleware.js';
import { permitirRoles } from '../middlewares/roles.middleware.js';

const router = Router();

router.get('/', verificarTokenMiddleware, ReporteController.obtenerTodos);
router.post('/', verificarTokenMiddleware, permitirRoles([1, 2]), ReporteController.crear);
router.patch('/:id', verificarTokenMiddleware, permitirRoles([1, 2]), ReporteController.actualizar);
router.patch('/:id/estado', verificarTokenMiddleware, permitirRoles([1, 2]), ReporteController.actualizarEstado);
router.delete('/:id', verificarTokenMiddleware, permitirRoles([1, 2]), ReporteController.eliminar);

export default router;