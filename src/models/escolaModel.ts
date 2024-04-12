import { Pool } from "pg";

class EscolaModel {
  static pool = new Pool({
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: process.env.DATABASE_URL,
  });

  codigo_inep: string;
  escola: string;
  sigla: string;
  zona_de_localidade: string;
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
  ano_do_aluno: string;
  curso: string;
  serie: string;
  quantidades_de_aluno: number | undefined;

  constructor(data: any) {
    this.codigo_inep = data.codigo_inep || undefined;
    this.escola = data.escola || undefined;
    this.sigla = data.sigla || undefined;
    this.zona_de_localidade = data.zona_de_localidade || undefined;
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
    this.ano_do_aluno = data.ano_do_aluno || undefined;
    this.curso = data.curso || undefined;
    this.serie = data.serie || undefined;
    this.quantidades_de_aluno = data.quantidades_de_aluno || undefined;
  }

  static async findByCodigoInep(codigoInep: string): Promise<EscolaModel | undefined> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM escola
      WHERE codigo_inep = $1
    `,
      [codigoInep]
    );
    return result.rows[0] ? new EscolaModel(result.rows[0]) : undefined;
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

  async save(): Promise<EscolaModel> {
    const result = await EscolaModel.pool.query(
      `
      INSERT INTO escola (
        codigo_inep,
        escola,
        sigla,
        zona_de_localidade,
        cnpj,
        cep,
        endereco,
        numero,
        complemento,
        municipio,
        estado,
        telefone1,
        telefone2,
        email,
        ano_do_aluno,
        curso,
        serie,
        quantidades_de_aluno
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING *
    `,
      [
        this.codigo_inep,
        this.escola,
        this.sigla,
        this.zona_de_localidade,
        this.cnpj,
        this.cep,
        this.endereco,
        this.numero,
        this.complemento,
        this.municipio,
        this.estado,
        this.telefone1,
        this.telefone2,
        this.email,
        this.ano_do_aluno,
        this.curso,
        this.serie,
        this.quantidades_de_aluno,
      ]
    );
    return new EscolaModel(result.rows[0]);
  }

  async update(): Promise<void> {
    await EscolaModel.pool.query(
      `
      UPDATE escola
      SET
        escola = $1,
        sigla = $2,
        zona_de_localidade = $3,
        cnpj = $4,
        cep = $5,
        endereco = $6,
        numero = $7,
        complemento = $8,
        municipio = $9,
        estado = $10,
        telefone1 = $11,
        telefone2 = $12,
        email = $13,
        ano_do_aluno = $14,
        curso = $15,
        serie = $16,
        quantidades_de_aluno = $17
      WHERE codigo_inep = $18
    `,
      [
        this.escola,
        this.sigla,
        this.zona_de_localidade,
        this.cnpj,
        this.cep,
        this.endereco,
        this.numero,
        this.complemento,
        this.municipio,
        this.estado,
        this.telefone1,
        this.telefone2,
        this.email,
        this.ano_do_aluno,
        this.curso,
        this.serie,
        this.quantidades_de_aluno,
        this.codigo_inep,
      ]
    );
  }
  
  static async deleteByCodigoInep(codigoInep: string): Promise<void> {
    await this.pool.query("DELETE FROM escola WHERE codigo_inep = $1", [codigoInep]);
  }

  static async findByNome(nomeEscola: string): Promise<EscolaModel | undefined> {
    const result = await this.pool.query(
        `
        SELECT *
        FROM escola
        WHERE escola ILIKE $1
        `,
        [`%${nomeEscola}%`]
    );
    return result.rows[0] ? new EscolaModel(result.rows[0]) : undefined;
  }
}

export default EscolaModel;
