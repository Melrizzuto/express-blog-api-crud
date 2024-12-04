// importo Express
const express = require('express');
// imposto una variabile router con valore = ad istanza di express.router()
const router = express.Router();

// Importiamo le funzioni del controller
const postsController = require('../controllers/postsController');

// invece di app, utilizziamo router per definire le rotte

// index
router.get('/', postsController.index);
console.log(postsController.index)
// show
router.get('/:id', postsController.show);
// store
router.post('/', postsController.store);
// update
router.put('/:id', postsController.update);
// modify
router.patch('/:id', postsController.modify);
// destroy
router.delete('/:id', postsController.destroy);

module.exports = router;



