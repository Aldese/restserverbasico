const { Response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuario] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({ total, usuario });
}

const usuariosPost = async (req, res = reponse) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // guardar en la bbdd

    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = reponse) => {

    const { password, google, ...resto } = req.body;
    const { id } = req.params;

    //TODO validar contra base de datos
    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosDelete = async (req, res = reponse) => {

    const { id } = req.params;

    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });


    res.json({
        usuario
    });
}

const usuariosPatch = (req, res = reponse) => {
    res.json({
        "msg": "patch API -  controlador"
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}