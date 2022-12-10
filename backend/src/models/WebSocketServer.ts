import { Server } from "socket.io";

export class WebSocketServer {
    public io: Server | null = null;

    public port = 3000;

    constructor(eventHandlers: any = [], options: Object | null = null) {
        console.log('WebSocketServer constructor');

        //TODO: parametrizar opciones al instanciar servidor, usar interfaces de socket.io

        this.connect(eventHandlers);
    }

    async emit(event: string, data: any) {
        if (this.io) {
            try {
                this.io.emit(event, data);
            } catch (error) {
                console.log('Error al emitir evento: ' + event + ' - ' + error);
            }
        }
    }

    async connect(eventHandlers: any = []) {

        try {
            this.io = new Server(this.port, {
                cors: {
                    origin: "*",
                    methods: ["GET", "POST"],
                    //allowedHeaders: ["my-custom-header"],
                    credentials: false
                }
            });
        } catch (error) {
            console.log('Error al crear servidor de websocket: ' + error);
        }


        try {
            if (this.io && eventHandlers && eventHandlers.length) {
                this.io.on('connection', (socket: any) => {
                    eventHandlers.forEach((eventHandler: any) => {
                        socket.on(eventHandler.event, eventHandler.callback);
                    });
                });
            }
        } catch (error) {
            console.log('Error al conectar un cliente de websocket: ' + error);
        }

        /*
        this.io.on('connection', (socket: any) => {
            console.log('a user connected');
            if (socketPath) {
                socket.broadcast.emit('keycounter', keyCounterStats);
            }

            socket.on('keycounter', () => {
                console.log('Recibe keycounter desde el cliente');

                io.emit('keycounter', keyCounterStats);
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
        */
    }
}
