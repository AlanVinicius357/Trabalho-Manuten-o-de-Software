const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Paciente = sequelize.define(
  'Paciente',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    tableName: 'pacientes',
    timestamps: false,
  }
);

module.exports = Paciente;
