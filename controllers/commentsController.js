const comments = require('../models/commentsData');

function index(req, res) {
    let filteredComments = [...comments];

    // Filtrare per type con controllo
    if (req.query.type) {
        filteredComments = filteredComments.filter(comment =>
            comment.type.toLowerCase().includes("like") &&
            !comment.type.toLowerCase().includes("dislike")
        );
    }
    // Filtrare per content
    if (req.query.content) {
        const queryContent = req.query.content.replace(/\s+/g, '').toLowerCase(); //utilizzo la regex per rimuovere tutti gli spazi

        // Filtro i commenti con controllo
        filteredComments = filteredComments.filter(comment =>
            comment.content.replace(/\s+/g, '').toLowerCase().includes(queryContent) &&
            !comment.content.replace(/\s+/g, '').toLowerCase().includes("non")
        );
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

// fn per leggere un commento (show)
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
    res.send('Creazione nuovo commento');
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