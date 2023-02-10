const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req,res = response) =>{

    //extraendo solo lo q me interesa del body
    const {email,password} = req.body;
    try {
        //va a buscar el email en la base de datos
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:"El correo ya está registrado"
            });
        }
        //extraer informacion del body
        const usuario = new Usuario(req.body);
        //escriptar contraseñas
        //no importa si son contraseñas identicas, siempre se genera un nuevo hash
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
        //para guardar ya en mongo db
        await usuario.save();
        //

        //Generar mi json web token esta en helpers jwt.js
        const token = await generarJWT(usuario.id);
        //enviar respuesta si todo esta bien
        res.json({
            ok:true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        });
    }
}

const login = async (req,res = response) =>{
    const {email,password} = req.body;
    try {
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:"Email no encontrado"
            });
        }

        //validar el password y desecriptar
        const validPassword = bcrypt.compareSync(password,usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:"La contraseña no es valida"
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok:true,
            usuarioDB,
            token
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        });
    }
}

const renewToken = async(req,res) => {

    const uidUser = req.uid;
    //todo lo que tiebne qesperar usar await ojo como la base de datos o jwt
    const token = await generarJWT(uidUser);
    const usuario = await Usuario.findById(uidUser);
    res.json({
        ok:true,
        usuario,
        token
    });
}


module.exports ={
    crearUsuario,
    login,
    renewToken
}