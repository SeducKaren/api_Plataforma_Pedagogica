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
  email: string;
  turnos: string;
  curso: string;
  serie: string;
  quantidade_de_aluno: number | undefined;

  constructor(data: any) {
    this.codigo_inep = data.codigo_inep || "";
    this.escola = data.escola || "";
    this.sigla = data.sigla || "";
    this.zona_de_localidade = data.zona_de_localidade || "";
    this.cnpj = data.cnpj || "";
    this.cep = data.cep || "";
    this.endereco = data.endereco || "";
    this.numero = data.numero || "";
    this.complemento = data.complemento || "";
    this.municipio = data.municipio || "";
    this.estado = data.estado || "";
    this.telefone1 = data.telefone1 || "";
    this.email = data.email || "";
    this.turnos = data.turnos || "";
    this.curso = data.curso || "";
    this.serie = data.serie || "";
    this.quantidade_de_aluno = data.quantidade_de_aluno || undefined;
  }

  static async findByCodigoInep(codigoInep: string): Promise<EscolaModel | undefined> {
    try {
      const result = await this.pool.query("SELECT * FROM escola WHERE codigo_inep = $1", [codigoInep]);
      return result.rows[0] ? new EscolaModel(result.rows[0]) : undefined;
    } catch (error) {
      console.error("Erro ao buscar escola por código INEP:", error);
      throw error;
    }
  }

  static async findAll(): Promise<EscolaModel[]> {
    try {
      const result = await this.pool.query("SELECT * FROM escola");
      return result.rows.map((data: any) => new EscolaModel(data));
    } catch (error) {
      console.error("Erro ao buscar todas as escolas:", error);
      throw error;
    }
  }

  async save(): Promise<EscolaModel> {
  try {
    const result = await EscolaModel.pool.query(
      `INSERT INTO escola (
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
        email,
        turnos,
        curso,
        serie,
        quantidade_de_aluno
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *`,
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
        this.email,
        this.turnos,
        this.curso,
        this.serie,
        this.quantidade_de_aluno, // Adicionando o valor de quantidade_de_aluno
      ]
    );
    return new EscolaModel(result.rows[0]);
  } catch (error) {
    console.error("Erro ao salvar nova escola:", error);
    throw error;
  }
}
 
  async update(): Promise<void> {
    try {
      await EscolaModel.pool.query(
        `UPDATE escola
        SET
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
          email = $13,
          turnos = $14,
          curso = $15,
          serie = $16,
          quantidade_de_aluno = $17
        WHERE codigo_inep = $1`,
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
          this.email,
          this.turnos,
          this.curso,
          this.serie,
          this.quantidade_de_aluno,
          this.codigo_inep,
        ]
      );
    } catch (error) {
      console.error("Erro ao atualizar escola por código INEP:", error);
      throw error;
    }
  }

  static async deleteByCodigoInep(codigoInep: string): Promise<void> {
    try {
      await this.pool.query("DELETE FROM escola WHERE codigo_inep = $1", [codigoInep]);
    } catch (error) {
      console.error("Erro ao excluir escola por código INEP:", error);
      throw error;
    }
  }

  static async findByNome(nome: string): Promise<EscolaModel | undefined> {
    try {
      const nomeLowercase = nome.toLowerCase();
      
      const result = await this.pool.query("SELECT * FROM escola WHERE LOWER(escola) LIKE $1", [`%${nomeLowercase}%`]);
      
      return result.rows[0] ? new EscolaModel(result.rows[0]) : undefined;
    } catch (error) {
      console.error("Erro ao buscar escola por nome:", error);
      throw error;
    }
  }
}

export default EscolaModel;
