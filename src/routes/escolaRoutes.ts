// escolaRoutes.ts
import express from "express";
import { Request, Response } from "express";
import EscolaController from "../controllers/escolaController";

const router = express.Router();

// Rota para buscar todas as escolas
router.get("/", async (req: Request, res: Response) => {
  await EscolaController.getAllEscolas(req, res);
});

// Rota para buscar uma escola pelo seu código INEP
router.get("/codigoInep/:codigoInep", async (req: Request, res: Response) => {
  await EscolaController.getEscolaByCodigoInep(req, res);
});

// Rota para cadastrar uma nova escola
router.post("/api/escola", async (req: Request, res: Response) => {
  try {
    await EscolaController.createEscola(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para atualizar uma escola pelo seu código INEP
router.put("/:codigoInep", async (req: Request, res: Response) => {
  await EscolaController.updateEscola(req, res);
});

// Rota para deletar uma escola pelo seu código INEP
router.delete("/:codigoInep", async (req: Request, res: Response) => {
  await EscolaController.deleteEscola(req, res);
});

// Rota para buscar uma escola pelo seu nome
router.get("/nome/:nomeEscola", async (req: Request, res: Response) => {
  await EscolaController.getEscolaByNome(req, res);
});

export default router;
