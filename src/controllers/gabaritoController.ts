import { Request, Response } from 'express';
import Gabarito from '../models/gabaritoModel';

// CREATE - Cria um novo registro
export const createGabarito = async (req: Request, res: Response): Promise<void> => {
  try {
    const gabarito = await Gabarito.create(req.body);
    res.status(201).json(gabarito);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ - Retorna todos os registros
export const getGabaritos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const gabaritos = await Gabarito.findAll();
    res.status(200).json(gabaritos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ - Retorna um único registro por ID
export const getGabaritoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const gabarito = await Gabarito.findByPk(req.params.id);
    if (!gabarito) {
      res.status(404).json({ message: 'Gabarito não encontrado' });
      return;
    }
    res.status(200).json(gabarito);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE - Atualiza um registro existente por ID
export const updateGabarito = async (req: Request, res: Response): Promise<void> => {
  try {
    const gabarito = await Gabarito.findByPk(req.params.id);
    if (!gabarito) {
      res.status(404).json({ message: 'Gabarito não encontrado' });
      return;
    }
    await gabarito.update(req.body);
    res.status(200).json(gabarito);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - Remove um registro existente por ID
export const deleteGabarito = async (req: Request, res: Response): Promise<void> => {
  try {
    const gabarito = await Gabarito.findByPk(req.params.id);
    if (!gabarito) {
      res.status(404).json({ message: 'Gabarito não encontrado' });
      return;
    }
    await gabarito.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createGabarito,
  getGabaritos,
  getGabaritoById,
  updateGabarito,
  deleteGabarito
};
