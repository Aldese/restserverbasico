
const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, existeEmail, exixteUserPorId } = require('../helpers/db-validators');
const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mas de 6 letras').isLength({ min: 6 }),
    // check('correo','El correo no es válido').isEmail(),
    // check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('correo').custom(existeEmail),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(exixteUserPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.delete('/:id',[
    
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(exixteUserPorId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;