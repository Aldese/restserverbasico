const {Response} = require('express');

const usuariosGet = (req, res = response) => {
const {q,nombre,} = req.query; 

    res.json({
        "msg": "get API - controlador",
        q,
        nombre
    });
}

const usuariosPost = (req, res = reponse) => {
    
    const {nombre, edad} = req.body;
    
    res.json({
        "msg": "post API - controlador",
        nombre,
        edad
    });
}
 
const usuariosPut = (req, res = reponse) => {

    const {nombre, edad} = req.body;
    const {id} = req.params;
    res.json({
        "msg": "put API - controlador",
        nombre,
        edad,
        id
    });
}

const usuariosDelete = (req, res = reponse) => {
    res.json({
        "msg": "delete API - controlador"
    });
}

const usuariosPatch = (req, res = reponse) => {
    res.json({
        "msg": "patch API -  controlador"
    });
}

module.exports ={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}