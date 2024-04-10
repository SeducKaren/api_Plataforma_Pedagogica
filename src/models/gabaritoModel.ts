import { Pool } from "pg";

class Gabarito {
  static pool = new Pool({
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: process.env.DATABASE_URL,
  });

  carimbo: Date | undefined;
  endereco_email: string | undefined;
  pontuacao: number | undefined;
  unidade_escolar: string | undefined;
  regiao_escola: string | undefined;
  serie: string | undefined;
  turma: string | undefined;
  nome_estudante: string | undefined;
  estudante_deficiencia: boolean | undefined;
  tipo_deficiencia: string | undefined;
  carta_resposta_portugues_01_10: string | undefined;
  carta_resposta_portugues_11_20: string | undefined;
  carta_resposta_portugues_21_30: string | undefined;
  carta_resposta_portugues_31_40: string | undefined;
  carta_resposta_matematica_01_10: string | undefined;
  carta_resposta_matematica_11_20: string | undefined;
  carta_resposta_matematica_21_30: string | undefined;
  carta_resposta_matematica_31_40: string | undefined;

  constructor(data: any) {
    this.carimbo = data.carimbo || undefined;
    this.endereco_email = data.endereco_email || undefined;
    this.pontuacao = data.pontuacao || undefined;
    this.unidade_escolar = data.unidade_escolar || undefined;
    this.regiao_escola = data.regiao_escola || undefined;
    this.serie = data.serie || undefined;
    this.turma = data.turma || undefined;
    this.nome_estudante = data.nome_estudante || undefined;
    this.estudante_deficiencia = data.estudante_deficiencia || undefined;
    this.tipo_deficiencia = data.tipo_deficiencia || undefined;
    this.carta_resposta_portugues_01_10 = data.carta_resposta_portugues_01_10 || undefined;
    this.carta_resposta_portugues_11_20 = data.carta_resposta_portugues_11_20 || undefined;
    this.carta_resposta_portugues_21_30 = data.carta_resposta_portugues_21_30 || undefined;
    this.carta_resposta_portugues_31_40 = data.carta_resposta_portugues_31_40 || undefined;
    this.carta_resposta_matematica_01_10 = data.carta_resposta_matematica_01_10 || undefined;
    this.carta_resposta_matematica_11_20 = data.carta_resposta_matematica_11_20 || undefined;
    this.carta_resposta_matematica_21_30 = data.carta_resposta_matematica_21_30 || undefined;
    this.carta_resposta_matematica_31_40 = data.carta_resposta_matematica_31_40 || undefined;
  }

  static async findByNome(nome: string): Promise<Gabarito | undefined> {
    try {
      const result = await this.pool.query(
        `
        SELECT *
        FROM gabaritos
        WHERE nome_estudante ILIKE $1
      `,
        [`%${nome}%`]
      );
      return result.rows.length > 0 ? new Gabarito(result.rows[0]) : undefined;
    } catch (error) {
      console.error("Error executing query:", error);
      return undefined;
    }
  }

  static async findAll(): Promise<Gabarito[]> {
    try {
      const result = await this.pool.query("SELECT * FROM gabaritos");
      return result.rows.map((row: any) => new Gabarito(row));
    } catch (error) {
      console.error("Error fetching gabaritos:", error);
      return [];
    }
  }
  
  async save(): Promise<Gabarito | undefined> {
    try {
      const result = await Gabarito.pool.query(
        `
        INSERT INTO gabaritos (
          carimbo,
          endereco_email,
          pontuacao,
          unidade_escolar,
          regiao_escola,
          serie,
          turma,
          nome_estudante,
          estudante_deficiencia,
          tipo_deficiencia,
          carta_resposta_portugues_01_10,
          carta_resposta_portugues_11_20,
          carta_resposta_portugues_21_30,
          carta_resposta_portugues_31_40,
          carta_resposta_matematica_01_10,
          carta_resposta_matematica_11_20,
          carta_resposta_matematica_21_30,
          carta_resposta_matematica_31_40
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        RETURNING *
      `,
        [
          this.carimbo,
          this.endereco_email,
          this.pontuacao,
          this.unidade_escolar,
          this.regiao_escola,
          this.serie,
          this.turma,
          this.nome_estudante,
          this.estudante_deficiencia,
          this.tipo_deficiencia,
          this.carta_resposta_portugues_01_10,
          this.carta_resposta_portugues_11_20,
          this.carta_resposta_portugues_21_30,
          this.carta_resposta_portugues_31_40,
          this.carta_resposta_matematica_01_10,
          this.carta_resposta_matematica_11_20,
          this.carta_resposta_matematica_21_30,
          this.carta_resposta_matematica_31_40,
        ]
      );
      return result.rows.length > 0 ? new Gabarito(result.rows[0]) : undefined;
    } catch (error) {
      console.error("Error saving gabarito:", error);
      return undefined;
    }
  }

  async update(): Promise<void> {
    try {
      await Gabarito.pool.query(
        `
        UPDATE gabaritos
        SET
          carimbo = $1,
          endereco_email = $2,
          pontuacao = $3,
          unidade_escolar = $4,
          regiao_escola = $5,
          serie = $6,
          turma = $7,
          estudante_deficiencia = $8,
          tipo_deficiencia = $9,
          carta_resposta_portugues_01_10 = $10,
          carta_resposta_portugues_11_20 = $11,
          carta_resposta_portugues_21_30 = $12,
          carta_resposta_portugues_31_40 = $13,
          carta_resposta_matematica_01_10 = $14,
          carta_resposta_matematica_11_20 = $15,
          carta_resposta_matematica_21_30 = $16,
          carta_resposta_matematica_31_40 = $17
        WHERE nome_estudante = $18
      `,
        [
          this.carimbo,
          this.endereco_email,
          this.pontuacao,
          this.unidade_escolar,
          this.regiao_escola,
          this.serie,
          this.turma,
          this.estudante_deficiencia,
          this.tipo_deficiencia,
          this.carta_resposta_portugues_01_10,
          this.carta_resposta_portugues_11_20,
          this.carta_resposta_portugues_21_30,
          this.carta_resposta_portugues_31_40,
          this.carta_resposta_matematica_01_10,
          this.carta_resposta_matematica_11_20,
          this.carta_resposta_matematica_21_30,
          this.carta_resposta_matematica_31_40,
          this.nome_estudante,
        ]
      );
    } catch (error) {
      console.error("Error updating gabarito:", error);
    }
  }

  async delete(): Promise<void> {
    try {
      await Gabarito.pool.query("DELETE FROM gabaritos WHERE nome_estudante = $1", [this.nome_estudante]);
    } catch (error) {
      console.error("Error deleting gabarito:", error);
    }
  }
}

export default Gabarito;
