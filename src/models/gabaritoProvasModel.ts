import { Pool } from "pg";

class GabaritoProvasModel {
  static pool = new Pool({
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: process.env.DATABASE_URL,
  });

  id?: number;
  data: Date;
  nivel_prova: string;
  respostas_lingua_portuguesa: string[];
  respostas_matematica: string[];

  constructor(data: any) {
    this.id = data.id || undefined;
    this.data = data.data || undefined;
    this.nivel_prova = data.nivel_prova || undefined;
    this.respostas_lingua_portuguesa = data.respostas_lingua_portuguesa || undefined;
    this.respostas_matematica = data.respostas_matematica || undefined;
  }


    
    static async getAll(): Promise<GabaritoProvasModel | null> {
        const result = await this.pool.query(
          `
          SELECT *
          FROM gabarito_2024
        `
        );
        return result.rows.length ? new GabaritoProvasModel(result.rows[0]) : null;
      }

    static async getByNivel(nivel_prova: string): Promise<GabaritoProvasModel | null> {
        const result = await this.pool.query(
          `
          SELECT *
          FROM gabarito_2024
          WHERE nivel_prova = $1
        `,
          [nivel_prova]
        );
        return result.rows.length ? new GabaritoProvasModel(result.rows[0]) : null;
      }

/*     static async create(gabaritoProvas: GabaritoProvas): Promise<void> {
        await GabaritoProvasModel.pool.query('INSERT INTO gabarito_2024 VALUES (DEFAULT, $1, $2, $3, $4, $5)',
            [
                gabaritoProvas.id, gabaritoProvas.data, gabaritoProvas.nivel_prova,
                gabaritoProvas.respostas_lingua_portuguesa, gabaritoProvas.respostas_matematica,
            ]);
    }
 */
    static async create(gabaritoData: any): Promise<GabaritoProvasModel> {
        const {id, data, nivel_prova,respostas_lingua_portuguesa, respostas_matematica} = gabaritoData;
        const query = `
          INSERT INTO gabarito_2024 (id, data, nivel_prova, respostas_lingua_portuguesa, respostas_matematica)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *
        `;
        console.log(id, data, nivel_prova, respostas_lingua_portuguesa, respostas_matematica)
        const values = [id, data, nivel_prova, respostas_lingua_portuguesa, respostas_matematica];
    
        try {
          const result = await this.pool.query(query, values);
          return new GabaritoProvasModel(result.rows[0]);
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Erro ao cadastrar resultado de provas: ${error.message}`);
          } else {
            throw new Error("Erro desconhecido ao cadastrar resultado de provas");
          }
        }
      }
    }
/*     static async updateByNivel(nivel_prova: string, gabaritoProvas: GabaritoProvas): Promise<void> {
        await GabaritoProvasModel.pool.query('UPDATE gabaritos_provas SET ',
            [
                
            ]);
    }

    static async deleteByNivel(nivel_prova: string): Promise<void> {
        await GabaritoProvasModel.pool.query('DELETE FROM gabarito_2024 WHERE nivel_prova = $1', [nivel_prova]);
    } */

export default GabaritoProvasModel;
