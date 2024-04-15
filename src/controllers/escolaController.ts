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

  static async save(req: Request, res: Response): Promise<void> {
    try {
      const novaEscola = new EscolaModel(req.body);
      const escolaSalva = await novaEscola.save();
      res.status(201).json(escolaSalva);
    } catch (error) {
      console.error("Erro interno do servidor ao criar a escola:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
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
