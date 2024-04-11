import { Pool } from 'pg';

class GestorModel {
  static pool = new Pool({
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: process.env.DATABASE_URL,
  });

  id?: string;
  nome_completo?: string;
  cpf?: string;
  email?: string;
  funcao?: string;
  telefone?: string;
  celular?: string;
  escola?: string;
  matricula?: string;

  constructor(data: any = {}) {
    this.id = data.id || undefined;
    this.nome_completo = data.nome_completo || undefined;
    this.cpf = data.cpf || undefined;
    this.email = data.email || undefined;
    this.funcao = data.funcao || undefined;
    this.telefone = data.telefone || undefined;
    this.celular = data.celular || undefined;
    this.escola = data.escola || undefined;
    this.matricula = data.matricula || undefined;
  }

  async save(): Promise<GestorModel> {
    const { nome_completo, cpf, email, funcao, telefone, celular, escola, matricula } = this;
    const query = `
      INSERT INTO gestores (
        nome_completo,
        cpf,
        email,
        funcao,
        telefone,
        celular,
        escola,
        matricula
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [nome_completo, cpf, email, funcao, telefone, celular, escola, matricula];
    const result = await GestorModel.pool.query(query, values);
    return new GestorModel(result.rows[0]);
  }

  static async findById(id: string | null, cpf: string | null, nome: string | null): Promise<GestorModel | undefined> {
    let query = `
      SELECT *
      FROM gestores
      WHERE 1 = 1
    `;
    const values = [];

    if (id) {
      query += ` AND id = $${values.length + 1}`;
      values.push(id);
    }
    if (cpf) {
      query += ` AND cpf = $${values.length + 1}`;
      values.push(cpf);
    }
    if (nome) {
      query += ` AND nome_completo ILIKE $${values.length + 1}`;
      values.push(`%${nome}%`);
    }

    const result = await this.pool.query(query, values);
    return result.rows[0] ? new GestorModel(result.rows[0]) : undefined;
  }

  static async findAll(): Promise<GestorModel[]> {
    const result = await this.pool.query(
      `
        SELECT *
        FROM gestores
      `
    );
    return result.rows.map((data: any) => new GestorModel(data));
  }

  static async save(gestor: GestorModel): Promise<GestorModel> {
    await this.pool.query(
      `
        INSERT INTO gestores (
          id,
          nome_completo,
          cpf,
          email,
          funcao,
          telefone,
          celular,
          escola,
          matricula
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [
        gestor.id,
        gestor.nome_completo,
        gestor.cpf,
        gestor.email,
        gestor.funcao,
        gestor.telefone,
        gestor.celular,
        gestor.escola,
        gestor.matricula,
      ]
    );
    return gestor;
  }

  static async update(gestor: GestorModel): Promise<GestorModel> {
    await this.pool.query(
      `
        UPDATE gestores
        SET
          nome_completo = $1,
          cpf = $2,
          email = $3,
          funcao = $4,
          telefone = $5,
          celular = $6,
          escola = $7,
          matricula = $8
        WHERE id = $9
      `,
      [
        gestor.nome_completo,
        gestor.cpf,
        gestor.email,
        gestor.funcao,
        gestor.telefone,
        gestor.celular,
        gestor.escola,
        gestor.matricula,
        gestor.id,
      ]
    );
    return gestor;
  }

  static async excluirPorId(id: string): Promise<void> {
    await this.pool.query(
      `
        DELETE FROM gestores
        WHERE id = $1
      `,
      [id]
    );
  }

  static async excluirPorCpf(cpf: string): Promise<void> {
    await this.pool.query(
      `
        DELETE FROM gestores
        WHERE cpf = $1
      `,
      [cpf]
    );
  }

  static async excluirPorMatricula(matricula: string): Promise<void> {
    await this.pool.query(
      `
        DELETE FROM gestores
        WHERE matricula = $1
      `,
      [matricula]
    );
  }

  static async findByCpf(cpf: string): Promise<GestorModel | undefined> {
    const result = await this.pool.query(
      `
        SELECT *
        FROM gestores
        WHERE cpf = $1
      `,
      [cpf]
    );
    return result.rows[0] ? new GestorModel(result.rows[0]) : undefined;
  }

  static async findByNome(nome: string): Promise<GestorModel | undefined> {
    const result = await this.pool.query(
      `
        SELECT *
        FROM gestores
        WHERE nome_completo ILIKE $1
      `,
      [`%${nome}%`]
    );
    return result.rows[0] ? new GestorModel(result.rows[0]) : undefined;
  }

  static async findByMatricula(matricula: string): Promise<GestorModel | undefined> {
    const result = await this.pool.query(
      `
        SELECT *
        FROM gestores
        WHERE matricula = $1
      `,
      [matricula]
    );
    return result.rows[0] ? new GestorModel(result.rows[0]) : undefined;
  }

  static async findByEscola(escolaQuery: string): Promise<GestorModel[]> {
    const result = await this.pool.query(
      `
        SELECT *
        FROM gestores
        WHERE escola ILIKE $1
      `,
      [`%${escolaQuery}%`]
    );
    return result.rows.map((data: any) => new GestorModel(data));
  }
}

export default GestorModel;
