import { Request, Response } from 'express';
import  GabaritoProvasModel  from '../models/gabaritoProvasModel';
import GabaritoProvas from '../models/gabaritoProvasModel'

export class GabaritoProvasController {
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const gabaritoProvas = await GabaritoProvasModel.getAll();
            res.json(gabaritoProvas);
        } catch (error) {
            console.error('Erro ao obter os gabaritos das provas:', error);
            res.status(500).json({ message: 'Erro ao obter os gabaritos das provas. Por favor, tente novamente mais tarde.' });
        }
    }

    static async getByNivel(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const gabaritoProvas = await GabaritoProvasModel.getByNivel(id);
            if (gabaritoProvas) {
                res.json(gabaritoProvas);
            } else {
                res.status(404).json({ message: 'Gabarito do nível da prova não encontrado' });
            }
        } catch (error) {
            console.error('Erro o gabarito desse nível de provas:', error);
            res.status(500).json({ message: 'Erro ao obter o gabarito desse nível de provas. Por favor, tente novamente mais tarde.' });
        }
    }

    static async create(req: Request, res: Response): Promise<void> {
        try {
            const gabaritoProvas: GabaritoProvas = req.body;
            await GabaritoProvasModel.create(gabaritoProvas);
            res.status(201).json({ message: 'Dados inseridos com sucesso!' });
        } catch (error) {
            console.error('Erro ao inserir dados:', error);
            res.status(500).json({ message: 'Erro ao inserir dados. Por favor, tente novamente mais tarde.' });
        }
    }
/* 
    static async updateByNivel(req: Request, res: Response): Promise<void> {
        const { nivel_prova } = req.params;
        try {
            const gabaritoProvas: GabaritoProvas = req.body;
            await GabaritoProvasModel.updateByNivel(nivel_prova, gabaritoProvas);
            res.json({ message: 'Dados atualizados com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
            res.status(500).json({ message: 'Erro ao atualizar dados. Por favor, tente novamente mais tarde.' });
        }
    }

    static async deleteByNivel(req: Request, res: Response): Promise<void> {
        const { nivel_prova } = req.params;
        try {
            await GabaritoProvasModel.deleteByNivel(nivel_prova);
            res.json({ message: 'Dados deletados com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar dados:', error);
            res.status(500).json({ message: 'Erro ao deletar dados. Por favor, tente novamente mais tarde.' });
        }
    } */
}
