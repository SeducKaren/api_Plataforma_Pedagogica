import express, { Request, Response } from "express";
import EscolaController from "../controllers/escolaController";

const router = express.Router();

// buscar todas as escolas
router.get("/", async (req: Request, res: Response) => {
  await EscolaController.getAllEscolas(req, res);
});

// Buscar escola por Codigo INEP
router.get("/codigoInep/:codigoInep", async (req: Request, res: Response) => {
  await EscolaController.getEscolaByCodigoInep(req, res);
});

// Criar uma nova escola
router.post("/", async (req: Request, res: Response) => {
  await EscolaController.createEscola(req, res);
});

// Atualizar escola por Codigo INEP
router.put("/:codigoInep", async (req: Request, res: Response) => {
  await EscolaController.updateEscola(req, res);
});

// Delete escola por Codigo INEP
router.delete("/:codigoInep", async (req: Request, res: Response) => {
  await EscolaController.deleteEscola(req, res);
});

// buscar escola por nome
router.get("/nome/:nomeEscola", async (req: Request, res: Response) => {
  await EscolaController.getEscolaByNome(req, res);
});

export default router;
