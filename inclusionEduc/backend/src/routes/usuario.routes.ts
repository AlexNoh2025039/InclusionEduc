import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller.js';
import { verificarTokenMiddleware } from '../middlewares/auth.middleware.js';
import { permitirRoles } from '../middlewares/roles.middleware.js';

const router = Router();

router.get('/', verificarTokenMiddleware, permitirRoles([1]), UsuarioController.obtenerTodos);
router.patch('/me', verificarTokenMiddleware, permitirRoles([1, 2, 3]), UsuarioController.actualizarPropio);
router.get('/:id', verificarTokenMiddleware, permitirRoles([1]), UsuarioController.obtenerPorId);
router.post('/', verificarTokenMiddleware, permitirRoles([1]), UsuarioController.crear);
router.patch('/:id', verificarTokenMiddleware, permitirRoles([1]), UsuarioController.actualizar);
router.delete('/:id', verificarTokenMiddleware, permitirRoles([1]), UsuarioController.eliminar);

export default router;