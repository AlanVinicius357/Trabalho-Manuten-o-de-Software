const Paciente = require('../models/Paciente');

// GET /pacientes - lista todos os pacientes
exports.listar = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll({ order: [['id', 'ASC']] });
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar pacientes', detalhe: error.message });
  }
};

// GET /pacientes/:id - busca um paciente pelo id
exports.buscarPorId = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) {
      return res.status(404).json({ erro: 'Paciente não encontrado' });
    }
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar paciente', detalhe: error.message });
  }
};

// POST /pacientes - cria um novo paciente
exports.criar = async (req, res) => {
  try {
    const { nome, data_nascimento } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: 'O campo "nome" é obrigatório' });
    }

    const novoPaciente = await Paciente.create({ nome, data_nascimento });
    res.status(201).json(novoPaciente);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar paciente', detalhe: error.message });
  }
};

// PUT /pacientes/:id - atualiza um paciente existente
exports.atualizar = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) {
      return res.status(404).json({ erro: 'Paciente não encontrado' });
    }

    const { nome, data_nascimento } = req.body;
    await paciente.update({ nome, data_nascimento });

    res.json(paciente);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar paciente', detalhe: error.message });
  }
};

// DELETE /pacientes/:id - remove um paciente
exports.deletar = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) {
      return res.status(404).json({ erro: 'Paciente não encontrado' });
    }

    await paciente.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar paciente', detalhe: error.message });
  }
};
