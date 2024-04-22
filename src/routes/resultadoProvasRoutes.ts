import express from 'express';
import {ResultadosProvasController} from '../controllers/resultadoProvasController';

const router = express.Router();

router.get('/', ResultadosProvasController.getAll);
router.get('/:numero_matricula', ResultadosProvasController.getByMatricula);
router.post('/', ResultadosProvasController.create);
router.put('/:numero_matricula', ResultadosProvasController.updateByMatricula);
router.delete('/:numero_matricula', ResultadosProvasController.deleteByMatricula);

export default router;

