import express from 'express';
import EscolaController from '../controllers/escolaController';

const router = express.Router();

router.get('/', async (req, res) => {
  await EscolaController.getAllEscolas(req, res);
});

router.get('/:id', async (req, res) => {
  await EscolaController.getEscolaById(req, res);
});

router.get('/nome/:nome', async (req, res) => {
  await EscolaController.getEscolaByNome(req, res);
});

router.get('/codigoInep/:codigoInep', async (req, res) => {
  await EscolaController.getEscolaByCodigoInep(req, res);
});

router.post('/', async (req, res) => {
  await EscolaController.createEscola(req, res);
});

router.put('/:id', async (req, res) => {
  await EscolaController.updateEscola(req, res);
});

router.delete('/:id', async (req, res) => {
  await EscolaController.deleteEscola(req, res);
});

router.delete('/codigoInep/:codigoInep', async (req, res) => {
  await EscolaController.deleteEscolaByCodigoInep(req, res);
});

export default router;
