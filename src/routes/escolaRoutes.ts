import express, { Request, Response } from "express";
import EscolaController from "../controllers/escolaController";

const router = express.Router();

// Rota para buscar todas as escolas
router.get("/", async (req: Request, res: Response) => {
  try {
    await EscolaController.getAllEscolas(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para buscar uma escola pelo seu código INEP
router.get("/:codigoInep", async (req: Request, res: Response) => {
  try {
    await EscolaController.getEscolaByCodigoInep(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para buscar uma escola pelo seu nome
router.get("/nome/:nome", async (req: Request, res: Response) => {
  try {
    await EscolaController.getEscolaByNome(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para cadastrar uma nova escola
router.post("/", async (req: Request, res: Response) => {
  try {
    await EscolaController.cadastrarEscola(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para atualizar uma escola pelo seu código INEP
router.put("/:codigoInep", async (req: Request, res: Response) => {
  try {
    await EscolaController.atualizarEscola(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para deletar uma escola pelo seu código INEP
router.delete("/:codigoInep", async (req: Request, res: Response) => {
  try {
    await EscolaController.deletarEscola(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
