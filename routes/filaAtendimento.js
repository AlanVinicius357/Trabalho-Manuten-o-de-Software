const express = require('express');
const router = express.Router();
const filaController = require('../controllers/filaAtendimentoController');

router.get('/', filaController.listar);
router.get('/:id', filaController.buscarPorId);
router.post('/', filaController.criar);
router.put('/:id', filaController.atualizar);
router.patch('/:id/chamar', filaController.chamarProximo);
router.delete('/:id', filaController.deletar);

module.exports = router;
