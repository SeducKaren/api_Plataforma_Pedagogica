import { Request, Response } from 'express';
import ResultadoProvasModel from '../models/resultadoProvasModel';
import  ResultadoProvas  from '../models/resultadoProvasModel';

export class ResultadoProvasController {
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const resultadoProvas = await ResultadoProvasModel.getAll();
            res.json(resultadoProvas);
        } catch (error) {
            console.error('Erro ao obter resultados de provas:', error);
            res.status(500).json({ message: 'Erro ao obter resultados de provas. Por favor, tente novamente mais tarde.' });
        }
    }

    static async getByMatricula(req: Request, res: Response): Promise<void> {
        const { numero_matricula } = req.params;
        try {
            const resultadoProvas = await ResultadoProvasModel.findByMatricula(numero_matricula); // Corrigido o nome do método
            if (resultadoProvas) {
                res.json(resultadoProvas);
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
            const resultadoProvas: ResultadoProvas = req.body;
            await ResultadoProvasModel.create(resultadoProvas);
            res.status(201).json({ message: 'Dados inseridos com sucesso!' });
        } catch (error) {
            console.error('Erro ao inserir dados:', error);
            res.status(500).json({ message: 'Erro ao inserir dados. Por favor, tente novamente mais tarde.' });
        }
    }

    static async updateByMatricula(req: Request, res: Response): Promise<void> {
        const { numero_matricula } = req.params;
        try {
            const resultadoProvas: ResultadoProvas = req.body;
            await ResultadoProvasModel.updateByMatricula(numero_matricula, resultadoProvas); // Chamar o método correto no model
            res.json({ message: 'Dados atualizados com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
            res.status(500).json({ message: 'Erro ao atualizar dados. Por favor, tente novamente mais tarde.' });
        }
    }
    
    static async deleteByMatricula(req: Request, res: Response): Promise<void> {
        const { numero_matricula } = req.params;
        try {
            await ResultadoProvasModel.deleteByMatricula(numero_matricula); // Chamar o método correto no model
            res.json({ message: 'Dados deletados com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar dados:', error);
            res.status(500).json({ message: 'Erro ao deletar dados. Por favor, tente novamente mais tarde.' });
        }
    }

export default ResultadosProvasController;