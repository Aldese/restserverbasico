const Role = require('../models/role');
const Usuario = require('../models/usuario');

//verificar si existe el rol
const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BBDD`)
    }
}

// verificar si exite el correo
const existeEmail = async (correo = '') => {
    const esMailValido = await Usuario.findOne({ correo });
    if (esMailValido) {
        throw new Error(`El correo: ${correo} ya está registrado`)
    }
}

const exixteUserPorId = async (id) =>{
    const exiseUsuario = await Usuario.findById(id);
    if (!exiseUsuario) {
        throw new Error(`El id: ${id},  no existe`)
    }
}

module.exports = {
    esRoleValido,
    existeEmail,
    exixteUserPorId
}