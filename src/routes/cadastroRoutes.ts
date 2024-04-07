import express, { Request, Response } from "express";
import CadastroController from "../controllers/cadastroController";

const router = express.Router();

router.get("/escola/:nomeEscola?", async (req: Request, res: Response) => {
  let { nomeEscola } = req.params;

  if (!nomeEscola) {
    nomeEscola = "";
  }

  try {
    await CadastroController.getUsuariosByEscola(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/nome/:nome", async (req: Request, res: Response) => {
  const { nome } = req.params;

  try {
    await CadastroController.getUsuariosByNome(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/cpf/:cpf", async (req: Request, res: Response) => {
  const { cpf } = req.params;

  try {
    await CadastroController.getUsuariosByCPF(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    // Chamar o método correto do CadastroController
    await CadastroController.getAllUsuarios(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newUser = await CadastroController.cadastrarUsuario(req, res);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
