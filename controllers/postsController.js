const posts = require('../models/postsData');

// imposto le funzioni

//get
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
//get
function show(req, res) {
    const postId = parseInt(req.params.id); //(req params sono url dinamici e ritorna una stringa)
    const post = posts.find(p => p.id == postId);

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({
            error: 404,
            message: "Item not found."
        });
    }
}
//post
function store(req, res) {
    res.send('Creazione nuovo post');
}
//put
function modify(req, res) {
    const postId = req.params.id;
    res.send(`Modifica del post ${postId}`)
}
//patch
function update(req, res) {
    const postId = req.params.id;
    res.send(`Aggiornamento del post ${postId}`)
}
//delete
function destroy(req, res) {
    const postId = parseInt(req.params.id); // Ottengo l'ID del post dalla richiesta
    const index = posts.findIndex(post => post.id === postId); // Trovo l'indice del post

    if (index !== -1) {
        // Rimuovo il post dall'array
        posts.splice(index, 1);

        // Stampo l'array aggiornato nella console
        console.log('Lista dei post aggiornata:', posts);

        // Rispondo con lo stato 204 (nessun contenuto)
        res.status(204).send();
    } else {
        // Rispondo con un errore 404 se il post non esiste
        res.status(404).json({
            error: 404,
            message: "Item not found."
        });
    }
}


// esporto tutto
module.exports = { index, show, store, modify, update, destroy };