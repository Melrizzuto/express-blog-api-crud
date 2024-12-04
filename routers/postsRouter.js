// importo Express
const express = require('express');
// imposto una variabile router con valore = ad istanza di express.router()
const router = express.Router();
//richiedo il file controller di posts
const postsController = require('../controllers/postsController');

// invece di app, utilizziamo router per definire le rotte

// index
router.get('/', postsController.index);
// show
router.get('/:id', postsController.show);
// store
router.post('/', postsController.store);
// update
router.put('/:id', postsController.modify);
// modify
router.patch('/:id', postsController.update);
// destroy
router.delete('/:id', postsController.destroy);

module.exports = router;



