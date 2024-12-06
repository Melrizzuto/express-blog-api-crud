const express = require('express');
const app = express();
const PORT = 3000;

// Importo i routers
const postsRouter = require('./routers/postsRouter');
const commentsRouter = require('./routers/commentsRouter');

// Importo i middleware
const errorsHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

// Middleware per body parsing
app.use(express.json());

// Configuro gli asset statici
app.use(express.static('public'));

// Rotta principale
app.get('/', (req, res) => {
    res.send('Server del mio blog');
});

// Middleware per router
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

// Middleware per gestire le rotte non registrate
app.use(notFound);

// Middleware per la gestione degli errori generici
app.use(errorsHandler);

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});