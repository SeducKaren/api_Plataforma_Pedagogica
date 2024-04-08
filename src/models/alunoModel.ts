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
  }

  static async findById(id: string): Promise<AlunoModel | undefined> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM alunos
      WHERE id = $1
    `,
      [id]
    );
    return result.rows[0] ? new AlunoModel(result.rows[0]) : undefined;
  }

  static async findByCpf(cpf: string): Promise<AlunoModel | undefined> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM alunos
      WHERE cpf = $1
    `,
      [cpf]
    );
    return result.rows[0] ? new AlunoModel(result.rows[0]) : undefined;
  }

  static async findByNome(nome: string): Promise<AlunoModel[]> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM alunos
      WHERE nome_completo ILIKE $1
    `,
      [`%${nome}%`]
    );
    return result.rows.map((data: any) => new AlunoModel(data));
  }

  static async findByEscola(escola: string): Promise<AlunoModel[]> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM alunos
      WHERE escola ILIKE $1
    `,
      [`%${escola}%`]
    );
    return result.rows.map((data: any) => new AlunoModel(data));
  }

  static async findByMatricula(matricula: string): Promise<AlunoModel | undefined> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM alunos
      WHERE matricula = $1
    `,
      [matricula]
    );
    return result.rows[0] ? new AlunoModel(result.rows[0]) : undefined;
  }

  static async findAll(): Promise<AlunoModel[]> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM alunos
    `
    );
    return result.rows.map((data: any) => new AlunoModel(data));
  }

  async save(): Promise<AlunoModel> {
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
        matricula
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
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
      ]
    );
    return new AlunoModel(result.rows[0]);
  }

  async update(): Promise<void> {
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
        matricula = $14
      WHERE id = $15
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
        this.id,
      ]
    );
  }

  static async excluirPorId(id: string): Promise<void> {
    await this.pool.query("DELETE FROM alunos WHERE id = $1", [id]);
  }

  static async excluirPorMatricula(matricula: string): Promise<void> {
    await this.pool.query("DELETE FROM alunos WHERE matricula = $1", [matricula]);
  }
}

AlunoModel.initialize();

export default AlunoModel;
