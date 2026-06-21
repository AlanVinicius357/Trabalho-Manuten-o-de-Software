require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');

const pacientesRoutes = require('./routes/pacientes');
const filaAtendimentoRoutes = require('./routes/filaAtendimento');

const app = express();
app.use(express.json());

// Rotas
app.use('/pacientes', pacientesRoutes);
app.use('/fila', filaAtendimentoRoutes);

// Rota de status simples
app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Fila de Atendimento rodando 🚀' });
});

// Tratamento de rota não encontrada
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

    // Sincroniza os models com as tabelas existentes (não altera estrutura, apenas valida)
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }
}

start();
