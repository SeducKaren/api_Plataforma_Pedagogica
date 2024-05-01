import express, { Request, Response } from "express";
import ResultadosProvasController from "../controllers/resultadoProvasController";

const router = express.Router();

// Rota para buscar provas por nome da escola
router.get("/escola/:nomeEscola?", async (req: Request, res: Response) => {
  let { nomeEscola } = req.params;

  // Se nenhum nome de escola for fornecido, deixe-o como uma string vazia para buscar todas as escolas
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

// Rota para buscar provas por nome
router.get("/nome/:nome", async (req: Request, res: Response) => {
  const { nome } = req.params;

  try {
    await ResultadosProvasController.getProvasByNome(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para buscar provas por matrícula
router.get("/matricula/:matricula", async (req: Request, res: Response) => {
  const { matricula } = req.params;

  try {
    await ResultadosProvasController.getProvasByMatricula(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para buscar todas as provas
router.get("/", async (req: Request, res: Response) => {
  try {
    await ResultadosProvasController.getAllProvas(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
