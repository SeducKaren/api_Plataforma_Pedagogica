import express from 'express';
import { GabaritoProvasController } from '../controllers/gabaritoProvasController';

const router = express.Router();

router.get('/', GabaritoProvasController.getAll);
router.get('/:nivel', GabaritoProvasController.getByNivel);
/* router.post('/', GabaritoProvasController.create);
router.put('/:nivel', GabaritoProvasController.updateByNivel);
router.delete('/:nivel', GabaritoProvasController.deleteByNivel); */

export default router;

