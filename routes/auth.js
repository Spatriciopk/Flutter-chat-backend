/*
    path : api/login

*/

const { Router } = require ("express");
const { check } = require("express-validator");
const { crearUsuario, login, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

//configuracion de las rutas
//[] dentro de las llaves estan las middlewres
//check es un midllere que permite verificar campo por cambpo
router.post("/new",[
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("email","El correo es obligatorio").isEmail(),
    check("password","La contraseña es obligatorio").not().isEmpty(),
    validarCampos
    ],crearUsuario);



// post: /
// validar : email, password

router.post("/",[
    check("email","El email es obligatorio").isEmail(),
    check("password","El password es obligatorio").not().isEmpty(),
    validarCampos
],login);


//validarJWT
router.get("/renew",validarJWT,renewToken);


module.exports = router;