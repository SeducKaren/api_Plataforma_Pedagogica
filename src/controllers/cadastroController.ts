import { Request, Response } from "express";
import CadastroModel from "../models/cadastroModel";

class CadastroController {
  static async getUsuariosByEscola(req: Request, res: Response): Promise<void> {
    let nomeEscola = req.params.nomeEscola;

    if (!nomeEscola) {
      nomeEscola = "";
    }

    try {
      const usuarios = await CadastroModel.findBySchoolName(nomeEscola);
      res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUsuariosByNome(req: Request, res: Response): Promise<void> {
    const nome = req.params.nome;

    try {
      const usuarios = await CadastroModel.findByNome(nome);
      res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUsuariosByCPF(req: Request, res: Response): Promise<void> {
    const cpf = req.params.cpf;

    try {
      const usuarios = await CadastroModel.findByCPF(cpf);
      res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAllUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await CadastroModel.getAll();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async cadastrarUsuario(req: Request, res: Response): Promise<void> {
    const userData = req.body;

    try {
      const newUser = await CadastroModel.create(userData);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default CadastroController;
