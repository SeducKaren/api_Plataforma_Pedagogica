import express, { Request, Response } from "express";
import ResultadoProvasController from "../controllers/resultadoProvasController";

const router = express.Router();

// Rota para buscar uma prova por ID (GET)
router.get("/:id", async (req: Request, res: Response) => {
  try {
    await ResultadoProvasController.findById(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all resultados de provas
router.get("/", async (req: Request, res: Response) => {
  try {
    await ResultadoProvasController.findAll(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para buscar provas por escola (GET)
router.get("/escola/:nomeEscola?", async (req: Request, res: Response) => {
  try {
    await ResultadoProvasController.findByEscola(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create new resultado de prova
router.post("/", async (req: Request, res: Response) => {
  try {
    await ResultadoProvasController.save(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para buscar provas por matrícula (GET)
router.get("/matricula/:matricula", async (req: Request, res: Response) => {
  try {
    await ResultadoProvasController.findByMatricula(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get resultado de prova by aluno name
router.get("/aluno/:nome_aluno", async (req: Request, res: Response) => {
  try {
    await ResultadoProvasController.findByAluno(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para buscar provas por nome de aluno (GET)
router.get("/nome/:nome", async (req: Request, res: Response) => {
  try {
    await ResultadoProvasController.findByNome(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
