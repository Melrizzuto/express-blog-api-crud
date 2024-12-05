const express = require('express');
const app = express();
const PORT = 3000;

//importo i routers
const postsRouter = require('./routers/postsRouter');
const commentsRouter = require('./routers/commentsRouter');

app.use(express.json());

// Configuro gli asset statici
app.use(express.static('public'));

// Rotta principale
app.get('/', (req, res) => {
    res.send('Server del mio blog');
});

// uso il router dei post
app.use('/posts', postsRouter);

// uso il router dei commenti
app.use('/comments', commentsRouter);

// rotta fallback   
app.all('*', (req, res) => {
    res.status(404).send(`<h1>Error 404. Page not found</h1>`)
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
