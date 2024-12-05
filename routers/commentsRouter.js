const express = require('express');
const router = express.Router();

//richiedo il file controller di commenti
const commentsController = require('../controllers/commentsController');

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
