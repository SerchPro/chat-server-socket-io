const { connectedUser, offline, getUsers, saveMessage } = require("../controllers/sockets");
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
                //console.log("unidentified socket ");
                return socket.disconnect();
            }

            await connectedUser(uid);

            // join the user a socket-io room

            socket.join( uid )

            //console.log("cliente conectado", uid);

            //emit all the users

            this.io.emit('users-list', await getUsers());


            socket.on( 'personal-message', async ( payload ) => {
                //console.log( payload )
                const message = await saveMessage( payload);
                //console.log(message);
                this.io.to( payload.to ).emit( 'personal-message', message );
                this.io.to( payload.from ).emit( 'personal-message', message );
            })

            socket.on('disconnect', async() => {
                //console.log("disconnect client")
                await offline(uid);
                this.io.emit('users-list', await getUsers())
            }) ;

        });
    }


}


module.exports = Sockets;