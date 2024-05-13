import { Pool } from 'pg';

const pool = new Pool();

export interface Gabarito {
  id: number;
  dataRegistro: Date;
  codigoInep: string;
  numeroMatriculaAluno: string;
  nivelProva: string;
  quantidadeAcertos?: number;
  respostasLinguaPortuguesa: string[];
  respostasMatematica: string[];
  dificuldadeLinguaPortuguesa: string[];
  dificuldadeMatematica: string[];
}

export async function createGabarito(gabaritoData: Gabarito): Promise<Gabarito> {
  const client = await pool.connect();
  try {
    const { dataRegistro, codigoInep, numeroMatriculaAluno, nivelProva, quantidadeAcertos,
      respostasLinguaPortuguesa, respostasMatematica, dificuldadeLinguaPortuguesa, dificuldadeMatematica } = gabaritoData;
    const queryText = `
      INSERT INTO Gabarito (data_registro, codigo_inep, numero_matricula_aluno, nivel_prova, quantidade_acertos,
        respostas_lingua_portuguesa, respostas_matematica, dificuldade_lingua_portuguesa, dificuldade_matematica)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [dataRegistro, codigoInep, numeroMatriculaAluno, nivelProva, quantidadeAcertos,
      respostasLinguaPortuguesa, respostasMatematica, dificuldadeLinguaPortuguesa, dificuldadeMatematica];
    const { rows } = await client.query(queryText, values);
    return rows[0];
  } finally {
    client.release();
  }
}

export async function getGabaritoById(id: number): Promise<Gabarito | null> {
  const client = await pool.connect();
  try {
    const queryText = 'SELECT * FROM Gabarito WHERE id = $1;';
    const { rows } = await client.query(queryText, [id]);
    return rows[0] || null;
  } finally {
    client.release();
  }
}

export async function updateGabaritoById(id: number, gabaritoData: Partial<Gabarito>): Promise<Gabarito | null> {
  const client = await pool.connect();
  try {
    const queryText = `
      UPDATE Gabarito
      SET data_registro = $1, codigo_inep = $2, numero_matricula_aluno = $3, nivel_prova = $4,
          quantidade_acertos = $5, respostas_lingua_portuguesa = $6, respostas_matematica = $7,
          dificuldade_lingua_portuguesa = $8, dificuldade_matematica = $9
      WHERE id = $10
      RETURNING *;
    `;
    const values = [
      gabaritoData.dataRegistro,
      gabaritoData.codigoInep,
      gabaritoData.numeroMatriculaAluno,
      gabaritoData.nivelProva,
      gabaritoData.quantidadeAcertos,
      gabaritoData.respostasLinguaPortuguesa,
      gabaritoData.respostasMatematica,
      gabaritoData.dificuldadeLinguaPortuguesa,
      gabaritoData.dificuldadeMatematica,
      id,
    ];
    const { rows } = await client.query(queryText, values);
    return rows[0] || null;
  } finally {
    client.release();
  }
}

export async function deleteGabaritoById(id: number): Promise<void> {
  const client = await pool.connect();
  try {
    const queryText = 'DELETE FROM Gabarito WHERE id = $1;';
    await client.query(queryText, [id]);
  } finally {
    client.release();
  }
}
