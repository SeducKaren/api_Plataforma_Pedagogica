import { Request, Response } from "express";
import EscolaModel from "../models/escolaModel";

class EscolaController {
  static async getAllEscolas(req: Request, res: Response): Promise<void> {
    try {
      const escolas = await EscolaModel.findAll();
      res.status(200).json(escolas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getEscolaByCodigoInep(req: Request, res: Response): Promise<void> {
    const codigoInep = req.params.codigoInep;

    try {
      const escolas = await EscolaModel.findByCodigoInep(codigoInep);
      res.status(200).json(escolas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getEscolaByNome(req: Request, res: Response): Promise<void> {
    const nome = req.params.nome;

    try {
      const escolas = await EscolaModel.findByNome(nome);
      res.status(200).json(escolas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async cadastrarEscola(req: Request, res: Response): Promise<void> {
    const escolaData = req.body;

    try {
      const novaEscola = await new EscolaModel(escolaData).save();
      res.status(201).json(novaEscola);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async atualizarEscola(req: Request, res: Response): Promise<void> {
    const codigoInep = req.params.codigoInep;
    const newData = req.body;

    try {
      const escolas = await EscolaModel.updateByCodigoInep(codigoInep, newData);
      res.status(200).json(escolas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deletarEscola(req: Request, res: Response): Promise<void> {
    const codigoInep = req.params.codigoInep;

    try {
      await EscolaModel.deleteByCodigoInep(codigoInep);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default EscolaController;
