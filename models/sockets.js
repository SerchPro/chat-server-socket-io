const { connectedUser, offline, getUsers } = require("../controllers/sockets");
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

            await connectedUser(uid);

            // join the user a socket-io room

            socket.join( uid )

            console.log("cliente conectado", uid);

            //emit all the users

            this.io.emit('users-list', await getUsers());


            socket.on( 'personal-message', ( payload ) => {
                console.log( payload )
            })

            socket.on('disconnect', async() => {
                console.log("disconnect client")
                await offline(uid);
                this.io.emit('users-list', await getUsers())
            }) ;

        });
    }


}


module.exports = Sockets;