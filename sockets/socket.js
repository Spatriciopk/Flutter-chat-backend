
//para importar
const {io} = require('../index');

//MENSAJES DE SOCKETS
//client es un dispositivo q se acaba de conectar
// http://localhost:3000/socket.io/socket.io.js entrar para ver la configuracion
//revisar el html y agregar <script src="socket.io/socket.io.js"></script>
io.on('connection', client => {
    console.log("Cliente conectado");
    client.on('disconnect', () => { 
        //cuando se descoencta el cliente
        console.log("Cliente desconectado");
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