import express from 'express';
import GestorController from '../controllers/gestorController';

const router = express.Router();

router.get('/', async (req, res) => {
  await GestorController.getAllGestores(req, res);
});

router.get('/:id', async (req, res) => {
  await GestorController.getGestorById(req, res);
});

router.get('/cpf/:cpf', async (req, res) => {
  await GestorController.getGestorByCpf(req, res);
});

router.get('/nome/:nome', async (req, res) => {
  await GestorController.getGestorByNome(req, res);
});

router.get('/escola/:escola', async (req, res) => {
  await GestorController.getGestorByEscola(req, res);
});

router.get('/matricula/:matricula', async (req, res) => {
  await GestorController.getGestorByMatricula(req, res);
});

router.post('/', async (req, res) => {
  await GestorController.createGestor(req, res);
});

router.put('/:id', async (req, res) => {
  await GestorController.updateGestor(req, res);
});

router.delete('/:id', async (req, res) => {
  await GestorController.deleteGestor(req, res);
});

export default router;
