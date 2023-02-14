const { response } = require("express");
const Usuario = require("../models/usuario");

const getUsuarios = async (req,res=response) =>{


    //para una paginacion o traer solo 5 y asi
    const desde = Number(req.query.desde) || 0;


    //{ok:true},msg:"get Usuarios"
    //para buscar los q estan coenctados primero
    //find regresar todos los usuarios q no sean los del uid q hizo el token
    // tengo en la req el uid pues paso por el midleware
    const  usuarios = await Usuario
    .find({_id:{$ne:req.uid}})
    .sort("-online")
    .skip(desde)
    .limit(20);
    res.json({
        ok:true,
        usuarios
    });
}

module.exports = {
    getUsuarios
}