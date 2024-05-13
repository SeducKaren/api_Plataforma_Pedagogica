import express, { Request, Response } from "express";
import EscolaController from "../controllers/escolaController";

const router = express.Router();

// Get all escolas
router.get("/", async (req: Request, res: Response) => {
  await EscolaController.findAll(req, res);
});

// Get escola by Codigo INEP
router.get("/codigoInep/:codigoInep", async (req: Request, res: Response) => {
  await EscolaController.findByCodigoInep(req, res);
});

// Create new escola
router.post("/", async (req: Request, res: Response) => {
  await EscolaController.createEscola(req, res);
});

// Update escola by Codigo INEP
router.put("/:codigoInep", async (req: Request, res: Response) => {
  await EscolaController.updateByCodigoInep(req, res);
});

// Delete escola by Codigo INEP
router.delete("/:codigoInep", async (req: Request, res: Response) => {
  await EscolaController.deleteByCodigoInep(req, res);
});

// Get escola by name
router.get("/nome/:nomeEscola", async (req: Request, res: Response) => {
  await EscolaController.findByNome(req, res);
});

export default router;
