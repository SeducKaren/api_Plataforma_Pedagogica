import { Pool } from 'pg';

// Configuração do pool de conexão com o PostgreSQL
const pool = new Pool({
    user: 'seu_usuario',
    host: 'localhost',
    database: 'seu_banco_de_dados',
    password: 'sua_senha',
    port: 5432,
});

export interface ResultadosProvas {
    id?: number;
    data: Date;
    nivel_prova: number;
    escola: string;
    regiao: string;
    quantidade_acertos: number;
    numero_matricula: string;
    nome_aluno: string;
    serie: string;
    turma: string;
    turno: string;
    deficiencia: string;
    respostas_lingua_portuguesa: string[];
    respostas_matematica: string[];
    dificuldade_lingua_portuguesa: string[];
    dificuldade_matematica: string[];
}

export class ResultadosProvasModel {
    static async getAll(): Promise<ResultadosProvas[]> {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM resultados_provas');
        client.release();
        return result.rows;
    }

    static async getByMatricula(numeroMatricula: string): Promise<ResultadosProvas | null> {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM resultados_provas WHERE numero_matricula = $1', [numeroMatricula]);
        client.release();
        return result.rows[0] || null;
    }

    static async create(resultadosProvas: ResultadosProvas): Promise<void> {
        const client = await pool.connect();
        await client.query('INSERT INTO resultados_provas VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)',
            [
                resultadosProvas.data, resultadosProvas.nivel_prova, resultadosProvas.escola, resultadosProvas.regiao,
                resultadosProvas.quantidade_acertos, resultadosProvas.numero_matricula, resultadosProvas.nome_aluno,
                resultadosProvas.serie, resultadosProvas.turma, resultadosProvas.turno, resultadosProvas.deficiencia,
                resultadosProvas.respostas_lingua_portuguesa, resultadosProvas.respostas_matematica,
                resultadosProvas.dificuldade_lingua_portuguesa, resultadosProvas.dificuldade_matematica
            ]);
        client.release();
    }

    static async updateByMatricula(numeroMatricula: string, resultadosProvas: ResultadosProvas): Promise<void> {
        const client = await pool.connect();
        await client.query('UPDATE resultados_provas SET data = $1, nivel_prova = $2, escola = $3, regiao = $4, quantidade_acertos = $5, nome_aluno = $6, serie = $7, turma = $8, turno = $9, deficiencia = $10, respostas_lingua_portuguesa = $11, respostas_matematica = $12, dificuldade_lingua_portuguesa = $13, dificuldade_matematica = $14 WHERE numero_matricula = $15',
            [
                resultadosProvas.data, resultadosProvas.nivel_prova, resultadosProvas.escola, resultadosProvas.regiao,
                resultadosProvas.quantidade_acertos, resultadosProvas.nome_aluno,
                resultadosProvas.serie, resultadosProvas.turma, resultadosProvas.turno, resultadosProvas.deficiencia,
                resultadosProvas.respostas_lingua_portuguesa, resultadosProvas.respostas_matematica,
                resultadosProvas.dificuldade_lingua_portuguesa, resultadosProvas.dificuldade_matematica,
                numeroMatricula
            ]);
        client.release();
    }

    static async deleteByMatricula(numeroMatricula: string): Promise<void> {
        const client = await pool.connect();
        await client.query('DELETE FROM resultados_provas WHERE numero_matricula = $1', [numeroMatricula]);
        client.release();
    }
}
