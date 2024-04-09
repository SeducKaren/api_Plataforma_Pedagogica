import { Sequelize, DataTypes, Model } from 'sequelize';
import { Pool } from "pg"

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

interface GabaritoAttributes {
  carimbo: Date;
  endereco_email: string;
  pontuacao: number;
  unidade_escolar: string;
  regiao_escola: string;
  serie: string;
  turma: string;
  nome_estudante: string;
  estudante_deficiencia: boolean;
  tipo_deficiencia: string;
  carta_resposta_portugues_01_10: string;
  carta_resposta_portugues_11_20: string;
  carta_resposta_portugues_21_30: string;
  carta_resposta_portugues_31_40: string;
  carta_resposta_matematica_01_10: string;
  carta_resposta_matematica_11_20: string;
  carta_resposta_matematica_21_30: string;
  carta_resposta_matematica_31_40: string;
}

class Gabarito extends Model<GabaritoAttributes> {
    static findAll() {
        throw new Error('Method not implemented.');
    }
    static create(body: any) {
        throw new Error('Method not implemented.');
    }
}

Gabarito.init({
  carimbo: DataTypes.DATE,
  endereco_email: DataTypes.STRING,
  pontuacao: DataTypes.INTEGER,
  unidade_escolar: DataTypes.STRING,
  regiao_escola: DataTypes.STRING,
  serie: DataTypes.STRING,
  turma: DataTypes.STRING,
  nome_estudante: DataTypes.STRING,
  estudante_deficiencia: DataTypes.BOOLEAN,
  tipo_deficiencia: DataTypes.STRING,
  carta_resposta_portugues_01_10: DataTypes.STRING,
  carta_resposta_portugues_11_20: DataTypes.STRING,
  carta_resposta_portugues_21_30: DataTypes.STRING,
  carta_resposta_portugues_31_40: DataTypes.STRING,
  carta_resposta_matematica_01_10: DataTypes.STRING,
  carta_resposta_matematica_11_20: DataTypes.STRING,
  carta_resposta_matematica_21_30: DataTypes.STRING,
  carta_resposta_matematica_31_40: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Gabarito'
});

export default Gabarito;
