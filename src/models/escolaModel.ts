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
  centro: string;
  municipio: string;
  estado: string;
  telefone1: string;
  telefone2: string;
  email: string;
  ano_do_aluno: string;
  instituicao: string;
  curso: string;
  serie: string;
  autorizacao: string;
  anos_letivos: string;
  secretario_escolar: string;

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
    this.centro = data.centro || undefined;
    this.municipio = data.municipio || undefined;
    this.estado = data.estado || undefined;
    this.telefone1 = data.telefone1 || undefined;
    this.telefone2 = data.telefone2 || undefined;
    this.email = data.email || undefined;
    this.ano_do_aluno = data.ano_do_aluno || undefined;
    this.instituicao = data.instituicao || undefined;
    this.curso = data.curso || undefined;
    this.serie = data.serie || undefined;
    this.autorizacao = data.autorizacao || undefined;
    this.anos_letivos = data.anos_letivos || undefined;
    this.secretario_escolar = data.secretario_escolar || undefined;
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
        centro,
        municipio,
        estado,
        telefone1,
        telefone2,
        email,
        ano_do_aluno,
        instituicao,
        curso,
        serie,
        autorizacao,
        anos_letivos,
        secretario_escolar
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
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
        this.centro,
        this.municipio,
        this.estado,
        this.telefone1,
        this.telefone2,
        this.email,
        this.ano_do_aluno,
        this.instituicao,
        this.curso,
        this.serie,
        this.autorizacao,
        this.anos_letivos,
        this.secretario_escolar,
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
        centro = $9,
        municipio = $10,
        estado = $11,
        telefone1 = $12,
        telefone2 = $13,
        email = $14,
        ano_do_aluno = $15,
        instituicao = $16,
        curso = $17,
        serie = $18,
        autorizacao = $19,
        anos_letivos = $20,
        secretario_escolar = $21
      WHERE codigo_inep = $22
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
        this.centro,
        this.municipio,
        this.estado,
        this.telefone1,
        this.telefone2,
        this.email,
        this.ano_do_aluno,
        this.instituicao,
        this.curso,
        this.serie,
        this.autorizacao,
        this.anos_letivos,
        this.secretario_escolar,
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
