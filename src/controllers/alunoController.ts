import { Request, Response } from "express";
import AlunoModel from "../models/alunoModel";

class AlunoController {
  static async getAlunoById(req: Request, res: Response): Promise<void> {
    const alunoId = req.params.id;

    try {
      const aluno = await AlunoModel.findById(alunoId);
      if (aluno) {
        res.status(200).json(aluno);
      } else {
        res.status(404).json({ message: "Aluno not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAlunoByCpf(req: Request, res: Response): Promise<void> {
    const cpf = req.params.cpf;

    try {
      const aluno = await AlunoModel.findByCpf(cpf);
      if (aluno) {
        res.status(200).json(aluno);
      } else {
        res.status(404).json({ message: "Aluno not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAlunosByNome(req: Request, res: Response): Promise<void> {
    const nome = req.params.nome;

    try {
      const alunos = await AlunoModel.findByNome(nome);
      if (alunos.length > 0) {
        res.status(200).json(alunos);
      } else {
        res.status(404).json({ message: "Nenhum aluno encontrado com este nome" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAlunosByEscola(req: Request, res: Response): Promise<void> {
    const nomeEscola = req.params.nomeEscola;

    try {
      const alunos = await AlunoModel.findByEscola(nomeEscola);
      if (alunos.length > 0) {
        res.status(200).json(alunos);
      } else {
        res.status(404).json({ message: "Nenhum aluno encontrado para esta escola" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAlunoByMatricula(req: Request, res: Response): Promise<void> {
    const matricula = req.params.matricula;

    try {
      const aluno = await AlunoModel.findByMatricula(matricula);
      if (aluno) {
        res.status(200).json(aluno);
      } else {
        res.status(404).json({ message: "Aluno not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAllAlunos(req: Request, res: Response): Promise<void> {
    try {
      const alunos = await AlunoModel.findAll();
      res.status(200).json(alunos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createAluno(req: Request, res: Response): Promise<void> {
    const alunoData = req.body;

    try {
      const newAluno = new AlunoModel(alunoData);
      const savedAluno = await newAluno.save();
      res.status(201).json(savedAluno);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        if (error.message.includes("validation")) {
          res.status(400).json({ message: "Erro de validação: " + error.message });
        } else if (error.message.includes("duplicate key value")) {
          res.status(409).json({ message: "Conflito de dados: Já existe um aluno com esses dados" });
        } else {
          res.status(500).json({ message: "Erro ao criar aluno: " + error.message });
        }
      } else {
        res.status(500).json({ message: "Erro desconhecido ao criar aluno" });
      }
    }
  }

  static async updateAluno(req: Request, res: Response): Promise<void> {
    const alunoId = req.params.id;
    const updatedAlunoData = req.body;

    try {
      const existingAluno = await AlunoModel.findById(alunoId);

      if (existingAluno) {
        const updatedAluno = new AlunoModel({
          ...existingAluno,
          ...updatedAlunoData,
        });

        await updatedAluno.update();

        res.status(200).json(updatedAluno);
      } else {
        res.status(404).json({ message: "Aluno not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteAluno(req: Request, res: Response): Promise<void> {
    const alunoId = req.params.id;

    try {
      await AlunoModel.excluirPorId(alunoId);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteAlunoByMatricula(req: Request, res: Response): Promise<void> {
    const matricula = req.params.matricula;

    try {
      await AlunoModel.excluirPorMatricula(matricula);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default AlunoController;
