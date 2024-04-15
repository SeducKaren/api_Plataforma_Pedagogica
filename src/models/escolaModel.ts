import { Pool } from 'pg';

class EscolaModel {
  static pool = new Pool({
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: process.env.DATABASE_URL,
  });

  id?: string;
  codigo_inep?: string;
  escola?: string;
  sigla?: string;
  zona_de_localidade?: string;
  cnpj?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  municipio?: string;
  estado?: string;
  telefone1?: string;
  telefone2?: string;
  email?: string;
  ano_do_aluno?: number;
  curso?: string;
  serie?: string;
  quantidade_de_alunos?: number;

  constructor(data: any = {}) {
    this.id = data.id || undefined;
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
    this.quantidade_de_alunos = data.quantidade_de_alunos || undefined;
  }

  async save(): Promise<EscolaModel> {
    const {
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
      quantidade_de_alunos,
    } = this;
    const query = `
      INSERT INTO escolas (
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
        quantidade_de_alunos
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING *
    `;
    const values = [
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
      quantidade_de_alunos,
    ];
    const result = await EscolaModel.pool.query(query, values);
    return new EscolaModel(result.rows[0]);
  }

  static async findAll(): Promise<EscolaModel[]> {
    const result = await this.pool.query('SELECT * FROM escolas');
    return result.rows.map((data: any) => new EscolaModel(data));
  }

  static async findByNomeGenerico(nome: string): Promise<EscolaModel[]> {
    const result = await this.pool.query(
      'SELECT * FROM escolas WHERE escola ILIKE $1',
      [`%${nome}%`]
    );
    return result.rows.map((data: any) => new EscolaModel(data));
  }

  static async findByCodigoInep(codigoInep: string): Promise<EscolaModel | undefined> {
    const result = await this.pool.query('SELECT * FROM escolas WHERE codigo_inep = $1', [codigoInep]);
    return result.rows[0] ? new EscolaModel(result.rows[0]) : undefined;
  }

  static async update(escola: EscolaModel): Promise<EscolaModel> {
    const {
      id,
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
      quantidade_de_alunos,
    } = escola;
    const query = `
      UPDATE escolas
      SET
        codigo_inep = $1,
        escola = $2,
        sigla = $3,
        zona_de_localidade = $4,
        cnpj = $5,
        cep = $6,
        endereco = $7,
        numero = $8,
        complemento = $9,
        municipio = $10,
        estado = $11,
        telefone1 = $12,
        telefone2 = $13,
        email = $14,
        ano_do_aluno = $15,
        curso = $16,
        serie = $17,
        quantidade_de_alunos = $18
      WHERE id = $19
      RETURNING *
    `;
    const values = [
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
      quantidade_de_alunos,
      id,
    ];
    const result = await EscolaModel.pool.query(query, values);
    return new EscolaModel(result.rows[0]);
  }

  static async excluirPorId(id: string): Promise<void> {
    await this.pool.query('DELETE FROM escolas WHERE id = $1', [id]);
  }

  static async excluirPorCodigoInep(codigoInep: string): Promise<void> {
    await this.pool.query('DELETE FROM escolas WHERE codigo_inep = $1', [codigoInep]);
  }
}

export default EscolaModel;
