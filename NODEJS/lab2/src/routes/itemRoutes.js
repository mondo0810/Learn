const express = require('express');
const router = express.Router();
const itemController = require('../controllers/ItemController');

router.post('/', itemController.create);
router.get('/', itemController.getAll);
router.put('/:id', itemController.update);
router.delete('/:id', itemController.delete);

module.exports = router;
