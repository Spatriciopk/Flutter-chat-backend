const {Schema,model} = require("mongoose");

//Schema es como se va ver nuestro modeloq  se va  aenviar
const MensajeSchema = Schema ({
    de:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    para:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true,
    },
    mensaje:{
        type:String,
        required:true
    }
},{
    //majeo de tiempos 
    timestamps:true
});

MensajeSchema.method("toJSON",function(){
    //retorna el modelo sin estas propiedades
    const {__v,_id, ...object} = this.toObject();
    return object;
});


module.exports = model("Mensaje",MensajeSchema);