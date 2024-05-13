import express from 'express';
import escolaRouter from './escolaRoutes';
import turmaRouter from './turmaRoutes';
import alunoRouter from './alunoRoutes';
import gestorRouter from './gestorRoutes';
import cadastroRouter from './cadastroRoutes';
import resultadosProvasRouter from './resultadoProvasRoutes';
import gabaritoRouter from './gabaritoRoutes';

const indexRouter = express.Router();

indexRouter.use('/escola', escolaRouter);
indexRouter.use('/turma', turmaRouter);
indexRouter.use('/aluno', alunoRouter);
indexRouter.use('/gestor', gestorRouter);
indexRouter.use('/cadastro', cadastroRouter);
indexRouter.use('/resultados-provas', resultadosProvasRouter);
indexRouter.use('/gabarito', gabaritoRouter);

export default indexRouter;
