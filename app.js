const express = require('express');
const app = express();
const PORT = 3000;

//importo i routers
const postsRouter = require('./routers/postsRouter');
const commentsRouter = require('./routers/commentsRouter');
const errorsHandler = require('./middlewares/errorHandler');
const errorsHandler = require('./middlewares/notFound');
const notFound = require('./middlewares/notFound');


//middleware per body parsing
app.use(express.json());

// Configuro gli asset statici
app.use(express.static('public'));

// Rotta principale
app.get('/', (req, res) => {
    res.send('Server del mio blog');
});

//middleware per router

//per posts
app.use('/posts', postsRouter);

//per commenti
app.use('/comments', commentsRouter);

// rotte di fallback

//middleware per errore di sistema
app.use(errorsHandler);

//middleware per gestire tutti gli errori (tranne il 505)
app.use(notFound);

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
