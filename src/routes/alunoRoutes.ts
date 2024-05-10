import express, { Request, Response } from "express";
import AlunoController from "../controllers/alunoController";

const router = express.Router();

// Rota para buscar aluno por CPF
router.get("/cpf/:cpf", async (req: Request, res: Response) => {
  await AlunoController.getAlunoByCpf(req, res);
});

// Rota para buscar aluno por nome
router.get("/nome/:nome", async (req: Request, res: Response) => {
  await AlunoController.getAlunosByNome(req, res);
});

// Rota para buscar alunos por nome da escola
router.get("/escola/:nomeEscola", async (req: Request, res: Response) => {
  await AlunoController.getAlunosByEscola(req, res);
});

// Rota para buscar aluno por matrícula
router.get("/matricula/:matricula", async (req: Request, res: Response) => {
  await AlunoController.getAlunoByMatricula(req, res);
});

// Rota para buscar aluno por ID
router.get("/:id", async (req: Request, res: Response) => {
  await AlunoController.getAlunoById(req, res);
});

// Rota para buscar todos os alunos
router.get("/", async (req: Request, res: Response) => {
  await AlunoController.getAllAlunos(req, res);
});

// Rota para criar novo aluno
router.post("/", async (req: Request, res: Response) => {
  await AlunoController.createAluno(req, res);
});

// Rota para atualizar aluno por ID
router.put("/:id", async (req: Request, res: Response) => {
  await AlunoController.updateAluno(req, res);
});

// Rota para deletar aluno por ID
router.delete("/:id", async (req: Request, res: Response) => {
  await AlunoController.deleteAluno(req, res);
});

// Rota para deletar aluno por matrícula
router.delete("/matricula/:matricula", async (req: Request, res: Response) => {
  await AlunoController.deleteAlunoByMatricula(req, res);
});

export default router;