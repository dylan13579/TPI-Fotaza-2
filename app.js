require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {

    res.locals.usuario = req.session.usuario || null;

    res.locals.ocultarSidebar = false;

    res.locals.mensaje = req.session.mensaje || null;

    delete req.session.mensaje;

    next();
});

const notificacionesMiddleware = require('./middlewares/notificacionesMiddleware');

app.use(notificacionesMiddleware);

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

app.use('/auth', require('./routes/authRoutes'));
app.use('/publicaciones', require('./routes/publicacionRoutes'));
app.use('/comentarios', require('./routes/comentarioRoutes'));
app.use('/valoraciones', require('./routes/valoracionRoutes'));
app.use('/seguimientos', require('./routes/seguimientoRoutes'));
app.use('/notificaciones', require('./routes/notificacionRoutes'));
app.use('/favoritos', require('./routes/favoritoRoutes'));
app.use('/colecciones', require('./routes/coleccionRoutes'));


app.listen(process.env.PORT, () => {
    console.log(`Servidor en http://localhost:${process.env.PORT}`);
});