import express, { Request, Response } from "express";
import CadastroController from "../controllers/cadastroController";

const router = express.Router();

// Rota para buscar usuários por nome da escola
router.get("/escola/:nomeEscola?", async (req: Request, res: Response) => {
  let { nomeEscola } = req.params;

  // Se nenhum nome de escola for fornecido, deixe-o como uma string vazia para buscar todas as escolas
  if (!nomeEscola) {
    nomeEscola = "";
  }

  try {
    // Chamar o método correto do CadastroController
    await CadastroController.getUsuariosByEscola(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para buscar usuários por nome
router.get("/nome/:nome", async (req: Request, res: Response) => {
  const { nome } = req.params;

  try {
    // Chamar o método correto do CadastroController
    await CadastroController.getUsuariosByNome(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para buscar usuários por CPF
router.get("/cpf/:cpf", async (req: Request, res: Response) => {
  const { cpf } = req.params;

  try {
    // Chamar o método correto do CadastroController
    await CadastroController.getUsuariosByCPF(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rota para buscar todos os usuários
router.get("/", async (req: Request, res: Response) => {
  try {
    // Chamar o método correto do CadastroController
    await CadastroController.getAllUsuarios(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
