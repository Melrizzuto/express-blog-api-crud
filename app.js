const express = require('express');
const app = express();
const PORT = 3000;

// Importo il router dei post
const postsRouter = require('./routers/posts');

// Configuro gli asset statici
app.use(express.static('public'));

// Rotta principale
app.get('/', (req, res) => {
    res.send('Server del mio blog');
});

// Usa il router dei post
app.use('/posts', postsRouter);

// rotta fallback   
app.all('*', (req, res) => {
    res.status(404).send(`<h1>Error 404. Page not found</h1>`)
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
