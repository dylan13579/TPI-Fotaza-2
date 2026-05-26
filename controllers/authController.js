const bcrypt = require('bcrypt');

const usuarioModel = require('../models/usuarioModel');

function loginView(req, res) {
    res.render('login');
}

function registerView(req, res) {
    res.render('register');
}

async function register(req, res) {

    try {

        const { username, email, password } = req.body;

        const hash = await bcrypt.hash(password, 10);

        await usuarioModel.crear({
            nombre: username,
            email,
            password: hash
        });

        res.redirect('/auth/login');

    } catch (error) {

        console.log(error);
        res.send('Error registro');
    }
}

async function login(req, res) {

    try {

        const { email, password } = req.body;

        const usuario = await usuarioModel.buscarPorEmail(email);

        if (!usuario) {
            return res.send('Usuario no encontrado o inactivo');
        }

        const valido = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!valido) {
            return res.send('Contraseña incorrecta');
        }

        req.session.usuario = usuario;

        res.redirect('/publicaciones');

    } catch (error) {

        console.log(error);
        res.send('Error login');
    }
}

function logout(req, res) {

    req.session.destroy();

    res.redirect('/auth/login');
}

module.exports = {
    loginView,
    registerView,
    register,
    login,
    logout
};