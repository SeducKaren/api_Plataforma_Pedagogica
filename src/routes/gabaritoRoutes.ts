import express from 'express';
import * as gabaritoController from '../controllers/gabaritoController';

const router = express.Router();

// Rotas para CRUD
router.post('/', gabaritoController.createGabarito);
router.get('/', gabaritoController.getGabaritos);
router.get('/:id', gabaritoController.getGabaritoById);
router.put('/:id', gabaritoController.updateGabarito);
router.delete('/:id', gabaritoController.deleteGabarito);

// Rota para busca por matrícula do aluno
router.get('/aluno/:matricula', gabaritoController.getGabaritoByMatricula);

// Rota para busca por série
router.get('/serie/:serie', gabaritoController.getGabaritosBySerie);

// Rota para busca por turma
router.get('/turma/:turma', gabaritoController.getGabaritosByTurma);

export default router;
