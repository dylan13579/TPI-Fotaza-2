const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');

function loginView(req, res) {
    res.render('login');
}

async function login(req, res) {

    try {

        const { username, email, password } = req.body;

        let usuario = await usuarioModel.buscarPorEmail(email);

        // 🟢 SI NO EXISTE → CREAR USUARIO
        if (!usuario) {

            const hash = await bcrypt.hash(password, 10);

            await usuarioModel.crear({
                nombre: username || 'Usuario',
                email,
                password: hash
            });

            usuario = await usuarioModel.buscarPorEmail(email);
        }

        // 🔐 VALIDAR PASSWORD
        const valido = await bcrypt.compare(password, usuario.password);

        if (!valido) {
            return res.send('Contraseña incorrecta');
        }

        // 🟢 GUARDAR SESIÓN
        req.session.usuario = usuario;

        res.redirect('/publicaciones');

    } catch (error) {

        console.log(error);
        res.send('Error');
    }
}

function logout(req, res) {
    req.session.destroy();
    res.redirect('/auth/login');
}

module.exports = {
    loginView,
    login,
    logout
};