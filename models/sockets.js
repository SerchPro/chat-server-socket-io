const { connectedUser, offline } = require("../controllers/sockets");
const { checkJWT } = require("../helpers/jwt");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

            
            const [ correct, uid] = checkJWT( socket.handshake.query['x-token']);
            if(!correct){
                console.log("unidentified socket ");
                return socket.disconnect();
            }

            await connectedUser(uid)

            console.log("cliente conectado", uid);

            socket.on('disconnect', async() => {
                console.log("disconnect client")
                await offline(uid)
            }) ;

        });
    }


}


module.exports = Sockets;