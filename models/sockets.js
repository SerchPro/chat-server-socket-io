const { checkJWT } = require("../helpers/jwt");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            
            const [ correct, uid] = checkJWT( socket.handshake.query['x-token']);
            if(!correct){
                console.log("unidentified socket ");
                return socket.disconnect();
            }

            console.log("cliente conectado", uid);

            socket.on('disconnect', () => {
                console.log("disconnect client")
            }) ;

        });
    }


}


module.exports = Sockets;