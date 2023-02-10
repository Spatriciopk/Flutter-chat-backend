
const { validationResult } = require("express-validator");
const validarCampos = (req,res,next) =>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors: errores.mapped()
        });
    }
    //esto permite que siga al siguiente validacion
    next();
}

module.exports = {
    validarCampos
}