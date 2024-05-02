import express, { Request, Response } from "express";
import ResultadoProvasController from "../controllers/resultadoProvasController";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await ResultadoProvasController.findById(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    await ResultadoProvasController.findAll(req, res);
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
    await ResultadoProvasController.findByEscola(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    await ResultadoProvasController.save(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/matricula/:matricula", async (req: Request, res: Response) => {
  const { matricula } = req.params;

  try {
    await ResultadoProvasController.findByMatricula(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/aluno/:nome_aluno", async (req: Request, res: Response) => {
  try {
    await ResultadoProvasController.findByAluno(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/nome/:nome_resultado", async (req: Request, res: Response) => {
  try {
    await ResultadoProvasController.findByNome(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
