const jwt = require("jsonwebtoken");

const validarJWT = (req,res=response,next)=>{
    //el otken biene por el header x-token, buena practica
    const token = req.header("x-token");
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:"No hay token en la petición"
        });
    }
    try {
        //validamos si encuentra el token debe ser valido de nuestro env y regresamos
        //el uid para luego saber a que persona estamos escribiendo o coenctado
        //es decir todo el demas proceso
        const {uid} = jwt.verify(token,process.env.JWT_KEY);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:"Token no válido"
        })
    }
}

module.exports ={
    validarJWT
}