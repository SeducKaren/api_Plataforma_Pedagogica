import express, { Request, Response } from "express";
import ResultadoProvasController from "../controllers/resultadoProvasController";

const router = express.Router();

// Get all resultados de provas
router.get("/", async (req: Request, res: Response) => {
  await ResultadoProvasController.findAll(req, res);
});

// Create new resultado de prova
router.post("/", async (req: Request, res: Response) => {
  await ResultadoProvasController.save(req, res);
});

// Get resultado de prova by aluno name
router.get("/aluno/:nome_aluno", async (req: Request, res: Response) => {
  await ResultadoProvasController.findByAluno(req, res);
});

// Get resultado de prova by escola
router.get("/escola/:escola", async (req: Request, res: Response) => {
  await ResultadoProvasController.findByEscola(req, res);
});

// Get resultado de prova by matrícula
router.get("/matricula/:numero_matricula", async (req: Request, res: Response) => {
  await ResultadoProvasController.findByMatricula(req, res);
});

// Get resultado de prova by ID
router.get("/:id", async (req: Request, res: Response) => {
  await ResultadoProvasController.findById(req, res);
});

export default router;
