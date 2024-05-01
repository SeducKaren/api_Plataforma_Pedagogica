import { Request, Response } from "express";
import ResultadosProvasModel from "../models/resultadoProvasModel";

class ResultadosProvasController {
  static async getProvasById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    try {
      const prova = await ResultadosProvasModel.findById(id);
      if (prova) {
        res.status(200).json(prova);
      } else {
        res.status(404).json({ message: "Prova não encontrada" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProvasByEscola(req: Request, res: Response): Promise<void> {
    let nomeEscola = req.params.nomeEscola;

    if (!nomeEscola) {
      nomeEscola = "";
    }

    try {
      const provas = await ResultadosProvasModel.findBySchoolName(nomeEscola);
      res.status(200).json(provas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProvasByMatricula(req: Request, res: Response): Promise<void> {
    const matricula = req.params.matricula;

    try {
      const provas = await ResultadosProvasModel.findByMatricula(matricula);
      res.status(200).json(provas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProvasByNome(req: Request, res: Response): Promise<void> {
    const nome = req.params.nome;

    try {
      const provas = await ResultadosProvasModel.findByNome(nome);
      res.status(200).json(provas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async cadastrarProva(req: Request, res: Response): Promise<void> {
    const provaData = req.body;

    try {
      const novaProva = await ResultadosProvasModel.create(provaData);
      res.status(201).json(novaProva);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default ResultadosProvasController;
