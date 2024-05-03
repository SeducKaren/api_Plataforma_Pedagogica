import express from 'express';
import alunoRouter from './alunoRoutes';
import gestorRouter from './gestorRoutes';
import cadastroRouter from './cadastroRoutes'; 

const indexRouter = express.Router();

indexRouter.use('/aluno', alunoRouter);
indexRouter.use('/gestor', gestorRouter);
indexRouter.use('/cadastro', cadastroRouter); 

export default indexRouter;
