import { Request, Response } from 'express';
import ResultadosProvasModel from '../models/resultadoProvasModel';
import { ResultadosProvas } from '../models/resultadoProvasModel';

export class ResultadosProvasController {
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const resultadosProvas = await ResultadosProvasModel.getAll();
            res.json(resultadosProvas);
        } catch (error) {
            console.error('Erro ao obter resultados de provas:', error);
            res.status(500).json({ message: 'Erro ao obter resultados de provas. Por favor, tente novamente mais tarde.' });
        }
    }

    static async getByMatricula(req: Request, res: Response): Promise<void> {
        const { numero_matricula } = req.params;
        try {
            const resultadosProvas = await ResultadosProvasModel.getByMatricula(numero_matricula);
            if (resultadosProvas) {
                res.json(resultadosProvas);
            } else {
                res.status(404).json({ message: 'Aluno não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao obter resultados de provas:', error);
            res.status(500).json({ message: 'Erro ao obter resultados de provas. Por favor, tente novamente mais tarde.' });
        }
    }

    static async create(req: Request, res: Response): Promise<void> {
        try {
            const resultadosProvas: ResultadosProvas = req.body;
            await ResultadosProvasModel.create(resultadosProvas);
            res.status(201).json({ message: 'Dados inseridos com sucesso!' });
        } catch (error) {
            console.error('Erro ao inserir dados:', error);
            res.status(500).json({ message: 'Erro ao inserir dados. Por favor, tente novamente mais tarde.' });
        }
    }

    static async updateByMatricula(req: Request, res: Response): Promise<void> {
        const { numero_matricula } = req.params;
        try {
            const resultadosProvas: ResultadosProvas = req.body;
            await ResultadosProvasModel.updateByMatricula(numero_matricula, resultadosProvas);
            res.json({ message: 'Dados atualizados com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
            res.status(500).json({ message: 'Erro ao atualizar dados. Por favor, tente novamente mais tarde.' });
        }
    }

    static async deleteByMatricula(req: Request, res: Response): Promise<void> {
        const { numero_matricula } = req.params;
        try {
            await ResultadosProvasModel.deleteByMatricula(numero_matricula);
            res.json({ message: 'Dados deletados com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar dados:', error);
            res.status(500).json({ message: 'Erro ao deletar dados. Por favor, tente novamente mais tarde.' });
        }
    }
}

export default ResultadosProvasController;
