import { Pool } from 'pg';

class GabaritoProvasModel {
    static pool: Pool;

    static initialize() {
        GabaritoProvasModel.pool = new Pool({
            ssl: {
                rejectUnauthorized: false,
            },
            connectionString: process.env.DATABASE_URL,
        });
    }

    static async getAll(): Promise<GabaritoProvas[]> {
        const result = await GabaritoProvasModel.pool.query('SELECT * FROM gabarito_2024');
        return result.rows;
    }

    static async getByNivel(nivel_prova: string): Promise<GabaritoProvas | null> {
        const result = await GabaritoProvasModel.pool.query('SELECT * FROM gabarito_2024 WHERE nivel_prova = $1', [nivel_prova]);
        return result.rows[0] || null;
    }

    static async create(gabaritoProvas: GabaritoProvas): Promise<void> {
        await GabaritoProvasModel.pool.query('INSERT INTO gabarito_2024 VALUES (DEFAULT, $1, $2, $3, $4, $5)',
            [
                gabaritoProvas.id, gabaritoProvas.data, gabaritoProvas.nivel_prova,
                gabaritoProvas.respostas_lingua_portuguesa, gabaritoProvas.respostas_matematica,
            ]);
    }
/*     static async updateByNivel(nivel_prova: string, gabaritoProvas: GabaritoProvas): Promise<void> {
        await GabaritoProvasModel.pool.query('UPDATE gabaritos_provas SET ',
            [
                
            ]);
    }

    static async deleteByNivel(nivel_prova: string): Promise<void> {
        await GabaritoProvasModel.pool.query('DELETE FROM gabarito_2024 WHERE nivel_prova = $1', [nivel_prova]);
    } */
}
GabaritoProvasModel.initialize();

export interface GabaritoProvas {
    id?: number;
    data: Date;
    nivel_prova: number;
    respostas_lingua_portuguesa: string[];
    respostas_matematica: string[];
}

export default GabaritoProvasModel;
