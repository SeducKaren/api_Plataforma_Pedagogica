import { Pool } from "pg";

class AlunoModel {
  static pool: Pool;

  static initialize() {
    AlunoModel.pool = new Pool({
      ssl: {
        rejectUnauthorized: false,
      },
      connectionString: process.env.DATABASE_URL,
    });
  }

  id: string;
  nome_completo: string;
  cpf: string;
  data_de_nascimento: Date;
  genero: string;
  escola: string;
  turma: string;
  serie: string;
  curso: string;
  ano: number;
  turno: string;
  nome_da_mae: string;
  nome_do_pai: string;
  nome_do_responsavel: string;
  matricula: string;
  deficiencia?: string;
  descritores?: string;

  constructor(data: any) {
    this.id = data.id || undefined;
    this.nome_completo = data.nome_completo || undefined;
    this.cpf = data.cpf || undefined;
    this.data_de_nascimento = data.data_de_nascimento || undefined;
    this.genero = data.genero || undefined;
    this.escola = data.escola || undefined;
    this.turma = data.turma || undefined;
    this.serie = data.serie || undefined;
    this.curso = data.curso || undefined;
    this.ano = data.ano || undefined;
    this.turno = data.turno || undefined;
    this.nome_da_mae = data.nome_da_mae || undefined;
    this.nome_do_pai = data.nome_do_pai || undefined;
    this.nome_do_responsavel = data.nome_do_responsavel || undefined;
    this.matricula = data.matricula || undefined;
    this.deficiencia = data.deficiencia || undefined;
    this.descritores = data.descritores || undefined;
  }

  static async findById(id: string): Promise<AlunoModel | undefined> {
    try {
      const result = await this.pool.query("SELECT * FROM alunos WHERE id = $1", [id]);
      return result.rows[0] ? new AlunoModel(result.rows[0]) : undefined;
    } catch (error) {
      console.error("Erro ao buscar aluno por ID:", error);
      throw error;
    }
  }

  static async findByCpf(cpf: string): Promise<AlunoModel | undefined> {
    try {
      const result = await this.pool.query("SELECT * FROM alunos WHERE cpf = $1", [cpf]);
      return result.rows[0] ? new AlunoModel(result.rows[0]) : undefined;
    } catch (error) {
      console.error("Erro ao buscar aluno por CPF:", error);
      throw error;
    }
  }

  static async findByNome(nome: string): Promise<AlunoModel[]> {
    try {
      const result = await this.pool.query("SELECT * FROM alunos WHERE nome_completo ILIKE $1", [`%${nome}%`]);
      return result.rows.map((data: any) => new AlunoModel(data));
    } catch (error) {
      console.error("Erro ao buscar aluno por nome:", error);
      throw error;
    }
  }

  static async findByEscola(escola: string): Promise<AlunoModel[]> {
    try {
      const result = await this.pool.query("SELECT * FROM alunos WHERE escola ILIKE $1", [`%${escola}%`]);
      return result.rows.map((data: any) => new AlunoModel(data));
    } catch (error) {
      console.error("Erro ao buscar aluno por escola:", error);
      throw error;
    }
  }

  static async findByMatricula(matricula: string): Promise<AlunoModel | undefined> {
    try {
      const result = await this.pool.query("SELECT * FROM alunos WHERE matricula = $1", [matricula]);
      return result.rows[0] ? new AlunoModel(result.rows[0]) : undefined;
    } catch (error) {
      console.error("Erro ao buscar aluno por matrícula:", error);
      throw error;
    }
  }

  static async findAll(): Promise<AlunoModel[]> {
    try {
      const result = await this.pool.query("SELECT * FROM alunos");
      return result.rows.map((data: any) => new AlunoModel(data));
    } catch (error) {
      console.error("Erro ao buscar todos os alunos:", error);
      throw error;
    }
  }

  async save(): Promise<AlunoModel> {
    try {
      const result = await AlunoModel.pool.query(
        `
        INSERT INTO alunos (
          nome_completo,
          cpf,
          data_de_nascimento,
          genero,
          escola,
          turma,
          serie,
          curso,
          ano,
          turno,
          nome_da_mae,
          nome_do_pai,
          nome_do_responsavel,
          matricula,
          deficiencia,
          descritores
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING *
      `,
        [
          this.nome_completo,
          this.cpf,
          this.data_de_nascimento,
          this.genero,
          this.escola,
          this.turma,
          this.serie,
          this.curso,
          this.ano,
          this.turno,
          this.nome_da_mae,
          this.nome_do_pai,
          this.nome_do_responsavel,
          this.matricula,
          this.deficiencia,
          this.descritores,
        ]
      );
      return new AlunoModel(result.rows[0]);
    } catch (error) {
      console.error("Erro ao salvar novo aluno:", error);
      throw error;
    }
  }

  async update(): Promise<void> {
    try {
      await AlunoModel.pool.query(
        `
        UPDATE alunos
        SET
          nome_completo = $1,
          cpf = $2,
          data_de_nascimento = $3,
          genero = $4,
          escola = $5,
          turma = $6,
          serie = $7,
          curso = $8,
          ano = $9,
          turno = $10,
          nome_da_mae = $11,
          nome_do_pai = $12,
          nome_do_responsavel = $13,
          matricula = $14,
          deficiencia = $15,
          descritores = $16
        WHERE id = $17
      `,
        [
          this.nome_completo,
          this.cpf,
          this.data_de_nascimento,
          this.genero,
          this.escola,
          this.turma,
          this.serie,
          this.curso,
          this.ano,
          this.turno,
          this.nome_da_mae,
          this.nome_do_pai,
          this.nome_do_responsavel,
          this.matricula,
          this.deficiencia,
          this.descritores,
          this.id,
        ]
      );
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      throw error;
    }
  }

  static async excluirPorId(id: string): Promise<void> {
    try {
      await this.pool.query("DELETE FROM alunos WHERE id = $1", [id]);
    } catch (error) {
      console.error("Erro ao excluir aluno por ID:", error);
      throw error;
    }
  }

  static async excluirPorMatricula(matricula: string): Promise<void> {
    try {
      await this.pool.query("DELETE FROM alunos WHERE matricula = $1", [matricula]);
    } catch (error) {
      console.error("Erro ao excluir aluno por matrícula:", error);
      throw error;
    }
  }
}

AlunoModel.initialize();

export default AlunoModel;
