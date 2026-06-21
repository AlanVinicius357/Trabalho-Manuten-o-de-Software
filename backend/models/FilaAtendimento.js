const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Paciente = require('./Paciente');

const FilaAtendimento = sequelize.define(
  'FilaAtendimento',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    paciente_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Paciente,
        key: 'id',
      },
    },
    prioridade: {
      type: DataTypes.STRING(10),
      allowNull: true,
      validate: {
        isIn: [['Baixa', 'Média', 'Alta']],
      },
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'Aguardando',
    },
    data_entrada: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'fila_atendimento',
    timestamps: false,
  }
);

// Relacionamentos
Paciente.hasMany(FilaAtendimento, { foreignKey: 'paciente_id' });
FilaAtendimento.belongsTo(Paciente, { foreignKey: 'paciente_id' });

module.exports = FilaAtendimento;
