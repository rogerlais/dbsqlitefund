const express = require('express');
const router = express.Router();
const hostController = require('../controllers/hostController');

router.get('/index', hostController.index);
router.post('/', hostController.create);
router.get('/', hostController.read);
router.get('/:id', hostController.readById);
//router.put('/:id', hostController.update);
router.delete('/:id', hostController.remove);

module.exports = router;