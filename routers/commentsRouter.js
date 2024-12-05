const express = require('express');
const router = express.Router();

//richiedo il file controller di commenti
const commentsController = require('../controllers/commentsController');

//index
router.get('/posts/:postId/comments', commentsController.index);

//show
router.get('/comments/:id', commentsController.show);

//store
router.post('/posts/:postId/comments', commentsController.store);

//update
router.put('/comments/:id', commentsController.modify);

//modify
router.patch('/comments/:id', commentsController.update);

//destroy
router.delete('/comments/:id', commentsController.destroy);

module.exports = router;
