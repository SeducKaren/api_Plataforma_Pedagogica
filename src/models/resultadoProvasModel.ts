import { Pool } from "pg";

class ResultadoProvasModel {
  static pool = new Pool({
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: process.env.DATABASE_URL,
  });

  id: number;
  data: Date;
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
    this.id = data.id;
    this.data = new Date(data.data);
    this.nivel_prova = data.nivel_prova || "";
    this.escola = data.escola || "";
    this.regiao = data.regiao || "";
    this.quantidade_acertos = data.quantidade_acertos || 0;
    this.numero_matricula = data.numero_matricula || "";
    this.nome_aluno = data.nome_aluno || "";
    this.serie = data.serie || "";
    this.turma = data.turma || "";
    this.turno = data.turno || "";
    this.deficiencia = data.deficiencia || "";
    this.respostas_lingua_portuguesa = data.respostas_lingua_portuguesa || "";
    this.respostas_matematica = data.respostas_matematica || "";
    this.dificuldade_lingua_portuguesa = data.dificuldade_lingua_portuguesa || "";
    this.dificuldade_matematica = data.dificuldade_matematica || "";
  }

  static async findAll(): Promise<ResultadoProvasModel[]> {
    try {
      const result = await this.pool.query("SELECT * FROM resultados_provas");
      return result.rows.map((data: any) => new ResultadoProvasModel(data));
    } catch (error) {
      console.error("Erro ao buscar todos os resultados de provas:", error);
      throw error;
    }
  }

  async save(): Promise<ResultadoProvasModel> {
    try {
      const result = await ResultadoProvasModel.pool.query(
        `INSERT INTO resultados_provas (
          data,
          nivel_prova,
          escola,
          regiao,
          quantidade_acertos,
          numero_matricula,
          nome_aluno,
          serie,
          turma,
          turno,
          deficiencia,
          respostas_lingua_portuguesa,
          respostas_matematica,
          dificuldade_lingua_portuguesa,
          dificuldade_matematica
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING *`,
        [
          this.data,
          this.nivel_prova,
          this.escola,
          this.regiao,
          this.quantidade_acertos,
          this.numero_matricula,
          this.nome_aluno,
          this.serie,
          this.turma,
          this.turno,
          this.deficiencia,
          this.respostas_lingua_portuguesa,
          this.respostas_matematica,
          this.dificuldade_lingua_portuguesa,
          this.dificuldade_matematica,
        ]
      );
      return new ResultadoProvasModel(result.rows[0]);
    } catch (error) {
      console.error("Erro ao salvar novo resultado da prova:", error);
      throw error;
    }
  }

  static async findByAluno(nomeAluno: string): Promise<ResultadoProvasModel[]> {
    try {
      const nomeAlunoLowercase = nomeAluno.toLowerCase();
      const result = await this.pool.query("SELECT * FROM resultados_provas WHERE LOWER(nome_aluno) LIKE $1", [`%${nomeAlunoLowercase}%`]);
      return result.rows.map((data: any) => new ResultadoProvasModel(data));
    } catch (error) {
      console.error("Erro ao buscar resultados de provas por nome do aluno:", error);
      throw error;
    }
  }

  static async findByEscola(escola: string): Promise<ResultadoProvasModel[]> {
    try {
      const escolaLowercase = escola.toLowerCase();
      const result = await this.pool.query("SELECT * FROM resultados_provas WHERE LOWER(escola) LIKE $1", [`%${escolaLowercase}%`]);
      return result.rows.map((data: any) => new ResultadoProvasModel(data));
    } catch (error) {
      console.error("Erro ao buscar resultados de provas por escola:", error);
      throw error;
    }
  }

  static async findByMatricula(numeroMatricula: string): Promise<ResultadoProvasModel | undefined> {
    try {
      const result = await this.pool.query("SELECT * FROM resultados_provas WHERE numero_matricula = $1", [numeroMatricula]);
      return result.rows[0] ? new ResultadoProvasModel(result.rows[0]) : undefined;
    } catch (error) {
      console.error("Erro ao buscar resultado de prova por matrícula:", error);
      throw error;
    }
  }

  static async findById(id: string): Promise<ResultadoProvasModel | undefined> {
    try {
      const result = await this.pool.query("SELECT * FROM resultados_provas WHERE id = $1", [id]);
      return result.rows[0] ? new ResultadoProvasModel(result.rows[0]) : undefined;
    } catch (error) {
      console.error("Erro ao buscar resultado de prova por ID:", error);
      throw error;
    }
  }
}

export default ResultadoProvasModel;
