import express from 'express';
import alunoRouter from './alunoRoutes';
import cadastroRouter from './cadastroRoutes'; 
import escolaRouter from './escolaRoutes';
import gabaritoProvasRouter from './gabaritoProvaRoutes';
import gestorRouter from './gestorRoutes';
import resultadosProvasRouter from './resultadoProvasRoutes';
import turmaRouter from './turmaRoutes';

const indexRouter = express.Router();

indexRouter.use('/aluno', alunoRouter);
indexRouter.use('/cadastro', cadastroRouter); 
indexRouter.use('/escola', escolaRouter);
indexRouter.use('gabaritoProvasRouter',gabaritoProvasRouter); 
indexRouter.use('/gestor', gestorRouter);
indexRouter.use('/resultadoProvas', resultadosProvasRouter)
indexRouter.use('/turma', turmaRouter);

export default indexRouter;