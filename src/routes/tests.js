const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.get('/index', testController.index);
router.post('/', testController.create);
router.get('/', testController.read);
router.get('/:id', testController.readById);
//*Sem necessidade de edição nesta app
//router.put('/:id', hostController.update);
router.delete('/:id', testController.remove);

module.exports = router;