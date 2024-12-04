const posts = require('../models/posts');

// imposto le funzioni
function index(req, res) {
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
};

function show(req, res) {
    const postId = parseInt(req.params.id); //(req params sono url dinamici e ritorna una stringa)
    const post = posts.find(p => p.id == postId);

    if (post) {
        res.json(post);
    } else {
        res.status(404);
        res.send("Error 404. Post non trovato")
    }
}

function store(req, res) {
    res.send('Creazione nuovo post');
}

function modify(req, res) {
    const postId = req.params.id;
    res.send(`Modifica del post ${postId}`)
}

function update(req, res) {
    const postId = req.params.id;
    res.send(`Aggiornamento del post ${postId}`)
}

function destroy(req, res) {
    const postId = req.params.id;
    res.send(`Cancellazione del post ${postId}`);
}



// esportiamo tutto
module.exports = { index, show, store, modify, update, destroy }