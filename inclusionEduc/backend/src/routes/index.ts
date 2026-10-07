import { Router } from 'express';
import authRoutes from './auth.routes.js';
import cursoRoutes from './curso.routes.js';
import escuelaRoutes from './escuela.routes.js';
import eventoRoutes from './evento.routes.js';
import reporteRoutes from './reporte.routes.js';
import usuarioRoutes from './usuario.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/cursos', cursoRoutes);
router.use('/escuelas', escuelaRoutes);
router.use('/eventos', eventoRoutes);
router.use('/reportes', reporteRoutes);
router.use('/usuarios', usuarioRoutes);

export default router;
