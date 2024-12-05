// importo Express
const express = require('express');
// imposto una variabile router con valore = ad istanza di express.router()
const router = express.Router();
//richiedo il file controller di commenti
const commentsController = require('../controllers/commentsController'); // invece di app, utilizziamo router per definire le rotte

//index
router.get('/', commentsController.index);

//show
router.get('/:id', commentsController.show);

//store
router.post('/:postId', commentsController.store);

//update
router.put('/:id', commentsController.modify);

//modify
router.patch('/:id', commentsController.update);

//destroy
router.delete('/:id', commentsController.destroy);

module.exports = router;
