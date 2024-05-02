import { Pool } from "pg";

class ResultadosProvasModel {
  static pool = new Pool({
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: process.env.DATABASE_URL,
  });

  id: number;
  data: string;
  nivel_prova: string;
  escola: string;
  regiao: string;
  quantidade_acertos: number;
  numero_matricula: string;
  nome_aluno: string;
  serie: string;
  turma: string;
  turno: string;
  deficiencia: string;
  respostas_lingua_portuguesa: string;
  respostas_matematica: string;
  dificuldade_lingua_portuguesa: string;
  dificuldade_matematica: string;

  constructor(data: any) {
    this.id = data.id || undefined;
    this.data = data.data || undefined;
    this.nivel_prova = data.nivel_prova || undefined;
    this.escola = data.escola || undefined;
    this.regiao = data.regiao || undefined;
    this.quantidade_acertos = data.quantidade_acertos || undefined;
    this.numero_matricula = data.numero_matricula || undefined;
    this.nome_aluno = data.nome_aluno || undefined;
    this.serie = data.serie || undefined;
    this.turma = data.turma || undefined;
    this.turno = data.turno || undefined;
    this.deficiencia = data.deficiencia || undefined;
    this.respostas_lingua_portuguesa = data.respostas_lingua_portuguesa || undefined;
    this.respostas_matematica = data.respostas_matematica || undefined;
    this.dificuldade_lingua_portuguesa = data.dificuldade_lingua_portuguesa || undefined;
    this.dificuldade_matematica = data.dificuldade_matematica || undefined;
  }

  static async findById(id: number): Promise<ResultadosProvasModel | null> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM resultados_provas
      WHERE id = $1
    `,
      [id]
    );
    return result.rows.length ? new ResultadosProvasModel(result.rows[0]) : null;
  }

  static async findBySchoolName(schoolName: string): Promise<ResultadosProvasModel[]> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM resultados_provas
      WHERE escola ILIKE $1
    `,
      [`%${schoolName}%`]
    );
    return result.rows.map((data: any) => new ResultadosProvasModel(data));
  }

  static async findByMatricula(matricula: string): Promise<ResultadosProvasModel[]> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM resultados_provas
      WHERE numero_matricula = $1
    `,
      [matricula]
    );
    return result.rows.map((data: any) => new ResultadosProvasModel(data));
  }

  static async findByNome(nome: string): Promise<ResultadosProvasModel[]> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM resultados_provas
      WHERE nome_aluno ILIKE $1
    `,
      [`%${nome}%`]
    );
    return result.rows.map((data: any) => new ResultadosProvasModel(data));
  }

  static async getAll(): Promise<ResultadosProvasModel[]> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM resultados_provas
    `
    );
    return result.rows.map((data: any) => new ResultadosProvasModel(data));
  }

  static async create(provasData: any): Promise<ResultadosProvasModel> {
    const { data, nivel_prova, escola, regiao, quantidade_acertos, numero_matricula, nome_aluno, serie, turma, turno, deficiencia, respostas_lingua_portuguesa, respostas_matematica, dificuldade_lingua_portuguesa, dificuldade_matematica } = provasData;
    const query = `
      INSERT INTO resultados_provas (data, nivel_prova, escola, regiao, quantidade_acertos, numero_matricula, nome_aluno, serie, turma, turno, deficiencia, respostas_lingua_portuguesa, respostas_matematica, dificuldade_lingua_portuguesa, dificuldade_matematica)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *
    `;
    const values = [data, nivel_prova, escola, regiao, quantidade_acertos, numero_matricula, nome_aluno, serie, turma, turno, deficiencia, respostas_lingua_portuguesa, respostas_matematica, dificuldade_lingua_portuguesa, dificuldade_matematica];

    try {
      const result = await this.pool.query(query, values);
      return new ResultadosProvasModel(result.rows[0]);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao cadastrar resultado de provas: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao cadastrar resultado de provas");
      }
    }
  }
}

export default ResultadosProvasModel;
