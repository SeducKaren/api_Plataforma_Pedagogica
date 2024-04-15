import express, { Request, Response } from "express";
import EscolaController from "../controllers/escolaController";

const router = express.Router();

// Get all escolas
router.get("/", async (req: Request, res: Response) => {
  await EscolaController.getAllEscolas(req, res);
});

// Get escola by Codigo INEP
router.get("/codigoInep/:codigoInep", async (req: Request, res: Response) => {
  await EscolaController.getEscolaByCodigoInep(req, res);
});

// Create new escola
router.post("/", async (req: Request, res: Response) => {
  await EscolaController.cadastrarEscola(req, res);
});

// Update escola by Codigo INEP
router.put("/:codigoInep", async (req: Request, res: Response) => {
  await EscolaController.atualizarEscola(req, res);
});

// Delete escola by Codigo INEP
router.delete("/:codigoInep", async (req: Request, res: Response) => {
  await EscolaController.deletarEscola(req, res);
});

// Get escola by name
router.get("/nome/:nomeEscola", async (req: Request, res: Response) => {
  await EscolaController.getEscolaByNome(req, res);
});

export default router;
