import express from 'express';
import { GabaritoProvasController } from '../controllers/gabaritoProvasController';

const gabaritoRouter = express.Router();

gabaritoRouter.get('/', GabaritoProvasController.getAll);
gabaritoRouter.get('/:nivel', GabaritoProvasController.getByNivel);
gabaritoRouter.post('/', GabaritoProvasController.create);
/* 
router.put('/:nivel', GabaritoProvasController.updateByNivel);
router.delete('/:nivel', GabaritoProvasController.deleteByNivel); */

export default gabaritoRouter;

