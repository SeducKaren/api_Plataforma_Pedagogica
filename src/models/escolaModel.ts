import { Pool } from "pg";

class EscolaModel {
  static pool = new Pool({
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: process.env.DATABASE_URL,
  });

  codigoInep: string;
  escola: string;
  sigla: string;
  zonaDeLocalidade: string;
  cnpj: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  municipio: string;
  estado: string;
  telefone1: string;
  telefone2: string;
  email: string;

  constructor(data: any) {
    this.codigoInep = data.codigoInep || undefined;
    this.escola = data.escola || undefined;
    this.sigla = data.sigla || undefined;
    this.zonaDeLocalidade = data.zonaDeLocalidade || undefined;
    this.cnpj = data.cnpj || undefined;
    this.cep = data.cep || undefined;
    this.endereco = data.endereco || undefined;
    this.numero = data.numero || undefined;
    this.complemento = data.complemento || undefined;
    this.municipio = data.municipio || undefined;
    this.estado = data.estado || undefined;
    this.telefone1 = data.telefone1 || undefined;
    this.telefone2 = data.telefone2 || undefined;
    this.email = data.email || undefined;
  }

  static async findAll(): Promise<EscolaModel[]> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM escola
    `
    );
    return result.rows.map((data: any) => new EscolaModel(data));
  }

  static async findByCodigoInep(codigoInep: string): Promise<EscolaModel[]> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM escola
      WHERE codigo_inep = $1
    `,
      [codigoInep]
    );
    return result.rows.map((data: any) => new EscolaModel(data));
  }

  static async findByNome(nome: string): Promise<EscolaModel[]> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM escola
      WHERE escola ILIKE $1
    `,
      [`%${nome}%`]
    );
    return result.rows.map((data: any) => new EscolaModel(data));
  }

  static async create(escolaData: any): Promise<EscolaModel> {
    const { codigoInep, escola, sigla, zonaDeLocalidade, cnpj, cep, endereco, numero, complemento, municipio, estado, telefone1, telefone2, email } = escolaData;
    const query = `
      INSERT INTO escola (codigo_inep, escola, sigla, zona_de_localidade, cnpj, cep, endereco, numero, complemento, municipio, estado, telefone1, telefone2, email)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `;
    const values = [codigoInep, escola, sigla, zonaDeLocalidade, cnpj, cep, endereco, numero, complemento, municipio, estado, telefone1, telefone2, email];

    try {
      const result = await this.pool.query(query, values);
      return new EscolaModel(result.rows[0]);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao cadastrar escola: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao cadastrar escola");
      }
    }
  }

  static async updateByCodigoInep(codigoInep: string, newData: any): Promise<EscolaModel> {
    const { escola, sigla, zonaDeLocalidade, cnpj, cep, endereco, numero, complemento, municipio, estado, telefone1, telefone2, email } = newData;
    const query = `
      UPDATE escola
      SET escola = $1, sigla = $2, zona_de_localidade = $3, cnpj = $4, cep = $5, endereco = $6, numero = $7, complemento = $8, municipio = $9, estado = $10, telefone1 = $11, telefone2 = $12, email = $13
      WHERE codigo_inep = $14
      RETURNING *
    `;
    const values = [escola, sigla, zonaDeLocalidade, cnpj, cep, endereco, numero, complemento, municipio, estado, telefone1, telefone2, email, codigoInep];

    try {
      const result = await this.pool.query(query, values);
      return new EscolaModel(result.rows[0]);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao atualizar escola: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao atualizar escola");
      }
    }
  }

  static async deleteByCodigoInep(codigoInep: string): Promise<void> {
    const query = `
      DELETE FROM escola
      WHERE codigo_inep = $1
    `;

    try {
      await this.pool.query(query, [codigoInep]);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao deletar escola: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao deletar escola");
      }
    }
  }
}

export default EscolaModel;
