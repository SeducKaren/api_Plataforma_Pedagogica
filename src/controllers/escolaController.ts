import { Request, Response } from "express";
import EscolaModel from "../models/escolaModel";

class EscolaController {
  static async findByCodigoInep(req: Request, res: Response): Promise<void> {
    try {
      const { codigoInep } = req.params;
      const escola = await EscolaModel.findByCodigoInep(codigoInep);
      if (escola) {
        res.status(200).json(escola);
      } else {
        res.status(404).json({ message: "Escola não encontrada." });
      }
    } catch (error) {
      console.error("Erro ao buscar escola por código INEP:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const escolas = await EscolaModel.findAll();
      res.status(200).json(escolas);
    } catch (error) {
      console.error("Erro ao buscar todas as escolas:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  static async createEscola(req: Request, res: Response): Promise<void> {
    const escolaData = req.body;

    try {
      const newEscola = new EscolaModel(escolaData);
      const savedEscola = await newEscola.save();
      res.status(201).json(savedEscola);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        if (error.message.includes("validation")) {
          res.status(400).json({ message: "Erro de validação: " + error.message });
        } else if (error.message.includes("duplicate key value")) {
          res.status(409).json({ message: "Conflito de dados: Já existe uma escola com esses dados" });
        } else {
          res.status(500).json({ message: "Erro ao criar escola: " + error.message });
        }
      } else {
        res.status(500).json({ message: "Erro desconhecido ao criar escola" });
      }
    }
  }

  static async updateByCodigoInep(req: Request, res: Response): Promise<void> {
    try {
      const { codigoInep } = req.params;
      const dadosAtualizados = req.body;
      const escola = await EscolaModel.findByCodigoInep(codigoInep);
      if (escola) {
        Object.assign(escola, dadosAtualizados);
        await escola.update();
        res.status(200).json(escola);
      } else {
        res.status(404).json({ message: "Escola não encontrada." });
      }
    } catch (error) {
      console.error("Erro ao atualizar escola por código INEP:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  static async deleteByCodigoInep(req: Request, res: Response): Promise<void> {
    try {
      const { codigoInep } = req.params;
      await EscolaModel.deleteByCodigoInep(codigoInep);
      res.status(204).end();
    } catch (error) {
      console.error("Erro ao excluir escola por código INEP:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  static async findByNome(req: Request, res: Response): Promise<void> {
    try {
      const { nomeEscola } = req.params;
      const escola = await EscolaModel.findByNome(nomeEscola);
      if (escola) {
        res.status(200).json(escola);
      } else {
        res.status(404).json({ message: "Escola não encontrada." });
      }
    } catch (error) {
      console.error("Erro ao buscar escola por nome:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}

export default EscolaController;
