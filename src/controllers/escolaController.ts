import { Request, Response } from "express";
import { EscolaModel } from "../models/escolaModel";

class EscolaController {
  static async getEscolaByCodigoInep(req: Request, res: Response): Promise<void> {
    const codigoInep = req.params.codigoInep;

    try {
      const escola = await EscolaModel.findByCodigoInep(codigoInep);
      if (escola) {
        res.status(200).json(escola);
      } else {
        res.status(404).json({ message: "Escola not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAllEscolas(req: Request, res: Response): Promise<void> {
    try {
      const escolas = await EscolaModel.findAll();
      res.status(200).json(escolas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
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
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateEscola(req: Request, res: Response): Promise<void> {
    const codigoInep = req.params.codigoInep;
    const updatedEscolaData = req.body;

    try {
      const existingEscola = await EscolaModel.findByCodigoInep(codigoInep);

      if (existingEscola) {
        const updatedEscola = new EscolaModel({
          ...existingEscola,
          ...updatedEscolaData,
        });

        await updatedEscola.update();

        res.status(200).json(updatedEscola);
      } else {
        res.status(404).json({ message: "Escola not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteEscola(req: Request, res: Response): Promise<void> {
    const codigoInep = req.params.codigoInep;

    try {
      await EscolaModel.deleteByCodigoInep(codigoInep);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getEscolaByNome(req: Request, res: Response): Promise<void> {
    const nomeEscola = req.params.nomeEscola;

    try {
      const escola = await EscolaModel.findByNome(nomeEscola);
      if (escola) {
        res.status(200).json(escola);
      } else {
        res.status(404).json({ message: "Escola not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default EscolaController;
