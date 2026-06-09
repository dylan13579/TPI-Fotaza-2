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
        const {
            nombre,
            apellido,
            username,
            email,
            password,
            sexo,
            fecha_nacimiento
        } = req.body;

        let errores = {};

        if (!nombre) errores.nombre = 'El nombre es obligatorio';
        if (!apellido) errores.apellido = 'El apellido es obligatorio';
        if (!username) errores.username = 'El usuario es obligatorio';
        if (!email) errores.email = 'El email es obligatorio';
        if (!password) errores.password = 'La contraseña es obligatoria';
        if (!sexo) errores.sexo = 'Selecciona un sexo';
        if (!fecha_nacimiento) errores.fecha_nacimiento = 'La fecha de nacimiento es obligatoria';

        if (Object.keys(errores).length > 0) {
            return res.render('register', {
                errores,
                datos: req.body
            });
        }

        const existente = await usuarioModel.buscarPorEmail(email);

        if (existente) {
            errores.email = 'El email ya está registrado';

            return res.render('register', {
                errores,
                datos: req.body
            });
        }

        const usuarioExistente = await usuarioModel.buscarPorUsername(username);

        if (usuarioExistente) {
            errores.username = 'El usuario ya existe';

            return res.render('register', {
                errores,
                datos: req.body
            });
        }

        const hash = await bcrypt.hash(password, 10);

        await usuarioModel.crear({
            nombre,
            apellido,
            username,
            email,
            password: hash,
            sexo,
            fecha_nacimiento,
            activo: 1
        });

        res.render('login', {
            success: 'Cuenta creada correctamente'
        });

    } catch (error) {
        console.log(error);
        res.render('register', {
            errores: {
                general: 'Error en el servidor'
            },
            datos: req.body
        });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        let errores = {};

        if (!email) errores.email = 'El email es obligatorio';
        if (!password) errores.password = 'La contraseña es obligatoria';

        if (Object.keys(errores).length > 0) {
            return res.render('login', {
                errores,
                datos: req.body
            });
        }

        const usuario = await usuarioModel.buscarPorEmail(email);

        if (!usuario || usuario.activo === 0) {
            return res.render('login', {
                errores: {
                    email: 'No se encuentra ese Usuario'
                },
                datos: req.body
            });
        }

        const valido = await bcrypt.compare(password, usuario.password);

        if (!valido) {
            return res.render('login', {
                errores: {
                    password: 'Contraseña incorrecta'
                },
                datos: req.body
            });
        }

        req.session.usuario = usuario;

        res.redirect('/publicaciones');

    } catch (error) {
        console.log(error);
        res.render('login', {
            errores: {
                general: 'Error en el servidor'
            },
            datos: req.body
        });
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