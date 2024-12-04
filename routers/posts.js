// importo Express
const express = require('express');
// imposto una variabile router con valore = ad istanza di express.router()
const router = express.Router();
// importo file data posts
const posts = require('../data/posts');

// invece di app, utilizziamo router per definire le rotte

// index (read)
router.get('/', (req, res) => {
    let filteredPosts = [...posts];

    // Filtrare per tag
    if (req.query.tag) {
        filteredPosts = filteredPosts.filter(post =>
            post.tags.includes(req.query.tag)
        );
    }

    // Filtrare per titolo
    if (req.query.title) {
        filteredPosts = filteredPosts.filter(post =>
            post.title.toLowerCase().includes(req.query.title.toLowerCase())
        );
    }

    res.json({
        filteredPosts,
        count: filteredPosts.length
    });
});


// show (read)
router.get('/:id', function (req, res) {
    const postId = parseInt(req.params.id); //(req params sono url dinamici e ritorna una stringa)
    const post = posts.find(p => p.id == postId);

    if (post) {
        res.json(post);
    } else {
        res.status(404);
        res.send("Error 404. Post non trovato")
    }
});

// store (create)
router.post('/', function (req, res) {
    res.send('Creazione nuovo post');
});

// update (update or modify)
router.put('/:id', function (req, res) {
    const postId = req.params.id;
    res.send(`Aggiornamento del post ${postId}`)
})

router.patch('/:id', function (req, res) {
    const postId = req.params.id;
    res.send(`Modifica del post ${postId}`)
})

// destroy (delete)
router.delete('/:id', function (req, res) {
    const postId = req.params.id;
    res.send(`Cancellazione del post ${postId}`);
});


module.exports = router;