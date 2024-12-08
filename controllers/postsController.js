const posts = require('../models/postsData');

// imposto le funzioni

//get (lettura)
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
//get (lettura)
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
//post (creazione)
function store(req, res) {

    let newId = 0;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id > newId) {
            newId = posts[i].id;
        }
    }

    newId++;

    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    };


    posts.push(newPost);
    console.log(newPost)

    res.status(201).json(newPost);
}
//put (aggiornamento)
function update(req, res) {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post non trovato' });
    }

    const updatedPost = {
        id: postId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    };

    posts[postIndex] = updatedPost;
    console.log(updatedPost)

    res.status(200).json(updatedPost);
}
//patch (modifica)
function modify(req, res) {
    const postId = req.params.id;
    res.send(`Aggiornamento del post ${postId}`)
}
//delete (cancellazione)
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