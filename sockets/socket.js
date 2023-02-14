
//para importar
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index');


//MENSAJES DE SOCKETS
//client es un dispositivo q se acaba de conectar
// http://localhost:3000/socket.io/socket.io.js entrar para ver la configuracion
//revisar el html y agregar <script src="socket.io/socket.io.js"></script>
io.on('connection', (client) => {
    console.log("Cliente conectado");

    //?? cliente con json web token
    //extraemos los 'extraHeaders':{ de flutter
    /*    'x-token':token ['x-token']
    }*/
    //console.log(client.handshake.headers);
    //console.log(client.handshake.headers['x-token']);
    const [valido,uid] = comprobarJWT(client.handshake.headers['x-token'])
    //verificacion de conexion del usuario
    if(!valido){return client.disconnect();}

    //Si sigue por aqui cliente coenctado
    usuarioConectado(uid);

    console.log("Cliente autenticado");

    //Ingresar al usuario a una sala en particular
    //sala global, client.id (mensaje privado), sala entre usuarios con uid de mongo
    //para unir a una sala a los clientes
    client.join(uid);
    //para emitir un mensaje
    //client.to(uid).emit();
    //////////////////////////
    //Escuchar del cliente el mensaje personal
    client.on("mensaje-personal",async(payload) =>{
        //Todo guardar el mensaje
        await grabarMensaje(payload)

        console.log(payload);
        //emitir un mensaje solo a quien debe ir
        io.to(payload.para).emit("mensaje-personal",payload);
    });



    client.on('disconnect', () => { 
        //cuando se descoencta el cliente
        console.log("Cliente desconectado");
        usuarioDesconectado(uid);
    });
     //COMUNICACIÓN DEL SOCKET EVENTO   
     //on es para escuchar o estar escuchando
     //"mensaje" debe ser igual al del html del emit 
     //payload es el dato
    /*client.on("mensaje",(payload)=>{
        console.log("Mensaje ",payload);
        console.log("Mensaje ",payload.nombre);
        //para emitir a todos los clientes conectados
        io.emit('mensaje',{admin:'Nuevo mensaje'});
    });*/
});