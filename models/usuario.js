const {Schema,model} = require("mongoose");

//Schema es como se va ver nuestro modeloq  se va  aenviar
const UsuarioSchema = Schema ({
    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    online:{
        type:Boolean,
        default:false
    }
});

UsuarioSchema.method("toJSON",function(){
    //retorna el modelo sin estas propiedades
    const {__v,_id,password, ...object} = this.toObject();
    //asiganamos otra ves el id pero con otro nombre en el objeto
    object.uid = _id;
    //esto lo hacemos solo con fin de imprimir
    return object;
});


module.exports = model("Usuario",UsuarioSchema);