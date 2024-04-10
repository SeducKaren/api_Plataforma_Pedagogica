import { Request, Response } from 'express';
import Gabarito from '../models/gabaritoModel';

class GabaritoController {
  static async getGabaritoByNome(req: Request, res: Response): Promise<void> {
    try {
      const nome = req.params.nome;
      const gabarito = await Gabarito.findByNome(nome);
      if (gabarito) {
        res.status(200).json(gabarito);
      } else {
        res.status(404).json({ message: 'Gabarito not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getGabaritos(_req: Request, res: Response): Promise<void> {
    try {
      const gabaritos = await Gabarito.findAll();
      res.status(200).json(gabaritos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async createGabarito(req: Request, res: Response): Promise<void> {
    try {
      const gabarito = new Gabarito(req.body);
      const savedGabarito = await gabarito.save();
      res.status(201).json(savedGabarito);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateGabarito(req: Request, res: Response): Promise<void> {
    try {
      const nome = req.params.nome;
      let gabarito = await Gabarito.findByNome(nome);
      if (!gabarito) {
        res.status(404).json({ message: 'Gabarito not found' });
        return;
      }
      gabarito = new Gabarito({ ...gabarito, ...req.body });
      await gabarito.update();
      res.status(200).json(gabarito);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteGabarito(req: Request, res: Response): Promise<void> {
    try {
      const nome = req.params.nome;
      const gabarito = await Gabarito.findByNome(nome);
      if (!gabarito) {
        res.status(404).json({ message: 'Gabarito not found' });
        return;
      }
      await gabarito.delete();
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default GabaritoController;

