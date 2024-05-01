import { Request, Response } from "express";
import ResultadosProvasModel from "../models/resultadoProvasModel";

class ResultadosProvasController {
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

  static async getAllProvas(req: Request, res: Response): Promise<void> {
    try {
      const provas = await ResultadosProvasModel.getAll();
      res.status(200).json(provas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default ResultadosProvasController;
