import { Request, Response } from 'express';
import { Gabarito, createGabarito, getGabaritoById, updateGabaritoById, deleteGabaritoById } from '../models/gabaritoModel';

class GabaritoController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const gabaritoData = req.body as Gabarito;
      const newGabarito = await createGabarito(gabaritoData);
      res.status(201).json(newGabarito);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar gabarito' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const gabaritoId = parseInt(id, 10);
      const gabarito = await getGabaritoById(gabaritoId);
      if (gabarito) {
        res.status(200).json(gabarito);
      } else {
        res.status(404).json({ message: 'Gabarito não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar gabarito' });
    }
  }

  static async updateById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const gabaritoId = parseInt(id, 10);
      const gabaritoData = req.body as Partial<Gabarito>;
      const updatedGabarito = await updateGabaritoById(gabaritoId, gabaritoData);
      if (updatedGabarito) {
        res.status(200).json(updatedGabarito);
      } else {
        res.status(404).json({ message: 'Gabarito não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar gabarito' });
    }
  }

  static async deleteById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const gabaritoId = parseInt(id, 10);
      await deleteGabaritoById(gabaritoId);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao excluir gabarito' });
    }
  }

  // Adicionar outros métodos de controlador conforme necessário
}

export default GabaritoController;

