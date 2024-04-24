import express, { Request, Response } from "express";
import ResultadosProvasController from "../controllers/resultadosProvasController";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await ResultadosProvasController.getProvasById(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

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

router.get("/matricula/:matricula", async (req: Request, res: Response) => {
  const { matricula } = req.params;

  try {
    await ResultadosProvasController.getProvasByMatricula(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/nome/:nome", async (req: Request, res: Response) => {
  const { nome } = req.params;

  try {
    await ResultadosProvasController.getProvasByNome(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    await ResultadosProvasController.cadastrarProva(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
