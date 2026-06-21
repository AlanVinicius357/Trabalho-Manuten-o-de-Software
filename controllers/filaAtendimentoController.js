const FilaAtendimento = require('../models/FilaAtendimento');
const Paciente = require('../models/Paciente');

const PRIORIDADES_VALIDAS = ['Baixa', 'Média', 'Alta'];
const STATUS_VALIDOS = ['Aguardando', 'Em atendimento', 'Finalizado', 'Cancelado'];

// GET /fila - lista a fila completa (com dados do paciente)
// Suporta filtros opcionais via query string: ?status=Aguardando&prioridade=Alta
exports.listar = async (req, res) => {
  try {
    const { status, prioridade } = req.query;
    const where = {};
    if (status) where.status = status;
    if (prioridade) where.prioridade = prioridade;

    const fila = await FilaAtendimento.findAll({
      where,
      include: [{ model: Paciente, attributes: ['id', 'nome', 'data_nascimento'] }],
      order: [['data_entrada', 'ASC']],
    });

    res.json(fila);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar fila de atendimento', detalhe: error.message });
  }
};

// GET /fila/:id - busca um item da fila pelo id
exports.buscarPorId = async (req, res) => {
  try {
    const item = await FilaAtendimento.findByPk(req.params.id, {
      include: [{ model: Paciente, attributes: ['id', 'nome', 'data_nascimento'] }],
    });

    if (!item) {
      return res.status(404).json({ erro: 'Item da fila não encontrado' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar item da fila', detalhe: error.message });
  }
};

// POST /fila - adiciona um paciente na fila de atendimento
exports.criar = async (req, res) => {
  try {
    const { paciente_id, prioridade } = req.body;

    if (!paciente_id) {
      return res.status(400).json({ erro: 'O campo "paciente_id" é obrigatório' });
    }

    if (prioridade && !PRIORIDADES_VALIDAS.includes(prioridade)) {
      return res.status(400).json({ erro: `Prioridade inválida. Use uma de: ${PRIORIDADES_VALIDAS.join(', ')}` });
    }

    const paciente = await Paciente.findByPk(paciente_id);
    if (!paciente) {
      return res.status(404).json({ erro: 'Paciente não encontrado' });
    }

    const novoItem = await FilaAtendimento.create({ paciente_id, prioridade });
    res.status(201).json(novoItem);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar item da fila', detalhe: error.message });
  }
};

// PUT /fila/:id - atualiza prioridade e/ou status de um item da fila
exports.atualizar = async (req, res) => {
  try {
    const item = await FilaAtendimento.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ erro: 'Item da fila não encontrado' });
    }

    const { prioridade, status } = req.body;

    if (prioridade && !PRIORIDADES_VALIDAS.includes(prioridade)) {
      return res.status(400).json({ erro: `Prioridade inválida. Use uma de: ${PRIORIDADES_VALIDAS.join(', ')}` });
    }

    if (status && !STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({ erro: `Status inválido. Use um de: ${STATUS_VALIDOS.join(', ')}` });
    }

    await item.update({
      prioridade: prioridade ?? item.prioridade,
      status: status ?? item.status,
    });

    res.json(item);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar item da fila', detalhe: error.message });
  }
};

// PATCH /fila/:id/chamar - atalho para marcar um paciente como "Em atendimento"
exports.chamarProximo = async (req, res) => {
  try {
    const item = await FilaAtendimento.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ erro: 'Item da fila não encontrado' });
    }

    await item.update({ status: 'Em atendimento' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao chamar paciente', detalhe: error.message });
  }
};

// DELETE /fila/:id - remove um item da fila
exports.deletar = async (req, res) => {
  try {
    const item = await FilaAtendimento.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ erro: 'Item da fila não encontrado' });
    }

    await item.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar item da fila', detalhe: error.message });
  }
};
