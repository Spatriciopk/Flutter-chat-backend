const jwt = require("jsonwebtoken")

const generarJWT = (uid)=>{
    return new Promise ((resolve,reject) =>{
        //payload solo guardar informacion no sensible
        //tiene header, playload y firma
        const payload = {
            uid
        };
        //sign es para firmarlo, recibe el payload y una clave secreta (ojo) esta en .env
        jwt.sign(payload,process.env.JWT_KEY,{
            expiresIn: "24h"
        },(err,token)=>{
            if(err){
                //no se pudo crear el token
                //estp dispara el catch
                reject("No se pudo generar el JWT");
            }
            else{
                //tenemos el token
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}