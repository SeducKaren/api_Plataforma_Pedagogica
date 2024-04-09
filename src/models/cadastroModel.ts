import { Pool } from "pg";

class CadastroModel {
  static pool = new Pool({
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: process.env.DATABASE_URL,
  });

  nome: string;
  cpf: string;
  escola: string;
  contato: string;
  email: string;

  constructor(data: any) {
    this.nome = data.nome || undefined;
    this.cpf = data.cpf || undefined;
    this.escola = data.escola || undefined;
    this.contato = data.contato || undefined;
    this.email = data.email || undefined;
  }

  static async findBySchoolName(schoolName: string): Promise<CadastroModel[]> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM cadastro
      WHERE escola ILIKE $1
    `,
      [`%${schoolName}%`]
    );
    return result.rows.map((data: any) => new CadastroModel(data));
  }

  static async findByNome(nome: string): Promise<CadastroModel[]> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM cadastro
      WHERE nome ILIKE $1
    `,
      [`%${nome}%`]
    );
    return result.rows.map((data: any) => new CadastroModel(data));
  }

  static async findByCPF(cpf: string): Promise<CadastroModel[]> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM cadastro
      WHERE cpf = $1
    `,
      [cpf]
    );
    return result.rows.map((data: any) => new CadastroModel(data));
  }

  static async getAll(): Promise<CadastroModel[]> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM cadastro
    `
    );
    return result.rows.map((data: any) => new CadastroModel(data));
  }

  static async create(userData: any): Promise<CadastroModel> {
    const { nome, cpf, escola, contato, email } = userData;
    const query = `
      INSERT INTO cadastro (nome, cpf, escola, contato, email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [nome, cpf, escola, contato, email];

    try {
      const result = await this.pool.query(query, values);
      return new CadastroModel(result.rows[0]);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao criar usuário: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao criar usuário");
      }
    }
  }
}

export default CadastroModel;
