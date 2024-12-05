const comments = require('../models/commentsData');
const posts = require('../models/postsData');


//fn per leggere tutti commenti (index) e filtrarli con i paramentri della query string
function index(req, res) {
    let filteredComments = [...comments];

    // Filtrare per postId
    if (req.query.post_id) {
        const postId = parseInt(req.query.post_id);
        filteredComments = filteredComments.filter(comment => comment.post_id === postId);
    }

    // Filtrare per type con controllo
    if (req.query.type) {
        const type = req.query.type.toLowerCase();

        //controllo
        if (type === "like") {
            // restituisco solo i commenti che hanno type = like
            filteredComments = filteredComments.filter(comment =>
                comment.type.toLowerCase() === "like"
            );
        } else if (type === "dislike") {
            // restituisco solo i commenti che hanno type = dislike
            filteredComments = filteredComments.filter(comment =>
                comment.type.toLowerCase() === "dislike"
            );
        } else {
            // Se il tipo non è "like" o "dislike" restituisco array vuoto
            filteredComments = [];
        }
    }

    // Filtrare per content
    if (req.query.content) {
        const queryContent = req.query.content.replace(/\s+/g, '').toLowerCase(); // uso regex per gli spazi

        // se la query contiene la parola non, filtro i commenti che lo contengono
        if (queryContent.includes("non")) {
            filteredComments = filteredComments.filter(comment =>
                comment.content.replace(/\s+/g, '').toLowerCase().includes("non")
            );
        } else {
            // filtro i commenti che non contiengono la parola non
            filteredComments = filteredComments.filter(comment =>
                comment.content.replace(/\s+/g, '').toLowerCase().includes(queryContent) &&
                !comment.content.replace(/\s+/g, '').toLowerCase().includes("non")
            );
        }
    } else {
        // Se non c'è content restituisco tutti i commenti
        filteredComments = filteredComments;
        count = filteredComments.length
    }

    // Filtrare per author
    if (req.query.author) {
        filteredComments = filteredComments.filter(comment =>
            comment.author.toLowerCase().includes(req.query.author.toLowerCase())
        );
    }


    res.json({
        filteredComments,
        count: filteredComments.length
    });
};

// fn per leggere un commento per id (show)
function show(req, res) {
    const commentId = parseInt(req.params.id);
    const comment = comments.find(comment => comment.id === commentId);

    //controllo
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({
            error: 404,
            message: "Comment not found."
        });
    }
}

//post
function store(req, res) {
    const postId = parseInt(req.params.postId);  //prendo il postId dalla URL
    const post = posts.find(p => p.id === postId);  //cerco il post corrispondente

    // se il post non esiste
    if (!post) {
        return res.status(404).json({
            error: "Post not found"
        });
    }

    //se il post esiste, creo il commento
    let newId = 0;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id > newId) {
            newId = posts[i].id;
        }
    }

    newId++;

    const newComment = {
        id: newId,  //assegno un ID al nuovo commento
        post_id: postId, //associa il commento al postId
        content: req.body.content,
        author: req.body.author,
        type: req.body.type
    };

    comments.push(newComment);//aggiungo il commento all'array dei commenti
    console.log(newComment)
    res.status(201).json(newComment);  //restituisco il commento creato
}
//put
function modify(req, res) {
    const commentId = req.params.id;
    res.send(`Modifica del commento ${commentId}`);
}

//patch
function update(req, res) {
    const commentId = req.params.id;
    res.send(`Aggiornamento del commento ${commentId}`);
}

// fn per cancellare un commento (delete)
function destroy(req, res) {
    const commentId = parseInt(req.params.id);
    const index = comments.findIndex(comment => comment.id === commentId);

    if (index !== -1) {
        comments.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({
            error: 404,
            message: "Comment not found."
        });
    }
}


module.exports = { index, show, store, modify, update, destroy };