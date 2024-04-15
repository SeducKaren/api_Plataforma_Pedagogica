import { Request, Response } from 'express';
import EscolaModel from '../models/escolaModel';

class EscolaController {
  static async getAllEscolas(req: Request, res: Response): Promise<void> {
    try {
      const escolas = await EscolaModel.findAll();
      res.status(200).json(escolas);
    } catch (error) {
      console.error('Error getting all schools:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getEscolaById(req: Request, res: Response): Promise<void> {
    try {
      const escolaId = req.params.id;
      const escola = await EscolaModel.findById(escolaId, null, null);
      if (escola) {
        res.status(200).json(escola);
      } else {
        res.status(404).json({ message: 'School not found' });
      }
    } catch (error) {
      console.error('Error getting school by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getEscolaByNome(req: Request, res: Response): Promise<void> {
    try {
      const nome = req.params.nome;
      const escola = await EscolaModel.findByNome(nome);
      if (escola) {
        res.status(200).json(escola);
      } else {
        res.status(404).json({ message: 'School not found' });
      }
    } catch (error) {
      console.error('Error getting school by name:', error);
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
        res.status(404).json({ message: 'School not found' });
      }
    } catch (error) {
      console.error('Error getting school by INEP code:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async createEscola(req: Request, res: Response): Promise<void> {
    try {
      const newEscola = new EscolaModel(req.body);
      const savedEscola = await newEscola.save();
      res.status(201).json(savedEscola);
    } catch (error) {
      console.error('Error creating school:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateEscola(req: Request, res: Response): Promise<void> {
    try {
      const escolaId = req.params.id;
      const escolaData = req.body;
      const updatedEscola = await EscolaModel.update({ id: escolaId, ...escolaData });
      res.status(200).json(updatedEscola);
    } catch (error) {
      console.error('Error updating school:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteEscola(req: Request, res: Response): Promise<void> {
    try {
      const escolaId = req.params.id;
      await EscolaModel.excluirPorId(escolaId);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting school:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteEscolaByCodigoInep(req: Request, res: Response): Promise<void> {
    try {
      const codigoInep = req.params.codigoInep;
      await EscolaModel.excluirPorCodigoInep(codigoInep);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting school by INEP code:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default EscolaController;
