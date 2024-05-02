import { Request, Response } from "express";
import ResultadoProvasModel from "../models/resultadoProvasModel";

class ResultadoProvasController {
  static async findByAluno(req: Request, res: Response): Promise<void> {
    try {
      const { nome_aluno } = req.params;
      const resultados = await ResultadoProvasModel.findByAluno(nome_aluno);
      res.status(200).json(resultados);
    } catch (error) {
      console.error("Erro ao buscar resultados de provas por nome do aluno:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  static async findByEscola(req: Request, res: Response): Promise<void> {
    try {
      const { escola } = req.params;
      const resultados = await ResultadoProvasModel.findByEscola(escola);
      res.status(200).json(resultados);
    } catch (error) {
      console.error("Erro ao buscar resultados de provas por escola:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  static async findByMatricula(req: Request, res: Response): Promise<void> {
    try {
      const { numero_matricula } = req.params;
      const resultado = await ResultadoProvasModel.findByMatricula(numero_matricula);
      if (resultado) {
        res.status(200).json(resultado);
      } else {
        res.status(404).json({ message: "Resultado não encontrado." });
      }
    } catch (error) {
      console.error("Erro ao buscar resultado de prova por matrícula:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  static async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const resultado = await ResultadoProvasModel.findById(id);
      if (resultado) {
        res.status(200).json(resultado);
      } else {
        res.status(404).json({ message: "Resultado não encontrado." });
      }
    } catch (error) {
      console.error("Erro ao buscar resultado de prova por ID:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const resultados = await ResultadoProvasModel.findAll();
      res.status(200).json(resultados);
    } catch (error) {
      console.error("Erro ao buscar todos os resultados de provas:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  static async save(req: Request, res: Response): Promise<void> {
    try {
      const novoResultado = new ResultadoProvasModel(req.body);
      const resultadoSalvo = await novoResultado.save();
      res.status(201).json(resultadoSalvo);
    } catch (error) {
      console.error("Erro interno do servidor ao salvar o resultado da prova:", error);
      res.status(500).json({ message: "Erro interno do servidor ao salvar o resultado da prova." });
    }
  }

  static async findByNome(req: Request, res: Response): Promise<void> {
    try {
      const { nome_resultado } = req.params;
      const resultados = await ResultadoProvasModel.findByNome(nome_resultado);
      res.status(200).json(resultados);
    } catch (error) {
      console.error("Erro ao buscar resultados de provas por nome do resultado:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}

export default ResultadoProvasController;
