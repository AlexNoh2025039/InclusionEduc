import { Router } from 'express';
import { CursoController } from '../controllers/curso.controller.js';
import { verificarTokenMiddleware } from '../middlewares/auth.middleware.js';
import { permitirRolesDeCurso } from '../middlewares/roles.middleware.js';

const router = Router();

router.get('/', verificarTokenMiddleware, CursoController.obtenerTodos);
router.get('/mis-cursos', verificarTokenMiddleware, CursoController.obtenerMisCursos);
router.post('/', verificarTokenMiddleware, permitirRolesDeCurso, CursoController.crear);
router.patch('/:id', verificarTokenMiddleware, permitirRolesDeCurso, CursoController.actualizar);
router.delete('/:id', verificarTokenMiddleware, permitirRolesDeCurso, CursoController.eliminar);
router.post('/inscribir', verificarTokenMiddleware, CursoController.inscribir);
router.patch('/inscripciones/:id/progreso', verificarTokenMiddleware, CursoController.actualizarProgreso);

export default router;