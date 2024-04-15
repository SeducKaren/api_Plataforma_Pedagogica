import { Request, Response } from 'express';
import EscolaModel from '../models/escolaModel';

class EscolaController {
  static async getAllEscolas(req: Request, res: Response): Promise<void> {
    try {
      const escolas = await EscolaModel.findAll();
      res.status(200).json(escolas);
    } catch (error) {
      console.error('Error getting all escolas:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getEscolaByNome(req: Request, res: Response): Promise<void> {
    try {
      const nome = req.params.nome;
      const escolas = await EscolaModel.findByNomeGenerico(nome);
      res.status(200).json(escolas);
    } catch (error) {
      console.error('Error getting escola by nome:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getEscolaByCodigoInep(req: Request, res: Response): Promise<void> {
    try {
      const codigoInep = req.params.codigoInep;
      const escola = await EscolaModel.findByCodigoInep(codigoInep);
      if (escola) {
        res.status(200).json(escola);
      } else {
        res.status(404).json({ message: 'Escola not found' });
      }
    } catch (error) {
      console.error('Error getting escola by codigoInep:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async createEscola(req: Request, res: Response): Promise<void> {
    try {
      const novaEscola = new EscolaModel(req.body);
      const escolaSalva = await novaEscola.save();
      res.status(201).json(escolaSalva);
    } catch (error) {
      console.error('Error creating escola:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateEscola(req: Request, res: Response): Promise<void> {
    try {
      const escolaId = req.params.id;
      const dadosEscola = req.body;
      const escolaAtualizada = await EscolaModel.update({ id: escolaId, ...dadosEscola });
      res.status(200).json(escolaAtualizada);
    } catch (error) {
      console.error('Error updating escola:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteEscola(req: Request, res: Response): Promise<void> {
    try {
      const escolaId = req.params.id;
      await EscolaModel.excluirPorId(escolaId);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting escola:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteEscolaByCodigoInep(req: Request, res: Response): Promise<void> {
    try {
      const codigoInep = req.params.codigoInep;
      await EscolaModel.excluirPorCodigoInep(codigoInep);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting escola by codigoInep:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default EscolaController;
