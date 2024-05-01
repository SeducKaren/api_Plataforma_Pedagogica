import express, { Request, Response } from "express";
import ResultadosProvasController from "../controllers/resultadosProvasController";

const router = express.Router();

// Rota para buscar uma prova por ID (GET)
router.get("/:id", async (req: Request, res: Response) => {
  try {
    await ResultadosProvasController.getProvasById(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para buscar provas por escola (GET)
router.get("/escola/:nomeEscola?", async (req: Request, res: Response) => {
  let { nomeEscola } = req.params;

  if (!nomeEscola) {
    nomeEscola = "";
  }

  try {
    await ResultadosProvasController.getProvasByEscola(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para buscar provas por matrícula (GET)
router.get("/matricula/:matricula", async (req: Request, res: Response) => {
  const { matricula } = req.params;

  try {
    await ResultadosProvasController.getProvasByMatricula(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para buscar provas por nome de aluno (GET)
router.get("/nome/:nome", async (req: Request, res: Response) => {
  const { nome } = req.params;

  try {
    await ResultadosProvasController.getProvasByNome(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para cadastrar uma nova prova (POST)
router.post("/", async (req: Request, res: Response) => {
  try {
    await ResultadosProvasController.cadastrarProva(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
